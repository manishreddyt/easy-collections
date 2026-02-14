import type { PaymentLink, StatusBadgeConfig, CreatePaymentLinkFormData, PaymentLinksAction } from './types';

export const STATUS_BADGE_MAP: Record<string, StatusBadgeConfig> = {
  active: { color: 'positive', label: 'Active' },
  expired: { color: 'notice', label: 'Expired' },
  deactivated: { color: 'negative', label: 'Deactivated' },
};

export const INITIAL_FORM_DATA: CreatePaymentLinkFormData = {
  title: '',
  description: '',
  amount: '',
  expiryDate: null,
  partialPayments: false,
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  notes: '',
};

export const QUICK_FILTER_OPTIONS = ['All', 'Active', 'Expired', 'Deactivated'] as const;

export const INITIAL_PAYMENT_LINKS: PaymentLink[] = [
  {
    id: 'plink_QR1a2b3c4d',
    title: 'Course Registration - Advanced React',
    description: 'Registration fee for the Advanced React workshop series',
    amount: 14999,
    status: 'active',
    created: '13 Feb 2026',
    createdAt: new Date('2026-02-13'),
    views: 245,
    paid: 89,
    shortUrl: 'rzp.io/l/react-course',
    expiryDate: '2026-03-31',
    partialPayments: false,
    customer: { name: '', email: '', phone: '' },
    notes: '',
  },
  {
    id: 'plink_OP5e6f7g8h',
    title: 'Workshop Fee - Design Systems',
    description: 'Admission fee for Design Systems bootcamp',
    amount: 4999,
    status: 'active',
    created: '12 Feb 2026',
    createdAt: new Date('2026-02-12'),
    views: 120,
    paid: 34,
    shortUrl: 'rzp.io/l/design-ws',
    expiryDate: '2026-04-15',
    partialPayments: false,
    customer: { name: '', email: '', phone: '' },
    notes: '',
  },
  {
    id: 'plink_MN9i0j1k2l',
    title: 'Consulting Session - Q1 Strategy',
    description: 'One-on-one strategy consulting for Q1 planning',
    amount: 75000,
    status: 'expired',
    created: '05 Feb 2026',
    createdAt: new Date('2026-02-05'),
    views: 15,
    paid: 3,
    shortUrl: 'rzp.io/l/q1-consult',
    expiryDate: '2026-02-10',
    partialPayments: true,
    customer: { name: 'Rajiv Mehta', email: 'rajiv@corp.com', phone: '9876543210' },
    notes: 'Enterprise consulting engagement',
  },
  {
    id: 'plink_KL3m4n5o6p',
    title: 'Merchandise - Limited Edition T-Shirt',
    description: 'Community exclusive branded t-shirt',
    amount: 1299,
    status: 'active',
    created: '01 Feb 2026',
    createdAt: new Date('2026-02-01'),
    views: 890,
    paid: 267,
    shortUrl: 'rzp.io/l/ltd-tshirt',
    expiryDate: null,
    partialPayments: false,
    customer: { name: '', email: '', phone: '' },
    notes: 'Sizes: S, M, L, XL',
  },
  {
    id: 'plink_IJ7q8r9s0t',
    title: 'Annual Subscription Renewal',
    description: 'Yearly subscription renewal for premium plan',
    amount: 29999,
    status: 'deactivated',
    created: '28 Jan 2026',
    createdAt: new Date('2026-01-28'),
    views: 50,
    paid: 12,
    shortUrl: 'rzp.io/l/annual-sub',
    expiryDate: '2026-02-28',
    partialPayments: false,
    customer: { name: '', email: '', phone: '' },
    notes: '',
  },
  {
    id: 'plink_GH5u4v3w2x',
    title: 'Photography Workshop - Beginner',
    description: 'Introductory photography class with hands-on practice',
    amount: 3499,
    status: 'active',
    created: '25 Jan 2026',
    createdAt: new Date('2026-01-25'),
    views: 340,
    paid: 98,
    shortUrl: 'rzp.io/l/photo-begin',
    expiryDate: '2026-03-20',
    partialPayments: false,
    customer: { name: '', email: '', phone: '' },
    notes: '',
  },
  {
    id: 'plink_EF1y0z9a8b',
    title: 'Yoga Retreat - Weekend Package',
    description: 'Two-day wellness retreat in Rishikesh',
    amount: 12500,
    status: 'active',
    created: '20 Jan 2026',
    createdAt: new Date('2026-01-20'),
    views: 560,
    paid: 142,
    shortUrl: 'rzp.io/l/yoga-retreat',
    expiryDate: '2026-04-01',
    partialPayments: true,
    customer: { name: '', email: '', phone: '' },
    notes: 'Includes accommodation and meals',
  },
  {
    id: 'plink_CD7c6d5e4f',
    title: 'Freelancer Invoice - Jan 2026',
    description: 'Monthly freelance development invoice',
    amount: 85000,
    status: 'expired',
    created: '15 Jan 2026',
    createdAt: new Date('2026-01-15'),
    views: 5,
    paid: 1,
    shortUrl: 'rzp.io/l/inv-jan26',
    expiryDate: '2026-01-31',
    partialPayments: false,
    customer: { name: 'Priya Sharma', email: 'priya@freelance.io', phone: '9123456789' },
    notes: 'Web development project',
  },
  {
    id: 'plink_AB3g2h1i0j',
    title: 'Charity Donation - Flood Relief',
    description: 'Donation collection for flood relief efforts in Assam',
    amount: 500,
    status: 'active',
    created: '10 Jan 2026',
    createdAt: new Date('2026-01-10'),
    views: 2340,
    paid: 876,
    shortUrl: 'rzp.io/l/flood-relief',
    expiryDate: null,
    partialPayments: false,
    customer: { name: '', email: '', phone: '' },
    notes: 'Tax-exempt under 80G',
  },
  {
    id: 'plink_ZY9k8l7m6n',
    title: 'E-book: Product Management Guide',
    description: 'Comprehensive PM guide for aspiring product managers',
    amount: 799,
    status: 'active',
    created: '05 Jan 2026',
    createdAt: new Date('2026-01-05'),
    views: 1200,
    paid: 456,
    shortUrl: 'rzp.io/l/pm-guide',
    expiryDate: null,
    partialPayments: false,
    customer: { name: '', email: '', phone: '' },
    notes: 'PDF delivered via email',
  },
  {
    id: 'plink_XW5o4p3q2r',
    title: 'SaaS Demo Booking Fee',
    description: 'Refundable booking fee for enterprise demo slot',
    amount: 2000,
    status: 'deactivated',
    created: '01 Jan 2026',
    createdAt: new Date('2026-01-01'),
    views: 30,
    paid: 8,
    shortUrl: 'rzp.io/l/demo-book',
    expiryDate: '2026-01-15',
    partialPayments: false,
    customer: { name: '', email: '', phone: '' },
    notes: 'Fully refundable after demo',
  },
  {
    id: 'plink_VU1s0t9u8v',
    title: 'Music Concert - Front Row Pass',
    description: 'Premium front row access to live music event',
    amount: 5999,
    status: 'expired',
    created: '20 Dec 2025',
    createdAt: new Date('2025-12-20'),
    views: 780,
    paid: 200,
    shortUrl: 'rzp.io/l/concert-vip',
    expiryDate: '2025-12-31',
    partialPayments: false,
    customer: { name: '', email: '', phone: '' },
    notes: '',
  },
];

export const generateId = (): string =>
  `plink_${Math.random().toString(36).substring(2, 14)}`;

export const generateShortUrl = (title: string): string => {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 20);
  return `rzp.io/l/${slug}`;
};

export const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

export const getConversionRate = (paid: number, views: number): string =>
  views === 0 ? '0.0' : ((paid / views) * 100).toFixed(1);

export function paymentLinksReducer(state: PaymentLink[], action: PaymentLinksAction): PaymentLink[] {
  switch (action.type) {
    case 'ADD_LINK':
      return [action.payload, ...state];
    case 'UPDATE_LINK':
      return state.map(link =>
        link.id === action.payload.id ? { ...link, ...action.payload.updates } : link,
      );
    case 'TOGGLE_STATUS':
      return state.map(link =>
        link.id === action.payload.id ? { ...link, status: action.payload.status } : link,
      );
    default:
      return state;
  }
}
