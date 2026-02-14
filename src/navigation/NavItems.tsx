import React from 'react';
import {
  HomeIcon,
  TransactionsIcon,
  ArrowUpRightIcon,
  FileTextIcon,
  RoutesIcon,
  ClockIcon,
  BankIcon,
  UserCheckIcon,
  SmartCollectIcon,
  StampIcon,
  RewindIcon,
  WalletIcon,
} from '@razorpay/blade/components';

type NavItem = {
  icon?: React.ComponentType;
  title: string;
  href: string;
  trailing?: React.ReactNode;
  activeOnLinks?: string[];
  items?: NavItem[];
};

type NavSection = {
  type: 'section';
  title?: string;
  maxItemsVisible: number;
  items: NavItem[];
};

export const navItemsJSON: NavSection[] = [
  {
    type: 'section',
    maxItemsVisible: 3,
    items: [
      {
        icon: HomeIcon,
        title: 'Home',
        href: '/app/home',
      },
      {
        icon: TransactionsIcon,
        title: 'Transactions',
        href: '/app/transactions',
        items: [
          { title: 'Payments', href: '/app/transactions/payments' },
          { title: 'Settlements', href: '/app/transactions/settlements' },
          { title: 'Refunds', href: '/app/transactions/refunds' },
          { title: 'Disputes', href: '/app/transactions/disputes' },
        ],
      },
    ],
  },
  {
    type: 'section',
    title: 'Products',
    maxItemsVisible: 7,
    items: [
      {
        icon: ArrowUpRightIcon,
        title: 'Payment Links',
        href: '/app/payment-links',
      },
      {
        icon: WalletIcon,
        title: 'Easy Collections',
        href: '/app/easy-collections',
      },
      {
        icon: FileTextIcon,
        title: 'Payment Pages',
        href: '/app/payment-pages',
      },
      {
        icon: StampIcon,
        title: 'Invoices',
        href: '/app/invoices',
      },
      {
        icon: SmartCollectIcon,
        title: 'Smart Collect',
        href: '/app/smart-collect',
      },
      {
        icon: RoutesIcon,
        title: 'Route',
        href: '/app/route',
      },
      {
        icon: RewindIcon,
        title: 'Instant Refunds',
        href: '/app/instant-refunds',
      },
    ],
  },
  {
    type: 'section',
    title: 'Risk & Compliance',
    maxItemsVisible: 3,
    items: [
      {
        icon: UserCheckIcon,
        title: 'Customers',
        href: '/app/customers',
      },
      {
        icon: ClockIcon,
        title: 'Disputes',
        href: '/app/disputes',
      },
      {
        icon: BankIcon,
        title: 'Account & Settings',
        href: '/app/account',
      },
    ],
  },
];
