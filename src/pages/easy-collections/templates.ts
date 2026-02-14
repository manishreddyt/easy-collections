import type { TemplateConfig } from './types';

export const TEMPLATE_CONFIGS: TemplateConfig[] = [
  {
    id: 'education',
    displayName: 'Education',
    description:
      'Schools, colleges, coaching centres, e-learning platforms. Manage fee collections with grade-wise structures, sibling discounts, scholarships, and quarterly installments.',
    terminology: {
      customer: 'Customer',
      customerPlural: 'Customers',
      contact: 'Contact',
      group: 'Group',
      groupPlural: 'Groups',
      billingPeriod: 'Academic Year',
      customerId: 'Customer ID',
    },
    defaultComponents: [
      { name: 'Tuition Fee', frequency: 'recurring', required: true, amount: 50000, description: 'Core academic tuition fee per year' },
      { name: 'Transport Fee', frequency: 'recurring', required: false, amount: 8000, description: 'School bus transport charges' },
      { name: 'Lab Fee', frequency: 'recurring', required: false, amount: 2000, description: 'Science and computer lab usage' },
      { name: 'Activities Fee', frequency: 'recurring', required: false, amount: 2000, description: 'Sports, arts, and extracurricular activities' },
      { name: 'Library Fee', frequency: 'recurring', required: false, amount: 1000, description: 'Library access and book lending' },
      { name: 'Uniform', frequency: 'one-time', required: false, amount: 3500, description: 'School uniform set' },
      { name: 'Admission Fee', frequency: 'one-time', required: false, amount: 10000, description: 'One-time admission charge' },
    ],
    defaultDiscounts: [
      { name: 'Sibling Discount', category: 'family_linked', defaultValue: '10%', description: '10% off for second child enrolled' },
      { name: 'Merit Scholarship', category: 'merit', defaultValue: '', description: 'Achievement-based fee reduction' },
      { name: 'RTE Waiver', category: 'category_waiver', defaultValue: '100%', description: 'Government RTE scheme waiver' },
      { name: 'Early-Bird Discount', category: 'early_payment', defaultValue: '5%', description: '5% off for payment before due date' },
    ],
    defaultSchedule: 'quarterly',
    defaultLateFee: { enabled: true, type: 'flat', value: 500, gracePeriodDays: 10, capAmount: 2000 },
    customFields: [
      { name: 'Parent Name', type: 'text', required: true },
      { name: 'Blood Group', type: 'select', required: false },
      { name: 'Transport Route', type: 'text', required: false },
    ],
  },
  {
    id: 'fitness',
    displayName: 'Fitness',
    description:
      'Gyms, yoga studios, sports academies, martial arts, dance classes. Manage member billing with plan-based structures, freeze handling, and renewal reminders.',
    terminology: {
      customer: 'Member',
      customerPlural: 'Members',
      contact: 'Member',
      group: 'Plan',
      groupPlural: 'Plans',
      billingPeriod: 'Calendar Month',
      customerId: 'Member ID',
    },
    defaultComponents: [
      { name: 'Membership Fee', frequency: 'recurring', required: true, amount: 2500, description: 'Monthly gym membership' },
      { name: 'Personal Training', frequency: 'recurring', required: false, amount: 3000, description: 'One-on-one trainer sessions' },
      { name: 'Locker Rental', frequency: 'recurring', required: false, amount: 500, description: 'Personal locker access' },
      { name: 'Group Classes', frequency: 'recurring', required: false, amount: 800, description: 'Yoga, Zumba, CrossFit classes' },
      { name: 'Registration Fee', frequency: 'one-time', required: false, amount: 1000, description: 'One-time registration charge' },
    ],
    defaultDiscounts: [
      { name: 'Annual Commitment', category: 'commitment', defaultValue: '20%', description: '20% off for annual plan commitment' },
      { name: 'Referral Credit', category: 'ad_hoc', defaultValue: '500', description: 'Flat credit for each successful referral' },
      { name: 'Corporate Tie-Up', category: 'category_waiver', defaultValue: '15%', description: '15% off for corporate partners' },
      { name: 'Loyalty Discount', category: 'commitment', defaultValue: '10%', description: '10% off for members with 12+ months tenure' },
    ],
    defaultSchedule: 'monthly',
    defaultLateFee: { enabled: false, type: 'flat', value: 0, gracePeriodDays: 0, capAmount: null },
    customFields: [
      { name: 'Health Conditions', type: 'text', required: false },
      { name: 'Trainer Assigned', type: 'text', required: false },
    ],
  },
  {
    id: 'housing',
    displayName: 'Housing Society',
    description:
      'Apartments, gated communities, cooperative societies. Manage maintenance charges with unit-wise billing, sinking fund, parking, and AGM-ready reports.',
    terminology: {
      customer: 'Unit',
      customerPlural: 'Units',
      contact: 'Owner',
      group: 'Block / Tower',
      groupPlural: 'Blocks',
      billingPeriod: 'Calendar Month',
      customerId: 'Flat Number',
    },
    defaultComponents: [
      { name: 'Maintenance', frequency: 'recurring', required: true, amount: 5000, description: 'Monthly maintenance charges' },
      { name: 'Sinking Fund', frequency: 'recurring', required: true, amount: 1000, description: 'Reserve fund contribution' },
      { name: 'Parking', frequency: 'recurring', required: false, amount: 800, description: 'Per parking slot charge' },
      { name: 'Club House', frequency: 'recurring', required: false, amount: 500, description: 'Club and amenity access' },
      { name: 'Water Charges', frequency: 'recurring', required: false, amount: 300, description: 'Water usage charges' },
    ],
    defaultDiscounts: [
      { name: 'Senior Citizen Waiver', category: 'category_waiver', defaultValue: '10%', description: '10% maintenance waiver for senior citizens' },
      { name: 'Committee Member Waiver', category: 'category_waiver', defaultValue: '100%', description: 'Full waiver for committee members' },
      { name: 'Advance Payment Discount', category: 'early_payment', defaultValue: '3%', description: '3% off for annual advance payment' },
    ],
    defaultSchedule: 'monthly',
    defaultLateFee: { enabled: true, type: 'percentage', value: 18, gracePeriodDays: 15, capAmount: null },
    customFields: [
      { name: 'Carpet Area (sq ft)', type: 'text', required: true },
      { name: 'Parking Slot Number', type: 'text', required: false },
    ],
  },
  {
    id: 'services',
    displayName: 'Professional Services',
    description:
      'Freelancers, consultants, agencies, tutors. Manage client billing with retainer structures, milestone-based payments, and client ageing reports.',
    terminology: {
      customer: 'Client',
      customerPlural: 'Clients',
      contact: 'Client',
      group: 'Project / Retainer',
      groupPlural: 'Projects',
      billingPeriod: 'Calendar Month',
      customerId: 'Client ID',
    },
    defaultComponents: [
      { name: 'Monthly Retainer', frequency: 'recurring', required: true, amount: 50000, description: 'Recurring monthly retainer fee' },
      { name: 'Project Fee', frequency: 'one-time', required: false, amount: 25000, description: 'One-time project-based fee' },
      { name: 'Expenses', frequency: 'recurring', required: false, amount: 5000, description: 'Reimbursable expenses' },
      { name: 'Hosting & Infrastructure', frequency: 'recurring', required: false, amount: 3000, description: 'Hosting and infra charges' },
    ],
    defaultDiscounts: [
      { name: 'Long-Term Discount', category: 'commitment', defaultValue: '5%', description: '5% off for 6+ month retainers' },
      { name: 'Referral Discount', category: 'ad_hoc', defaultValue: '10%', description: '10% off first month for referrals' },
    ],
    defaultSchedule: 'monthly',
    defaultLateFee: { enabled: true, type: 'percentage', value: 1.5, gracePeriodDays: 7, capAmount: null },
    customFields: [
      { name: 'Company Name', type: 'text', required: false },
      { name: 'Project Name', type: 'text', required: false },
    ],
  },
  {
    id: 'custom',
    displayName: 'Custom',
    description:
      'Build your own billing setup from scratch. Define your own terminology, components, schedules, and discounts for any business type.',
    terminology: {
      customer: 'Customer',
      customerPlural: 'Customers',
      contact: 'Contact',
      group: 'Group',
      groupPlural: 'Groups',
      billingPeriod: 'Month',
      customerId: 'Customer ID',
    },
    defaultComponents: [],
    defaultDiscounts: [],
    defaultSchedule: 'monthly',
    defaultLateFee: { enabled: false, type: 'flat', value: 0, gracePeriodDays: 0, capAmount: null },
    customFields: [],
  },
];
