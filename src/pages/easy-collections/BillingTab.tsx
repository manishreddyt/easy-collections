import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Amount,
  Badge,
  Button,
  Divider,
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
  Tabs,
  TabList,
  TabItem,
  TabPanel,
  PlusIcon,
  useToast,
} from '@razorpay/blade/components';
import type {
  BillingComponent,
  BillingStructure,
  Discount,
  PricingPlan,
  BillingCycle,
  CustomerGroup,
  TemplateTerminology,
  EasyCollectionsAction,
} from './types';
import { BILLING_CYCLE_STATUS_BADGE } from './data';

const CATEGORY_BADGE: Record<string, { color: string; label: string }> = {
  family_linked: { color: 'positive', label: 'Family' },
  merit: { color: 'information', label: 'Merit' },
  early_payment: { color: 'notice', label: 'Early Payment' },
  commitment: { color: 'positive', label: 'Commitment' },
  category_waiver: { color: 'neutral', label: 'Waiver' },
  ad_hoc: { color: 'neutral', label: 'Ad-hoc' },
};

const SCHEDULE_TYPE_LABEL: Record<string, string> = {
  'one-time': 'One-time',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  'semi-annual': 'Semi-Annual',
  annual: 'Annual',
  custom: 'Custom',
};

interface BillingTabProps {
  components: BillingComponent[];
  structures: BillingStructure[];
  discounts: Discount[];
  groups: CustomerGroup[];
  terminology: TemplateTerminology;
  dispatch: React.Dispatch<EasyCollectionsAction>;
  pricingPlans: PricingPlan[];
  billingCycles: BillingCycle[];
}

