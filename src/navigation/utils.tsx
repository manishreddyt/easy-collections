import { matchPath } from 'react-router-dom';

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

const RazorpayLogo = () => {
  return (
    <img
      width="116"
      height="24"
      src="https://razorpay.com/newsroom-content/uploads/2020/12/output-onlinepngtools-1-1.png"
      alt="Razorpay"
    />
  );
};

export { isItemActive, RazorpayLogo };
