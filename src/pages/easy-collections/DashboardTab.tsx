import { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Amount,
  Badge,
  Divider,
  DatePicker,
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
  BillingComponent,
  BillingStructure,
  PaymentSchedule,
  ActivityItem,
  TemplateTerminology,
  BillingCycle,
  PricingPlan,
} from './types';
import { computeCollectionStats, computeGroupSummaries, BILLING_CYCLE_STATUS_BADGE } from './data';

interface DashboardTabProps {
  customers: Customer[];
  groups: CustomerGroup[];
  components: BillingComponent[];
  structures: BillingStructure[];
  schedules: PaymentSchedule[];
  recentActivity: ActivityItem[];
  terminology: TemplateTerminology;
  billingCycles: BillingCycle[];
  pricingPlans: PricingPlan[];
}

const ACTIVITY_BADGE_CONFIG: Record<
  ActivityItem['type'],
  { label: string; color: 'positive' | 'information' | 'negative' | 'neutral' }
> = {
  payment_received: { label: 'Payment', color: 'positive' },
  reminder_sent: { label: 'Reminder', color: 'information' },
  overdue_alert: { label: 'Overdue', color: 'negative' },
  customer_added: { label: 'New', color: 'neutral' },
  receipt_generated: { label: 'Receipt', color: 'positive' },
  billing_cycle_started: { label: 'Cycle', color: 'information' },
};

const DATE_PRESETS = [
  {
    label: 'This Month',
    value: (today: Date): [Date, Date] => {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      return [start, today];
    },
  },
  {
    label: 'Last 3 Months',
    value: (today: Date): [Date, Date] => {
      const start = new Date(today.getFullYear(), today.getMonth() - 3, 1);
      return [start, today];
    },
  },
  {
    label: 'This Year',
    value: (today: Date): [Date, Date] => {
      const start = new Date(today.getFullYear(), 0, 1);
      return [start, today];
    },
  },
  {
    label: 'Last Year',
    value: (today: Date): [Date, Date] => {
      const start = new Date(today.getFullYear() - 1, 0, 1);
      const end = new Date(today.getFullYear() - 1, 11, 31);
      return [start, end];
    },
  },
];

