import React from 'react';
import { matchPath, useLocation, Link, Routes, Route, Navigate } from 'react-router-dom';
import {
  SideNavBody,
  SideNav,
  SideNavLink,
  SideNavLevel,
  SideNavSection,
  SideNavFooter,
  SideNavItem,
  Box,
  Indicator,
  Switch as BladeSwitch,
  BoxIcon,
  SettingsIcon,
  UserIcon,
  SIDE_NAV_EXPANDED_L1_WIDTH_BASE,
  SIDE_NAV_EXPANDED_L1_WIDTH_XL,
} from '@razorpay/blade/components';
import { navItemsJSON } from './NavItems';
import Home from '../pages/Home';
import Transactions from '../pages/Transactions';
import PaymentLinks from '../pages/PaymentLinks';
import PlaceholderPage from '../pages/PlaceholderPage';
import EasyCollections from '../pages/EasyCollections';
import AccountSettings from '../pages/AccountSettings';
import Customers from '../pages/Customers';

interface NavItem {
  icon?: React.ComponentType;
  title: string;
  href?: string;
  items?: NavItem[];
  trailing?: React.ReactNode;
  activeOnLinks?: string[];
}

const getAllChildHrefs = (items: NavItem[]): string[] => {
  const hrefs: string[] = [];
  items.forEach((item) => {
    if (item.href) hrefs.push(item.href);
    if (item.items) hrefs.push(...getAllChildHrefs(item.items));
  });
  return hrefs;
};

const isItemActive = (
  location: { pathname: string },
  { href, activeOnLinks }: { href?: string; activeOnLinks?: string[] },
) => {
  const isCurrentPathActive = Boolean(matchPath(location.pathname, href ?? ''));
  const isSubItemActive = Boolean(
    activeOnLinks?.find((link) => matchPath(location.pathname, link)),
  );
  return isCurrentPathActive || isSubItemActive;
};

const NavLink = (props: {
  icon?: React.ComponentType;
  title: string;
  href?: string;
  items?: unknown[];
  activeOnLinks?: string[];
  children?: React.ReactNode;
  as?: React.ElementType;
  [key: string]: unknown;
}) => {
  const location = useLocation();
  return (
    // @ts-expect-error - SideNavLink type compatibility
    <SideNavLink
      {...props}
      as={Link}
      isActive={isItemActive(location, {
        href: props.href,
        activeOnLinks: props.activeOnLinks,
      })}
    />
  );
};

const SideNavComponent = ({
  isOpen,
  onDismiss,
}: {
  isOpen: boolean;
  onDismiss: () => void;
}) => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(isOpen);
  const [isTestModeActive, setIsTestModeActive] = React.useState(false);
  const location = useLocation();

  const getDefaultSectionExpanded = (items: NavItem[]) => {
    const activeItem = items.find((l1Item) =>
      isItemActive(location, {
        href: l1Item.href,
        activeOnLinks: l1Item.items ? getAllChildHrefs(l1Item.items) : undefined,
      }),
    );
    return Boolean(activeItem);
  };

  return (
    <>
      <SideNav
        isOpen={isMobileOpen}
        onDismiss={() => {
          onDismiss();
          setIsMobileOpen(false);
        }}
        position="absolute"
      >
        <SideNavBody>
          {navItemsJSON.map((l1Sections) => (
            <SideNavSection
              key={l1Sections.title ?? 'main'}
              title={l1Sections.title}
              maxVisibleItems={l1Sections.maxItemsVisible}
              defaultIsExpanded={getDefaultSectionExpanded(
                l1Sections.items.slice(l1Sections.maxItemsVisible),
              )}
            >
              {l1Sections.items.map((l1Item) => {
                if (!l1Item.items) {
                  return <NavLink key={l1Item.title} {...l1Item} />;
                }
                return (
                  <NavLink
                    key={l1Item.title}
                    {...l1Item}
                    activeOnLinks={getAllChildHrefs(l1Item.items)}
                    href={l1Item.items[0].href}
                  >
                    <SideNavLevel key={l1Item.title}>
                      {l1Item.items.map((l2Item) => (
                        <NavLink key={l2Item.title} {...l2Item} />
                      ))}
                    </SideNavLevel>
                  </NavLink>
                );
              })}
            </SideNavSection>
          ))}
        </SideNavBody>
        <SideNavFooter>
          <SideNavItem
            as="label"
            title="Test Mode"
            leading={
              <Indicator
                color={isTestModeActive ? 'notice' : 'positive'}
                emphasis="intense"
                accessibilityLabel=""
              />
            }
            backgroundColor={isTestModeActive ? 'feedback.background.notice.subtle' : undefined}
            trailing={
              <BladeSwitch
                accessibilityLabel=""
                size="small"
                isChecked={isTestModeActive}
                onChange={({ isChecked }) => setIsTestModeActive(isChecked)}
              />
            }
          />
          <NavLink
            title="Settings"
            icon={SettingsIcon}
            href="/app/settings/user"
            activeOnLinks={['/app/settings/user', '/app/settings/account']}
          >
            <SideNavLevel>
              <NavLink icon={UserIcon} title="User Settings" href="/app/settings/user" />
              <NavLink icon={BoxIcon} title="Account Settings" href="/app/settings/account" />
            </SideNavLevel>
          </NavLink>
        </SideNavFooter>
      </SideNav>
      <Box
        marginLeft={{
          base: '100%',
          m: `${SIDE_NAV_EXPANDED_L1_WIDTH_BASE}px`,
          xl: `${SIDE_NAV_EXPANDED_L1_WIDTH_XL}px`,
        }}
        height="calc(100vh - 58px)"
      >
        <Box height="100%" overflowY="scroll" backgroundColor="surface.background.gray.intense">
          <Routes>
            <Route path="/app/home" element={<Home />} />
            <Route path="/app/transactions/*" element={<Transactions />} />
            <Route path="/app/payment-links" element={<PaymentLinks />} />
            <Route path="/app/easy-collections" element={<EasyCollections />} />
            <Route path="/app/payment-pages" element={<PlaceholderPage title="Payment Pages" />} />
            <Route path="/app/invoices" element={<PlaceholderPage title="Invoices" />} />
            <Route path="/app/smart-collect" element={<PlaceholderPage title="Smart Collect" />} />
            <Route path="/app/route" element={<PlaceholderPage title="Route" />} />
            <Route path="/app/instant-refunds" element={<PlaceholderPage title="Instant Refunds" />} />
            <Route path="/app/customers" element={<Customers />} />
            <Route path="/app/disputes" element={<PlaceholderPage title="Disputes" />} />
            <Route path="/app/account" element={<AccountSettings />} />
            <Route path="/app/settings/*" element={<PlaceholderPage title="Settings" />} />
            <Route path="*" element={<Navigate to="/app/home" replace />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default SideNavComponent;
