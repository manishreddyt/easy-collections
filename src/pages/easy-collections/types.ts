// ── Industry Templates ──
export type IndustryTemplate = 'education' | 'fitness' | 'housing' | 'services' | 'custom';

// ── Customer ──
export type CustomerStatus = 'active' | 'paused' | 'exited' | 'suspended';

export interface Customer {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  groupId: string;
  customerId: string; // admission #, member ID, flat #, etc.
  status: CustomerStatus;
  enrollmentDate: string;
  billingType: 'standard' | 'custom';
  pricingPlanId: string | null;
  customFields: Record<string, string>;
  familyLinkId: string | null;
  preferredChannel: 'whatsapp' | 'email' | 'sms';
  notes: string;
  totalDue: number;
  totalPaid: number;
  totalOverdue: number;
}

export interface CustomerGroup {
  id: string;
  name: string;
  description: string;
  customerCount: number;
  billingStructureId: string | null;
  defaultPricingPlanId: string | null;
  defaultSchedule: ScheduleType;
  lateFeeConfig: LateFeeConfig;
}

// ── Billing Components ──
export type ComponentFrequency = 'recurring' | 'one-time';

export interface BillingComponent {
  id: string;
  name: string;
  frequency: ComponentFrequency;
  required: boolean;
  amount: number;
  description: string;
}

export interface BillingStructure {
  id: string;
  name: string;
  groupId: string;
  components: { componentId: string; amount: number }[];
  totalAmount: number;
}

// ── Discounts ──
export type DiscountCategory =
  | 'family_linked'
  | 'merit'
  | 'early_payment'
  | 'commitment'
  | 'category_waiver'
  | 'ad_hoc';

export type DiscountValueType = 'percentage' | 'flat';

export interface Discount {
  id: string;
  name: string;
  category: DiscountCategory;
  value: number;
  valueType: DiscountValueType;
  recurring: boolean;
  description: string;
}

export interface CustomerDiscount {
  discountId: string;
  customerId: string;
  appliedDate: string;
  reason: string;
}

// ── Pricing Plans ──
export type ScheduleType =
  | 'one-time'
  | 'monthly'
  | 'quarterly'
  | 'semi-annual'
  | 'annual'
  | 'custom';

export interface PricingPlan {
  id: string;
  name: string;
  type: ScheduleType;
  splitCount: number;
  description: string;
}

// ── Billing Cycles ──
export type BillingCycleStatus = 'draft' | 'active' | 'completed';

export interface BillingCycle {
  id: string;
  name: string;
  pricingPlanId: string;
  groupIds: string[];
  collectionDate: string;
  dueDate: string;
  status: BillingCycleStatus;
  totalCustomers: number;
  totalExpected: number;
  totalCollected: number;
  linksGenerated: number;
  linksSent: number;
  createdAt: string;
}

// ── Payment Schedule ──
export type InstallmentStatus = 'upcoming' | 'paid' | 'overdue' | 'partial';

export interface Installment {
  id: string;
  number: number;
  label: string;
  amount: number;
  dueDate: string;
  status: InstallmentStatus;
  paidAmount: number;
  paidDate: string | null;
  lateFee: number;
  billingCycleId: string | null;
}

export interface PaymentSchedule {
  id: string;
  customerId: string;
  type: ScheduleType;
  pricingPlanId: string | null;
  installments: Installment[];
  totalAmount: number;
  totalPaid: number;
}

// ── Late Fee ──
export type LateFeeType = 'flat' | 'percentage' | 'per_day';

export interface LateFeeConfig {
  enabled: boolean;
  type: LateFeeType;
  value: number;
  gracePeriodDays: number;
  capAmount: number | null;
}

// ── Analytics ──
export interface CollectionStats {
  totalExpected: number;
  totalCollected: number;
  totalOverdue: number;
  collectionRate: number;
  onTimeCount: number;
  lateCount: number;
  pendingCount: number;
  overdueCount: number;
}

export interface GroupCollectionSummary {
  groupId: string;
  groupName: string;
  expected: number;
  collected: number;
  overdue: number;
  collectionRate: number;
  customerCount: number;
}

