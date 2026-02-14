import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  Badge,
  Button,
  Amount,
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
  DownloadIcon,
  FilterIcon,
} from '@razorpay/blade/components';

const transactions = [
  { id: 'pay_PQ1x2y3z4w5v', amount: 24999, status: 'captured', method: 'UPI', email: 'priya.sharma@gmail.com', date: '13 Feb 2026, 2:34 PM' },
  { id: 'pay_NM9a8b7c6d5e', amount: 149900, status: 'captured', method: 'Card', email: 'amit.kumar@outlook.com', date: '13 Feb 2026, 1:12 PM' },
  { id: 'pay_KL4f3g2h1i0j', amount: 5000, status: 'refunded', method: 'Netbanking', email: 'neha.patel@yahoo.com', date: '13 Feb 2026, 12:45 PM' },
  { id: 'pay_JH8k7l6m5n4o', amount: 75000, status: 'captured', method: 'UPI', email: 'rajesh.verma@gmail.com', date: '13 Feb 2026, 11:20 AM' },
  { id: 'pay_GF2p1q0r9s8t', amount: 32500, status: 'failed', method: 'Card', email: 'sneha.iyer@gmail.com', date: '13 Feb 2026, 10:05 AM' },
  { id: 'pay_ED6u5v4w3x2y', amount: 199900, status: 'captured', method: 'UPI', email: 'vikram.reddy@gmail.com', date: '12 Feb 2026, 6:30 PM' },
  { id: 'pay_CB0z9a8b7c6d', amount: 8500, status: 'captured', method: 'Wallet', email: 'meera.nair@gmail.com', date: '12 Feb 2026, 5:15 PM' },
  { id: 'pay_AZ4e3f2g1h0i', amount: 45000, status: 'captured', method: 'Netbanking', email: 'suresh.menon@yahoo.com', date: '12 Feb 2026, 4:00 PM' },
  { id: 'pay_YX8j7k6l5m4n', amount: 12000, status: 'failed', method: 'Card', email: 'arun.krishna@outlook.com', date: '12 Feb 2026, 3:22 PM' },
  { id: 'pay_WV2o1p0q9r8s', amount: 350000, status: 'captured', method: 'UPI', email: 'deepa.joshi@gmail.com', date: '12 Feb 2026, 2:10 PM' },
];

const statusBadgeMap: Record<string, { color: 'positive' | 'negative' | 'notice'; label: string }> = {
  captured: { color: 'positive', label: 'Captured' },
  refunded: { color: 'notice', label: 'Refunded' },
  failed: { color: 'negative', label: 'Failed' },
};

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(
    (t) =>
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Box padding={{ base: 'spacing.5', m: 'spacing.8' }}>
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
            Transactions
          </Heading>
          <Text size="medium" color="surface.text.gray.muted" marginTop="spacing.2">
            View and manage all payment transactions
          </Text>
        </Box>
        <Box display="flex" gap="spacing.3">
          <Button variant="secondary" icon={FilterIcon} iconPosition="left" size="medium">
            Filters
          </Button>
          <Button variant="secondary" icon={DownloadIcon} iconPosition="left" size="medium">
            Export
          </Button>
        </Box>
      </Box>

      <Card elevation="lowRaised">
        <CardBody>
          <Box marginBottom="spacing.5">
            <SearchInput
              placeholder="Search by payment ID or email"
              accessibilityLabel="Search transactions"
              onChange={({ value }) => setSearchTerm(value ?? '')}
            />
          </Box>

          <Table
            data={{
              nodes: filteredTransactions,
            }}
          >
            {(tableData) => (
              <>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHeaderCell>Payment ID</TableHeaderCell>
                    <TableHeaderCell>Amount</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Method</TableHeaderCell>
                    <TableHeaderCell>Email</TableHeaderCell>
                    <TableHeaderCell>Date</TableHeaderCell>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.id} item={row}>
                      <TableCell>
                        <Text size="medium" color="interactive.text.primary.normal">
                          {row.id}
                        </Text>
                      </TableCell>
                      <TableCell>
                        <Amount value={row.amount} currency="INR" size="small" type="body" />
                      </TableCell>
                      <TableCell>
                        <Badge
                          size="small"
                          color={statusBadgeMap[row.status].color}
                          emphasis="subtle"
                        >
                          {statusBadgeMap[row.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Text size="medium">{row.method}</Text>
                      </TableCell>
                      <TableCell>
                        <Text size="medium" color="surface.text.gray.muted">
                          {row.email}
                        </Text>
                      </TableCell>
                      <TableCell>
                        <Text size="small" color="surface.text.gray.muted">
                          {row.date}
                        </Text>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableFooterRow>
                    <TableFooterCell>Total: {filteredTransactions.length} transactions</TableFooterCell>
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
        </CardBody>
      </Card>
    </Box>
  );
};

export default Transactions;
