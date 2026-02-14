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
  Tabs,
  TabList,
  TabItem,
  TabPanel,
  CopyIcon,
  ShareIcon,
} from '@razorpay/blade/components';
import type { PaymentLink, PaymentLinkStatus } from './types';
import { STATUS_BADGE_MAP, getConversionRate } from './data';

interface PaymentLinkDetailDrawerProps {
  isOpen: boolean;
  onDismiss: () => void;
  link: PaymentLink | null;
  onToggleStatus: (id: string, newStatus: PaymentLinkStatus) => void;
  onCopyLink: (shortUrl: string) => void;
}

const KeyValueRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Box display="flex" gap="spacing.4" paddingY="spacing.3">
    <Box width="160px" flexShrink="0">
      <Text size="small" color="surface.text.gray.muted">{label}</Text>
    </Box>
    <Box flex="1">{children}</Box>
  </Box>
);

const PaymentLinkDetailDrawer = ({
  isOpen,
  onDismiss,
  link,
  onToggleStatus,
  onCopyLink,
}: PaymentLinkDetailDrawerProps) => {
  if (!link) return null;

  const badgeConfig = STATUS_BADGE_MAP[link.status];
  const conversionRate = getConversionRate(link.paid, link.views);

  const handleToggle = () => {
    const newStatus: PaymentLinkStatus = link.status === 'active' ? 'deactivated' : 'active';
    onToggleStatus(link.id, newStatus);
  };

  return (
    <Drawer isOpen={isOpen} onDismiss={onDismiss}>
      <DrawerHeader
        title={link.title}
        titleSuffix={
          <Badge size="small" color={badgeConfig.color} emphasis="subtle">
            {badgeConfig.label}
          </Badge>
        }
      />
      <DrawerBody>
        <Box display="flex" flexDirection="column" gap="spacing.6">
          {/* Amount Display */}
          <Box textAlign="center" paddingY="spacing.4">
            <Amount value={link.amount} currency="INR" size="2xlarge" type="heading" />
            <Box display="flex" justifyContent="center" gap="spacing.3" marginTop="spacing.3">
              <Text size="small" color="interactive.text.primary.normal">{link.shortUrl}</Text>
              <Text size="small" color="surface.text.gray.muted">Created {link.created}</Text>
            </Box>
          </Box>

          <Divider />

          {/* Tabs */}
          <Tabs defaultValue="details">
            <TabList>
              <TabItem value="details">Details</TabItem>
              <TabItem value="analytics">Analytics</TabItem>
              <TabItem value="settings">Settings</TabItem>
            </TabList>

            {/* Details Tab */}
            <TabPanel value="details">
              <Box paddingTop="spacing.5">
                <KeyValueRow label="Description">
                  <Text size="small">{link.description || '—'}</Text>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label="Amount">
                  <Amount value={link.amount} currency="INR" size="small" type="body" />
                </KeyValueRow>
                <Divider />
                <KeyValueRow label="Status">
                  <Badge size="small" color={badgeConfig.color} emphasis="subtle">
                    {badgeConfig.label}
                  </Badge>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label="Created">
                  <Text size="small">{link.created}</Text>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label="Expiry Date">
                  <Text size="small">
                    {link.expiryDate
                      ? new Date(link.expiryDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'No expiry'}
                  </Text>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label="Partial Payments">
                  <Badge
                    size="small"
                    color={link.partialPayments ? 'positive' : 'neutral'}
                    emphasis="subtle"
                  >
                    {link.partialPayments ? 'Enabled' : 'Disabled'}
                  </Badge>
                </KeyValueRow>
                <Divider />
                <KeyValueRow label="Short URL">
                  <Text size="small" color="interactive.text.primary.normal">{link.shortUrl}</Text>
                </KeyValueRow>

                {(link.customer.name || link.customer.email || link.customer.phone) && (
                  <>
                    <Divider />
                    <Box paddingTop="spacing.4">
                      <Heading size="small" marginBottom="spacing.3">Customer Details</Heading>
                      {link.customer.name && (
                        <KeyValueRow label="Name">
                          <Text size="small">{link.customer.name}</Text>
                        </KeyValueRow>
                      )}
                      {link.customer.email && (
                        <>
                          <Divider />
                          <KeyValueRow label="Email">
                            <Text size="small">{link.customer.email}</Text>
                          </KeyValueRow>
                        </>
                      )}
                      {link.customer.phone && (
                        <>
                          <Divider />
                          <KeyValueRow label="Phone">
                            <Text size="small">{link.customer.phone}</Text>
                          </KeyValueRow>
                        </>
                      )}
                    </Box>
                  </>
                )}

                {link.notes && (
                  <>
                    <Divider />
                    <KeyValueRow label="Notes">
                      <Text size="small">{link.notes}</Text>
                    </KeyValueRow>
                  </>
                )}
              </Box>
            </TabPanel>

            {/* Analytics Tab */}
            <TabPanel value="analytics">
              <Box paddingTop="spacing.5">
                <Box
                  display="grid"
                  gridTemplateColumns="1fr 1fr 1fr"
                  gap="spacing.4"
                >
                  <Card elevation="lowRaised" padding="spacing.5">
                    <CardBody>
                      <Text size="xsmall" color="surface.text.gray.muted" weight="medium">
                        Total Views
                      </Text>
                      <Heading size="large" marginTop="spacing.2">
                        {link.views.toLocaleString()}
                      </Heading>
                    </CardBody>
                  </Card>
                  <Card elevation="lowRaised" padding="spacing.5">
                    <CardBody>
                      <Text size="xsmall" color="surface.text.gray.muted" weight="medium">
                        Payments
                      </Text>
                      <Heading size="large" marginTop="spacing.2" color="feedback.text.positive.intense">
                        {link.paid.toLocaleString()}
                      </Heading>
                    </CardBody>
                  </Card>
                  <Card elevation="lowRaised" padding="spacing.5">
                    <CardBody>
                      <Text size="xsmall" color="surface.text.gray.muted" weight="medium">
                        Conversion
                      </Text>
                      <Heading size="large" marginTop="spacing.2">
                        {conversionRate}%
                      </Heading>
                    </CardBody>
                  </Card>
                </Box>

                <Divider marginTop="spacing.6" marginBottom="spacing.5" />

                <Heading size="small" marginBottom="spacing.4">Revenue</Heading>
                <Box display="flex" flexDirection="column" gap="spacing.4">
                  <Box display="flex" justifyContent="space-between">
                    <Text size="small" color="surface.text.gray.muted">Total Collected</Text>
                    <Amount
                      value={link.paid * link.amount}
                      currency="INR"
                      size="small"
                      type="body"
                      weight="semibold"
                    />
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="space-between">
                    <Text size="small" color="surface.text.gray.muted">Per Payment</Text>
                    <Amount value={link.amount} currency="INR" size="small" type="body" />
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="space-between">
                    <Text size="small" color="surface.text.gray.muted">Remaining Potential</Text>
                    <Amount
                      value={(link.views - link.paid) * link.amount}
                      currency="INR"
                      size="small"
                      type="body"
                      color="surface.text.gray.muted"
                    />
                  </Box>
                </Box>
              </Box>
            </TabPanel>

            {/* Settings Tab */}
            <TabPanel value="settings">
              <Box paddingTop="spacing.5" textAlign="center" paddingY="spacing.10">
                <Heading size="small" color="surface.text.gray.muted" marginBottom="spacing.3">
                  Settings
                </Heading>
                <Text size="small" color="surface.text.gray.muted">
                  Edit link settings, update expiry, and manage access controls. Coming soon.
                </Text>
              </Box>
            </TabPanel>
          </Tabs>
        </Box>
      </DrawerBody>
      <DrawerFooter>
        <Box display="flex" justifyContent="flex-end" gap="spacing.3" width="100%">
          <Button
            variant="tertiary"
            icon={CopyIcon}
            iconPosition="left"
            onClick={() => onCopyLink(link.shortUrl)}
          >
            Copy Link
          </Button>
          <Button
            variant="secondary"
            onClick={handleToggle}
            color={link.status === 'active' ? 'negative' : 'primary'}
          >
            {link.status === 'active' ? 'Deactivate' : 'Activate'}
          </Button>
          <Button variant="primary" icon={ShareIcon} iconPosition="left">
            Share
          </Button>
        </Box>
      </DrawerFooter>
    </Drawer>
  );
};

export default PaymentLinkDetailDrawer;
