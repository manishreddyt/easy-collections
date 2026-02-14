import { useMemo } from 'react';
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Amount,
  Badge,
  Button,
  Divider,
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
  Tabs,
  TabList,
  TabItem,
  TabPanel,
  DownloadIcon,
  useToast,
} from '@razorpay/blade/components';
import type {
  Customer,
  CustomerGroup,
  BillingComponent,
  BillingStructure,
  PaymentSchedule,
  TemplateTerminology,
} from './types';
import { computeCollectionStats, computeGroupSummaries } from './data';

interface ReportsTabProps {
  customers: Customer[];
  groups: CustomerGroup[];
  components: BillingComponent[];
  structures: BillingStructure[];
  schedules: PaymentSchedule[];
  terminology: TemplateTerminology;
}

const DISCOUNT_DATA = [
  { id: 'disc_1', name: 'Sibling Discount', type: 'Percentage', customersAffected: 2, totalDiscount: 11400 },
  { id: 'disc_2', name: 'Merit Scholarship', type: 'Flat', customersAffected: 1, totalDiscount: 5000 },
  { id: 'disc_3', name: 'RTE Waiver', type: 'Percentage', customersAffected: 1, totalDiscount: 51000 },
  { id: 'disc_4', name: 'Early-Bird Discount', type: 'Percentage', customersAffected: 4, totalDiscount: 12900 },
];

