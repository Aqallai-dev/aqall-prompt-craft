import { useState, useEffect, createContext, useContext } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations.en) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

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
    testimonials: "Testimonials",
    team: "Team", 
    pricing: "Pricing",
    features: "Features",
    blog: "Blog",
    
    // Typography
    typography: "Typography",
    fontSize: "Font Size", 
    fontFamily: "Font Family",
    textElements: "Text Elements",
    addText: "Add Text",

    companyName: "Company Name",
    slogan: "Slogan",
    galleryImages: "Gallery Images",
    clickToUpload: "Click to upload",
    orDragAndDrop: "or drag and drop",
    addSection: "Add Section",
    gallery: "Gallery",
    
    // Messages
    websiteGenerated: "Website generated successfully!",
    enterPrompt: "Please enter a prompt to generate your website",
    generatingWebsite: "Generating your website...",
    
    // Additional Landing Page Elements
    welcomeBack: "Welcome back!",
    signOut: "Sign Out",
    signIn: "Sign In",
    signUp: "Sign Up",
    describeVision: "Describe Your Vision",
    tellUsWhat: "Tell us what you want to create",
    creatingWebsite: "Creating Your Website...",
    lightningFast: "Lightning Fast",
    beautifulDesign: "Beautiful Design",
    responsive: "Responsive",
    lightningFastDesc: "Generate complete websites in seconds with our advanced AI technology",
    beautifulDesignDesc: "Every website comes with stunning, modern design that looks professional",
    responsiveDesc: "All websites are fully responsive and work perfectly on all devices",
    contactUs: "Contact Us",
    followUs: "Follow Us",
    transformingIdeas: "Transforming ideas into stunning websites with the power of AI.",
    manchesterUK: "Manchester, United Kingdom",
    copyright: "© 2024 Aqall AI. All rights reserved. | Manchester, United Kingdom",
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
    testimonials: "الشهادات",
    team: "الفريق",
    pricing: "الأسعار", 
    features: "المميزات",
    blog: "المدونة",
    
    // Typography
    typography: "الطباعة",
    fontSize: "حجم الخط",
    fontFamily: "نوع الخط",
    textElements: "عناصر النص",
    addText: "إضافة نص",
    legacyContent: "المحتوى القديم",
    companyName: "اسم الشركة",
    slogan: "الشعار",
    galleryImages: "صور المعرض",
    clickToUpload: "انقر للرفع",
    orDragAndDrop: "أو اسحب وأسقط",
    addSection: "إضافة قسم",
    gallery: "معرض الصور",
    
    // Messages
    websiteGenerated: "تم إنشاء الموقع بنجاح!",
    enterPrompt: "يرجى إدخال وصف لإنشاء موقعك",
    generatingWebsite: "جاري إنشاء موقعك...",
    
    // Additional Landing Page Elements
    welcomeBack: "مرحباً بعودتك!",
    signOut: "تسجيل الخروج",
    signIn: "تسجيل الدخول",
    signUp: "إنشاء حساب",
    describeVision: "صف رؤيتك",
    tellUsWhat: "أخبرنا بما تريد إنشاءه",
    creatingWebsite: "جاري إنشاء موقعك...",
    lightningFast: "سريع كالبرق",
    beautifulDesign: "تصميم جميل",
    responsive: "متجاوب",
    lightningFastDesc: "أنشئ مواقع ويب كاملة في ثوانٍ بتقنية الذكاء الاصطناعي المتقدمة",
    beautifulDesignDesc: "كل موقع يأتي مع تصميم مذهل وعصري يبدو احترافياً",
    responsiveDesc: "جميع المواقع متجاوبة بالكامل وتعمل بشكل مثالي على جميع الأجهزة",
    contactUs: "اتصل بنا",
    followUs: "تابعنا",
    transformingIdeas: "تحويل الأفكار إلى مواقع ويب مذهلة بقوة الذكاء الاصطناعي.",
    manchesterUK: "مانشستر، المملكة المتحدة",
    copyright: "© 2024 عقال الذكي. جميع الحقوق محفوظة. | مانشستر، المملكة المتحدة",
  },
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};