// ── Activity ──
export interface ActivityItem {
  id: string;
  type:
    | 'payment_received'
    | 'reminder_sent'
    | 'customer_added'
    | 'overdue_alert'
    | 'receipt_generated'
    | 'billing_cycle_started';
  description: string;
  timestamp: string;
  customerName: string;
  amount?: number;
}

// ── Template Configuration ──
export interface TemplateTerminology {
  customer: string;
  customerPlural: string;
  contact: string;
  group: string;
  groupPlural: string;
  billingPeriod: string;
  customerId: string;
}

export interface TemplateConfig {
  id: IndustryTemplate;
  displayName: string;
  description: string;
  terminology: TemplateTerminology;
  defaultComponents: Omit<BillingComponent, 'id'>[];
  defaultDiscounts: {
    name: string;
    category: DiscountCategory;
    defaultValue: string;
    description: string;
  }[];
  defaultSchedule: ScheduleType;
  defaultLateFee: LateFeeConfig;
  customFields: { name: string; type: 'text' | 'select'; required: boolean }[];
}

// ── Business Profile ──
export interface BusinessProfile {
  name: string;
  industry: IndustryTemplate;
  logo: string;
  gstin: string;
  address: string;
  communicationChannels: ('whatsapp' | 'email' | 'sms')[];
}

// ── State Management ──
export interface EasyCollectionsState {
  isSetUp: boolean;
  template: IndustryTemplate | null;
  businessProfile: BusinessProfile | null;
  terminology: TemplateTerminology | null;
  customers: Customer[];
  groups: CustomerGroup[];
  components: BillingComponent[];
  structures: BillingStructure[];
  discounts: Discount[];
  customerDiscounts: CustomerDiscount[];
  pricingPlans: PricingPlan[];
  billingCycles: BillingCycle[];
  schedules: PaymentSchedule[];
  recentActivity: ActivityItem[];
}

export type EasyCollectionsAction =
  | {
      type: 'SETUP_COMPLETE';
      payload: {
        template: IndustryTemplate;
        businessProfile: BusinessProfile;
        terminology: TemplateTerminology;
        components: BillingComponent[];
        discounts: Discount[];
        groups: CustomerGroup[];
        structures: BillingStructure[];
        customers: Customer[];
        pricingPlans: PricingPlan[];
        billingCycles: BillingCycle[];
        schedules: PaymentSchedule[];
        recentActivity: ActivityItem[];
      };
    }
  | { type: 'ADD_CUSTOMER'; payload: Customer }
  | { type: 'UPDATE_CUSTOMER'; payload: { id: string; updates: Partial<Customer> } }
  | { type: 'ADD_GROUP'; payload: CustomerGroup }
  | { type: 'ADD_COMPONENT'; payload: BillingComponent }
  | { type: 'UPDATE_COMPONENT'; payload: { id: string; updates: Partial<BillingComponent> } }
  | { type: 'DELETE_COMPONENT'; payload: string }
  | { type: 'ADD_STRUCTURE'; payload: BillingStructure }
  | { type: 'ADD_DISCOUNT'; payload: Discount }
  | { type: 'APPLY_DISCOUNT'; payload: CustomerDiscount }
  | { type: 'ADD_PRICING_PLAN'; payload: PricingPlan }
  | { type: 'ADD_BILLING_CYCLE'; payload: BillingCycle }
  | { type: 'UPDATE_BILLING_CYCLE'; payload: { id: string; updates: Partial<BillingCycle> } }
  | {
      type: 'UPDATE_INSTALLMENT_STATUS';
      payload: {
        scheduleId: string;
        installmentId: string;
        status: InstallmentStatus;
        paidAmount: number;
      };
    };

// ── Form Types ──
export interface AddCustomerFormData {
  name: string;
  contactName: string;
  email: string;
  phone: string;
  groupId: string;
  customerId: string;
  pricingPlanId: string;
  notes: string;
}

export interface AddCustomerFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  groupId?: string;
  customerId?: string;
}

// ── Badge Config ──
export interface StatusBadgeConfig {
  color: 'positive' | 'negative' | 'notice' | 'neutral' | 'information';
  label: string;
}