const BillingTab: React.FC<BillingTabProps> = ({
  components,
  structures,
  discounts,
  groups,
  terminology,
  pricingPlans,
  billingCycles,
}) => {
  const toast = useToast();

  const getGroupName = (groupId: string): string => {
    const group = groups.find((g) => g.id === groupId);
    return group ? group.name : groupId;
  };

  const getComponentName = (componentId: string): string => {
    const component = components.find((c) => c.id === componentId);
    return component ? component.name : componentId;
  };

  const getPlanName = (planId: string): string => {
    const plan = pricingPlans.find((p) => p.id === planId);
    return plan ? plan.name : planId;
  };

  return (
    <Tabs>
      <TabList>
        <TabItem value="components">Components</TabItem>
        <TabItem value="structures">{terminology.groupPlural} Fee Structures</TabItem>
        <TabItem value="discounts">Discounts</TabItem>
        <TabItem value="pricingPlans">Pricing Plans</TabItem>
        <TabItem value="billingCycles">Billing Cycles</TabItem>
        <TabItem value="lateFees">Late Fees</TabItem>
      </TabList>

      {/* Tab 1: Components */}
      <TabPanel value="components">
        <Box marginTop="spacing.5">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="spacing.5"
          >
            <Heading size="small">Billing Components</Heading>
            <Button
              variant="secondary"
              icon={PlusIcon}
              iconPosition="left"
              size="small"
              onClick={() => toast.show({ content: 'Coming soon', color: 'neutral' })}
            >
              Add Component
            </Button>
          </Box>

          <Table data={{ nodes: components }}>
            {(tableData) => (
              <>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Amount</TableHeaderCell>
                    <TableHeaderCell>Required</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.id} item={row}>
                      <TableCell>
                        <Text size="medium" weight="medium">
                          {row.name}
                        </Text>
                      </TableCell>
                      <TableCell>
                        <Badge
                          size="small"
                          color={row.frequency === 'recurring' ? 'positive' : 'information'}
                          emphasis="subtle"
                        >
                          {row.frequency === 'recurring' ? 'Recurring' : 'One-time'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Amount value={row.amount} currency="INR" size="small" type="body" />
                      </TableCell>
                      <TableCell>
                        <Badge
                          size="small"
                          color={row.required ? 'positive' : 'neutral'}
                          emphasis="subtle"
                        >
                          {row.required ? 'Required' : 'Optional'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Text size="small" color="surface.text.gray.muted">
                          {row.description}
                        </Text>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableFooterRow>
                    <TableFooterCell>{components.length} components</TableFooterCell>
                    <TableFooterCell>{' '}</TableFooterCell>
                    <TableFooterCell>{' '}</TableFooterCell>
                    <TableFooterCell>{' '}</TableFooterCell>
                    <TableFooterCell>{' '}</TableFooterCell>
                  </TableFooterRow>
                </TableFooter>
              </>
            )}
          </Table>
        </Box>
      </TabPanel>

      {/* Tab 2: Fee Structures */}
      <TabPanel value="structures">
        <Box marginTop="spacing.5" display="flex" flexDirection="column" gap="spacing.5">
          {structures.length === 0 ? (
            <Text size="medium" color="surface.text.gray.muted">
              No fee structures configured
            </Text>
          ) : (
            structures.map((structure) => (
              <Card key={structure.id} elevation="lowRaised" padding="spacing.7">
                <CardBody>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    marginBottom="spacing.4"
                  >
                    <Box>
                      <Heading size="small">{structure.name}</Heading>
                      <Text size="small" color="surface.text.gray.muted" marginTop="spacing.1">
                        {getGroupName(structure.groupId)}
                      </Text>
                    </Box>
                    <Amount
                      value={structure.totalAmount}
                      currency="INR"
                      size="large"
                      type="heading"
                    />
                  </Box>

                  {structure.components.map((comp, index) => (
                    <React.Fragment key={comp.componentId}>
                      {index > 0 && <Divider />}
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        paddingY="spacing.3"
                      >
                        <Text size="medium">{getComponentName(comp.componentId)}</Text>
                        <Amount value={comp.amount} currency="INR" size="small" type="body" />
                      </Box>
                    </React.Fragment>
                  ))}

                  <Divider />
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingTop="spacing.3"
                  >
                    <Text size="medium" weight="semibold">
                      Total
                    </Text>
                    <Amount
                      value={structure.totalAmount}
                      currency="INR"
                      size="small"
                      type="body"
                      weight="semibold"
                    />
                  </Box>
                </CardBody>
              </Card>
            ))
          )}
        </Box>
      </TabPanel>

      {/* Tab 3: Discounts */}
      <TabPanel value="discounts">
        <Box marginTop="spacing.5">
          <Heading size="small" marginBottom="spacing.5">
            Discounts
          </Heading>

          <Table data={{ nodes: discounts }}>
            {(tableData) => (
              <>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Category</TableHeaderCell>
                    <TableHeaderCell>Value</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => {
                    const categoryConfig = CATEGORY_BADGE[row.category] ?? {
                      color: 'neutral',
                      label: row.category,
                    };
                    return (
                      <TableRow key={row.id} item={row}>
                        <TableCell>
                          <Text size="medium" weight="medium">
                            {row.name}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Badge
                            size="small"
                            color={categoryConfig.color as any}
                            emphasis="subtle"
                          >
                            {categoryConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Text size="medium">
                            {row.valueType === 'percentage'
                              ? `${row.value}%`
                              : `\u20B9${row.value.toLocaleString()}`}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Badge
                            size="small"
                            color={row.recurring ? 'positive' : 'neutral'}
                            emphasis="subtle"
                          >
                            {row.recurring ? 'Recurring' : 'One-time'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Text size="small" color="surface.text.gray.muted">
                            {row.description}
                          </Text>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableFooterRow>
                    <TableFooterCell>{discounts.length} discounts</TableFooterCell>
                    <TableFooterCell>{' '}</TableFooterCell>
                    <TableFooterCell>{' '}</TableFooterCell>
                    <TableFooterCell>{' '}</TableFooterCell>
                    <TableFooterCell>{' '}</TableFooterCell>
                  </TableFooterRow>
                </TableFooter>
              </>
            )}
          </Table>
        </Box>
      </TabPanel>

      {/* Tab 4: Pricing Plans */}
      <TabPanel value="pricingPlans">
        <Box marginTop="spacing.5">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="spacing.5"
          >
            <Heading size="small">Pricing Plans</Heading>
            <Button
              variant="secondary"
              icon={PlusIcon}
              iconPosition="left"
              size="small"
              onClick={() => toast.show({ content: 'Coming soon', color: 'neutral' })}
            >
              Add Plan
            </Button>
          </Box>

          <Table data={{ nodes: pricingPlans }}>
            {(tableData) => (
              <>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Split Count</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.id} item={row}>
                      <TableCell>
                        <Text size="medium" weight="medium">
                          {row.name}
                        </Text>
                      </TableCell>
                      <TableCell>
                        <Badge size="small" color="information" emphasis="subtle">
                          {SCHEDULE_TYPE_LABEL[row.type] ?? row.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Text size="medium">{row.splitCount}</Text>
                      </TableCell>
                      <TableCell>
                        <Text size="small" color="surface.text.gray.muted">
                          {row.description}
                        </Text>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableFooterRow>
                    <TableFooterCell>{pricingPlans.length} plans</TableFooterCell>
                    <TableFooterCell>{' '}</TableFooterCell>
                    <TableFooterCell>{' '}</TableFooterCell>
                    <TableFooterCell>{' '}</TableFooterCell>
                  </TableFooterRow>
                </TableFooter>
              </>
            )}
          </Table>
        </Box>
      </TabPanel>

      {/* Tab 5: Billing Cycles */}
      <TabPanel value="billingCycles">
        <Box marginTop="spacing.5">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="spacing.5"
          >
            <Heading size="small">Billing Cycles</Heading>
            <Button
              variant="secondary"
              icon={PlusIcon}
              iconPosition="left"
              size="small"
              onClick={() => toast.show({ content: 'Coming soon', color: 'neutral' })}
            >
              New Cycle
            </Button>
          </Box>

          <Table data={{ nodes: billingCycles }}>
            {(tableData) => (
              <>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Pricing Plan</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Due Date</TableHeaderCell>
                    <TableHeaderCell>Expected</TableHeaderCell>
                    <TableHeaderCell>Collected</TableHeaderCell>
                    <TableHeaderCell>Links Sent</TableHeaderCell>
                  </TableHeaderRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => {
                    const badgeConfig = BILLING_CYCLE_STATUS_BADGE[row.status as keyof typeof BILLING_CYCLE_STATUS_BADGE];
                    return (
                      <TableRow key={row.id} item={row}>
                        <TableCell>
                          <Text size="medium" weight="medium">
                            {row.name}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text size="medium">{getPlanName(row.pricingPlanId)}</Text>
                        </TableCell>
                        <TableCell>
                          <Badge size="small" color={badgeConfig.color} emphasis="subtle">
                            {badgeConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Text size="small">{row.dueDate}</Text>
                        </TableCell>
                        <TableCell>
                          <Amount value={row.totalExpected} currency="INR" size="small" type="body" />
                        </TableCell>
                        <TableCell>
                          <Amount value={row.totalCollected} currency="INR" size="small" type="body" />
                        </TableCell>
                        <TableCell>
                          <Text size="medium">{row.linksSent} / {row.linksGenerated}</Text>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableFooterRow>
                    <TableFooterCell>{billingCycles.length} cycles</TableFooterCell>
                    <TableFooterCell>{' '}</TableFooterCell>
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
        </Box>
      </TabPanel>

      {/* Tab 6: Late Fees */}
      <TabPanel value="lateFees">
        <Box marginTop="spacing.5">
          <Heading size="small" marginBottom="spacing.5">
            Late Fee Configuration by {terminology.group}
          </Heading>

          <Box display="flex" flexDirection="column" gap="spacing.5">
            {groups.map((group) => {
              const config = group.lateFeeConfig;
              return (
                <Card key={group.id} elevation="lowRaised" padding="spacing.7">
                  <CardBody>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      marginBottom="spacing.4"
                    >
                      <Box>
                        <Heading size="small">{group.name}</Heading>
                        <Text size="small" color="surface.text.gray.muted" marginTop="spacing.1">
                          {group.description}
                        </Text>
                      </Box>
                      <Badge
                        size="small"
                        color={config.enabled ? 'positive' : 'neutral'}
                        emphasis="subtle"
                      >
                        {config.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </Box>

                    {config.enabled && (
                      <Box display="flex" flexDirection="column" gap="spacing.2">
                        <Divider />
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          paddingY="spacing.3"
                        >
                          <Text size="medium">Fee Type</Text>
                          <Badge size="small" color="information" emphasis="subtle">
                            {config.type === 'flat'
                              ? 'Flat'
                              : config.type === 'percentage'
                                ? 'Percentage'
                                : 'Per Day'}
                          </Badge>
                        </Box>
                        <Divider />
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          paddingY="spacing.3"
                        >
                          <Text size="medium">Value</Text>
                          <Text size="medium" weight="medium">
                            {config.type === 'flat'
                              ? `\u20B9${config.value.toLocaleString()}`
                              : config.type === 'percentage'
                                ? `${config.value}%`
                                : `\u20B9${config.value}/day`}
                          </Text>
                        </Box>
                        <Divider />
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          paddingY="spacing.3"
                        >
                          <Text size="medium">Grace Period</Text>
                          <Text size="medium" weight="medium">
                            {config.gracePeriodDays} days
                          </Text>
                        </Box>
                        {config.capAmount !== null && (
                          <>
                            <Divider />
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              paddingY="spacing.3"
                            >
                              <Text size="medium">Cap Amount</Text>
                              <Amount
                                value={config.capAmount}
                                currency="INR"
                                size="small"
                                type="body"
                                weight="semibold"
                              />
                            </Box>
                          </>
                        )}
                      </Box>
                    )}
                  </CardBody>
                </Card>
              );
            })}
          </Box>
        </Box>
      </TabPanel>
    </Tabs>
  );
};

export default BillingTab;
