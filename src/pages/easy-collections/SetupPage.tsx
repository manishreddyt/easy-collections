import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  Button,
} from '@razorpay/blade/components';

interface SetupPageProps {
  onSetupComplete: () => void;
}

const SetupPage = ({ onSetupComplete }: SetupPageProps) => {
  return (
    <Box padding={{ base: 'spacing.5', m: 'spacing.8' }}>
      <Box marginBottom="spacing.7">
        <Heading size="large" weight="semibold">
          Easy Collections
        </Heading>
        <Text size="medium" color="surface.text.gray.muted" marginTop="spacing.2">
          Manage your entire payment collection lifecycle — who to collect from, how much, when, and what happens after.
        </Text>
      </Box>

      <Card elevation="lowRaised" padding="spacing.7">
        <CardBody>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="spacing.5"
            paddingY="spacing.6"
          >
            <Heading size="medium">Get started with Fee Collections</Heading>
            <Text size="medium" color="surface.text.gray.muted" textAlign="center">
              Set up your billing components, fee structures, customer groups, and payment schedules.
              We'll load a pre-configured Education template to get you started quickly.
            </Text>
            <Box marginTop="spacing.3">
              <Button
                variant="primary"
                size="large"
                onClick={onSetupComplete}
              >
                Set Up Easy Collections
              </Button>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default SetupPage;
