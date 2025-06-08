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
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/blog", label: t("blog") },
    { href: "/search", label: t("search"), icon: <FiSearch /> },
  ];

  if (status === "authenticated") {
    navLinks.push({
      href: "/favorites",
      label: t("favorites"),
      icon: <FiHeart />,
    });
  }

  const NavLink = ({
    href,
    label,
    icon,
  }: {
    href: string;
    label: string;
    icon?: React.ReactNode;
  }) => (
    <li>
      <Link
        href={href}
        className={`flex items-center pb-1 hover:text-primary transition-colors ${
          pathname === href
            ? "text-primary border-b-2 border-primary font-semibold"
            : "text-foreground/70"
        }`}
      >
        {icon && <span className="mr-1.5 align-middle">{icon}</span>}
        {label}
      </Link>
    </li>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
          {t("title")}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            <ul className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </ul>
            <div className="flex items-center space-x-3">
              <LocaleSwitcherSelect />
              <ThemeSwitcher />
              {status === "loading" ? (
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              ) : session ? (
                <button
                  onClick={() => signOut()}
                  title={t("signOut")}
                  className="hover:text-primary transition-colors"
                >
                  <FiLogOut size={22} />
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <FiLogIn size={22} />
                  <span>{t("signIn")}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t("toggleMenu")}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden"
            >
              <div className="py-4 space-y-4">
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} {...link} />
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <LocaleSwitcherSelect />
                  <ThemeSwitcher />
                  {status === "authenticated" ? (
                    <button
                      onClick={() => signOut()}
                      className="flex items-center space-x-2 hover:text-primary transition-colors"
                    >
                      <FiLogOut size={20} />
                      <span>{t("signOut")}</span>
                    </button>
                  ) : (
                    <Link
                      href="/signin"
                      className="flex items-center space-x-2 hover:text-primary transition-colors"
                    >
                      <FiLogIn size={20} />
                      <span>{t("signIn")}</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
