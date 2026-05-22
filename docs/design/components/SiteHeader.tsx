import Link from "next/link";

type NavLink = {
  label: string;
  href: string;
  active?: boolean;
};

type SiteHeaderProps = {
  siteName: string;
  navLinks?: NavLink[];
  userName?: string;
  userEmail?: string;
  className?: string;
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export function SiteHeader({
  siteName,
  navLinks = [],
  userName,
  userEmail,
  className = '',
}: SiteHeaderProps) {
  return (
    <header
      className={[
        'flex items-center justify-between gap-6',
        'h-14 px-6',
        'bg-cls-nav text-cls-inverse',
        className,
      ].join(' ')}
    >
      {/* ── Site name / logo ── */}
      <Link
        href="/"
        className={[
          'text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0',
          'opacity-100 hover:opacity-80 transition-opacity duration-[100ms]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm',
        ].join(' ')}
      >
        {siteName}
      </Link>

      {/* ── Nav links ── */}
      {navLinks.length > 0 && (
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-0.5 flex-1 justify-center"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.active ? 'page' : undefined}
              className={[
                'px-4 py-1.5 rounded-full text-sm font-medium',
                'transition-colors duration-[100ms]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
                link.active
                  ? 'bg-white/15 text-white'
                  : 'text-white/55 hover:text-white hover:bg-white/10',
              ].join(' ')}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      {/* ── User info ── */}
      {(userName || userEmail) && (
        <div className="flex items-center gap-3 shrink-0">
          {/* Name + email (hidden on small screens) */}
          {userName && (
            <div className="hidden sm:flex flex-col items-end leading-none">
              <span className="text-sm font-semibold text-white">{userName}</span>
              {userEmail && (
                <span className="text-xs text-white/45 mt-0.5">{userEmail}</span>
              )}
            </div>
          )}

          {/* Avatar */}
          {userName && (
            <div
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"
              aria-label={`User: ${userName}`}
              role="img"
            >
              <span className="text-xs font-bold text-white" aria-hidden="true">
                {getInitials(userName)}
              </span>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
