import React from 'react';
import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  CardHeader,
  CardHeaderLeading,
  CardHeaderTrailing,
  Amount,
  Badge,
  Button,
  Divider,
  Counter,
  ArrowUpRightIcon,
  DownloadIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  InfoIcon,
  Tooltip,
  Link,
} from '@razorpay/blade/components';

const MetricCard = ({
  title,
  amount,
  change,
  changeType,
}: {
  title: string;
  amount: number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}) => (
  <Card elevation="lowRaised" padding="spacing.7">
    <CardBody>
      <Box display="flex" flexDirection="column" gap="spacing.4">
        <Box display="flex" alignItems="center" gap="spacing.2">
          <Text size="small" color="surface.text.gray.muted" weight="medium">
            {title}
          </Text>
          <Tooltip content={`${title} for the selected period`}>
            <InfoIcon size="small" color="interactive.icon.gray.muted" />
          </Tooltip>
        </Box>
        <Amount value={amount} currency="INR" size="large" type="heading" suffix="humanize" />
        <Box display="flex" alignItems="center" gap="spacing.2">
          {changeType === 'positive' ? (
            <TrendingUpIcon size="small" color="interactive.icon.positive.normal" />
          ) : changeType === 'negative' ? (
            <TrendingDownIcon size="small" color="interactive.icon.negative.normal" />
          ) : null}
          <Text
            size="xsmall"
            color={
              changeType === 'positive'
                ? 'feedback.text.positive.intense'
                : changeType === 'negative'
                ? 'feedback.text.negative.intense'
                : 'surface.text.gray.muted'
            }
          >
            {change}
          </Text>
          <Text size="xsmall" color="surface.text.gray.muted">
            vs last period
          </Text>
        </Box>
      </Box>
    </CardBody>
  </Card>
);

const recentPayments = [
  {
    id: 'pay_PQ1x2y3z4w5v',
    amount: 24999,
    status: 'captured',
    method: 'UPI',
    email: 'priya.sharma@gmail.com',
    date: 'Today, 2:34 PM',
  },
  {
    id: 'pay_NM9a8b7c6d5e',
    amount: 149900,
    status: 'captured',
    method: 'Card',
    email: 'amit.kumar@outlook.com',
    date: 'Today, 1:12 PM',
  },
  {
    id: 'pay_KL4f3g2h1i0j',
    amount: 5000,
    status: 'refunded',
    method: 'Netbanking',
    email: 'neha.patel@yahoo.com',
    date: 'Today, 12:45 PM',
  },
  {
    id: 'pay_JH8k7l6m5n4o',
    amount: 75000,
    status: 'captured',
    method: 'UPI',
    email: 'rajesh.verma@gmail.com',
    date: 'Today, 11:20 AM',
  },
  {
    id: 'pay_GF2p1q0r9s8t',
    amount: 32500,
    status: 'failed',
    method: 'Card',
    email: 'sneha.iyer@gmail.com',
    date: 'Today, 10:05 AM',
  },
];

const statusBadgeMap: Record<string, { color: 'positive' | 'negative' | 'notice'; label: string }> = {
  captured: { color: 'positive', label: 'Captured' },
  refunded: { color: 'notice', label: 'Refunded' },
  failed: { color: 'negative', label: 'Failed' },
};

const pendingActions = [
  { label: 'KYC verification pending', count: 1 },
  { label: 'Settlement on hold', count: 2 },
  { label: 'Disputes to respond', count: 3 },
];

