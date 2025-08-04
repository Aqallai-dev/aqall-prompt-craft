import { useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

const translations = {
  en: {
    // Landing Page
    landingTitle: "Aqall AI",
    landingSubtitle: "Website Builder",
    landingHeading: "Build Websites with AI",
    landingDescription: "Create stunning websites in seconds. Just describe what you want and let AI do the magic.",
    promptPlaceholder: "Describe your website... (e.g., 'A modern portfolio for a web developer' or 'An elegant restaurant website')",
    generateButton: "Generate Website",
    generating: "Generating...",
    
    // Editor Page
    editorTitle: "Website Editor",
    livePreview: "Live Preview",
    customizeSections: "Customize Sections",
    
    // Sections
    navbar: "Navbar",
    hero: "Hero",
    about: "About", 
    footer: "Footer",
    
    // Section Editor
    content: "Content",
    background: "Background",
    logo: "Logo",
    uploadLogo: "Upload Logo",
    uploadBackground: "Upload Background Image",
    removeBackground: "Remove Background",
    removeLogo: "Remove Logo",
    applyColor: "Apply",
    scrollTarget: "Scroll Target",
    selectSection: "Select section to scroll to",
    
    // Background options
    noBackground: "No Background",
    customBackground: "Custom Background",
    
    // Navigation
    home: "Home",
    about_nav: "About",
    services: "Services", 
    contact: "Contact",
    
    // Typography
    typography: "Typography",
    fontSize: "Font Size", 
    fontFamily: "Font Family",
    
    // Messages
    websiteGenerated: "Website generated successfully!",
    enterPrompt: "Please enter a prompt to generate your website",
    generatingWebsite: "Generating your website...",
  },
  ar: {
    // Landing Page  
    landingTitle: "عقال الذكي",
    landingSubtitle: "منشئ المواقع",
    landingHeading: "إنشاء مواقع بالذكاء الاصطناعي",
    landingDescription: "أنشئ مواقع ويب مذهلة في ثوانٍ. فقط صف ما تريد ودع الذكاء الاصطناعي يقوم بالسحر.",
    promptPlaceholder: "صف موقعك الإلكتروني... (مثال: 'موقع شخصي عصري لمطور ويب' أو 'موقع أنيق لمطعم')",
    generateButton: "إنشاء الموقع",
    generating: "جاري الإنشاء...",
    
    // Editor Page
    editorTitle: "محرر الموقع",
    livePreview: "المعاينة المباشرة",
    customizeSections: "تخصيص الأقسام",
    
    // Sections
    navbar: "شريط التنقل",
    hero: "القسم الرئيسي", 
    about: "نبذة عنا",
    footer: "التذييل",
    
    // Section Editor
    content: "المحتوى",
    background: "الخلفية",
    logo: "الشعار",
    uploadLogo: "رفع شعار",
    uploadBackground: "رفع صورة خلفية",
    removeBackground: "إزالة الخلفية",
    removeLogo: "إزالة الشعار", 
    applyColor: "تطبيق",
    scrollTarget: "هدف التمرير",
    selectSection: "اختر القسم للتمرير إليه",
    
    // Background options
    noBackground: "بدون خلفية",
    customBackground: "خلفية مخصصة",
    
    // Navigation
    home: "الرئيسية",
    about_nav: "نبذة عنا", 
    services: "الخدمات",
    contact: "اتصل بنا",
    
    // Typography
    typography: "الطباعة",
    fontSize: "حجم الخط",
    fontFamily: "نوع الخط",
    
    // Messages
    websiteGenerated: "تم إنشاء الموقع بنجاح!",
    enterPrompt: "يرجى إدخال وصف لإنشاء موقعك",
    generatingWebsite: "جاري إنشاء موقعك...",
  },
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return { language, toggleLanguage, t, isRTL };
};