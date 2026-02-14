export type PaymentLinkStatus = 'active' | 'expired' | 'deactivated';

export interface PaymentLink {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: PaymentLinkStatus;
  created: string;
  createdAt: Date;
  views: number;
  paid: number;
  shortUrl: string;
  expiryDate: string | null;
  partialPayments: boolean;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  notes: string;
}

export interface CreatePaymentLinkFormData {
  title: string;
  description: string;
  amount: string;
  expiryDate: Date | null;
  partialPayments: boolean;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
}

export type FormErrors = Partial<Record<keyof CreatePaymentLinkFormData, string>>;

export type PaymentLinksAction =
  | { type: 'ADD_LINK'; payload: PaymentLink }
  | { type: 'UPDATE_LINK'; payload: { id: string; updates: Partial<PaymentLink> } }
  | { type: 'TOGGLE_STATUS'; payload: { id: string; status: PaymentLinkStatus } };

export interface StatusBadgeConfig {
  color: 'positive' | 'negative' | 'notice';
  label: string;
}