const ReportsTab = ({
  customers,
  groups,
  components,
  structures,
  schedules,
  terminology,
}: ReportsTabProps) => {
  const toast = useToast();

  const groupSummaries = useMemo(
    () => computeGroupSummaries(customers, groups),
    [customers, groups],
  );

  const collectionStats = useMemo(
    () => computeCollectionStats(customers),
    [customers],
  );

  const totals = useMemo(() => {
    const totalExpected = groupSummaries.reduce((s, g) => s + g.expected, 0);
    const totalCollected = groupSummaries.reduce((s, g) => s + g.collected, 0);
    const totalOverdue = groupSummaries.reduce((s, g) => s + g.overdue, 0);
    const totalCustomers = groupSummaries.reduce((s, g) => s + g.customerCount, 0);
    const overallRate = totalExpected > 0 ? (totalCollected / totalExpected) * 100 : 0;
    return { totalExpected, totalCollected, totalOverdue, totalCustomers, overallRate };
  }, [groupSummaries]);

  const onTimePayments = useMemo(() => {
    const activeTotal = customers.filter(c => c.status === 'active' || c.status === 'paused').length;
    const count = collectionStats.onTimeCount;
    const pct = activeTotal > 0 ? Math.round((count / activeTotal) * 100) : 0;
    return { count, total: activeTotal, pct };
  }, [customers, collectionStats]);

  const overduePayments = useMemo(() => {
    const activeTotal = customers.filter(c => c.status === 'active' || c.status === 'paused').length;
    const count = collectionStats.overdueCount;
    const pct = activeTotal > 0 ? Math.round((count / activeTotal) * 100) : 0;
    return { count, total: activeTotal, pct };
  }, [customers, collectionStats]);

  const defaulters = useMemo(
    () =>
      customers
        .filter(c => c.totalOverdue > 0)
        .sort((a, b) => b.totalOverdue - a.totalOverdue),
    [customers],
  );

  const getGroupName = (groupId: string): string => {
    const group = groups.find(g => g.id === groupId);
    return group?.name ?? '—';
  };

  const getOverdueDays = (customerId: string): string => {
    const schedule = schedules.find(s => s.customerId === customerId);
    if (!schedule) return '—';
    const overdueInstallments = schedule.installments.filter(i => i.status === 'overdue');
    if (overdueInstallments.length === 0) return '—';
    const earliestDue = overdueInstallments.reduce((earliest, inst) => {
      const d = new Date(inst.dueDate);
      return d < earliest ? d : earliest;
    }, new Date(overdueInstallments[0].dueDate));
    const now = new Date();
    const diffMs = now.getTime() - earliestDue.getTime();
    const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    return `${diffDays}`;
  };

  const componentRevenue = useMemo(() => {
    const revenueMap: Record<string, { name: string; type: string; expected: number }> = {};

    components.forEach(comp => {
      revenueMap[comp.id] = {
        name: comp.name,
        type: comp.frequency === 'recurring' ? 'Recurring' : 'One-time',
        expected: 0,
      };
    });

    structures.forEach(struct => {
      const group = groups.find(g => g.id === struct.groupId);
      const customerCount = group?.customerCount ?? 0;
      struct.components.forEach(sc => {
        if (revenueMap[sc.componentId]) {
          revenueMap[sc.componentId].expected += sc.amount * customerCount;
        }
      });
    });

    const rows = Object.entries(revenueMap).map(([id, data]) => ({
      id,
      ...data,
    }));

    const grandTotal = rows.reduce((s, r) => s + r.expected, 0);

    return { rows, grandTotal };
  }, [components, structures, groups]);

  return (
    <Box display="flex" flexDirection="column" gap="spacing.7">
      <Tabs>
        <TabList>
          <TabItem value="summary">Collection Summary</TabItem>
          <TabItem value="defaulters">Defaulters</TabItem>
          <TabItem value="revenue">Revenue Analysis</TabItem>
        </TabList>

        {/* -- Collection Summary -- */}
        <TabPanel value="summary">
          <Box display="flex" flexDirection="column" gap="spacing.6" paddingTop="spacing.5">
            <Text size="medium" color="surface.text.gray.muted">
              Academic Year 2025-26
            </Text>

            <Card elevation="lowRaised">
              <CardBody>
                <Table
                  data={{
                    nodes: groupSummaries.map(g => ({ ...g, id: g.groupId })),
                  }}
                >
                  {(tableData) => (
                    <>
                      <TableHeader>
                        <TableHeaderRow>
                          <TableHeaderCell>{terminology.group}</TableHeaderCell>
                          <TableHeaderCell>{terminology.customerPlural}</TableHeaderCell>
                          <TableHeaderCell>Expected</TableHeaderCell>
                          <TableHeaderCell>Collected</TableHeaderCell>
                          <TableHeaderCell>Overdue</TableHeaderCell>
                          <TableHeaderCell>Collection Rate</TableHeaderCell>
                        </TableHeaderRow>
                      </TableHeader>
                      <TableBody>
                        {tableData.map(row => {
                          const summary = row as typeof groupSummaries[number] & { id: string };
                          const rate = summary.collectionRate;
                          return (
                            <TableRow key={row.id} item={row}>
                              <TableCell>
                                <Text size="medium" weight="medium">
                                  {summary.groupName}
                                </Text>
                              </TableCell>
                              <TableCell>
                                <Text size="medium">{summary.customerCount}</Text>
                              </TableCell>
                              <TableCell>
                                <Amount value={summary.expected} currency="INR" size="small" type="body" />
                              </TableCell>
                              <TableCell>
                                <Amount value={summary.collected} currency="INR" size="small" type="body" />
                              </TableCell>
                              <TableCell>
                                <Amount value={summary.overdue} currency="INR" size="small" type="body" />
                              </TableCell>
                              <TableCell>
                                <Text
                                  size="medium"
                                  weight="semibold"
                                  color={
                                    rate > 90
                                      ? 'feedback.text.positive.intense'
                                      : rate > 70
                                        ? 'feedback.text.notice.intense'
                                        : 'feedback.text.negative.intense'
                                  }
                                >
                                  {rate.toFixed(1)}%
                                </Text>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                      <TableFooter>
                        <TableFooterRow>
                          <TableFooterCell>
                            <Text size="medium" weight="semibold">Total</Text>
                          </TableFooterCell>
                          <TableFooterCell>
                            <Text size="medium" weight="semibold">{totals.totalCustomers}</Text>
                          </TableFooterCell>
                          <TableFooterCell>
                            <Amount value={totals.totalExpected} currency="INR" size="small" type="body" />
                          </TableFooterCell>
                          <TableFooterCell>
                            <Amount value={totals.totalCollected} currency="INR" size="small" type="body" />
                          </TableFooterCell>
                          <TableFooterCell>
                            <Amount value={totals.totalOverdue} currency="INR" size="small" type="body" />
                          </TableFooterCell>
                          <TableFooterCell>
                            <Text
                              size="medium"
                              weight="semibold"
                              color={
                                totals.overallRate > 90
                                  ? 'feedback.text.positive.intense'
                                  : totals.overallRate > 70
                                    ? 'feedback.text.notice.intense'
                                    : 'feedback.text.negative.intense'
                              }
                            >
                              {totals.overallRate.toFixed(1)}%
                            </Text>
                          </TableFooterCell>
                        </TableFooterRow>
                      </TableFooter>
                    </>
                  )}
                </Table>
              </CardBody>
            </Card>

            {/* Collection rate cards */}
            <Box
              display="grid"
              gridTemplateColumns={{ base: '1fr', m: '1fr 1fr' }}
              gap="spacing.5"
            >
              <Card elevation="lowRaised" padding="spacing.7">
                <CardBody>
                  <Text size="small" color="surface.text.gray.muted" weight="medium">
                    On-Time Payments
                  </Text>
                  <Heading size="large" marginTop="spacing.3" color="feedback.text.positive.intense">
                    {onTimePayments.count}
                  </Heading>
                  <Text size="small" color="surface.text.gray.muted" marginTop="spacing.2">
                    {onTimePayments.pct}% of {onTimePayments.total} {terminology.customerPlural.toLowerCase()}
                  </Text>
                </CardBody>
              </Card>
              <Card elevation="lowRaised" padding="spacing.7">
                <CardBody>
                  <Text size="small" color="surface.text.gray.muted" weight="medium">
                    Overdue Payments
                  </Text>
                  <Heading size="large" marginTop="spacing.3" color="feedback.text.negative.intense">
                    {overduePayments.count}
                  </Heading>
                  <Text size="small" color="surface.text.gray.muted" marginTop="spacing.2">
                    {overduePayments.pct}% of {overduePayments.total} {terminology.customerPlural.toLowerCase()}
                  </Text>
                </CardBody>
              </Card>
            </Box>
          </Box>
        </TabPanel>

        {/* -- Defaulters -- */}
        <TabPanel value="defaulters">
          <Box display="flex" flexDirection="column" gap="spacing.6" paddingTop="spacing.5">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap="spacing.3">
                <Heading size="small">
                  Overdue {terminology.customerPlural}
                </Heading>
                <Badge size="small" color="negative">
                  {String(defaulters.length)}
                </Badge>
              </Box>
              <Button
                variant="tertiary"
                size="medium"
                icon={DownloadIcon}
                iconPosition="left"
                onClick={() => toast.show({ content: 'Export coming soon', color: 'neutral' })}
              >
                Export Report
              </Button>
            </Box>

            {defaulters.length === 0 ? (
              <Box display="flex" justifyContent="center" alignItems="center" padding="spacing.10">
                <Text size="medium" color="surface.text.gray.muted">
                  No overdue {terminology.customerPlural.toLowerCase()}
                </Text>
              </Box>
            ) : (
              <Card elevation="lowRaised">
                <CardBody>
                  <Table
                    data={{
                      nodes: defaulters.map(d => ({ ...d })),
                    }}
                  >
                    {(tableData) => (
                      <>
                        <TableHeader>
                          <TableHeaderRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>{terminology.contact}</TableHeaderCell>
                            <TableHeaderCell>{terminology.group}</TableHeaderCell>
                            <TableHeaderCell>Phone</TableHeaderCell>
                            <TableHeaderCell>Total Due</TableHeaderCell>
                            <TableHeaderCell>Paid</TableHeaderCell>
                            <TableHeaderCell>Overdue</TableHeaderCell>
                            <TableHeaderCell>Overdue Days</TableHeaderCell>
                          </TableHeaderRow>
                        </TableHeader>
                        <TableBody>
                          {tableData.map(row => {
                            const customer = row as Customer;
                            const overdueDays = getOverdueDays(customer.id);
                            return (
                              <TableRow key={row.id} item={row}>
                                <TableCell>
                                  <Text size="medium" weight="medium">{customer.name}</Text>
                                </TableCell>
                                <TableCell>
                                  <Text size="medium">{customer.contactName}</Text>
                                </TableCell>
                                <TableCell>
                                  <Text size="medium">{getGroupName(customer.groupId)}</Text>
                                </TableCell>
                                <TableCell>
                                  <Text size="medium">{customer.phone}</Text>
                                </TableCell>
                                <TableCell>
                                  <Amount value={customer.totalDue} currency="INR" size="small" type="body" />
                                </TableCell>
                                <TableCell>
                                  <Amount value={customer.totalPaid} currency="INR" size="small" type="body" />
                                </TableCell>
                                <TableCell>
                                  <Amount value={customer.totalOverdue} currency="INR" size="small" type="body" />
                                </TableCell>
                                <TableCell>
                                  <Text
                                    size="medium"
                                    color={overdueDays !== '—' ? 'feedback.text.negative.intense' : 'surface.text.gray.muted'}
                                  >
                                    {overdueDays !== '—' ? `${overdueDays}d` : overdueDays}
                                  </Text>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </>
                    )}
                  </Table>
                </CardBody>
              </Card>
            )}
          </Box>
        </TabPanel>

        {/* -- Revenue Analysis -- */}
        <TabPanel value="revenue">
          <Box display="flex" flexDirection="column" gap="spacing.6" paddingTop="spacing.5">
            {/* Component-wise revenue table */}
            <Card elevation="lowRaised">
              <CardBody>
                <Heading size="small" marginBottom="spacing.5">
                  Revenue by Component
                </Heading>
                <Table
                  data={{
                    nodes: componentRevenue.rows,
                  }}
                >
                  {(tableData) => (
                    <>
                      <TableHeader>
                        <TableHeaderRow>
                          <TableHeaderCell>Component</TableHeaderCell>
                          <TableHeaderCell>Type</TableHeaderCell>
                          <TableHeaderCell>Expected Revenue</TableHeaderCell>
                          <TableHeaderCell>% of Total Revenue</TableHeaderCell>
                        </TableHeaderRow>
                      </TableHeader>
                      <TableBody>
                        {tableData.map(row => {
                          const item = row as typeof componentRevenue.rows[number];
                          const pct =
                            componentRevenue.grandTotal > 0
                              ? (item.expected / componentRevenue.grandTotal) * 100
                              : 0;
                          return (
                            <TableRow key={row.id} item={row}>
                              <TableCell>
                                <Text size="medium" weight="medium">{item.name}</Text>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  size="small"
                                  color={item.type === 'Recurring' ? 'information' : 'notice'}
                                  emphasis="subtle"
                                >
                                  {item.type}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Amount value={item.expected} currency="INR" size="small" type="body" />
                              </TableCell>
                              <TableCell>
                                <Text size="medium">{pct.toFixed(1)}%</Text>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                      <TableFooter>
                        <TableFooterRow>
                          <TableFooterCell>
                            <Text size="medium" weight="semibold">Total</Text>
                          </TableFooterCell>
                          <TableFooterCell>{' '}</TableFooterCell>
                          <TableFooterCell>
                            <Amount value={componentRevenue.grandTotal} currency="INR" size="small" type="body" />
                          </TableFooterCell>
                          <TableFooterCell>
                            <Text size="medium" weight="semibold">100.0%</Text>
                          </TableFooterCell>
                        </TableFooterRow>
                      </TableFooter>
                    </>
                  )}
                </Table>
              </CardBody>
            </Card>

            {/* Discount summary */}
            <Card elevation="lowRaised">
              <CardBody>
                <Heading size="small" marginBottom="spacing.5">
                  Discount Summary
                </Heading>
                <Box display="flex" flexDirection="column">
                  {DISCOUNT_DATA.map((disc, idx) => (
                    <Box key={disc.id}>
                      <Box
                        display="flex"
                        flexDirection={{ base: 'column', m: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ base: 'flex-start', m: 'center' }}
                        paddingY="spacing.4"
                        gap="spacing.3"
                      >
                        <Box display="flex" alignItems="center" gap="spacing.3" flexWrap="wrap">
                          <Text size="medium" weight="medium">{disc.name}</Text>
                          <Badge size="small" color="neutral" emphasis="subtle">{disc.type}</Badge>
                        </Box>
                        <Box display="flex" alignItems="center" gap="spacing.5">
                          <Text size="small" color="surface.text.gray.muted">
                            {disc.customersAffected} {disc.customersAffected === 1 ? terminology.customer.toLowerCase() : terminology.customerPlural.toLowerCase()}
                          </Text>
                          <Amount value={disc.totalDiscount} currency="INR" size="small" type="body" />
                        </Box>
                      </Box>
                      {idx < DISCOUNT_DATA.length - 1 && <Divider />}
                    </Box>
                  ))}
                </Box>
              </CardBody>
            </Card>
          </Box>
        </TabPanel>
      </Tabs>
    </Box>
  );
};

export default ReportsTab;
