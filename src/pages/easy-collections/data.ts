import type {
  Customer,
  CustomerGroup,
  BillingComponent,
  BillingStructure,
  Discount,
  PricingPlan,
  BillingCycle,
  PaymentSchedule,
  ActivityItem,
  EasyCollectionsState,
  EasyCollectionsAction,
  StatusBadgeConfig,
  CollectionStats,
  GroupCollectionSummary,
  CustomerStatus,
  InstallmentStatus,
  BillingCycleStatus,
  TemplateTerminology,
} from './types';

// ── Status Badge Maps ──

export const CUSTOMER_STATUS_BADGE: Record<CustomerStatus, StatusBadgeConfig> = {
  active: { color: 'positive', label: 'Active' },
  paused: { color: 'notice', label: 'Paused' },
  exited: { color: 'neutral', label: 'Exited' },
  suspended: { color: 'negative', label: 'Suspended' },
};

export const INSTALLMENT_STATUS_BADGE: Record<InstallmentStatus, StatusBadgeConfig> = {
  upcoming: { color: 'information', label: 'Upcoming' },
  paid: { color: 'positive', label: 'Paid' },
  overdue: { color: 'negative', label: 'Overdue' },
  partial: { color: 'notice', label: 'Partial' },
};

export const BILLING_CYCLE_STATUS_BADGE: Record<BillingCycleStatus, StatusBadgeConfig> = {
  draft: { color: 'neutral', label: 'Draft' },
  active: { color: 'positive', label: 'Active' },
  completed: { color: 'information', label: 'Completed' },
};

// ── Education Mock Data ──

export const EDUCATION_TERMINOLOGY: TemplateTerminology = {
  customer: 'Customer',
  customerPlural: 'Customers',
  contact: 'Contact',
  group: 'Group',
  groupPlural: 'Groups',
  billingPeriod: 'Academic Year',
  customerId: 'Customer ID',
};

export const MOCK_COMPONENTS: BillingComponent[] = [
  { id: 'comp_1', name: 'Tuition Fee', frequency: 'recurring', required: true, amount: 50000, description: 'Core academic tuition fee per year' },
  { id: 'comp_2', name: 'Transport Fee', frequency: 'recurring', required: false, amount: 8000, description: 'School bus transport charges' },
  { id: 'comp_3', name: 'Lab Fee', frequency: 'recurring', required: false, amount: 2000, description: 'Science and computer lab usage' },
  { id: 'comp_4', name: 'Activities Fee', frequency: 'recurring', required: false, amount: 2000, description: 'Sports, arts, and extracurricular' },
  { id: 'comp_5', name: 'Library Fee', frequency: 'recurring', required: false, amount: 1000, description: 'Library access and book lending' },
  { id: 'comp_6', name: 'Uniform', frequency: 'one-time', required: false, amount: 3500, description: 'School uniform set' },
  { id: 'comp_7', name: 'Admission Fee', frequency: 'one-time', required: false, amount: 10000, description: 'One-time admission charge' },
];

export const MOCK_DISCOUNTS: Discount[] = [
  { id: 'disc_1', name: 'Sibling Discount', category: 'family_linked', value: 10, valueType: 'percentage', recurring: true, description: '10% off for second child enrolled' },
  { id: 'disc_2', name: 'Merit Scholarship', category: 'merit', value: 5000, valueType: 'flat', recurring: true, description: 'Achievement-based fee reduction' },
  { id: 'disc_3', name: 'RTE Waiver', category: 'category_waiver', value: 100, valueType: 'percentage', recurring: true, description: 'Government RTE scheme waiver' },
  { id: 'disc_4', name: 'Early-Bird Discount', category: 'early_payment', value: 5, valueType: 'percentage', recurring: false, description: '5% off for payment before due date' },
];

