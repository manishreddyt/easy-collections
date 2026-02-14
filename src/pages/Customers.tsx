import { useReducer } from 'react';
import { Box } from '@razorpay/blade/components';
import {
  easyCollectionsReducer,
  INITIAL_STATE,
} from './easy-collections/data';
import CustomersTab from './easy-collections/CustomersTab';

const Customers = () => {
  const [state, dispatch] = useReducer(easyCollectionsReducer, INITIAL_STATE);
  const terminology = state.terminology!;

  return (
    <Box padding={{ base: 'spacing.5', m: 'spacing.8' }}>
      <CustomersTab
        customers={state.customers}
        groups={state.groups}
        schedules={state.schedules}
        terminology={terminology}
        dispatch={dispatch}
        pricingPlans={state.pricingPlans}
      />
    </Box>
  );
};

export default Customers;
