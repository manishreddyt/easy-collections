import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Box,
  Text,
  Heading,
  Amount,
  Badge,
  Button,
  Divider,
  Card,
  CardBody,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  TabList,
  TabItem,
  TabPanel,
  useToast,
} from '@razorpay/blade/components';
import type {
  Customer,
  CustomerGroup,
  PricingPlan,
  PaymentSchedule,
  Installment,
  TemplateTerminology,
  EasyCollectionsAction,
} from './types';
import { CUSTOMER_STATUS_BADGE, INSTALLMENT_STATUS_BADGE } from './data';

interface CustomerDetailDrawerProps {
  isOpen: boolean;
  onDismiss: () => void;
  customer: Customer | null;
  groups: CustomerGroup[];
  pricingPlans: PricingPlan[];
  schedules: PaymentSchedule[];
  terminology: TemplateTerminology;
  dispatch: React.Dispatch<EasyCollectionsAction>;
}

const KeyValueRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Box display="flex" gap="spacing.4" paddingY="spacing.3">
    <Box width="160px" flexShrink="0">
      <Text size="small" color="surface.text.gray.muted">{label}</Text>
    </Box>
    <Box flex="1">{children}</Box>
  </Box>
);

const CustomerDetailDrawer = ({
  isOpen,
  onDismiss,
  customer,
  groups,
  pricingPlans,
  schedules,
  terminology,
  dispatch,
}: CustomerDetailDrawerProps) => {
  const toast = useToast();

  if (!customer) return null;

  const badgeConfig = CUSTOMER_STATUS_BADGE[customer.status];
  const groupName = groups.find(g => g.id === customer.groupId)?.name ?? '—';
  const pricingPlanName = customer.pricingPlanId
    ? (pricingPlans.find(p => p.id === customer.pricingPlanId)?.name ?? '—')
    : '—';
  const schedule = schedules.find(s => s.customerId === customer.id);

  const handlePauseResume = () => {
    const newStatus = customer.status === 'paused' ? 'active' : 'paused';
    dispatch({
      type: 'UPDATE_CUSTOMER',
      payload: { id: customer.id, updates: { status: newStatus } },
    });
    const label = newStatus === 'paused' ? 'paused' : 'resumed';
    toast.show({ content: `${customer.name} ${label} successfully`, color: 'positive' });
  };

  const customFieldEntries = Object.entries(customer.customFields);

  return (
    <Drawer isOpen={isOpen} onDismiss={onDismiss}>
      <DrawerHeader
        title={customer.name}
        titleSuffix={
          <Badge size="small" color={badgeConfig.color} emphasis="subtle">
            {badgeConfig.label}
          </Badge>
        }
      />
      <DrawerBody>
        <Box display="flex" flexDirection="column" gap="spacing.6">
          <Tabs defaultValue="details">
            <TabList>
              <TabItem value="details">Details</TabItem>
              <TabItem value="billing">Billing</TabItem>
              <TabItem value="activity">Activity</TabItem>
            </TabList>

            {/* Details Tab */}
            <TabPanel value="details">
              <Box paddingTop="spacing.5">
                <KeyValueRow label="Name">
                  <Text size="small">{customer.name}</Text>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label={terminology.contact}>
                  <Text size="small">{customer.contactName || '—'}</Text>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label="Email">
                  <Text size="small">{customer.email || '—'}</Text>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label="Phone">
                  <Text size="small">{customer.phone || '—'}</Text>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label={terminology.customerId}>
                  <Text size="small">{customer.customerId}</Text>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label={terminology.group}>
                  <Text size="small">{groupName}</Text>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label="Pricing Plan">
                  <Text size="small">{pricingPlanName}</Text>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label="Enrollment Date">
                  <Text size="small">{customer.enrollmentDate}</Text>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label="Billing Type">
                  <Text size="small">{customer.billingType === 'standard' ? 'Standard' : 'Custom'}</Text>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label="Preferred Channel">
                  <Text size="small">{customer.preferredChannel === 'whatsapp' ? 'WhatsApp' : customer.preferredChannel === 'email' ? 'Email' : 'SMS'}</Text>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label="Notes">
                  <Text size="small">{customer.notes || '—'}</Text>
                </KeyValueRow>

                {customFieldEntries.length > 0 && (
                  <>
                    <Divider />
                    <Box paddingTop="spacing.4">
                      <Heading size="small" marginBottom="spacing.3">Custom Fields</Heading>
                      {customFieldEntries.map(([key, value]) => (
                        <Box key={key}>
                          <KeyValueRow label={key}>
                            <Text size="small">{value}</Text>
                          </KeyValueRow>
                          <Divider />
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </TabPanel>

            {/* Billing Tab */}
            <TabPanel value="billing">
              <Box paddingTop="spacing.5" display="flex" flexDirection="column" gap="spacing.5">
                {/* Stat Cards */}
                <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap="spacing.4">
                  <Card elevation="lowRaised" padding="spacing.5">
                    <CardBody>
                      <Text size="xsmall" color="surface.text.gray.muted" weight="medium">
                        Total Due
                      </Text>
                      <Box marginTop="spacing.2">
                        <Amount value={customer.totalDue} currency="INR" size="large" type="heading" />
                      </Box>
                    </CardBody>
                  </Card>
                  <Card elevation="lowRaised" padding="spacing.5">
                    <CardBody>
                      <Text size="xsmall" color="surface.text.gray.muted" weight="medium">
                        Total Paid
                      </Text>
                      <Box marginTop="spacing.2">
                        <Amount
                          value={customer.totalPaid}
                          currency="INR"
                          size="large"
                          type="heading"
                          color="feedback.text.positive.intense"
                        />
                      </Box>
                    </CardBody>
                  </Card>
                  <Card elevation="lowRaised" padding="spacing.5">
                    <CardBody>
                      <Text size="xsmall" color="surface.text.gray.muted" weight="medium">
                        Total Overdue
                      </Text>
                      <Box marginTop="spacing.2">
                        <Amount
                          value={customer.totalOverdue}
                          currency="INR"
                          size="large"
                          type="heading"
                          color={customer.totalOverdue > 0 ? 'feedback.text.negative.intense' : undefined}
                        />
                      </Box>
                    </CardBody>
                  </Card>
                </Box>

                {/* Payment Schedule Table */}
                {schedule && (
                  <>
                    <Divider />
                    <Heading size="small">Payment Schedule</Heading>
                    <Table data={{ nodes: schedule.installments }}>
                      {(tableData) => (
                        <>
                          <TableHeader>
                            <TableHeaderRow>
                              <TableHeaderCell>Installment</TableHeaderCell>
                              <TableHeaderCell>Amount</TableHeaderCell>
                              <TableHeaderCell>Due Date</TableHeaderCell>
                              <TableHeaderCell>Status</TableHeaderCell>
                              <TableHeaderCell>Paid</TableHeaderCell>
                            </TableHeaderRow>
                          </TableHeader>
                          <TableBody>
                            {tableData.map(row => {
                              const installment = row as unknown as Installment;
                              const instBadge = INSTALLMENT_STATUS_BADGE[installment.status];
                              return (
                                <TableRow key={installment.id} item={row}>
                                  <TableCell>
                                    <Text size="small">{installment.label}</Text>
                                  </TableCell>
                                  <TableCell>
                                    <Amount value={installment.amount} currency="INR" size="small" type="body" />
                                  </TableCell>
                                  <TableCell>
                                    <Text size="small">{installment.dueDate}</Text>
                                  </TableCell>
                                  <TableCell>
                                    <Badge size="small" color={instBadge.color} emphasis="subtle">
                                      {instBadge.label}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Amount value={installment.paidAmount} currency="INR" size="small" type="body" />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </>
                      )}
                    </Table>
                  </>
                )}

                {!schedule && (
                  <Box paddingY="spacing.6" textAlign="center">
                    <Text size="small" color="surface.text.gray.muted">
                      No payment schedule found for this {terminology.customer.toLowerCase()}.
                    </Text>
                  </Box>
                )}
              </Box>
            </TabPanel>

            {/* Activity Tab */}
            <TabPanel value="activity">
              <Box paddingTop="spacing.5" paddingY="spacing.10" textAlign="center">
                <Text size="small" color="surface.text.gray.muted">
                  Activity timeline coming soon
                </Text>
              </Box>
            </TabPanel>
          </Tabs>
        </Box>
      </DrawerBody>
      <DrawerFooter>
        <Box display="flex" justifyContent="flex-end" gap="spacing.3" width="100%">
          <Button
            variant="secondary"
            onClick={handlePauseResume}
            color={customer.status === 'active' ? 'negative' : 'primary'}
          >
            {customer.status === 'paused' ? 'Resume' : 'Pause'}
          </Button>
          <Button variant="secondary">
            Edit
          </Button>
        </Box>
      </DrawerFooter>
    </Drawer>
  );
};

export default CustomerDetailDrawer;