export const MOCK_PRICING_PLANS: PricingPlan[] = [
  { id: 'plan_1', name: 'Quarterly Installments', type: 'quarterly', splitCount: 4, description: 'Split annual fee into 4 equal quarterly payments' },
  { id: 'plan_2', name: 'Annual Lump Sum', type: 'annual', splitCount: 1, description: 'Pay the full annual fee in one payment' },
  { id: 'plan_3', name: 'Monthly Installments', type: 'monthly', splitCount: 12, description: 'Split annual fee into 12 equal monthly payments' },
  { id: 'plan_4', name: 'Semi-Annual', type: 'semi-annual', splitCount: 2, description: 'Split annual fee into 2 half-yearly payments' },
];

export const MOCK_GROUPS: CustomerGroup[] = [
  {
    id: 'grp_1', name: 'Class 6', description: 'Grade 6 customers', customerCount: 8,
    billingStructureId: 'struct_1', defaultPricingPlanId: 'plan_1', defaultSchedule: 'quarterly',
    lateFeeConfig: { enabled: true, type: 'flat', value: 500, gracePeriodDays: 10, capAmount: 2000 },
  },
  {
    id: 'grp_2', name: 'Class 7', description: 'Grade 7 customers', customerCount: 6,
    billingStructureId: 'struct_2', defaultPricingPlanId: 'plan_1', defaultSchedule: 'quarterly',
    lateFeeConfig: { enabled: true, type: 'flat', value: 500, gracePeriodDays: 10, capAmount: 2000 },
  },
  {
    id: 'grp_3', name: 'Class 8', description: 'Grade 8 customers', customerCount: 5,
    billingStructureId: 'struct_3', defaultPricingPlanId: 'plan_1', defaultSchedule: 'quarterly',
    lateFeeConfig: { enabled: true, type: 'flat', value: 500, gracePeriodDays: 10, capAmount: 2000 },
  },
  {
    id: 'grp_4', name: 'Class 9', description: 'Grade 9 customers', customerCount: 4,
    billingStructureId: 'struct_4', defaultPricingPlanId: 'plan_1', defaultSchedule: 'quarterly',
    lateFeeConfig: { enabled: true, type: 'flat', value: 750, gracePeriodDays: 10, capAmount: 2000 },
  },
];

