import { SectionData } from "./WebsiteBuilder";

interface LivePreviewProps {
  sections: SectionData[];
}

export const LivePreview = ({ sections }: LivePreviewProps) => {
  const renderSection = (section: SectionData) => {
    const baseStyle = {
      backgroundColor: section.backgroundColor,
      backgroundImage: section.backgroundImage ? `url(${section.backgroundImage})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    switch (section.type) {
      case 'navbar':
        return (
          <nav 
            key={section.id}
            className="p-4 text-center border-b"
            style={baseStyle}
          >
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              {section.content.split(' | ').map((item, index) => (
                <span 
                  key={index} 
                  className={`${index === 0 ? 'font-bold text-lg' : 'hover:text-teal-accent cursor-pointer'} ${
                    section.backgroundColor !== 'transparent' && section.backgroundColor.includes('--teal') 
                      ? 'text-white' 
                      : 'text-foreground'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </nav>
        );

      case 'hero':
        const heroContent = section.content.split(' | ');
        return (
          <section 
            key={section.id}
            className="py-20 px-4 text-center"
            style={baseStyle}
          >
            <div className="max-w-4xl mx-auto">
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
            key={section.id}
            className="py-16 px-4"
            style={baseStyle}
          >
            <div className="max-w-4xl mx-auto text-center">
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
            </div>
          </section>
        );

      case 'footer':
        return (
          <footer 
            key={section.id}
            className="py-8 px-4 text-center border-t"
            style={baseStyle}
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

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="min-h-full">
        {sections
          .sort((a, b) => {
            const order = { navbar: 0, hero: 1, about: 2, footer: 3 };
            return order[a.type] - order[b.type];
          })
          .map(renderSection)}
      </div>
    </div>
  );
};