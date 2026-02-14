import { useState, useMemo } from 'react';
import {
  Box,
  Text,
  Amount,
  Badge,
  Button,
  SearchInput,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableFooterRow,
  TableFooterCell,
} from '@razorpay/blade/components';
import type {
  Customer,
  CustomerGroup,
  TemplateTerminology,
} from './types';

interface CollectionsTabProps {
  customers: Customer[];
  groups: CustomerGroup[];
  terminology: TemplateTerminology;
}

const COLLECTION_FILTERS = ['All', 'Overdue', 'Fully Paid', 'Pending'] as const;

const CollectionsTab = ({ customers, groups, terminology }: CollectionsTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [collectionFilter, setCollectionFilter] = useState<string>('All');
  const [groupFilter, setGroupFilter] = useState<string>('All');

  const activeCustomers = useMemo(
    () => customers.filter(c => c.status !== 'exited'),
    [customers],
  );

  const filteredCustomers = useMemo(() => {
    let result = activeCustomers;

    if (collectionFilter === 'Overdue') {
      result = result.filter(c => c.totalOverdue > 0);
    } else if (collectionFilter === 'Fully Paid') {
      result = result.filter(c => c.totalDue > 0 && c.totalPaid >= c.totalDue);
    } else if (collectionFilter === 'Pending') {
      result = result.filter(c => c.totalDue > 0 && c.totalPaid < c.totalDue && c.totalOverdue === 0);
    }

    if (groupFilter !== 'All') {
      result = result.filter(c => c.groupId === groupFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(term) || c.customerId.toLowerCase().includes(term));
    }

    return result;
  }, [activeCustomers, collectionFilter, groupFilter, searchTerm]);

  const getFilterCount = (filter: string): number => {
    if (filter === 'All') return activeCustomers.length;
    if (filter === 'Overdue') return activeCustomers.filter(c => c.totalOverdue > 0).length;
    if (filter === 'Fully Paid') return activeCustomers.filter(c => c.totalDue > 0 && c.totalPaid >= c.totalDue).length;
    if (filter === 'Pending') return activeCustomers.filter(c => c.totalDue > 0 && c.totalPaid < c.totalDue && c.totalOverdue === 0).length;
    return 0;
  };

  const getGroupName = (groupId: string): string => {
    const group = groups.find(g => g.id === groupId);
    return group?.name ?? '—';
  };

  const totals = useMemo(() => ({
    due: filteredCustomers.reduce((s, c) => s + c.totalDue, 0),
    paid: filteredCustomers.reduce((s, c) => s + c.totalPaid, 0),
    overdue: filteredCustomers.reduce((s, c) => s + c.totalOverdue, 0),
    outstanding: filteredCustomers.reduce((s, c) => s + Math.max(0, c.totalDue - c.totalPaid), 0),
  }), [filteredCustomers]);

  return (
    <Box display="flex" flexDirection="column" gap="spacing.6">
      {/* Filter Row */}
      <Box display="flex" flexDirection="column" gap="spacing.4">
        <Box
          display="flex"
          flexDirection={{ base: 'column', m: 'row' }}
          gap="spacing.4"
          alignItems={{ base: 'stretch', m: 'center' }}
          justifyContent="space-between"
        >
          <Box display="flex" gap="spacing.2" flexWrap="wrap">
            {COLLECTION_FILTERS.map(filter => (
              <Button
                key={filter}
                variant={collectionFilter === filter ? 'secondary' : 'tertiary'}
                size="small"
                onClick={() => setCollectionFilter(filter)}
              >
                {`${filter} (${getFilterCount(filter)})`}
              </Button>
            ))}
          </Box>
          <Box width={{ base: '100%', m: '280px' }}>
            <SearchInput
              placeholder="Search by name or ID"
              accessibilityLabel="Search collections"
              onChange={({ value }) => setSearchTerm(value ?? '')}
            />
          </Box>
        </Box>

        <Box display="flex" gap="spacing.2" flexWrap="wrap">
          <Button
            variant={groupFilter === 'All' ? 'secondary' : 'tertiary'}
            size="small"
            onClick={() => setGroupFilter('All')}
          >
            All {terminology.groupPlural}
          </Button>
          {groups.map(group => (
            <Button
              key={group.id}
              variant={groupFilter === group.id ? 'secondary' : 'tertiary'}
              size="small"
              onClick={() => setGroupFilter(group.id)}
            >
              {group.name}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Table */}
      <Table data={{ nodes: filteredCustomers }}>
        {(tableData) => (
          <>
            <TableHeader>
              <TableHeaderRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>{terminology.group}</TableHeaderCell>
                <TableHeaderCell>Total Due</TableHeaderCell>
                <TableHeaderCell>Paid</TableHeaderCell>
                <TableHeaderCell>Outstanding</TableHeaderCell>
                <TableHeaderCell>Overdue</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableHeaderRow>
            </TableHeader>
            <TableBody>
              {tableData.map(row => {
                const customer = row as unknown as Customer;
                const outstanding = Math.max(0, customer.totalDue - customer.totalPaid);

                let collectionStatus: { label: string; color: 'positive' | 'negative' | 'notice' | 'neutral' };
                if (customer.totalOverdue > 0) {
                  collectionStatus = { label: 'Overdue', color: 'negative' };
                } else if (customer.totalDue > 0 && customer.totalPaid >= customer.totalDue) {
                  collectionStatus = { label: 'Paid', color: 'positive' };
                } else if (customer.totalDue > 0 && customer.totalPaid < customer.totalDue) {
                  collectionStatus = { label: 'Pending', color: 'notice' };
                } else {
                  collectionStatus = { label: 'No Dues', color: 'neutral' };
                }

                return (
                  <TableRow key={customer.id} item={row}>
                    <TableCell>
                      <Text size="medium" weight="medium">
                        {customer.name}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text size="medium">{getGroupName(customer.groupId)}</Text>
                    </TableCell>
                    <TableCell>
                      <Amount value={customer.totalDue} currency="INR" size="small" type="body" />
                    </TableCell>
                    <TableCell>
                      <Amount
                        value={customer.totalPaid}
                        currency="INR"
                        size="small"
                        type="body"
                        color="feedback.text.positive.intense"
                      />
                    </TableCell>
                    <TableCell>
                      {outstanding > 0 ? (
                        <Amount value={outstanding} currency="INR" size="small" type="body" />
                      ) : (
                        <Text size="medium" color="surface.text.gray.muted">—</Text>
                      )}
                    </TableCell>
                    <TableCell>
                      {customer.totalOverdue > 0 ? (
                        <Amount
                          value={customer.totalOverdue}
                          currency="INR"
                          size="small"
                          type="body"
                          color="feedback.text.negative.intense"
                        />
                      ) : (
                        <Text size="medium" color="surface.text.gray.muted">—</Text>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge size="small" color={collectionStatus.color} emphasis="subtle">
                        {collectionStatus.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableFooterRow>
                <TableFooterCell>
                  <Text size="medium" weight="semibold">
                    Total ({filteredCustomers.length})
                  </Text>
                </TableFooterCell>
                <TableFooterCell>{' '}</TableFooterCell>
                <TableFooterCell>
                  <Amount value={totals.due} currency="INR" size="small" type="body" weight="semibold" />
                </TableFooterCell>
                <TableFooterCell>
                  <Amount value={totals.paid} currency="INR" size="small" type="body" weight="semibold" />
                </TableFooterCell>
                <TableFooterCell>
                  <Amount value={totals.outstanding} currency="INR" size="small" type="body" weight="semibold" />
                </TableFooterCell>
                <TableFooterCell>
                  <Amount value={totals.overdue} currency="INR" size="small" type="body" weight="semibold" />
                </TableFooterCell>
                <TableFooterCell>{' '}</TableFooterCell>
              </TableFooterRow>
            </TableFooter>
          </>
        )}
      </Table>
    </Box>
  );
};

export default CollectionsTab;
