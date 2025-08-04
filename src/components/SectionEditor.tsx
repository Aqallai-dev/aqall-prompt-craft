import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { LogoUploader } from "./LogoUploader";
import { BackgroundImageUploader } from "./BackgroundImageUploader";
import { SectionData } from "../pages/Editor";
import { useLanguage } from "@/hooks/useLanguage";
import { 
  Palette, 
  Trash2, 
  Navigation, 
  Star, 
  FileText, 
  CreditCard,
  Link,
  Image as ImageIcon
} from "lucide-react";

interface SectionEditorProps {
  section: SectionData;
  isSelected?: boolean;
  onUpdate: (updates: Partial<SectionData>) => void;
  onSelect?: () => void;
  availableSections?: SectionData[];
}

const sectionIcons = {
  navbar: Navigation,
  hero: Star,
  about: FileText,
  footer: CreditCard,
};

const sectionColors = {
  navbar: "bg-blue-500",
  hero: "bg-purple-500", 
  about: "bg-green-500",
  footer: "bg-orange-500",
};

export const SectionEditor = ({ 
  section, 
  isSelected = false, 
  onUpdate, 
  onSelect, 
  availableSections = [] 
}: SectionEditorProps) => {
  const [isExpanded, setIsExpanded] = useState(isSelected);
  const [colorInput, setColorInput] = useState(section.backgroundColor);
  const { t } = useLanguage();
  
  const Icon = sectionIcons[section.type];

  const handleContentChange = (content: string) => {
    onUpdate({ content });
  };

  const handleBackgroundChange = (backgroundColor: string) => {
    setColorInput(backgroundColor);
    onUpdate({ backgroundColor });
  };

  const handleBackgroundImageChange = (backgroundImage: string | undefined) => {
    onUpdate({ backgroundImage });
  };

  const handleLogoChange = (logo: string | undefined) => {
    onUpdate({ logo });
  };

  const removeBackground = () => {
    onUpdate({ backgroundColor: 'transparent', backgroundImage: undefined });
    setColorInput('transparent');
  };

  const handleScrollTargetChange = (linkText: string, targetSection: string) => {
    const newScrollTargets = { 
      ...section.scrollTargets, 
      [linkText]: targetSection 
    };
    onUpdate({ scrollTargets: newScrollTargets });
  };

  const navLinks = section.type === 'navbar' ? section.content.split(' | ') : [];

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader 
        className="pb-3 cursor-pointer"
        onClick={() => {
          setIsExpanded(!isExpanded);
          onSelect?.();
        }}
      >
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${sectionColors[section.type]} text-white`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <span className="capitalize font-semibold">{t(section.type)}</span>
              <Badge variant="outline" className="ml-2 text-xs">
                {section.backgroundColor === 'transparent' ? t('noBackground') : t('customBackground')}
              </Badge>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? '−' : '+'}
          </Button>
        </CardTitle>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 space-y-6">
          <Separator />
          
          {/* Content Editor */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t('content')}</Label>
            <Textarea
              value={section.content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder={`Enter ${section.type} content...`}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Logo Uploader for Navbar */}
          {section.type === 'navbar' && (
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                {t('logo')}
              </Label>
              <LogoUploader 
                logo={section.logo}
                onLogoChange={handleLogoChange}
              />
            </div>
          )}

          {/* Scroll Targets for Navbar */}
          {section.type === 'navbar' && navLinks.length > 1 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Link className="w-4 h-4" />
                {t('scrollTarget')}
              </Label>
              {navLinks.slice(1).map((linkText, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <span className="text-sm font-medium min-w-[80px]">{linkText}:</span>
                  <Select
                    value={section.scrollTargets?.[linkText] || ''}
                    onValueChange={(value) => handleScrollTargetChange(linkText, value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder={t('selectSection')} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSections.map((sect) => (
                        <SelectItem key={sect.id} value={sect.id}>
                          {t(sect.type)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          )}

          {/* Font Controls */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {t('typography')}
            </Label>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground">{t('fontSize')}</Label>
                <Select
                  value={section.fontSize || 'text-base'}
                  onValueChange={(value) => onUpdate({ fontSize: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-xs">XS</SelectItem>
                    <SelectItem value="text-sm">SM</SelectItem>
                    <SelectItem value="text-base">Base</SelectItem>
                    <SelectItem value="text-lg">LG</SelectItem>
                    <SelectItem value="text-xl">XL</SelectItem>
                    <SelectItem value="text-2xl">2XL</SelectItem>
                    <SelectItem value="text-3xl">3XL</SelectItem>
                    <SelectItem value="text-4xl">4XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-xs text-muted-foreground">{t('fontFamily')}</Label>
                <Select
                  value={section.fontFamily || 'font-sans'}
                  onValueChange={(value) => onUpdate({ fontFamily: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="font-sans">Sans</SelectItem>
                    <SelectItem value="font-serif">Serif</SelectItem>
                    <SelectItem value="font-mono">Mono</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Background Image Uploader */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Background Image
            </Label>
            <BackgroundImageUploader 
              backgroundImage={section.backgroundImage}
              onBackgroundImageChange={handleBackgroundImageChange}
            />
          </div>

          {/* Background Color Controls */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Palette className="w-4 h-4" />
              {t('background')}
            </Label>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  placeholder="Enter color (e.g., #ff0000, red, hsl(...))"
                  className="text-sm"
                />
              </div>
              <Button 
                onClick={() => handleBackgroundChange(colorInput)}
                size="sm"
                variant="outline"
              >
                {t('applyColor')}
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={removeBackground}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <Trash2 className="w-3 h-3" />
                {t('removeBackground')}
              </Button>
              
              <div className="flex gap-1">
                {['hsl(var(--teal-dark))', 'hsl(var(--teal-medium))', 'hsl(var(--primary))', 'hsl(var(--accent))'].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleBackgroundChange(color)}
                    className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Background Preview */}
            <div className="p-3 rounded border text-sm bg-muted/30">
              <span className="text-muted-foreground">Preview: </span>
              <span 
                className="px-2 py-1 rounded text-xs"
                style={{ 
                  backgroundColor: section.backgroundColor, 
                  backgroundImage: section.backgroundImage ? `url(${section.backgroundImage})` : undefined,
                  color: section.backgroundColor === 'transparent' ? 'inherit' : 'white' 
                }}
              >
                {section.backgroundColor === 'transparent' && !section.backgroundImage ? t('noBackground') : 'Sample Text'}
              </span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};