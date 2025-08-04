import { SectionData } from "../pages/Editor";

interface LivePreviewProps {
  sections: SectionData[];
  onSectionClick?: (sectionId: string) => void;
  selectedSection?: string | null;
}

export const LivePreview = ({ sections, onSectionClick, selectedSection }: LivePreviewProps) => {
  const handleSectionClick = (sectionId: string) => {
    onSectionClick?.(sectionId);
  };

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderSection = (section: SectionData) => {
    const baseStyle = {
      backgroundColor: section.backgroundColor,
      backgroundImage: section.backgroundImage ? `url(${section.backgroundImage})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    const isSelected = selectedSection === section.id;
    const sectionClasses = `cursor-pointer transition-all duration-200 ${
      isSelected ? 'ring-4 ring-primary ring-opacity-50' : 'hover:ring-2 hover:ring-primary/30'
    } ${section.fontSize || 'text-base'} ${section.fontFamily || 'font-sans'}`;

    switch (section.type) {
      case 'navbar':
        const navItems = section.content.split(' | ');
        return (
          <nav 
            id={section.id}
            key={section.id}
            className={`p-4 text-center border-b ${sectionClasses}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
             <div className="flex items-center justify-between max-w-6xl mx-auto">
               {/* Logo and Company Info */}
               <div className="flex items-center gap-3">
                 {section.logo && (
                   <img 
                     src={section.logo} 
                     alt="Logo" 
                     className="h-8 w-auto object-contain"
                   />
                 )}
                 <div>
                   <span className={`font-bold text-lg ${
                     section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                       ? 'text-white' 
                       : 'text-foreground'
                   }`}>
                     {section.companyName || navItems[0]}
                   </span>
                   {section.slogan && (
                     <p className={`text-xs ${
                       section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                         ? 'text-white/70' 
                         : 'text-muted-foreground'
                     }`}>
                       {section.slogan}
                     </p>
                   )}
                 </div>
               </div>

              {/* Navigation Links */}
              <div className="flex items-center gap-6">
                {navItems.slice(1).map((item, index) => (
                  <span 
                    key={index} 
                    className={`hover:text-teal-accent cursor-pointer transition-colors ${
                      section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                        ? 'text-white hover:text-white/70' 
                        : 'text-foreground hover:text-primary'
                    }`}
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
            </div>
          </nav>
        );

      case 'hero':
        const heroContent = section.content.split(' | ');
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`py-20 px-4 text-center ${sectionClasses}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
           >
             <div className="max-w-4xl mx-auto">
               {section.textElements && section.textElements.length > 0 ? (
                 section.textElements.map((textEl, index) => (
                   <div
                     key={textEl.id}
                     className={`mb-4 ${textEl.fontSize} ${textEl.fontFamily} ${
                       section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                         ? 'text-white' 
                         : 'text-foreground'
                     }`}
                   >
                     {textEl.content}
                   </div>
                 ))
               ) : (
                 <>
                   <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
                     section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                       ? 'text-white' 
                       : 'text-foreground'
                   }`}>
                     {heroContent[0] || 'Welcome'}
                   </h1>
                   {heroContent[1] && (
                     <p className={`text-lg md:text-xl mb-8 ${
                       section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                         ? 'text-white/90' 
                         : 'text-muted-foreground'
                     }`}>
                       {heroContent[1]}
                     </p>
                   )}
                 </>
               )}
               <button className={`px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 ${
                 section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal')
                   ? 'bg-white text-teal-dark hover:bg-white/90'
                   : 'bg-primary text-primary-foreground hover:bg-primary/90'
               }`}>
                 Get Started
               </button>
             </div>
           </section>
        );

      case 'about':
        const aboutContent = section.content.split(' | ');
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`py-16 px-4 ${sectionClasses}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
           >
             <div className="max-w-4xl mx-auto text-center">
               {section.textElements && section.textElements.length > 0 ? (
                 section.textElements.map((textEl) => (
                   <div
                     key={textEl.id}
                     className={`mb-4 ${textEl.fontSize} ${textEl.fontFamily} ${
                       section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                         ? 'text-white' 
                         : 'text-foreground'
                     }`}
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
            className={`py-16 px-4 ${sectionClasses}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className="max-w-6xl mx-auto">
              <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-center ${
                section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                  ? 'text-white' 
                  : 'text-foreground'
              }`}>
                Gallery
              </h2>
              {section.galleryImages && section.galleryImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {section.galleryImages.map((image, index) => (
                    <div 
                      key={index} 
                      className="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="aspect-square bg-muted rounded-lg flex items-center justify-center"
                    >
                      <span className="text-muted-foreground">Image {i}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'footer':
        return (
          <footer 
            id={section.id}
            key={section.id}
            className={`py-8 px-4 text-center border-t ${sectionClasses}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className="max-w-6xl mx-auto">
              <p className={`${
                section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                  ? 'text-white/80' 
                  : 'text-muted-foreground'
              }`}>
                {section.content}
              </p>
            </div>
          </footer>
        );

      case 'services':
      case 'testimonials':
      case 'contact':
      case 'team':
      case 'pricing':
      case 'features':
      case 'blog':
        return (
          <section 
            id={section.id}
            key={section.id}
            className={`py-16 px-4 ${sectionClasses}`}
            style={baseStyle}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className="max-w-4xl mx-auto text-center">
              {section.textElements && section.textElements.length > 0 ? (
                section.textElements.map((textEl) => (
                  <div
                    key={textEl.id}
                    className={`mb-4 ${textEl.fontSize} ${textEl.fontFamily} ${
                      section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                        ? 'text-white' 
                        : 'text-foreground'
                    }`}
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
                    {section.content.split(' | ')[0] || section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                  </h2>
                  {section.content.split(' | ')[1] && (
                    <p className={`text-lg ${
                      section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                        ? 'text-white/90' 
                        : 'text-muted-foreground'
                    }`}>
                      {section.content.split(' | ')[1]}
                    </p>
                  )}
                </>
              )}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="min-h-full">
        {sections.map(renderSection)}
      </div>
    </div>
  );
};