import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, Check } from 'lucide-react';

const LanguageBanner = () => {
  const { t, i18n } = useTranslation();

  const languageNames: { [key: string]: string } = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    hi: 'हिन्दी',
    zh: '中文',
    ja: '日本語',
    ar: 'العربية',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-pink-100 py-2"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 text-sm">
          <Globe className="w-4 h-4 text-purple-600" />
          <span className="text-gray-700 font-medium">
            {t('common.language')}: <span className="text-purple-600 font-semibold">{languageNames[i18n.language] || 'English'}</span>
          </span>
          <Check className="w-4 h-4 text-green-600" />
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageBanner;
