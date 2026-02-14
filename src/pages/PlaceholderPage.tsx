import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
} from '@razorpay/blade/components';

const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <Box padding={{ base: 'spacing.5', m: 'spacing.8' }}>
      <Heading size="large" weight="semibold" marginBottom="spacing.7">
        {title}
      </Heading>
      <Card elevation="lowRaised">
        <CardBody>
          <Box padding="spacing.10" textAlign="center">
            <Heading size="medium" color="surface.text.gray.muted" marginBottom="spacing.4">
              {title}
            </Heading>
            <Text color="surface.text.gray.muted">
              This section is under development. Navigate to Home, Transactions, or Payment Links to see the full dashboard experience.
            </Text>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default PlaceholderPage;
