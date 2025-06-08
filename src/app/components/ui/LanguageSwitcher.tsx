// components/LanguageSwitcher.tsx
"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

import { FiGlobe } from "react-icons/fi";

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const nextLocale = locale === "en" ? "ar" : "en";

  const handleLanguageSwitch = () => {
    router.push(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={handleLanguageSwitch}
      className="relative flex items-center px-3 py-2"
    >
      <FiGlobe className="absolute left-2 text-gray-500" size={18} />
      <span className="ml-6">
        {nextLocale === "en" ? "English" : "العربية"}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
