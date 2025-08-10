import { SectionData } from "../pages/Editor";
import { Star, Mail, Phone, MapPin, Twitter, Linkedin, Github, ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface LivePreviewProps {
  sections: SectionData[];
  onSectionClick?: (sectionId: string) => void;
  selectedSection?: string | null;
  deviceMode?: 'desktop' | 'tablet' | 'mobile';
  showGrid?: boolean;
  showAnimations?: boolean;
}

export const LivePreview = ({ 
  sections, 
  onSectionClick, 
  selectedSection,
  deviceMode = 'desktop',
  showGrid = false,
  showAnimations = true
}: LivePreviewProps) => {

    // Helper function to determine text color based on background color
  const getTextColor = (backgroundColor: string, isPrimary = true) => {
    if (!backgroundColor || backgroundColor === 'transparent') {
      return isPrimary ? 'text-foreground' : 'text-muted-foreground';
    }

    // If it's a hex color, determine if it's light or dark
    if (backgroundColor.startsWith('#')) {
      const hex = backgroundColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      return brightness > 128 ? 'text-foreground' : 'text-white';
    }

    // If it's a gradient, assume dark background
    if (backgroundColor.includes('gradient')) {
      return 'text-white';
    }

    // For CSS variables, use the old logic
    if (backgroundColor.includes('--teal')) {
      return isPrimary ? 'text-white' : 'text-white/70';
    }

    return isPrimary ? 'text-foreground' : 'text-muted-foreground';
  };

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSectionClick = (sectionId: string) => {
    onSectionClick?.(sectionId);
  };

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getDeviceClasses = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'w-full';
    }
  };

  const getAnimationClasses = (animation?: string) => {
    if (!showAnimations || !animation || animation === 'none') return '';
    
    const animationClasses = {
      fadeIn: 'animate-fade-in',
      slideUp: 'animate-slide-up',
      slideDown: 'animate-slide-down',
      zoomIn: 'animate-zoom-in',
      bounce: 'animate-bounce'
    };
    
    return animationClasses[animation as keyof typeof animationClasses] || '';
  };

  const renderSection = (section: SectionData) => {
    const baseStyle = {
      backgroundColor: section.backgroundColor,
      backgroundImage: section.backgroundImage ? `url(${section.backgroundImage})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: section.padding ? `${section.padding.top}px ${section.padding.right}px ${section.padding.bottom}px ${section.padding.left}px` : undefined,
      margin: section.margin ? `${section.margin.top}px ${section.margin.right}px ${section.margin.bottom}px ${section.margin.left}px` : undefined,
      borderRadius: section.borderRadius ? `${section.borderRadius}px` : undefined,
      borderWidth: section.borderWidth ? `${section.borderWidth}px` : undefined,
      borderColor: section.borderColor,
      opacity: section.opacity,
      maxWidth: section.maxWidth,
      minHeight: section.minHeight,
    };

    // Add default section padding if no custom padding is set
    const sectionPadding = section.padding ? undefined : 'py-8 md:py-12';

    const isSelected = selectedSection === section.id;
    const sectionClasses = `cursor-pointer transition-all duration-200 ${
      isSelected ? 'ring-4 ring-primary ring-opacity-50' : 'hover:ring-2 hover:ring-primary/30'
    } ${section.fontSize || 'text-base'} ${section.fontFamily || 'font-sans'} ${
      section.shadow && section.shadow !== 'none' ? `shadow-${section.shadow}` : ''
    } ${getAnimationClasses(section.animation)}`;

    const layoutClasses = section.layout === 'grid' ? `grid grid-cols-${section.columns || 1} gap-${section.gap || 4}` :
                         section.layout === 'flex' ? 'flex flex-wrap gap-4' :
                         section.layout === 'masonry' ? 'columns-2 md:columns-3 lg:columns-4 gap-4' :
                         'space-y-4';

    const alignmentClasses = section.alignment ? `text-${section.alignment}` : '';

    switch (section.type) {
      case 'navbar':
        const navItems = section.content.split(' | ');
        return (
                    <nav 
            id={section.id}
            key={section.id}
            className={`sticky top-0 z-50 border-b backdrop-blur-md ${sectionClasses}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
             <div className="flex items-center justify-between max-w-6xl mx-auto px-4 py-3">
               {/* Logo and Company Info */}
               <div className="flex items-center gap-3">
                 <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                   {section.logo ? (
                     <img 
                       src={section.logo} 
                       alt="Logo" 
                       className="h-6 w-6 object-contain"
                     />
                   ) : (
                     <div className="text-xs text-white/60 font-medium">LOGO</div>
                   )}
                 </div>
                 <div className="hidden sm:block">
                                        <span className={`font-bold text-lg ${getTextColor(section.backgroundColor, true)}`}>
                       {section.companyName || navItems[0]}
                     </span>
                     {section.slogan && (
                       <p className={`text-xs ${getTextColor(section.backgroundColor, false)}`}>
                         {section.slogan}
                       </p>
                     )}
                 </div>
               </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-6">
                {navItems.slice(1).map((item, index) => (
                  <span 
                    key={index} 
                    className={`cursor-pointer transition-colors ${
                      getTextColor(section.backgroundColor, true)
                    } hover:opacity-70`}
                    onClick={(e) => {
                      e.stopPropagation();
                      const targetSection = section.scrollTargets?.[item];
                      if (targetSection) {
                        scrollToSection(targetSection);
                      }
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        );

      case 'hero':
        const heroContent = section.content.split(' | ');
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`text-center min-h-screen flex items-center justify-center px-4 ${sectionClasses} ${sectionPadding}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
           >
             <div className={`max-w-4xl mx-auto ${layoutClasses} ${alignmentClasses}`}>
               {section.textElements && section.textElements.length > 0 ? (
                 section.textElements.map((textEl, index) => (
                   <div
                     key={textEl.id}
                     className={`mb-4 ${textEl.fontSize} ${textEl.fontFamily} ${
                       textEl.color || (section.textColor ? '' : getTextColor(section.backgroundColor, true))
                     } ${textEl.textAlign ? `text-${textEl.textAlign}` : ''}`}
                     style={section.textColor ? { color: section.textColor } : {}}
                   >
                     {textEl.content}
                   </div>
                 ))
               ) : (
                 <>
                   <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 ${getTextColor(section.backgroundColor, true)}`}>
                     {heroContent[0] || 'Welcome'}
                   </h1>
                   {heroContent[1] && (
                     <p className={`text-base md:text-lg lg:text-xl mb-6 md:mb-8 ${getTextColor(section.backgroundColor, false)}`}>
                       {heroContent[1]}
                     </p>
                   )}
                 </>
               )}
               
               {/* Button Elements */}
               {section.buttonElements && section.buttonElements.length > 0 && (
                 <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8">
                   {section.buttonElements.map((button) => (
                     <button
                       key={button.id}
                       className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all hover:scale-105 btn-animated text-sm md:text-base ${
                         button.variant === 'primary' 
                           ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                           : button.variant === 'secondary'
                           ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                           : button.variant === 'outline'
                           ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                           : button.variant === 'ghost'
                           ? 'hover:bg-accent hover:text-accent-foreground'
                           : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                       } ${
                         button.size === 'sm' ? 'px-3 md:px-4 py-2 text-sm' :
                         button.size === 'lg' ? 'px-6 md:px-8 py-3 md:py-4 text-base md:text-lg' :
                         'px-4 md:px-6 py-2 md:py-3'
                       }`}
                     >
                       {button.text}
                     </button>
                   ))}
                 </div>
               )}
             </div>
           </section>
        );

      case 'features':
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`${sectionClasses} ${sectionPadding}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className={`max-w-6xl mx-auto ${layoutClasses} ${alignmentClasses}`}>
              {section.textElements && section.textElements.length > 0 && (
                <div className="text-center mb-12">
                  {section.textElements.map((textEl) => (
                    <div
                      key={textEl.id}
                      className={`mb-4 ${textEl.fontSize} ${textEl.fontFamily} ${
                        textEl.color || (section.textColor ? '' : getTextColor(section.backgroundColor, true))
                      } ${textEl.textAlign ? `text-${textEl.textAlign}` : ''}`}
                    >
                      {textEl.content}
                    </div>
                  ))}
                </div>
              )}
              
                             {section.services && (
                 <div className="flex justify-center">
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl">
                     {section.services.map((service, index) => (
                       <div key={index} className="group p-4 md:p-6 rounded-xl bg-card border interactive-card-enhanced text-center">
                         <div className="text-3xl md:text-4xl mb-4 floating-enhanced mx-auto">{service.icon}</div>
                         <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                         <p className="text-muted-foreground mb-4 text-sm md:text-base">{service.description}</p>
                         <ul className="space-y-2 text-left">
                           {service.features.map((feature, idx) => (
                             <li key={idx} className="flex items-center text-xs md:text-sm hover:text-primary transition-colors cursor-pointer">
                               <span className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                               {feature}
                             </li>
                           ))}
                         </ul>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
            </div>
          </section>
        );

      case 'stats':
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`${sectionClasses} ${sectionPadding}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className={`max-w-6xl mx-auto ${layoutClasses} ${alignmentClasses}`}>
              {section.textElements && section.textElements.length > 0 && (
                <div className="text-center mb-12">
                  {section.textElements.map((textEl) => (
                    <div
                      key={textEl.id}
                      className={`mb-4 ${textEl.fontSize} ${textEl.fontFamily} ${
                        textEl.color || (section.textColor ? '' : getTextColor(section.backgroundColor, true))
                      } ${textEl.textAlign ? `text-${textEl.textAlign}` : ''}`}
                    >
                      {textEl.content}
                    </div>
                  ))}
                </div>
              )}
              
                             {section.stats && (
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                   {section.stats.map((stat, index) => (
                     <div key={index} className="text-center group p-4 rounded-lg hover:bg-white/5 transition-all duration-300 hover:scale-105">
                       <div className="text-2xl md:text-3xl mb-2 floating-icon">{stat.icon}</div>
                       <div className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-2 stats-counter ${getTextColor(section.backgroundColor, true)}`}>
                         {stat.value}
                       </div>
                       <div className={`text-xs md:text-sm ${getTextColor(section.backgroundColor, false)}`}>
                         {stat.label}
                       </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </section>
        );

      case 'team':
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`${sectionClasses} ${sectionPadding}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className={`max-w-6xl mx-auto ${layoutClasses} ${alignmentClasses}`}>
              {section.textElements && section.textElements.length > 0 && (
                <div className="text-center mb-12">
                  {section.textElements.map((textEl) => (
                    <div
                      key={textEl.id}
                      className={`mb-4 ${textEl.fontSize} ${textEl.fontFamily} ${
                        textEl.color || (section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                          ? 'text-white' 
                          : 'text-foreground')
                      } ${textEl.textAlign ? `text-${textEl.textAlign}` : ''}`}
                    >
                      {textEl.content}
                    </div>
                  ))}
                </div>
              )}
              
                             {section.team && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                   {section.team.map((member, index) => (
                     <div key={index} className="text-center group team-member-card p-4 rounded-lg hover:bg-white/5 transition-all duration-300">
                       <div className="relative mb-4">
                         <img 
                           src={member.avatar || 'https://via.placeholder.com/150'} 
                           alt={member.name}
                           className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow"
                         />
                         <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                       </div>
                       <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors">{member.name}</h3>
                       <p className="text-primary mb-3 text-sm md:text-base">{member.role}</p>
                       <p className="text-muted-foreground mb-4 text-sm">{member.bio}</p>
                       <div className="flex justify-center gap-2 md:gap-3">
                         {member.social.twitter && (
                           <a href={member.social.twitter} className="p-2 rounded-full bg-muted social-link hover:bg-primary hover:text-primary-foreground">
                             <Twitter className="w-3 h-3 md:w-4 md:h-4" />
                           </a>
                         )}
                         {member.social.linkedin && (
                           <a href={member.social.linkedin} className="p-2 rounded-full bg-muted social-link hover:bg-primary hover:text-primary-foreground">
                             <Linkedin className="w-3 h-3 md:w-4 md:h-4" />
                           </a>
                         )}
                         {member.social.github && (
                           <a href={member.social.github} className="p-2 rounded-full bg-muted social-link hover:bg-primary hover:text-primary-foreground">
                             <Github className="w-3 h-3 md:w-4 md:h-4" />
                           </a>
                         )}
                       </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </section>
        );

      case 'testimonials':
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`${sectionClasses} ${sectionPadding}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className={`max-w-6xl mx-auto ${layoutClasses} ${alignmentClasses}`}>
              {section.textElements && section.textElements.length > 0 && (
                <div className="text-center mb-12">
                  {section.textElements.map((textEl) => (
                    <div
                      key={textEl.id}
                      className={`mb-4 ${textEl.fontSize} ${textEl.fontFamily} ${
                        textEl.color || (section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                          ? 'text-white' 
                          : 'text-foreground')
                      } ${textEl.textAlign ? `text-${textEl.textAlign}` : ''}`}
                    >
                      {textEl.content}
                    </div>
                  ))}
                </div>
              )}
              
                             {section.testimonials && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                                     {section.testimonials.map((testimonial, index) => (
                    <div key={index} className="p-4 md:p-6 rounded-xl bg-card border testimonial-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <img 
                          src={testimonial.avatar || 'https://via.placeholder.com/50'} 
                          alt={testimonial.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 md:mr-4 object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors">{testimonial.name}</h4>
                          <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic text-sm md:text-base">"{testimonial.content}"</p>
                    </div>
                  ))}
                 </div>
               )}
            </div>
          </section>
        );

      case 'pricing':
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`${sectionClasses} ${sectionPadding}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className={`max-w-6xl mx-auto ${layoutClasses} ${alignmentClasses}`}>
              {section.textElements && section.textElements.length > 0 && (
                <div className="text-center mb-12">
                  {section.textElements.map((textEl) => (
                    <div
                      key={textEl.id}
                      className={`mb-4 ${textEl.fontSize} ${textEl.fontFamily} ${
                        textEl.color || (section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                          ? 'text-white' 
                          : 'text-foreground')
                      } ${textEl.textAlign ? `text-${textEl.textAlign}` : ''}`}
                    >
                      {textEl.content}
                    </div>
                  ))}
                </div>
              )}
              
                             {section.pricing && (
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
                                     {section.pricing.map((plan, index) => (
                    <div key={index} className={`relative p-6 md:p-8 rounded-xl border pricing-card hover:shadow-xl transition-all duration-300 ${
                      plan.popular ? 'border-primary bg-primary/5 scale-105 popular' : 'bg-card'
                    }`}>
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="bg-primary text-primary-foreground px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-semibold pulse-important">
                            Most Popular
                          </span>
                        </div>
                      )}
                      <div className="text-center">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{plan.name}</h3>
                        <div className="mb-4 md:mb-6">
                          <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground text-sm md:text-base">/{plan.period}</span>
                        </div>
                        <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-xs md:text-sm hover:text-primary transition-colors">
                              <span className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <button className={`w-full py-2 md:py-3 px-4 md:px-6 rounded-lg font-semibold btn-animated text-sm md:text-base ${
                          plan.popular 
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                        }`}>
                          Get Started
                        </button>
                      </div>
                    </div>
                  ))}
                 </div>
               )}
            </div>
          </section>
        );

      case 'faq':
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`${sectionClasses} ${sectionPadding}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className={`max-w-4xl mx-auto ${layoutClasses} ${alignmentClasses}`}>
              {section.textElements && section.textElements.length > 0 && (
                <div className="text-center mb-12">
                  {section.textElements.map((textEl) => (
                    <div
                      key={textEl.id}
                      className={`mb-4 ${textEl.fontSize} ${textEl.fontFamily} ${
                        textEl.color || (section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                          ? 'text-white' 
                          : 'text-foreground')
                      } ${textEl.textAlign ? `text-${textEl.textAlign}` : ''}`}
                    >
                      {textEl.content}
                    </div>
                  ))}
                </div>
              )}
              
              {section.faq && (
                <div className="space-y-4">
                  {section.faq.map((item, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden faq-item">
                      <button
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedFaq(expandedFaq === index ? null : index);
                        }}
                      >
                        <span className="font-semibold">{item.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="px-6 pb-6 text-muted-foreground">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'newsletter':
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`${sectionClasses} ${sectionPadding}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className={`max-w-2xl mx-auto ${layoutClasses} ${alignmentClasses}`}>
              {section.textElements && section.textElements.length > 0 && (
                <div className="text-center mb-8">
                  {section.textElements.map((textEl) => (
                    <div
                      key={textEl.id}
                      className={`mb-4 ${textEl.fontSize} ${textEl.fontFamily} ${
                        textEl.color || (section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                          ? 'text-white' 
                          : 'text-foreground')
                      } ${textEl.textAlign ? `text-${textEl.textAlign}` : ''}`}
                    >
                      {textEl.content}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground newsletter-input text-sm md:text-base"
                />
                {section.buttonElements && section.buttonElements.length > 0 && (
                  <button className="px-4 md:px-6 py-2 md:py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors btn-animated text-sm md:text-base">
                    {section.buttonElements[0].text}
                  </button>
                )}
              </div>
            </div>
          </section>
        );

      case 'about':
        const aboutContent = section.content.split(' | ');
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`${sectionClasses} ${sectionPadding}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
           >
             <div className={`max-w-4xl mx-auto ${layoutClasses} ${alignmentClasses}`}>
               {section.textElements && section.textElements.length > 0 ? (
                 section.textElements.map((textEl) => (
                   <div
                     key={textEl.id}
                     className={`mb-4 ${textEl.fontSize} ${textEl.fontFamily} ${
                       textEl.color || (section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                         ? 'text-white' 
                         : 'text-foreground')
                     } ${textEl.textAlign ? `text-${textEl.textAlign}` : ''}`}
                   >
                     {textEl.content}
                   </div>
                 ))
               ) : (
                 <>
                   <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                     section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                       ? 'text-white' 
                       : 'text-foreground'
                   }`}>
                     {aboutContent[0] || 'About'}
                   </h2>
                   {aboutContent[1] && (
                     <p className={`text-lg ${
                       section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                         ? 'text-white/90' 
                         : 'text-muted-foreground'
                     }`}>
                       {aboutContent[1]}
                     </p>
                   )}
                 </>
               )}
             </div>
           </section>
        );

      case 'gallery':
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`${sectionClasses} ${sectionPadding}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className={`max-w-6xl mx-auto ${layoutClasses} ${alignmentClasses}`}>
              {section.textElements && section.textElements.length > 0 && (
                <div className="text-center mb-8">
                  {section.textElements.map((textEl) => (
                    <div
                      key={textEl.id}
                      className={`mb-4 ${textEl.fontSize} ${textEl.fontFamily} ${
                        textEl.color || (section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                          ? 'text-white' 
                          : 'text-foreground')
                      } ${textEl.textAlign ? `text-${textEl.textAlign}` : ''}`}
                    >
                      {textEl.content}
                    </div>
                  ))}
                </div>
              )}
              
              {section.galleryImages && section.galleryImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {section.galleryImages.map((image, index) => (
                    <div 
                      key={index} 
                      className="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg group cursor-pointer"
                    >
                      <img 
                        src={image} 
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, index) => (
                    <div 
                      key={index} 
                      className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground border-2 border-dashed hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                        <span className="text-xs">Add Image</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'contact':
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`${sectionClasses} ${sectionPadding}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className={`max-w-4xl mx-auto ${layoutClasses} ${alignmentClasses}`}>
              {section.textElements && section.textElements.length > 0 && (
                <div className="text-center mb-12">
                  {section.textElements.map((textEl) => (
                    <div
                      key={textEl.id}
                      className={`mb-4 ${textEl.fontSize} ${textEl.fontFamily} ${
                        textEl.color || (section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                          ? 'text-white' 
                          : 'text-foreground')
                      } ${textEl.textAlign ? `text-${textEl.textAlign}` : ''}`}
                    >
                      {textEl.content}
                    </div>
                  ))}
                </div>
              )}
              
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Get in Touch</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      <span className="text-sm md:text-base">hello@company.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      <span className="text-sm md:text-base">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      <span className="text-sm md:text-base">123 Business St, City, State 12345</span>
                    </div>
                  </div>
                </div>
                <div>
                  <form className="space-y-3 md:space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground text-sm md:text-base"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground text-sm md:text-base"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground resize-none text-sm md:text-base"
                    ></textarea>
                    {section.buttonElements && section.buttonElements.length > 0 && (
                      <button className="w-full px-4 md:px-6 py-2 md:py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors btn-animated text-sm md:text-base">
                        {section.buttonElements[0].text}
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>
        );

      case 'footer':
        return (
          <footer 
            id={section.id}
            key={section.id}
            className={`${sectionClasses} ${sectionPadding}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 py-6 md:py-8">
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">{section.companyName || 'Company Name'}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{section.slogan || 'Professional solutions for modern businesses'}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Services</h4>
                  <ul className="space-y-1 md:space-y-2 text-muted-foreground text-sm">
                    <li>Web Design</li>
                    <li>Development</li>
                    <li>Consulting</li>
                    <li>Support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Company</h4>
                  <ul className="space-y-1 md:space-y-2 text-muted-foreground text-sm">
                    <li>About Us</li>
                    <li>Team</li>
                    <li>Careers</li>
                    <li>Contact</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Connect</h4>
                  <div className="flex gap-2 md:gap-3">
                    <a href="#" className="p-2 rounded-full bg-muted social-link">
                      <Twitter className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-muted social-link">
                      <Linkedin className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-muted social-link">
                      <Github className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t py-3 md:py-4 text-center text-muted-foreground text-sm md:text-base">
                {section.content || '© 2024 Company Name. All rights reserved.'}
              </div>
            </div>
          </footer>
        );

      default:
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`${sectionClasses} ${sectionPadding}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className={`max-w-4xl mx-auto ${layoutClasses} ${alignmentClasses}`}>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                  ? 'text-white' 
                  : 'text-foreground'
              }`}>
                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
              </h2>
              <p className={`text-lg ${
                section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                  ? 'text-white/90' 
                  : 'text-muted-foreground'
              }`}>
                {section.content}
              </p>
            </div>
          </section>
        );
    }
  };

  return (
    <div className={`${getDeviceClasses()} ${showGrid ? 'bg-grid-pattern' : ''}`}>
      {sections.map((section, index) => (
        <div key={section.id}>
          {renderSection(section)}
        </div>
      ))}
    </div>
  );
};