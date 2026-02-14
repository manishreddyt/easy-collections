import { useReducer } from 'react';
import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabItem,
  TabPanel,
} from '@razorpay/blade/components';
import {
  easyCollectionsReducer,
  INITIAL_STATE,
  MOCK_CUSTOMERS,
  MOCK_GROUPS,
  MOCK_COMPONENTS,
  MOCK_STRUCTURES,
  MOCK_DISCOUNTS,
  MOCK_PRICING_PLANS,
  MOCK_BILLING_CYCLES,
  MOCK_SCHEDULES,
  MOCK_ACTIVITY,
  EDUCATION_TERMINOLOGY,
} from './easy-collections/data';
import SetupPage from './easy-collections/SetupPage';
import DashboardTab from './easy-collections/DashboardTab';
import CollectionsTab from './easy-collections/CollectionsTab';
import BillingTab from './easy-collections/BillingTab';
import ReportsTab from './easy-collections/ReportsTab';

const EasyCollections = () => {
  const [state, dispatch] = useReducer(easyCollectionsReducer, INITIAL_STATE);

  const handleSetupComplete = () => {
    dispatch({
      type: 'SETUP_COMPLETE',
      payload: {
        template: 'education',
        businessProfile: {
          name: 'Sunrise International School',
          industry: 'education',
          logo: '',
          gstin: '29ABCDE1234F1Z5',
          address: '42, MG Road, Koramangala, Bengaluru 560034',
          communicationChannels: ['whatsapp', 'email'],
        },
        terminology: EDUCATION_TERMINOLOGY,
        components: MOCK_COMPONENTS,
        discounts: MOCK_DISCOUNTS,
        groups: MOCK_GROUPS,
        structures: MOCK_STRUCTURES,
        customers: MOCK_CUSTOMERS,
        pricingPlans: MOCK_PRICING_PLANS,
        billingCycles: MOCK_BILLING_CYCLES,
        schedules: MOCK_SCHEDULES,
        recentActivity: MOCK_ACTIVITY,
      },
    });
  };

  if (!state.isSetUp) {
    return <SetupPage onSetupComplete={handleSetupComplete} />;
  }

  const terminology = state.terminology!;

  return (
    <Box padding={{ base: 'spacing.5', m: 'spacing.8' }}>
      <Box marginBottom="spacing.7">
        <Heading size="large" weight="semibold">
          Easy Collections
        </Heading>
        <Text size="medium" color="surface.text.gray.muted" marginTop="spacing.2">
          {state.businessProfile?.name}
        </Text>
      </Box>

      <Tabs>
        <TabList>
          <TabItem value="dashboard">Dashboard</TabItem>
          <TabItem value="collections">Collections</TabItem>
          <TabItem value="billing">Billing</TabItem>
          <TabItem value="reports">Reports</TabItem>
        </TabList>

        <TabPanel value="dashboard">
          <DashboardTab
            customers={state.customers}
            groups={state.groups}
            components={state.components}
            structures={state.structures}
            schedules={state.schedules}
            recentActivity={state.recentActivity}
            terminology={terminology}
            billingCycles={state.billingCycles}
            pricingPlans={state.pricingPlans}
          />
        </TabPanel>

        <TabPanel value="collections">
          <CollectionsTab
            customers={state.customers}
            groups={state.groups}
            terminology={terminology}
          />
        </TabPanel>

        <TabPanel value="billing">
          <BillingTab
            components={state.components}
            structures={state.structures}
            discounts={state.discounts}
            groups={state.groups}
            terminology={terminology}
            dispatch={dispatch}
            pricingPlans={state.pricingPlans}
            billingCycles={state.billingCycles}
          />
        </TabPanel>

        <TabPanel value="reports">
          <ReportsTab
            customers={state.customers}
            groups={state.groups}
            components={state.components}
            structures={state.structures}
            schedules={state.schedules}
            terminology={terminology}
          />
        </TabPanel>
      </Tabs>
    </Box>
  );
};

export default EasyCollections;
