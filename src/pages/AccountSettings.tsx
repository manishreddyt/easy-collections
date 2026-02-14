import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  Badge,
  Divider,
  Checkbox,
} from '@razorpay/blade/components';

const KeyValueRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Box display="flex" gap="spacing.4" paddingY="spacing.4">
    <Box width="200px" flexShrink="0">
      <Text size="small" color="surface.text.gray.muted" weight="medium">{label}</Text>
    </Box>
    <Box flex="1">{children}</Box>
  </Box>
);

const AccountSettings = () => {
  return (
    <Box padding={{ base: 'spacing.5', m: 'spacing.8' }}>
      <Box marginBottom="spacing.7">
        <Heading size="large" weight="semibold">
          Account & Settings
        </Heading>
        <Text size="medium" color="surface.text.gray.muted" marginTop="spacing.2">
          Manage your business profile, billing details, and communication preferences.
        </Text>
      </Box>

      {/* Business Profile */}
      <Card elevation="lowRaised" marginBottom="spacing.6">
        <CardBody>
          <Box marginBottom="spacing.5">
            <Box display="flex" alignItems="center" gap="spacing.3">
              <Heading size="medium">Business Profile</Heading>
              <Badge size="small" color="positive" emphasis="subtle">Verified</Badge>
            </Box>
          </Box>

          <KeyValueRow label="Business Name">
            <Text size="small">Sunrise International School</Text>
          </KeyValueRow>
          <Divider />
          <KeyValueRow label="Industry">
            <Badge size="small" color="information" emphasis="subtle">Education</Badge>
          </KeyValueRow>
          <Divider />
          <KeyValueRow label="GSTIN">
            <Text size="small">29ABCDE1234F1Z5</Text>
          </KeyValueRow>
          <Divider />
          <KeyValueRow label="Address">
            <Text size="small">42, MG Road, Koramangala, Bengaluru 560034</Text>
          </KeyValueRow>
          <Divider />
          <KeyValueRow label="Merchant ID">
            <Text size="small">MID_sunrise_intl_2024</Text>
          </KeyValueRow>
        </CardBody>
      </Card>

      {/* Contact Details */}
      <Card elevation="lowRaised" marginBottom="spacing.6">
        <CardBody>
          <Box marginBottom="spacing.5">
            <Heading size="medium">Contact Details</Heading>
          </Box>

          <KeyValueRow label="Contact Person">
            <Text size="small">Ramesh Iyer</Text>
          </KeyValueRow>
          <Divider />
          <KeyValueRow label="Email">
            <Text size="small">admin@sunriseinternational.edu.in</Text>
          </KeyValueRow>
          <Divider />
          <KeyValueRow label="Phone">
            <Text size="small">+91 98765 43210</Text>
          </KeyValueRow>
          <Divider />
          <KeyValueRow label="Website">
            <Text size="small">www.sunriseinternational.edu.in</Text>
          </KeyValueRow>
        </CardBody>
      </Card>

      {/* Communication Preferences */}
      <Card elevation="lowRaised" marginBottom="spacing.6">
        <CardBody>
          <Box marginBottom="spacing.5">
            <Heading size="medium">Communication Preferences</Heading>
            <Text size="small" color="surface.text.gray.muted" marginTop="spacing.2">
              Channels used for sending payment links, reminders, and receipts to your customers.
            </Text>
          </Box>

          <Box display="flex" flexDirection="column" gap="spacing.4">
            <Checkbox isChecked={true} onChange={() => {}}>
              WhatsApp
            </Checkbox>
            <Checkbox isChecked={true} onChange={() => {}}>
              Email
            </Checkbox>
            <Checkbox isChecked={false} onChange={() => {}}>
              SMS
            </Checkbox>
          </Box>
        </CardBody>
      </Card>

      {/* Billing & Payments */}
      <Card elevation="lowRaised">
        <CardBody>
          <Box marginBottom="spacing.5">
            <Heading size="medium">Billing & Payments</Heading>
          </Box>

          <KeyValueRow label="Settlement Account">
            <Text size="small">HDFC Bank ****4521</Text>
          </KeyValueRow>
          <Divider />
          <KeyValueRow label="Settlement Cycle">
            <Text size="small">T+2 Days</Text>
          </KeyValueRow>
          <Divider />
          <KeyValueRow label="Pricing Plan">
            <Text size="small">Standard — 2.0% per transaction</Text>
          </KeyValueRow>
          <Divider />
          <KeyValueRow label="Account Status">
            <Badge size="small" color="positive">Active</Badge>
          </KeyValueRow>
        </CardBody>
      </Card>
    </Box>
  );
};

export default AccountSettings;