const DashboardTab = ({
  customers,
  groups,
  schedules,
  recentActivity,
  terminology,
  billingCycles,
  pricingPlans,
}: DashboardTabProps) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1),
    new Date(),
  ]);

  const filteredSchedules = useMemo(() => {
    const [from, to] = dateRange;
    if (!from || !to) return schedules;
    return schedules.map(s => ({
      ...s,
      installments: s.installments.filter(inst => {
        const d = new Date(inst.dueDate);
        return d >= from && d <= to;
      }),
    }));
  }, [schedules, dateRange]);

  const filteredActivity = useMemo(() => {
    const [from, to] = dateRange;
    if (!from || !to) return recentActivity;
    return recentActivity.filter(a => {
      const d = new Date(a.timestamp);
      return d >= from && d <= to;
    });
  }, [recentActivity, dateRange]);

  const stats = useMemo(() => computeCollectionStats(customers), [customers]);

  const groupSummaries = useMemo(
    () => computeGroupSummaries(customers, groups),
    [customers, groups],
  );

  const totals = useMemo(
    () => ({
      customerCount: groupSummaries.reduce((sum, g) => sum + g.customerCount, 0),
      expected: groupSummaries.reduce((sum, g) => sum + g.expected, 0),
      collected: groupSummaries.reduce((sum, g) => sum + g.collected, 0),
      overdue: groupSummaries.reduce((sum, g) => sum + g.overdue, 0),
    }),
    [groupSummaries],
  );

  const totalCollectionRate = totals.expected > 0 ? (totals.collected / totals.expected) * 100 : 0;

  const activeBillingCycle = useMemo(
    () => billingCycles.find((bc) => bc.status === 'active') ?? null,
    [billingCycles],
  );

  const activeCyclePlanName = useMemo(() => {
    if (!activeBillingCycle) return '';
    const plan = pricingPlans.find((p) => p.id === activeBillingCycle.pricingPlanId);
    return plan ? plan.name : activeBillingCycle.pricingPlanId;
  }, [activeBillingCycle, pricingPlans]);

  const activeCycleCollectionRate = useMemo(() => {
    if (!activeBillingCycle || activeBillingCycle.totalExpected === 0) return 0;
    return (activeBillingCycle.totalCollected / activeBillingCycle.totalExpected) * 100;
  }, [activeBillingCycle]);

  const upcomingDues = useMemo(() => {
    const dues: { customerName: string; label: string; amount: number; dueDate: string }[] = [];
    for (const schedule of filteredSchedules) {
      for (const installment of schedule.installments) {
        if (installment.status === 'upcoming') {
          const customer = customers.find(c => c.id === schedule.customerId);
          dues.push({
            customerName: customer?.name ?? 'Unknown',
            label: installment.label,
            amount: installment.amount,
            dueDate: installment.dueDate,
          });
        }
      }
    }
    return dues.slice(0, 5);
  }, [filteredSchedules, customers]);

  const recentItems = useMemo(() => filteredActivity.slice(0, 8), [filteredActivity]);

  return (
    <Box display="flex" flexDirection="column" gap="spacing.7">
      {/* Date Range Selector */}
      <Box
        display="flex"
        flexDirection={{ base: 'column', m: 'row' }}
        alignItems={{ base: 'stretch', m: 'flex-end' }}
        justifyContent="space-between"
        gap="spacing.4"
      >
        <DatePicker
          selectionType="range"
          label={{ start: 'From Date', end: 'To Date' }}
          value={dateRange}
          onChange={(dates) => setDateRange(dates as [Date | null, Date | null])}
          presets={DATE_PRESETS}
          size="small"
        />
      </Box>

      {/* Stats Row */}
      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr 1fr', m: '1fr 1fr 1fr 1fr' }}
        gap="spacing.5"
      >
        <Card elevation="lowRaised" padding="spacing.7">
          <CardBody>
            <Text size="small" color="surface.text.gray.muted" weight="medium">
              Total Expected
            </Text>
            <Box marginTop="spacing.3">
              <Amount
                value={stats.totalExpected}
                currency="INR"
                size="large"
                type="heading"
                suffix="humanize"
              />
            </Box>
          </CardBody>
        </Card>

        <Card elevation="lowRaised" padding="spacing.7">
          <CardBody>
            <Text size="small" color="surface.text.gray.muted" weight="medium">
              Total Collected
            </Text>
            <Box marginTop="spacing.3">
              <Amount
                value={stats.totalCollected}
                currency="INR"
                size="large"
                type="heading"
                suffix="humanize"
                color="feedback.text.positive.intense"
              />
            </Box>
          </CardBody>
        </Card>

        <Card elevation="lowRaised" padding="spacing.7">
          <CardBody>
            <Text size="small" color="surface.text.gray.muted" weight="medium">
              Total Overdue
            </Text>
            <Box marginTop="spacing.3">
              <Amount
                value={stats.totalOverdue}
                currency="INR"
                size="large"
                type="heading"
                suffix="humanize"
                color="feedback.text.negative.intense"
              />
            </Box>
          </CardBody>
        </Card>

        <Card elevation="lowRaised" padding="spacing.7">
          <CardBody>
            <Text size="small" color="surface.text.gray.muted" weight="medium">
              Collection Rate
            </Text>
            <Box marginTop="spacing.3">
              <Heading size="large">{stats.collectionRate.toFixed(1)}%</Heading>
            </Box>
          </CardBody>
        </Card>
      </Box>

      {/* Active Billing Cycle */}
      {activeBillingCycle && (
        <Card elevation="lowRaised">
          <CardBody>
            <Box marginBottom="spacing.5">
              <Box display="flex" alignItems="center" gap="spacing.3">
                <Heading size="medium">Active Billing Cycle</Heading>
                <Badge
                  size="small"
                  color={BILLING_CYCLE_STATUS_BADGE[activeBillingCycle.status].color}
                  emphasis="subtle"
                >
                  {BILLING_CYCLE_STATUS_BADGE[activeBillingCycle.status].label}
                </Badge>
              </Box>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns={{ base: '1fr', m: '1fr 1fr 1fr 1fr' }}
              gap="spacing.5"
            >
              <Box display="flex" flexDirection="column" gap="spacing.1">
                <Text size="small" color="surface.text.gray.muted">Cycle Name</Text>
                <Text size="medium" weight="medium">{activeBillingCycle.name}</Text>
              </Box>
              <Box display="flex" flexDirection="column" gap="spacing.1">
                <Text size="small" color="surface.text.gray.muted">Pricing Plan</Text>
                <Text size="medium" weight="medium">{activeCyclePlanName}</Text>
              </Box>
              <Box display="flex" flexDirection="column" gap="spacing.1">
                <Text size="small" color="surface.text.gray.muted">Due Date</Text>
                <Text size="medium" weight="medium">{activeBillingCycle.dueDate}</Text>
              </Box>
              <Box display="flex" flexDirection="column" gap="spacing.1">
                <Text size="small" color="surface.text.gray.muted">Links Sent</Text>
                <Text size="medium" weight="medium">
                  {activeBillingCycle.linksSent} / {activeBillingCycle.linksGenerated}
                </Text>
              </Box>
            </Box>
            <Divider marginY="spacing.4" />
            <Box
              display="grid"
              gridTemplateColumns={{ base: '1fr 1fr', m: '1fr 1fr 1fr' }}
              gap="spacing.5"
            >
              <Box display="flex" flexDirection="column" gap="spacing.1">
                <Text size="small" color="surface.text.gray.muted">Expected</Text>
                <Amount
                  value={activeBillingCycle.totalExpected}
                  currency="INR"
                  size="medium"
                  type="body"
                  weight="semibold"
                />
              </Box>
              <Box display="flex" flexDirection="column" gap="spacing.1">
                <Text size="small" color="surface.text.gray.muted">Collected</Text>
                <Amount
                  value={activeBillingCycle.totalCollected}
                  currency="INR"
                  size="medium"
                  type="body"
                  weight="semibold"
                  color="feedback.text.positive.intense"
                />
              </Box>
              <Box display="flex" flexDirection="column" gap="spacing.1">
                <Text size="small" color="surface.text.gray.muted">Collection Progress</Text>
                <Text
                  size="medium"
                  weight="semibold"
                  color={
                    activeCycleCollectionRate > 90
                      ? 'feedback.text.positive.intense'
                      : activeCycleCollectionRate > 50
                        ? 'feedback.text.notice.intense'
                        : 'feedback.text.negative.intense'
                  }
                >
                  {activeCycleCollectionRate.toFixed(1)}%
                </Text>
              </Box>
            </Box>
          </CardBody>
        </Card>
      )}

      {/* Group-wise Collection Table */}
      <Card elevation="lowRaised">
        <CardBody>
          <Box marginBottom="spacing.5">
            <Heading size="medium">{terminology.groupPlural}-wise Collection</Heading>
          </Box>
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
                    const rate = row.collectionRate as number;
                    return (
                      <TableRow key={row.id} item={row}>
                        <TableCell>
                          <Text size="medium" weight="medium">
                            {row.groupName as string}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text size="medium">{row.customerCount as number}</Text>
                        </TableCell>
                        <TableCell>
                          <Amount
                            value={row.expected as number}
                            currency="INR"
                            size="small"
                            type="body"
                          />
                        </TableCell>
                        <TableCell>
                          <Amount
                            value={row.collected as number}
                            currency="INR"
                            size="small"
                            type="body"
                          />
                        </TableCell>
                        <TableCell>
                          <Amount
                            value={row.overdue as number}
                            currency="INR"
                            size="small"
                            type="body"
                          />
                        </TableCell>
                        <TableCell>
                          <Text
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
                      <Text size="medium" weight="semibold">
                        Total
                      </Text>
                    </TableFooterCell>
                    <TableFooterCell>
                      <Text size="medium" weight="semibold">
                        {totals.customerCount}
                      </Text>
                    </TableFooterCell>
                    <TableFooterCell>
                      <Amount
                        value={totals.expected}
                        currency="INR"
                        size="small"
                        type="body"
                      />
                    </TableFooterCell>
                    <TableFooterCell>
                      <Amount
                        value={totals.collected}
                        currency="INR"
                        size="small"
                        type="body"
                      />
                    </TableFooterCell>
                    <TableFooterCell>
                      <Amount
                        value={totals.overdue}
                        currency="INR"
                        size="small"
                        type="body"
                      />
                    </TableFooterCell>
                    <TableFooterCell>
                      <Text
                        weight="semibold"
                        color={
                          totalCollectionRate > 90
                            ? 'feedback.text.positive.intense'
                            : totalCollectionRate > 70
                              ? 'feedback.text.notice.intense'
                              : 'feedback.text.negative.intense'
                        }
                      >
                        {totalCollectionRate.toFixed(1)}%
                      </Text>
                    </TableFooterCell>
                  </TableFooterRow>
                </TableFooter>
              </>
            )}
          </Table>
        </CardBody>
      </Card>

      {/* Two-column layout: Upcoming Dues + Recent Activity */}
      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr', m: '1fr 1fr' }}
        gap="spacing.5"
      >
        {/* Upcoming Dues */}
        <Card elevation="lowRaised">
          <CardBody>
            <Box marginBottom="spacing.5">
              <Heading size="medium">Upcoming Dues</Heading>
            </Box>
            {upcomingDues.length === 0 ? (
              <Text color="surface.text.gray.muted">No upcoming dues</Text>
            ) : (
              <Box display="flex" flexDirection="column">
                {upcomingDues.map((due, index) => (
                  <Box key={`${due.customerName}-${due.dueDate}-${index}`}>
                    {index > 0 && <Divider />}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      paddingY="spacing.4"
                    >
                      <Box display="flex" flexDirection="column" gap="spacing.1">
                        <Text size="medium" weight="medium">
                          {due.customerName}
                        </Text>
                        <Text size="small" color="surface.text.gray.muted">
                          {due.label}
                        </Text>
                      </Box>
                      <Box display="flex" flexDirection="column" alignItems="flex-end" gap="spacing.1">
                        <Amount
                          value={due.amount}
                          currency="INR"
                          size="small"
                          type="body"
                        />
                        <Text size="small" color="surface.text.gray.muted">
                          {due.dueDate}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </CardBody>
        </Card>

        {/* Recent Activity */}
        <Card elevation="lowRaised">
          <CardBody>
            <Box marginBottom="spacing.5">
              <Heading size="medium">Recent Activity</Heading>
            </Box>
            <Box display="flex" flexDirection="column">
              {recentItems.map((item, index) => {
                const badgeConfig = ACTIVITY_BADGE_CONFIG[item.type];
                return (
                  <Box key={item.id}>
                    {index > 0 && <Divider />}
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap="spacing.2"
                      paddingY="spacing.4"
                    >
                      <Box display="flex" alignItems="center" gap="spacing.3">
                        <Badge size="small" color={badgeConfig.color} emphasis="subtle">
                          {badgeConfig.label}
                        </Badge>
                      </Box>
                      <Text size="small">{item.description}</Text>
                      <Text size="xsmall" color="surface.text.gray.muted">
                        {item.timestamp}
                      </Text>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
};

export default DashboardTab;