const Home = () => {
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
            Welcome back, Manish
          </Heading>
          <Text size="medium" color="surface.text.gray.muted" marginTop="spacing.2">
            Here's what's happening with your payments today.
          </Text>
        </Box>
        <Box display="flex" gap="spacing.3">
          <Button variant="secondary" icon={DownloadIcon} iconPosition="left" size="medium">
            Download Report
          </Button>
          <Button variant="primary" icon={ArrowUpRightIcon} iconPosition="left" size="medium">
            Create Payment Link
          </Button>
        </Box>
      </Box>

      {/* Pending Actions */}
      {pendingActions.length > 0 && (
        <Box marginBottom="spacing.7">
          <Card elevation="lowRaised" padding="spacing.5">
            <CardBody>
              <Box display="flex" flexDirection={{ base: 'column', m: 'row' }} gap="spacing.4" alignItems={{ base: 'flex-start', m: 'center' }}>
                <Text size="medium" weight="semibold" color="feedback.text.notice.intense">
                  Action Required
                </Text>
                <Box display="flex" gap="spacing.4" flexWrap="wrap">
                  {pendingActions.map((action, index) => (
                    <Box key={index} display="flex" alignItems="center" gap="spacing.2">
                      <Counter value={action.count} color="notice" emphasis="intense" size="small" />
                      <Link href="#" size="small">
                        {action.label}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardBody>
          </Card>
        </Box>
      )}

      {/* Metrics Grid */}
      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr', m: '1fr 1fr', l: '1fr 1fr 1fr 1fr' }}
        gap="spacing.5"
        marginBottom="spacing.7"
      >
        <MetricCard
          title="Total Revenue"
          amount={843567200}
          change="+12.5%"
          changeType="positive"
        />
        <MetricCard
          title="Successful Payments"
          amount={798234500}
          change="+8.3%"
          changeType="positive"
        />
        <MetricCard
          title="Total Refunds"
          amount={4523400}
          change="-2.1%"
          changeType="positive"
        />
        <MetricCard
          title="Active Disputes"
          amount={234500}
          change="+5.2%"
          changeType="negative"
        />
      </Box>

      {/* Two Column Layout */}
      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr', l: '2fr 1fr' }}
        gap="spacing.5"
      >
        {/* Recent Payments */}
        <Card elevation="lowRaised">
          <CardHeader>
            <CardHeaderLeading
              title="Recent Payments"
              subtitle="Last 5 transactions"
            />
            <CardHeaderTrailing
              visual={
                <Button variant="tertiary" size="small">
                  View All
                </Button>
              }
            />
          </CardHeader>
          <CardBody>
            <Box display="flex" flexDirection="column">
              {recentPayments.map((payment, index) => (
                <React.Fragment key={payment.id}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    padding="spacing.4"
                  >
                    <Box display="flex" flexDirection="column" gap="spacing.2" flex="1">
                      <Box display="flex" alignItems="center" gap="spacing.3">
                        <Text size="medium" weight="semibold" color="surface.text.gray.subtle">
                          {payment.id}
                        </Text>
                        <Badge
                          size="small"
                          color={statusBadgeMap[payment.status].color}
                          emphasis="subtle"
                        >
                          {statusBadgeMap[payment.status].label}
                        </Badge>
                      </Box>
                      <Box display="flex" alignItems="center" gap="spacing.3">
                        <Text size="xsmall" color="surface.text.gray.muted">
                          {payment.email}
                        </Text>
                        <Text size="xsmall" color="surface.text.gray.disabled">
                          •
                        </Text>
                        <Text size="xsmall" color="surface.text.gray.muted">
                          {payment.method}
                        </Text>
                        <Text size="xsmall" color="surface.text.gray.disabled">
                          •
                        </Text>
                        <Text size="xsmall" color="surface.text.gray.muted">
                          {payment.date}
                        </Text>
                      </Box>
                    </Box>
                    <Amount
                      value={payment.amount}
                      currency="INR"
                      size="medium"
                      type="body"
                    />
                  </Box>
                  {index < recentPayments.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </Box>
          </CardBody>
        </Card>

        {/* Right Column */}
        <Box display="flex" flexDirection="column" gap="spacing.5">
          {/* Settlement Summary */}
          <Card elevation="lowRaised">
            <CardHeader>
              <CardHeaderLeading
                title="Next Settlement"
                subtitle="Estimated for tomorrow"
              />
            </CardHeader>
            <CardBody>
              <Box display="flex" flexDirection="column" gap="spacing.5">
                <Amount
                  value={1256780}
                  currency="INR"
                  size="xlarge"
                  type="heading"
                />
                <Divider />
                <Box display="flex" justifyContent="space-between">
                  <Text size="small" color="surface.text.gray.muted">
                    Payments Captured
                  </Text>
                  <Amount value={1356780} currency="INR" size="small" type="body" />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Text size="small" color="surface.text.gray.muted">
                    Refunds
                  </Text>
                  <Amount value={45000} currency="INR" size="small" type="body" color="feedback.text.negative.intense" />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Text size="small" color="surface.text.gray.muted">
                    Fees + Tax
                  </Text>
                  <Amount value={55000} currency="INR" size="small" type="body" color="feedback.text.negative.intense" />
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Text size="medium" weight="semibold">
                    Net Settlement
                  </Text>
                  <Amount
                    value={1256780}
                    currency="INR"
                    size="medium"
                    type="body"
                    weight="semibold"
                  />
                </Box>
              </Box>
            </CardBody>
          </Card>

          {/* Payment Method Split */}
          <Card elevation="lowRaised">
            <CardHeader>
              <CardHeaderLeading
                title="Payment Methods"
                subtitle="Today's distribution"
              />
            </CardHeader>
            <CardBody>
              <Box display="flex" flexDirection="column" gap="spacing.4">
                {[
                  { method: 'UPI', share: '62%', amount: 5234560, color: 'information' as const },
                  { method: 'Cards', share: '24%', amount: 2024350, color: 'positive' as const },
                  { method: 'Netbanking', share: '9%', amount: 758400, color: 'notice' as const },
                  { method: 'Wallets', share: '5%', amount: 421300, color: 'neutral' as const },
                ].map((item, index) => (
                  <React.Fragment key={item.method}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box display="flex" alignItems="center" gap="spacing.3">
                        <Badge size="small" color={item.color} emphasis="subtle">
                          {item.share}
                        </Badge>
                        <Text size="small" weight="medium">
                          {item.method}
                        </Text>
                      </Box>
                      <Amount value={item.amount} currency="INR" size="small" type="body" />
                    </Box>
                    {index < 3 && <Divider />}
                  </React.Fragment>
                ))}
              </Box>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
