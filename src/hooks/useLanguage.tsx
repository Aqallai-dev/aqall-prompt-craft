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
    promptPlaceholder: "Describe your website... (e.g., 'A modern restaurant website' or 'A tech company website' or 'A designer portfolio website')",
    generateButton: "Generate Website",
    generating: "Generating...",
    withAIMagic: "with AI Magic",
    
    // Editor Page
    editorTitle: "Website Editor",
    livePreview: "Live Preview",
    
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
    
    // Section Editor Tabs
    layout: "Layout",
    styling: "Styling",
    advanced: "Advanced",
    
    // Section Editor Labels
    customColor: "Custom Color",
    button: "Button",
    field: "Field",
    buttonText: "Button text...",
    fieldLabel: "Field label...",
    buttons: "Buttons",
    addButton: "Add Button",
    formFields: "Form Fields",
    addField: "Add Field",
    
    // Button Variants
    primary: "Primary",
    secondary: "Secondary",
    outline: "Outline",
    ghost: "Ghost",
    destructive: "Destructive",
    
    // Button Sizes
    small: "Small",
    medium: "Medium",
    large: "Large",
    
    // Field Types
    text: "Text",
    email: "Email",
    password: "Password",
    number: "Number",
    tel: "Phone",
    url: "URL",
    textarea: "Text Area",
    select: "Select",
    checkbox: "Checkbox",
    radio: "Radio",
    date: "Date",
    time: "Time",
    file: "File",
    
    // Layout Options
    stack: "Stack",
    grid: "Grid",
    flex: "Flex",
    center: "Center",
    left: "Left",
    right: "Right",
    
    // Advanced Options
    padding: "Padding",
    margin: "Margin",
    borderRadius: "Border Radius",
    borderWidth: "Border Width",
    shadow: "Shadow",
    animation: "Animation",
    
    // Animation Types
    none: "None",
    fadeIn: "Fade In",
    slideUp: "Slide Up",
    slideDown: "Slide Down",
    zoomIn: "Zoom In",
    bounce: "Bounce",
    
    // Shadow Types
    none: "None",
    sm: "Small",
    md: "Medium",
    lg: "Large",
    xl: "Extra Large",
    
    // Section Types (for display)
    navbar: "Navbar",
    hero: "Hero",
    about: "About",
    services: "Services",
    testimonials: "Testimonials",
    contact: "Contact",
    gallery: "Gallery",
    team: "Team",
    pricing: "Pricing",
    features: "Features",
    blog: "Blog",
    cta: "Call to Action",
    stats: "Statistics",
    faq: "FAQ",
    newsletter: "Newsletter",
    
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
    gallery: "Gallery",
    
    // Messages
    websiteGenerated: "Website generated successfully!",
    enterPrompt: "Please enter a prompt to generate your website",
    generatingWebsite: "Generating your website...",
    failedToGenerate: "Failed to generate website. Please try again.",
    signedOutSuccessfully: "Signed out successfully",
    
    // Editor Page
    websiteBuilder: "Website Builder",
    advancedWebsiteCreationTools: "Advanced website creation tools",
    templates: "Templates",
    sectionTemplates: "Section Templates",
    templatesDescription: "Choose from pre-built section templates to speed up your website creation.",
    addSection: "Add Section",
    heroSection: "Hero Section",
    aboutSection: "About Section",
    servicesSection: "Services Section",
    testimonialsSection: "Testimonials Section",
    contactSection: "Contact Section",
    gallerySection: "Gallery Section",
    teamSection: "Team Section",
    pricingSection: "Pricing Section",
    featuresSection: "Features Section",
    blogSection: "Blog Section",
    callToAction: "Call to Action",
    statistics: "Statistics",
    faqSection: "FAQ Section",
    newsletterSection: "Newsletter Section",
    proTip: "Pro Tip",
    proTipText: "Use templates for faster website creation. Click on any section to edit its content and styling.",
    sections: "Sections",
    styling: "Styling",
    export: "Export",
    currentSections: "Current Sections",
    clickToEditContent: "Click to edit content",
    editSection: "Edit Section",
    customizeContentStylingAndLayout: "Customize content, styling, and layout",
    globalStyling: "Global Styling",
    devicePreview: "Device Preview",
    desktop: "Desktop",
    tablet: "Tablet",
    mobile: "Mobile",
    showGrid: "Show Grid",
    showAnimations: "Show Animations",
    publishAndExportOptions: "Publish & Export Options",
    publishWebsite: "Publish Website",
    publishDescription: "Make your website live with custom domain or subdomain",
    downloadOptions: "Download Options",
    exportAsHTML: "Export as HTML",
    exportCSSOnly: "Export CSS Only",
    shareLink: "Share Link",
    livePreview: "Live Preview",
    realTimeWebsitePreview: "Real-time website preview",
    fullscreen: "Fullscreen",
    newWindow: "New Window",
    backToHome: "Back to Home",
    back: "Back",
    locked: "🔒 Locked",
    changesLeft: "changes left",
    websiteEditor: "Website Editor",
    customizeYourWebsiteSections: "Customize your website sections",
    editorLocked: "Editor Locked",
    editorLockedDescription: "You've reached the free editing limit ({changeCount} changes made). Choose a plan to continue editing your website.",
    chooseAPlan: "Choose a Plan",
    exitFullscreen: "Exit Fullscreen",
    fullPreviewMode: "Full Preview Mode",
    sectionAdded: "section added",
    sectionRemoved: "Section removed",
    sectionDuplicated: "Section duplicated",
    sectionAddedFromTemplate: "section added from template!",
    websiteExportedSuccessfully: "Website exported successfully!",
    purchaseSuccessfulMonthly: "Purchase successful! You now have unlimited editing with subdomain hosting.",
    purchaseSuccessfulAnnual: "Purchase successful! You now have unlimited editing with custom domain included.",
    reachedFreeEditingLimit: "You've reached the free editing limit. Please choose a plan to continue editing.",
    pleaseCompletePurchase: "Please complete your purchase to continue editing.",
    newSection: "New section",
    copy: "(Copy)",
    aiGeneratedWebsiteLoaded: "AI-generated website loaded successfully!",
    
    // Auth Page
    welcome: "Welcome",
    signIn: "Sign In",
    signUp: "Sign Up",
    signOut: "Sign Out",
    email: "Email",
    password: "Password",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    createPassword: "Create a password (min 6 characters)",
    signingIn: "Signing in...",
    creatingAccount: "Creating account...",
    createAccount: "Create Account",
    pleaseFillFields: "Please fill in all fields",
    passwordMinLength: "Password must be at least 6 characters",
    welcomeBack: "Welcome back!",
    accountCreated: "Account created! Please check your email to confirm your account.",
    emailAlreadyRegistered: "This email is already registered. Please sign in instead.",
    
    // Additional Landing Page Elements
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
    describeVision: "Describe Your Vision",
    tellUsWhat: "Tell us what you want to create",
    creatingWebsite: "Creating Your Website...",
  },
  ar: {
    // Landing Page  
    landingTitle: "أقل أي آي",
    landingSubtitle: "منشئ المواقع",
    landingHeading: "إنشاء مواقع بالذكاء الاصطناعي",
    landingDescription: "أنشئ مواقع ويب مذهلة في ثوانٍ. فقط صف ما تريد ودع الذكاء الاصطناعي يقوم بالسحر.",
    promptPlaceholder: "صف موقعك الإلكتروني... (مثال: 'موقع مطعم عصري' أو 'موقع شركة تقنية' أو 'موقع شخصي للمصمم')",
    generateButton: "إنشاء الموقع",
    generating: "جاري الإنشاء...",
    withAIMagic: "بسحر الذكاء الاصطناعي",
    
    // Editor Page
    editorTitle: "محرر الموقع",
    livePreview: "المعاينة المباشرة",
    
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
    
    // Section Editor Tabs
    layout: "تخطيط",
    styling: "التنسيق",
    advanced: "متقدم",
    
    // Section Editor Labels
    customColor: "لون مخصص",
    button: "زر",
    field: "حقل",
    buttonText: "نص الزر...",
    fieldLabel: "تسمية الحقل...",
    buttons: "الأزرار",
    addButton: "إضافة زر",
    formFields: "حقول النموذج",
    addField: "إضافة حقل",
    
    // Button Variants
    primary: "رئيسي",
    secondary: "ثانوي",
    outline: "خارجي",
    ghost: "روحي",
    destructive: "تدميري",
    
    // Button Sizes
    small: "صغير",
    medium: "متوسط",
    large: "كبير",
    
    // Field Types
    text: "نص",
    email: "بريد إلكتروني",
    password: "كلمة المرور",
    number: "رقم",
    tel: "هاتف",
    url: "رابط",
    textarea: "نص منطقة",
    select: "اختيار",
    checkbox: "مربع الاختيار",
    radio: "تسطيب",
    date: "تاريخ",
    time: "وقت",
    file: "ملف",
    
    // Layout Options
    stack: "متداخل",
    grid: "شبكة",
    flex: "مرن",
    center: "مركز",
    left: "يسار",
    right: "يمين",
    
    // Advanced Options
    padding: "تباعد",
    margin: "هامش",
    borderRadius: "زاوية الحدود",
    borderWidth: "عرض الحدود",
    shadow: "ظل",
    animation: "تحريك",
    
    // Animation Types
    none: "لا شيء",
    fadeIn: "تضاءة",
    slideUp: "تحريك لأعلى",
    slideDown: "تحريك لأسفل",
    zoomIn: "تكبير",
    bounce: "ركض",
    
    // Shadow Types
    none: "لا شيء",
    sm: "صغير",
    md: "متوسط",
    lg: "كبير",
    xl: "كبير إضافي",
    
    // Section Types (for display)
    navbar: "شريط التنقل",
    hero: "القسم الرئيسي",
    about: "نبذة عنا",
    services: "الخدمات",
    testimonials: "الشهادات",
    contact: "اتصل بنا",
    gallery: "المعرض",
    team: "الفريق",
    pricing: "الأسعار", 
    features: "المميزات",
    blog: "المدونة",
    cta: "التنبيه للعملية",
    stats: "الأحصائيات",
    faq: "الأسئلة الشائعة",
    newsletter: "الخبر الإخباري",
    
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
    gallery: "معرض الصور",
    
    // Messages
    websiteGenerated: "تم إنشاء الموقع بنجاح!",
    enterPrompt: "يرجى إدخال وصف لإنشاء موقعك",
    generatingWebsite: "جاري إنشاء موقعك...",
    failedToGenerate: "فشل في إنشاء الموقع. يرجى المحاولة مرة أخرى.",
    signedOutSuccessfully: "تم تسجيل الخروج بنجاح",
    
    // Editor Page
    websiteBuilder: "منشئ المواقع",
    advancedWebsiteCreationTools: "أدوات إنشاء المواقع المتقدمة",
    templates: "القوالب",
    sectionTemplates: "قوالب الأقسام",
    templatesDescription: "اختر من قوالب أقسام مبنية مسبقاً لتسريع إنشاء موقعك.",
    addSection: "إضافة قسم",
    heroSection: "القسم الرئيسي",
    aboutSection: "القسم المعرف بنا",
    servicesSection: "القسم الخدمات",
    testimonialsSection: "القسم الشهادات",
    contactSection: "القسم الاتصال",
    gallerySection: "القسم المعرض",
    teamSection: "القسم الفريق",
    pricingSection: "القسم الأسعار",
    featuresSection: "القسم المميزات",
    blogSection: "القسم المدونة",
    callToAction: "التنبيه للعملية",
    statistics: "الأحصائيات",
    faqSection: "القسم الأسئلة الشائعة",
    newsletterSection: "القسم الخبر الإخباري",
    proTip: "نصيحة مميزة",
    proTipText: "استخدم القوالب لتسريع إنشاء المواقع. انقر على أي قسم لتعديل محتواه وتنسيقه.",
    sections: "الأقسام",
    styling: "التنسيق",
    export: "التصدير",
    currentSections: "الأقسام الحالية",
    clickToEditContent: "انقر لتعديل المحتوى",
    editSection: "تعديل القسم",
    customizeContentStylingAndLayout: "تخصيص المحتوى، التنسيق، والتخطيط",
    globalStyling: "التنسيق العالمي",
    devicePreview: "عرض الجهاز",
    desktop: "الكمبيوتر المكتبي",
    tablet: "الجهاز اللوحي",
    mobile: "الجهاز المحمول",
    showGrid: "إظهار الشبكة",
    showAnimations: "إظهار التحريكات",
    publishAndExportOptions: "خيارات النشر والتصدير",
    publishWebsite: "نشر الموقع",
    publishDescription: "جعل موقعك حياً مع أسم مجال أو صفحة جانبية",
    downloadOptions: "خيارات التحميل",
    exportAsHTML: "تصدير كـ HTML",
    exportCSSOnly: "تصدير CSS فقط",
    shareLink: "رابط المشاركة",
    livePreview: "المعاينة المباشرة",
    realTimeWebsitePreview: "عرض موقع ويب حي بالوقت الفعلي",
    fullscreen: "الشاشة الكاملة",
    newWindow: "نافذة جديدة",
    backToHome: "العودة إلى الصفحة الرئيسية",
    back: "العودة",
    locked: "🔒 مقفل",
    changesLeft: "تغييرات متبقية",
    websiteEditor: "محرر الموقع",
    customizeYourWebsiteSections: "تخصيص أقسام موقعك",
    editorLocked: "محرر مقفل",
    editorLockedDescription: "لقد وصلت إلى حد التحرير المجاني ({changeCount} تغييرات قمت بها). اختر خطةً للمتابعة.",
    chooseAPlan: "اختر خطة",
    exitFullscreen: "خروج من الشاشة الكاملة",
    fullPreviewMode: "وضع المعاينة الكاملة",
    sectionAdded: "قسم إضافة",
    sectionRemoved: "قسم إزالة",
    sectionDuplicated: "قسم تكرار",
    sectionAddedFromTemplate: "قسم إضافة من القالب!",
    websiteExportedSuccessfully: "تم تصدير الموقع بنجاح!",
    purchaseSuccessfulMonthly: "تم الشراء بنجاح! الآن لديك تحرير بلا حدود مع تجربة المجال الفرعي.",
    purchaseSuccessfulAnnual: "تم الشراء بنجاح! الآن لديك تحرير بلا حدود مع المجال المخصص مدمج.",
    reachedFreeEditingLimit: "لقد وصلت إلى حد التحرير المجاني. يرجى اختيار خطةً للمتابعة.",
    pleaseCompletePurchase: "يرجى إكمال عملية الشراء للمتابعة.",
    newSection: "قسم جديد",
    copy: "(نسخ)",
    aiGeneratedWebsiteLoaded: "تم تحميل الموقع المولد بنجاح بواسطة الذكاء الاصطناعي!",
    
    // Auth Page
    welcome: "مرحباً",
    signIn: "تسجيل الدخول",
    signUp: "إنشاء حساب",
    signOut: "تسجيل الخروج",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    enterEmail: "أدخل بريدك الإلكتروني",
    enterPassword: "أدخل كلمة المرور الخاصة بك",
    createPassword: "أنشئ كلمة مرور (أقل من 6 أحرف)",
    signingIn: "جاري تسجيل الدخول...",
    creatingAccount: "جاري إنشاء الحساب...",
    createAccount: "إنشاء حساب",
    pleaseFillFields: "يرجى ملء جميع الحقول",
    passwordMinLength: "يجب أن تكون كلمة المرور أقل من 6 أحرف",
    welcomeBack: "مرحباً بعودتك!",
    accountCreated: "تم إنشاء الحساب! يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك.",
    emailAlreadyRegistered: "هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول بدلاً من ذلك.",
    
    // Additional Landing Page Elements
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
    describeVision: "وصف رؤيتك",
    tellUsWhat: "أخبرنا ما تريد إنشاء",
    creatingWebsite: "جاري إنشاء موقعك...",
  },
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ar');

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