import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";

type NavLink = { label: string; href: string; active?: boolean };

type HeaderConfig = {
  siteName: string;
  navLinks?: NavLink[];
  userName?: string;
  userEmail?: string;
};

type PageLayoutProps = {
  children: ReactNode;
  /** Pass undefined to omit the header entirely */
  header?: HeaderConfig;
  /** Optional additional classes on the <main> content wrapper */
  contentClassName?: string;
  className?: string;
};

export function PageLayout({
  children,
  header,
  contentClassName = '',
  className = '',
}: PageLayoutProps) {
  return (
    <div
      className={[
        'min-h-screen flex flex-col',
        'bg-cls-surface-raised',
        className,
      ].join(' ')}
    >
      {/* Top navigation */}
      {header && (
        <SiteHeader
          siteName={header.siteName}
          navLinks={header.navLinks}
          userName={header.userName}
          userEmail={header.userEmail}
        />
      )}

      {/* Page content */}
      <main
        className={[
          'flex-1 w-full mx-auto max-w-7xl',
          'px-4 sm:px-6 lg:px-8',
          'py-8 lg:py-10',
          contentClassName,
        ].join(' ')}
      >
        {children}
      </main>
    </div>
  );
}
