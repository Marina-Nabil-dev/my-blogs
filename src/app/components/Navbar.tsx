"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "@/app/components/ui/ThemeSwitcher";
import LocaleSwitcherSelect from "@/app/components/ui/LanguageSwitcher";
import { useSession, signOut } from "next-auth/react";
import {
  FiLogIn,
  FiLogOut,
  FiHeart,
  FiSearch,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// Custom hook for hydration-safe mounting
const useHydrationSafeMount = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

// Custom hook for throttled scroll handling
const useThrottledScroll = (threshold: number = 10) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const mounted = useHydrationSafeMount();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsScrolled(window.scrollY > threshold);
      }, 16); // ~60fps throttling
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [mounted, threshold]);

  return { isScrolled, mounted };
};

// Loading skeleton component
const AuthSkeleton = () => (
  <span className="w-8 h-8 bg-gray-200 rounded-full animate-pulse dark:bg-gray-700" />
);

// Consolidated auth section component with better optimization
const AuthSection = ({ isMobile = false }: { isMobile?: boolean }) => {
  const t = useTranslations("Navbar");
  const { data: session, status } = useSession();
  const mounted = useHydrationSafeMount();

  // Early returns for loading states
  if (!mounted || status === "loading") {
    return isMobile ? null : <AuthSkeleton />;
  }

  const buttonClass = isMobile
    ? "flex items-center space-x-2 transition-colors hover:text-primary"
    : "transition-colors hover:text-primary";

  const iconSize = isMobile ? 20 : 22;

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        title={t("signOut")}
        className={buttonClass}
        aria-label={t("signOut")}
      >
        <FiLogOut size={iconSize} />
        {isMobile && <span>{t("signOut")}</span>}
      </button>
    );
  }

  return (
    <Link
      href="/signin"
      className={`flex items-center transition-colors hover:text-primary ${
        isMobile ? "space-x-2" : "space-x-1"
      }`}
    >
      <FiLogIn size={iconSize} />
      <span>{t("signIn")}</span>
    </Link>
  );
};

// Memoized navigation link component
const NavLink = ({
  href,
  label,
  icon,
  isActive,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  isActive: boolean;
}) => (
  <li>
    <Link
      href={href}
      className={`flex items-center pb-1 hover:text-primary transition-colors ${
        isActive
          ? "text-primary border-b-2 border-primary font-semibold"
          : "text-foreground/70"
      }`}
    >
      {icon && <span className="mr-1.5 align-middle">{icon}</span>}
      {label}
    </Link>
  </li>
);

// Memoized mobile menu component
const MobileMenu = ({
  isOpen,
  navLinks,
  pathname,
}: {
  isOpen: boolean;
  navLinks: Array<{ href: string; label: string; icon?: React.ReactNode }>;
  pathname: string;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="md:hidden overflow-hidden"
      >
        <div className="py-4 space-y-4">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                isActive={pathname === link.href}
              />
            ))}
          </ul>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <LocaleSwitcherSelect />
            <ThemeSwitcher />
            <AuthSection isMobile />
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isScrolled, mounted } = useThrottledScroll(10);

  // Memoize navigation links with better dependency tracking
  const navLinks = useMemo(() => {
    const baseLinks = [
      { href: "/", label: t("home") },
      { href: "/blog", label: t("blog") },
      { href: "/search", label: t("search"), icon: <FiSearch /> },
    ];

    // Only add favorites link if user is authenticated
    if (mounted && status === "authenticated" && session) {
      baseLinks.push({
        href: "/favorites",
        label: t("favorites"),
        icon: <FiHeart />,
      });
    }

    return baseLinks;
  }, [t, mounted, status, session]);

  // Memoized mobile menu toggle handler
  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        mounted && isScrolled
          ? "shadow-sm backdrop-blur-md bg-background/80"
          : "bg-background"
      }`}
    >
      {mounted && (
        <div className="container px-4 py-3 mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              {t("title")}
            </Link>

            {/* Desktop Navigation */}
            {mounted && (
              <div className="hidden items-center space-x-5 md:flex">
                <ul className="flex items-center space-x-6">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      {...link}
                      isActive={pathname === link.href}
                    />
                  ))}
                </ul>

                <LocaleSwitcherSelect />
                <ThemeSwitcher />
                <AuthSection />
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="p-2 transition-colors md:hidden hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
              onClick={handleMobileMenuToggle}
              aria-label={t("toggleMenu")}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
          {/* Mobile Menu */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            navLinks={navLinks}
            pathname={pathname}
          />
        </div>
      )}
    </nav>
  );
}
