import { useState, useMemo } from 'react';
import {
  Box,
  Heading,
  Text,
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
  PlusIcon,
} from '@razorpay/blade/components';
import type {
  Customer,
  CustomerGroup,
  PricingPlan,
  PaymentSchedule,
  TemplateTerminology,
  EasyCollectionsAction,
} from './types';
import { CUSTOMER_STATUS_BADGE } from './data';
import CustomerDetailDrawer from './CustomerDetailDrawer';
import AddCustomerModal from './AddCustomerModal';

interface CustomersTabProps {
  customers: Customer[];
  groups: CustomerGroup[];
  pricingPlans: PricingPlan[];
  schedules: PaymentSchedule[];
  terminology: TemplateTerminology;
  dispatch: React.Dispatch<EasyCollectionsAction>;
}

const STATUS_FILTERS = ['All', 'Active', 'Paused', 'Exited'] as const;

const CustomersTab = ({ customers, groups, pricingPlans, schedules, terminology, dispatch }: CustomersTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [groupFilter, setGroupFilter] = useState<string>('All');
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredCustomers = useMemo(() => {
    let result = customers;

    if (statusFilter !== 'All') {
      result = result.filter(c => c.status === statusFilter.toLowerCase());
    }

    if (groupFilter !== 'All') {
      result = result.filter(c => c.groupId === groupFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        c =>
          c.name.toLowerCase().includes(term) ||
          c.customerId.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term),
      );
    }

    return result;
  }, [customers, statusFilter, groupFilter, searchTerm]);

  const getStatusCount = (filter: string): number => {
    if (filter === 'All') return customers.length;
    return customers.filter(c => c.status === filter.toLowerCase()).length;
  };

  const getGroupName = (groupId: string): string => {
    const group = groups.find(g => g.id === groupId);
    return group?.name ?? '—';
  };

  const getPlanName = (planId: string | null): string => {
    if (!planId) return '—';
    const plan = pricingPlans.find(p => p.id === planId);
    return plan?.name ?? '—';
  };

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailDrawerOpen(true);
  };

  return (
    <Box display="flex" flexDirection="column" gap="spacing.6">
      {/* Header */}
      <Box
        display="flex"
        flexDirection={{ base: 'column', m: 'row' }}
        justifyContent="space-between"
        alignItems={{ base: 'flex-start', m: 'center' }}
        gap="spacing.4"
      >
        <Heading size="large" weight="semibold">
          Customers
        </Heading>
        <Button
          variant="primary"
          icon={PlusIcon}
          iconPosition="left"
          size="medium"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Customer
        </Button>
      </Box>

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
            {STATUS_FILTERS.map(filter => (
              <Button
                key={filter}
                variant={statusFilter === filter ? 'secondary' : 'tertiary'}
                size="small"
                onClick={() => setStatusFilter(filter)}
              >
                {`${filter} (${getStatusCount(filter)})`}
              </Button>
            ))}
          </Box>
          <Box width={{ base: '100%', m: '280px' }}>
            <SearchInput
              placeholder="Search by name, ID, or email"
              accessibilityLabel="Search customers"
              onChange={({ value }) => setSearchTerm(value ?? '')}
            />
          </Box>
        </Box>

        {/* Group Filters */}
        <Box display="flex" gap="spacing.2" flexWrap="wrap">
          <Button
            variant={groupFilter === 'All' ? 'secondary' : 'tertiary'}
            size="small"
            onClick={() => setGroupFilter('All')}
          >
            All Groups
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
                <TableHeaderCell>{terminology.customerId}</TableHeaderCell>
                <TableHeaderCell>{terminology.group}</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Phone</TableHeaderCell>
                <TableHeaderCell>Plan</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableHeaderRow>
            </TableHeader>
            <TableBody>
              {tableData.map(row => {
                const customer = row as unknown as Customer;
                const badgeConfig = CUSTOMER_STATUS_BADGE[customer.status];
                return (
                  <TableRow
                    key={customer.id}
                    item={row}
                    onClick={() => handleRowClick(customer)}
                  >
                    <TableCell>
                      <Text size="medium" weight="medium">
                        {customer.name}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text size="medium">{customer.customerId}</Text>
                    </TableCell>
                    <TableCell>
                      <Text size="medium">{getGroupName(customer.groupId)}</Text>
                    </TableCell>
                    <TableCell>
                      <Text size="medium">{customer.email || '—'}</Text>
                    </TableCell>
                    <TableCell>
                      <Text size="medium">{customer.phone || '—'}</Text>
                    </TableCell>
                    <TableCell>
                      <Text size="medium">{getPlanName(customer.pricingPlanId)}</Text>
                    </TableCell>
                    <TableCell>
                      <Badge size="small" color={badgeConfig.color} emphasis="subtle">
                        {badgeConfig.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableFooterRow>
                <TableFooterCell>
                  Showing {filteredCustomers.length} of {customers.length} customers
                </TableFooterCell>
                <TableFooterCell>{' '}</TableFooterCell>
                <TableFooterCell>{' '}</TableFooterCell>
                <TableFooterCell>{' '}</TableFooterCell>
                <TableFooterCell>{' '}</TableFooterCell>
                <TableFooterCell>{' '}</TableFooterCell>
                <TableFooterCell>{' '}</TableFooterCell>
              </TableFooterRow>
            </TableFooter>
          </>
        )}
      </Table>

      {/* Detail Drawer */}
      <CustomerDetailDrawer
        isOpen={isDetailDrawerOpen}
        onDismiss={() => {
          setIsDetailDrawerOpen(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
        groups={groups}
        pricingPlans={pricingPlans}
        schedules={schedules}
        terminology={terminology}
        dispatch={dispatch}
      />

      {/* Add Modal */}
      <AddCustomerModal
        isOpen={isAddModalOpen}
        onDismiss={() => setIsAddModalOpen(false)}
        groups={groups}
        pricingPlans={pricingPlans}
        terminology={terminology}
        dispatch={dispatch}
      />
    </Box>
  );
};

export default CustomersTab;
