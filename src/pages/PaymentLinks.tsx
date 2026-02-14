import { useState, useReducer, useMemo } from 'react';
import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
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
  PlusIcon,
  useToast,
} from '@razorpay/blade/components';
import type { PaymentLink, PaymentLinkStatus } from './payment-links/types';
import {
  STATUS_BADGE_MAP,
  INITIAL_PAYMENT_LINKS,
  QUICK_FILTER_OPTIONS,
  getConversionRate,
  paymentLinksReducer,
} from './payment-links/data';
import CreatePaymentLinkModal from './payment-links/CreatePaymentLinkModal';
import PaymentLinkDetailDrawer from './payment-links/PaymentLinkDetailDrawer';

const PaymentLinks = () => {
  const [links, dispatch] = useReducer(paymentLinksReducer, INITIAL_PAYMENT_LINKS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<PaymentLink | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const toast = useToast();

  const filteredLinks = useMemo(() => {
    let result = links;

    if (statusFilter !== 'All') {
      result = result.filter(link => link.status === statusFilter.toLowerCase());
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        link =>
          link.title.toLowerCase().includes(term) ||
          link.id.toLowerCase().includes(term) ||
          link.shortUrl.toLowerCase().includes(term),
      );
    }

    return result;
  }, [links, statusFilter, searchTerm]);

  const stats = useMemo(
    () => ({
      totalLinks: links.length,
      activeLinks: links.filter(l => l.status === 'active').length,
      totalRevenue: links.reduce((sum, l) => sum + l.paid * l.amount, 0),
    }),
    [links],
  );

  const getFilterCount = (filter: string): number => {
    if (filter === 'All') return links.length;
    return links.filter(l => l.status === filter.toLowerCase()).length;
  };

  const handleCreateLink = (newLink: PaymentLink) => {
    dispatch({ type: 'ADD_LINK', payload: newLink });
    setIsCreateModalOpen(false);
    toast.show({ content: 'Payment link created successfully', color: 'positive' });
  };

  const handleRowClick = (link: PaymentLink) => {
    setSelectedLink(link);
    setIsDetailDrawerOpen(true);
  };

  const handleToggleStatus = (id: string, newStatus: PaymentLinkStatus) => {
    dispatch({ type: 'TOGGLE_STATUS', payload: { id, status: newStatus } });
    setSelectedLink(prev => (prev?.id === id ? { ...prev, status: newStatus } : prev));
    const label = newStatus === 'deactivated' ? 'deactivated' : 'activated';
    toast.show({ content: `Payment link ${label} successfully`, color: 'positive' });
  };

  const handleCopyLink = (shortUrl: string) => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    toast.show({ content: 'Link copied to clipboard', color: 'positive' });
  };

  return (
    <Box padding={{ base: 'spacing.5', m: 'spacing.8' }}>
      {/* Header */}
      <Box
        display="flex"
        flexDirection={{ base: 'column', m: 'row' }}
        justifyContent="space-between"
        alignItems={{ base: 'flex-start', m: 'center' }}
        marginBottom="spacing.7"
        gap="spacing.4"
      >
        <Box>
          <Heading size="large" weight="semibold">
            Payment Links
          </Heading>
          <Text size="medium" color="surface.text.gray.muted" marginTop="spacing.2">
            Create and share payment links with your customers
          </Text>
        </Box>
        <Button
          variant="primary"
          icon={PlusIcon}
          iconPosition="left"
          size="medium"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Payment Link
        </Button>
      </Box>

      {/* Stats Row */}
      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr', m: '1fr 1fr 1fr' }}
        gap="spacing.5"
        marginBottom="spacing.7"
      >
        <Card elevation="lowRaised" padding="spacing.7">
          <CardBody>
            <Text size="small" color="surface.text.gray.muted" weight="medium">
              Total Links Created
            </Text>
            <Heading size="large" marginTop="spacing.3">
              {stats.totalLinks.toLocaleString()}
            </Heading>
          </CardBody>
        </Card>
        <Card elevation="lowRaised" padding="spacing.7">
          <CardBody>
            <Text size="small" color="surface.text.gray.muted" weight="medium">
              Active Links
            </Text>
            <Heading size="large" marginTop="spacing.3" color="feedback.text.positive.intense">
              {stats.activeLinks.toLocaleString()}
            </Heading>
          </CardBody>
        </Card>
        <Card elevation="lowRaised" padding="spacing.7">
          <CardBody>
            <Text size="small" color="surface.text.gray.muted" weight="medium">
              Revenue via Links
            </Text>
            <Box marginTop="spacing.3">
              <Amount
                value={stats.totalRevenue}
                currency="INR"
                size="large"
                type="heading"
                suffix="humanize"
              />
            </Box>
          </CardBody>
        </Card>
      </Box>

      {/* Filter Bar */}
      <Card elevation="lowRaised">
        <CardBody>
          <Box display="flex" flexDirection="column" gap="spacing.5">
            {/* Search + Quick Filters */}
            <Box
              display="flex"
              flexDirection={{ base: 'column', m: 'row' }}
              gap="spacing.4"
              alignItems={{ base: 'stretch', m: 'center' }}
              justifyContent="space-between"
            >
              <Box display="flex" gap="spacing.2" flexWrap="wrap">
                {QUICK_FILTER_OPTIONS.map(filter => (
                  <Box key={filter} display="flex" alignItems="center" gap="spacing.1">
                    <Button
                      variant={statusFilter === filter ? 'secondary' : 'tertiary'}
                      size="small"
                      onClick={() => setStatusFilter(filter)}
                    >
                      {`${filter} (${getFilterCount(filter)})`}
                    </Button>
                  </Box>
                ))}
              </Box>
              <Box width={{ base: '100%', m: '280px' }}>
                <SearchInput
                  placeholder="Search by title, ID, or URL"
                  accessibilityLabel="Search payment links"
                  onChange={({ value }) => setSearchTerm(value ?? '')}
                />
              </Box>
            </Box>

            {/* Table */}
            <Table
              data={{
                nodes: filteredLinks,
              }}
            >
              {(tableData) => (
                <>
                  <TableHeader>
                    <TableHeaderRow>
                      <TableHeaderCell>Title</TableHeaderCell>
                      <TableHeaderCell>Amount</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Views</TableHeaderCell>
                      <TableHeaderCell>Paid</TableHeaderCell>
                      <TableHeaderCell>Conversion</TableHeaderCell>
                      <TableHeaderCell>Created</TableHeaderCell>
                    </TableHeaderRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map(row => (
                      <TableRow
                        key={row.id}
                        item={row}
                        onClick={() => handleRowClick(row as PaymentLink)}
                      >
                        <TableCell>
                          <Box display="flex" flexDirection="column" gap="spacing.1">
                            <Text size="medium" weight="medium">
                              {row.title}
                            </Text>
                            <Text size="xsmall" color="interactive.text.primary.normal">
                              {row.shortUrl}
                            </Text>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Amount
                            value={row.amount}
                            currency="INR"
                            size="small"
                            type="body"
                          />
                        </TableCell>
                        <TableCell>
                          <Badge
                            size="small"
                            color={STATUS_BADGE_MAP[row.status]?.color ?? 'neutral'}
                            emphasis="subtle"
                          >
                            {STATUS_BADGE_MAP[row.status]?.label ?? row.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Text size="medium">{row.views.toLocaleString()}</Text>
                        </TableCell>
                        <TableCell>
                          <Text size="medium" color="feedback.text.positive.intense">
                            {row.paid.toLocaleString()}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text size="medium">
                            {getConversionRate(row.paid, row.views)}%
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text size="small" color="surface.text.gray.muted">
                            {row.created}
                          </Text>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableFooterRow>
                      <TableFooterCell>
                        Showing {filteredLinks.length} of {links.length} links
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
          </Box>
        </CardBody>
      </Card>

      {/* Create Modal */}
      <CreatePaymentLinkModal
        isOpen={isCreateModalOpen}
        onDismiss={() => setIsCreateModalOpen(false)}
        onCreateLink={handleCreateLink}
      />

      {/* Detail Drawer */}
      <PaymentLinkDetailDrawer
        isOpen={isDetailDrawerOpen}
        onDismiss={() => {
          setIsDetailDrawerOpen(false);
          setSelectedLink(null);
        }}
        link={selectedLink}
        onToggleStatus={handleToggleStatus}
        onCopyLink={handleCopyLink}
      />
    </Box>
  );
};

export default PaymentLinks;