export const MOCK_STRUCTURES: BillingStructure[] = [
  {
    id: 'struct_1', name: 'Class 6 Fee Structure', groupId: 'grp_1',
    components: [
      { componentId: 'comp_1', amount: 40000 },
      { componentId: 'comp_2', amount: 8000 },
      { componentId: 'comp_4', amount: 2000 },
      { componentId: 'comp_5', amount: 1000 },
    ],
    totalAmount: 51000,
  },
  {
    id: 'struct_2', name: 'Class 7 Fee Structure', groupId: 'grp_2',
    components: [
      { componentId: 'comp_1', amount: 50000 },
      { componentId: 'comp_2', amount: 8000 },
      { componentId: 'comp_3', amount: 2000 },
      { componentId: 'comp_4', amount: 2000 },
      { componentId: 'comp_5', amount: 1000 },
    ],
    totalAmount: 63000,
  },
  {
    id: 'struct_3', name: 'Class 8 Fee Structure', groupId: 'grp_3',
    components: [
      { componentId: 'comp_1', amount: 55000 },
      { componentId: 'comp_2', amount: 8000 },
      { componentId: 'comp_3', amount: 3000 },
      { componentId: 'comp_4', amount: 2000 },
      { componentId: 'comp_5', amount: 1000 },
    ],
    totalAmount: 69000,
  },
  {
    id: 'struct_4', name: 'Class 9 Fee Structure', groupId: 'grp_4',
    components: [
      { componentId: 'comp_1', amount: 60000 },
      { componentId: 'comp_2', amount: 8000 },
      { componentId: 'comp_3', amount: 4000 },
      { componentId: 'comp_4', amount: 2000 },
      { componentId: 'comp_5', amount: 1000 },
    ],
    totalAmount: 75000,
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'cust_1', name: 'Aarav Sharma', contactName: 'Rajesh Sharma', email: 'rajesh.sharma@email.com', phone: '9876543210', groupId: 'grp_1', customerId: 'ADM-2024-001', status: 'active', enrollmentDate: '01 Apr 2025', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Rajesh Sharma', 'Transport Route': 'Route A' }, familyLinkId: 'fam_1', preferredChannel: 'whatsapp', notes: '', totalDue: 51000, totalPaid: 38250, totalOverdue: 0 },
  { id: 'cust_2', name: 'Ananya Sharma', contactName: 'Rajesh Sharma', email: 'rajesh.sharma@email.com', phone: '9876543210', groupId: 'grp_2', customerId: 'ADM-2024-002', status: 'active', enrollmentDate: '01 Apr 2025', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Rajesh Sharma', 'Transport Route': 'Route A' }, familyLinkId: 'fam_1', preferredChannel: 'whatsapp', notes: 'Sibling of Aarav', totalDue: 63000, totalPaid: 47250, totalOverdue: 0 },
  { id: 'cust_3', name: 'Vivaan Patel', contactName: 'Suresh Patel', email: 'suresh.p@email.com', phone: '9123456789', groupId: 'grp_1', customerId: 'ADM-2024-003', status: 'active', enrollmentDate: '01 Apr 2025', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Suresh Patel' }, familyLinkId: null, preferredChannel: 'email', notes: '', totalDue: 51000, totalPaid: 25500, totalOverdue: 12750 },
  { id: 'cust_4', name: 'Diya Reddy', contactName: 'Kavitha Reddy', email: 'kavitha.r@email.com', phone: '9988776655', groupId: 'grp_2', customerId: 'ADM-2024-004', status: 'active', enrollmentDate: '01 Apr 2025', billingType: 'custom', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Kavitha Reddy' }, familyLinkId: null, preferredChannel: 'whatsapp', notes: 'Merit scholarship recipient', totalDue: 58000, totalPaid: 43500, totalOverdue: 0 },
  { id: 'cust_5', name: 'Arjun Mehta', contactName: 'Priya Mehta', email: 'priya.mehta@email.com', phone: '9876501234', groupId: 'grp_3', customerId: 'ADM-2023-012', status: 'active', enrollmentDate: '01 Apr 2024', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Priya Mehta', 'Transport Route': 'Route B' }, familyLinkId: null, preferredChannel: 'whatsapp', notes: '', totalDue: 69000, totalPaid: 51750, totalOverdue: 0 },
  { id: 'cust_6', name: 'Prisha Gupta', contactName: 'Amit Gupta', email: 'amit.g@email.com', phone: '9012345678', groupId: 'grp_3', customerId: 'ADM-2023-015', status: 'active', enrollmentDate: '01 Apr 2024', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Amit Gupta' }, familyLinkId: null, preferredChannel: 'email', notes: '', totalDue: 69000, totalPaid: 34500, totalOverdue: 17250 },
  { id: 'cust_7', name: 'Reyansh Joshi', contactName: 'Neha Joshi', email: 'neha.j@email.com', phone: '9345678901', groupId: 'grp_4', customerId: 'ADM-2022-008', status: 'active', enrollmentDate: '01 Apr 2023', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Neha Joshi', 'Transport Route': 'Route C' }, familyLinkId: null, preferredChannel: 'whatsapp', notes: '', totalDue: 75000, totalPaid: 75000, totalOverdue: 0 },
  { id: 'cust_8', name: 'Ishaan Kapoor', contactName: 'Vikram Kapoor', email: 'vikram.k@email.com', phone: '9567890123', groupId: 'grp_4', customerId: 'ADM-2022-011', status: 'active', enrollmentDate: '01 Apr 2023', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Vikram Kapoor' }, familyLinkId: null, preferredChannel: 'sms', notes: '', totalDue: 75000, totalPaid: 56250, totalOverdue: 18750 },
  { id: 'cust_9', name: 'Saanvi Nair', contactName: 'Deepak Nair', email: 'deepak.n@email.com', phone: '9234567890', groupId: 'grp_1', customerId: 'ADM-2024-005', status: 'active', enrollmentDate: '01 Apr 2025', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Deepak Nair' }, familyLinkId: null, preferredChannel: 'whatsapp', notes: '', totalDue: 51000, totalPaid: 38250, totalOverdue: 0 },
  { id: 'cust_10', name: 'Advait Iyer', contactName: 'Lakshmi Iyer', email: 'lakshmi.i@email.com', phone: '9456789012', groupId: 'grp_1', customerId: 'ADM-2024-006', status: 'active', enrollmentDate: '01 Apr 2025', billingType: 'standard', pricingPlanId: 'plan_2', customFields: { 'Parent Name': 'Lakshmi Iyer', 'Transport Route': 'Route A' }, familyLinkId: null, preferredChannel: 'email', notes: '', totalDue: 51000, totalPaid: 51000, totalOverdue: 0 },
  { id: 'cust_11', name: 'Myra Singh', contactName: 'Deepika Singh', email: 'deepika.s@email.com', phone: '9678901234', groupId: 'grp_2', customerId: 'ADM-2024-007', status: 'paused', enrollmentDate: '01 Apr 2025', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Deepika Singh' }, familyLinkId: null, preferredChannel: 'whatsapp', notes: 'On leave of absence', totalDue: 63000, totalPaid: 15750, totalOverdue: 0 },
  { id: 'cust_12', name: 'Kabir Verma', contactName: 'Ravi Verma', email: 'ravi.v@email.com', phone: '9789012345', groupId: 'grp_1', customerId: 'ADM-2024-008', status: 'active', enrollmentDate: '01 Apr 2025', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Ravi Verma' }, familyLinkId: null, preferredChannel: 'whatsapp', notes: '', totalDue: 51000, totalPaid: 25500, totalOverdue: 12750 },
  { id: 'cust_13', name: 'Aanya Desai', contactName: 'Meera Desai', email: 'meera.d@email.com', phone: '9890123456', groupId: 'grp_2', customerId: 'ADM-2024-009', status: 'active', enrollmentDate: '01 Apr 2025', billingType: 'standard', pricingPlanId: 'plan_2', customFields: { 'Parent Name': 'Meera Desai' }, familyLinkId: null, preferredChannel: 'email', notes: '', totalDue: 63000, totalPaid: 63000, totalOverdue: 0 },
  { id: 'cust_14', name: 'Vihaan Kumar', contactName: 'Sanjay Kumar', email: 'sanjay.k@email.com', phone: '9901234567', groupId: 'grp_3', customerId: 'ADM-2023-018', status: 'active', enrollmentDate: '01 Apr 2024', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Sanjay Kumar', 'Transport Route': 'Route B' }, familyLinkId: null, preferredChannel: 'whatsapp', notes: '', totalDue: 69000, totalPaid: 51750, totalOverdue: 0 },
  { id: 'cust_15', name: 'Anika Chatterjee', contactName: 'Sourav Chatterjee', email: 'sourav.c@email.com', phone: '9112233445', groupId: 'grp_4', customerId: 'ADM-2022-014', status: 'exited', enrollmentDate: '01 Apr 2023', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Sourav Chatterjee' }, familyLinkId: null, preferredChannel: 'whatsapp', notes: 'Graduated', totalDue: 75000, totalPaid: 75000, totalOverdue: 0 },
  { id: 'cust_16', name: 'Rohan Bhat', contactName: 'Venkat Bhat', email: 'venkat.b@email.com', phone: '9223344556', groupId: 'grp_1', customerId: 'ADM-2024-010', status: 'active', enrollmentDate: '01 Apr 2025', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Venkat Bhat' }, familyLinkId: null, preferredChannel: 'whatsapp', notes: 'RTE admission', totalDue: 0, totalPaid: 0, totalOverdue: 0 },
  { id: 'cust_17', name: 'Siya Agarwal', contactName: 'Nitin Agarwal', email: 'nitin.a@email.com', phone: '9334455667', groupId: 'grp_2', customerId: 'ADM-2024-011', status: 'active', enrollmentDate: '01 Apr 2025', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Nitin Agarwal', 'Transport Route': 'Route C' }, familyLinkId: null, preferredChannel: 'whatsapp', notes: '', totalDue: 63000, totalPaid: 47250, totalOverdue: 0 },
  { id: 'cust_18', name: 'Atharv Mishra', contactName: 'Sunita Mishra', email: 'sunita.m@email.com', phone: '9445566778', groupId: 'grp_3', customerId: 'ADM-2023-020', status: 'active', enrollmentDate: '01 Apr 2024', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Sunita Mishra' }, familyLinkId: null, preferredChannel: 'sms', notes: '', totalDue: 69000, totalPaid: 69000, totalOverdue: 0 },
  { id: 'cust_19', name: 'Kiara Rao', contactName: 'Madhavi Rao', email: 'madhavi.r@email.com', phone: '9556677889', groupId: 'grp_1', customerId: 'ADM-2024-012', status: 'active', enrollmentDate: '01 Apr 2025', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Madhavi Rao' }, familyLinkId: null, preferredChannel: 'whatsapp', notes: '', totalDue: 51000, totalPaid: 38250, totalOverdue: 0 },
  { id: 'cust_20', name: 'Arnav Jain', contactName: 'Pooja Jain', email: 'pooja.j@email.com', phone: '9667788990', groupId: 'grp_4', customerId: 'ADM-2022-016', status: 'active', enrollmentDate: '01 Apr 2023', billingType: 'standard', pricingPlanId: 'plan_1', customFields: { 'Parent Name': 'Pooja Jain' }, familyLinkId: null, preferredChannel: 'email', notes: '', totalDue: 75000, totalPaid: 56250, totalOverdue: 18750 },
];

export const MOCK_BILLING_CYCLES: BillingCycle[] = [
  {
    id: 'bc_1', name: 'Q1 FY26 — Apr-Jun', pricingPlanId: 'plan_1',
    groupIds: ['grp_1', 'grp_2', 'grp_3', 'grp_4'],
    collectionDate: '2025-03-15', dueDate: '2025-04-01',
    status: 'completed', totalCustomers: 20, totalExpected: 319250,
    totalCollected: 319250, linksGenerated: 20, linksSent: 20,
    createdAt: '2025-03-10',
  },
  {
    id: 'bc_2', name: 'Q2 FY26 — Jul-Sep', pricingPlanId: 'plan_1',
    groupIds: ['grp_1', 'grp_2', 'grp_3', 'grp_4'],
    collectionDate: '2025-06-15', dueDate: '2025-07-01',
    status: 'completed', totalCustomers: 19, totalExpected: 306500,
    totalCollected: 293750, linksGenerated: 19, linksSent: 19,
    createdAt: '2025-06-10',
  },
  {
    id: 'bc_3', name: 'Q3 FY26 — Oct-Dec', pricingPlanId: 'plan_1',
    groupIds: ['grp_1', 'grp_2', 'grp_3', 'grp_4'],
    collectionDate: '2025-09-15', dueDate: '2025-10-01',
    status: 'completed', totalCustomers: 19, totalExpected: 306500,
    totalCollected: 268000, linksGenerated: 19, linksSent: 19,
    createdAt: '2025-09-10',
  },
  {
    id: 'bc_4', name: 'Q4 FY26 — Jan-Mar', pricingPlanId: 'plan_1',
    groupIds: ['grp_1', 'grp_2', 'grp_3', 'grp_4'],
    collectionDate: '2025-12-15', dueDate: '2026-01-01',
    status: 'active', totalCustomers: 19, totalExpected: 306500,
    totalCollected: 18750, linksGenerated: 19, linksSent: 19,
    createdAt: '2025-12-10',
  },
];

export const MOCK_SCHEDULES: PaymentSchedule[] = [
  { id: 'sch_1', customerId: 'cust_1', type: 'quarterly', pricingPlanId: 'plan_1', totalAmount: 51000, totalPaid: 38250, installments: [
    { id: 'inst_1', number: 1, label: 'Q1 (Apr-Jun)', amount: 12750, dueDate: '2025-04-01', status: 'paid', paidAmount: 12750, paidDate: '2025-03-28', lateFee: 0, billingCycleId: 'bc_1' },
    { id: 'inst_2', number: 2, label: 'Q2 (Jul-Sep)', amount: 12750, dueDate: '2025-07-01', status: 'paid', paidAmount: 12750, paidDate: '2025-07-03', lateFee: 0, billingCycleId: 'bc_2' },
    { id: 'inst_3', number: 3, label: 'Q3 (Oct-Dec)', amount: 12750, dueDate: '2025-10-01', status: 'paid', paidAmount: 12750, paidDate: '2025-10-05', lateFee: 0, billingCycleId: 'bc_3' },
    { id: 'inst_4', number: 4, label: 'Q4 (Jan-Mar)', amount: 12750, dueDate: '2026-01-01', status: 'upcoming', paidAmount: 0, paidDate: null, lateFee: 0, billingCycleId: 'bc_4' },
  ]},
  { id: 'sch_3', customerId: 'cust_3', type: 'quarterly', pricingPlanId: 'plan_1', totalAmount: 51000, totalPaid: 25500, installments: [
    { id: 'inst_9', number: 1, label: 'Q1 (Apr-Jun)', amount: 12750, dueDate: '2025-04-01', status: 'paid', paidAmount: 12750, paidDate: '2025-04-05', lateFee: 0, billingCycleId: 'bc_1' },
    { id: 'inst_10', number: 2, label: 'Q2 (Jul-Sep)', amount: 12750, dueDate: '2025-07-01', status: 'paid', paidAmount: 12750, paidDate: '2025-07-15', lateFee: 500, billingCycleId: 'bc_2' },
    { id: 'inst_11', number: 3, label: 'Q3 (Oct-Dec)', amount: 12750, dueDate: '2025-10-01', status: 'overdue', paidAmount: 0, paidDate: null, lateFee: 500, billingCycleId: 'bc_3' },
    { id: 'inst_12', number: 4, label: 'Q4 (Jan-Mar)', amount: 12750, dueDate: '2026-01-01', status: 'upcoming', paidAmount: 0, paidDate: null, lateFee: 0, billingCycleId: 'bc_4' },
  ]},
  { id: 'sch_7', customerId: 'cust_7', type: 'quarterly', pricingPlanId: 'plan_1', totalAmount: 75000, totalPaid: 75000, installments: [
    { id: 'inst_25', number: 1, label: 'Q1 (Apr-Jun)', amount: 18750, dueDate: '2025-04-01', status: 'paid', paidAmount: 18750, paidDate: '2025-03-30', lateFee: 0, billingCycleId: 'bc_1' },
    { id: 'inst_26', number: 2, label: 'Q2 (Jul-Sep)', amount: 18750, dueDate: '2025-07-01', status: 'paid', paidAmount: 18750, paidDate: '2025-06-28', lateFee: 0, billingCycleId: 'bc_2' },
    { id: 'inst_27', number: 3, label: 'Q3 (Oct-Dec)', amount: 18750, dueDate: '2025-10-01', status: 'paid', paidAmount: 18750, paidDate: '2025-09-29', lateFee: 0, billingCycleId: 'bc_3' },
    { id: 'inst_28', number: 4, label: 'Q4 (Jan-Mar)', amount: 18750, dueDate: '2026-01-01', status: 'paid', paidAmount: 18750, paidDate: '2025-12-28', lateFee: 0, billingCycleId: 'bc_4' },
  ]},
  { id: 'sch_8', customerId: 'cust_8', type: 'quarterly', pricingPlanId: 'plan_1', totalAmount: 75000, totalPaid: 56250, installments: [
    { id: 'inst_29', number: 1, label: 'Q1 (Apr-Jun)', amount: 18750, dueDate: '2025-04-01', status: 'paid', paidAmount: 18750, paidDate: '2025-04-02', lateFee: 0, billingCycleId: 'bc_1' },
    { id: 'inst_30', number: 2, label: 'Q2 (Jul-Sep)', amount: 18750, dueDate: '2025-07-01', status: 'paid', paidAmount: 18750, paidDate: '2025-07-08', lateFee: 0, billingCycleId: 'bc_2' },
    { id: 'inst_31', number: 3, label: 'Q3 (Oct-Dec)', amount: 18750, dueDate: '2025-10-01', status: 'paid', paidAmount: 18750, paidDate: '2025-10-12', lateFee: 500, billingCycleId: 'bc_3' },
    { id: 'inst_32', number: 4, label: 'Q4 (Jan-Mar)', amount: 18750, dueDate: '2026-01-01', status: 'overdue', paidAmount: 0, paidDate: null, lateFee: 750, billingCycleId: 'bc_4' },
  ]},
];

export const MOCK_ACTIVITY: ActivityItem[] = [
  { id: 'act_1', type: 'payment_received', description: 'Q3 fee payment received from Reyansh Joshi (Class 9)', timestamp: '2025-09-29 10:15 AM', customerName: 'Reyansh Joshi', amount: 18750 },
  { id: 'act_2', type: 'reminder_sent', description: 'Q3 payment reminder sent to 5 customers with upcoming due dates', timestamp: '2025-09-24 09:00 AM', customerName: 'Multiple' },
  { id: 'act_3', type: 'overdue_alert', description: 'Q3 fee overdue for Vivaan Patel (Class 6) — ₹12,750 + ₹500 late fee', timestamp: '2025-10-12 08:00 AM', customerName: 'Vivaan Patel', amount: 13250 },
  { id: 'act_4', type: 'payment_received', description: 'Q3 fee payment received from Arjun Mehta (Class 8)', timestamp: '2025-10-03 02:30 PM', customerName: 'Arjun Mehta', amount: 17250 },
  { id: 'act_5', type: 'receipt_generated', description: 'Receipt #REC-2025-089 generated for Aarav Sharma (Class 6)', timestamp: '2025-10-05 11:00 AM', customerName: 'Aarav Sharma', amount: 12750 },
  { id: 'act_6', type: 'customer_added', description: 'New customer Rohan Bhat added to Class 6 (RTE admission)', timestamp: '2025-10-08 03:45 PM', customerName: 'Rohan Bhat' },
  { id: 'act_7', type: 'payment_received', description: 'Q2 late payment received from Prisha Gupta (Class 8) with ₹500 late fee', timestamp: '2025-08-20 04:10 PM', customerName: 'Prisha Gupta', amount: 17750 },
  { id: 'act_8', type: 'overdue_alert', description: 'Q4 fee overdue for Ishaan Kapoor (Class 9) — ₹18,750 + ₹750 late fee', timestamp: '2026-01-12 08:00 AM', customerName: 'Ishaan Kapoor', amount: 19500 },
  { id: 'act_9', type: 'billing_cycle_started', description: 'Q4 billing cycle initiated — 19 Payment Links generated and sent to all active customers', timestamp: '2025-12-15 09:00 AM', customerName: 'All Customers' },
  { id: 'act_10', type: 'payment_received', description: 'Full year fee received from Aanya Desai (Class 7) — lump sum', timestamp: '2025-04-02 10:30 AM', customerName: 'Aanya Desai', amount: 63000 },
];

// ── Initial State (pre-populated for demo) ──

export const INITIAL_STATE: EasyCollectionsState = {
  isSetUp: true,
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
  customers: MOCK_CUSTOMERS,
  groups: MOCK_GROUPS,
  components: MOCK_COMPONENTS,
  structures: MOCK_STRUCTURES,
  discounts: MOCK_DISCOUNTS,
  customerDiscounts: [],
  pricingPlans: MOCK_PRICING_PLANS,
  billingCycles: MOCK_BILLING_CYCLES,
  schedules: MOCK_SCHEDULES,
  recentActivity: MOCK_ACTIVITY,
};

// ── Computed Helpers ──

export function computeCollectionStats(customers: Customer[]): CollectionStats {
  const activeCustomers = customers.filter(c => c.status === 'active' || c.status === 'paused');
  const totalExpected = activeCustomers.reduce((sum, c) => sum + c.totalDue, 0);
  const totalCollected = activeCustomers.reduce((sum, c) => sum + c.totalPaid, 0);
  const totalOverdue = activeCustomers.reduce((sum, c) => sum + c.totalOverdue, 0);
  const collectionRate = totalExpected > 0 ? (totalCollected / totalExpected) * 100 : 0;

  const paidFull = activeCustomers.filter(c => c.totalPaid >= c.totalDue).length;
  const overdue = activeCustomers.filter(c => c.totalOverdue > 0).length;
  const pending = activeCustomers.filter(c => c.totalPaid === 0 && c.totalDue > 0).length;

  return {
    totalExpected,
    totalCollected,
    totalOverdue,
    collectionRate,
    onTimeCount: paidFull,
    lateCount: overdue,
    pendingCount: pending,
    overdueCount: overdue,
  };
}

export function computeGroupSummaries(
  customers: Customer[],
  groups: CustomerGroup[],
): GroupCollectionSummary[] {
  return groups.map(group => {
    const groupCustomers = customers.filter(c => c.groupId === group.id && c.status !== 'exited');
    const expected = groupCustomers.reduce((sum, c) => sum + c.totalDue, 0);
    const collected = groupCustomers.reduce((sum, c) => sum + c.totalPaid, 0);
    const overdue = groupCustomers.reduce((sum, c) => sum + c.totalOverdue, 0);
    return {
      groupId: group.id,
      groupName: group.name,
      expected,
      collected,
      overdue,
      collectionRate: expected > 0 ? (collected / expected) * 100 : 0,
      customerCount: groupCustomers.length,
    };
  });
}

export const generateId = (prefix: string): string =>
  `${prefix}_${Math.random().toString(36).substring(2, 10)}`;

// ── Reducer ──

export function easyCollectionsReducer(
  state: EasyCollectionsState,
  action: EasyCollectionsAction,
): EasyCollectionsState {
  switch (action.type) {
    case 'SETUP_COMPLETE':
      return {
        ...state,
        isSetUp: true,
        template: action.payload.template,
        businessProfile: action.payload.businessProfile,
        terminology: action.payload.terminology,
        components: action.payload.components,
        discounts: action.payload.discounts,
        groups: action.payload.groups,
        structures: action.payload.structures,
        customers: action.payload.customers,
        pricingPlans: action.payload.pricingPlans,
        billingCycles: action.payload.billingCycles,
        schedules: action.payload.schedules,
        recentActivity: action.payload.recentActivity,
      };
    case 'ADD_CUSTOMER':
      return { ...state, customers: [...state.customers, action.payload] };
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload.updates } : c,
        ),
      };
    case 'ADD_GROUP':
      return { ...state, groups: [...state.groups, action.payload] };
    case 'ADD_COMPONENT':
      return { ...state, components: [...state.components, action.payload] };
    case 'UPDATE_COMPONENT':
      return {
        ...state,
        components: state.components.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload.updates } : c,
        ),
      };
    case 'DELETE_COMPONENT':
      return { ...state, components: state.components.filter(c => c.id !== action.payload) };
    case 'ADD_STRUCTURE':
      return { ...state, structures: [...state.structures, action.payload] };
    case 'ADD_DISCOUNT':
      return { ...state, discounts: [...state.discounts, action.payload] };
    case 'APPLY_DISCOUNT':
      return {
        ...state,
        customerDiscounts: [...state.customerDiscounts, action.payload],
      };
    case 'ADD_PRICING_PLAN':
      return { ...state, pricingPlans: [...state.pricingPlans, action.payload] };
    case 'ADD_BILLING_CYCLE':
      return { ...state, billingCycles: [...state.billingCycles, action.payload] };
    case 'UPDATE_BILLING_CYCLE':
      return {
        ...state,
        billingCycles: state.billingCycles.map(bc =>
          bc.id === action.payload.id ? { ...bc, ...action.payload.updates } : bc,
        ),
      };
    case 'UPDATE_INSTALLMENT_STATUS':
      return {
        ...state,
        schedules: state.schedules.map(s =>
          s.id === action.payload.scheduleId
            ? {
                ...s,
                installments: s.installments.map(i =>
                  i.id === action.payload.installmentId
                    ? { ...i, status: action.payload.status, paidAmount: action.payload.paidAmount }
                    : i,
                ),
                totalPaid: s.installments.reduce(
                  (sum, i) =>
                    sum +
                    (i.id === action.payload.installmentId
                      ? action.payload.paidAmount
                      : i.paidAmount),
                  0,
                ),
              }
            : s,
        ),
      };
    default:
      return state;
  }
}
