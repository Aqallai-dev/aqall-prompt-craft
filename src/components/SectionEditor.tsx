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
import { TextElementEditor } from "./TextElementEditor";
import { GalleryUploader } from "./GalleryUploader";
import { SectionData, TextElement, ButtonElement, FormElement } from "../pages/Editor";
import { useLanguage } from "@/hooks/useLanguage";
import { 
  Palette, 
  Trash2, 
  Navigation, 
  Star, 
  FileText, 
  CreditCard,
  Link,
  Image as ImageIcon,
  ChevronUp,
  ChevronDown,
  Plus,
  MoveUp,
  MoveDown,
  Settings,
  Layout,
  Type,
  MousePointer,
  Grid3X3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Zap,
  Box,
  ArrowUpDown,
  ArrowLeftRight,
  Droplets
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Color picker component
const ColorPicker = ({ 
  color, 
  onColorChange, 
  label 
}: { 
  color: string; 
  onColorChange: (color: string) => void; 
  label: string;
}) => {
  const presetColors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd',
    '#00d2d3', '#ff9f43', '#10ac84', '#ee5a24', '#2f3542', '#747d8c', '#ff6348', '#ff4757'
  ];

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-2">
        <Droplets className="w-4 h-4" />
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-12 h-8 p-0 border-2"
              style={{ backgroundColor: color }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-4">
              <div className="grid grid-cols-8 gap-2">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    className="w-6 h-6 rounded border-2 hover:scale-110 transition-transform"
                    style={{ backgroundColor: presetColor }}
                    onClick={() => onColorChange(presetColor)}
                  />
                ))}
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Custom Color</Label>
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => onColorChange(e.target.value)}
                  className="h-8"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Input
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          placeholder="#000000"
          className="flex-1"
        />
      </div>
    </div>
  );
};

interface SectionEditorProps {
  section: SectionData;
  isSelected?: boolean;
  onUpdate: (updates: Partial<SectionData>) => void;
  onSelect?: () => void;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  availableSections?: SectionData[];
}

const sectionIcons = {
  navbar: Navigation,
  hero: Star,
  about: FileText,
  footer: CreditCard,
  gallery: ImageIcon,
  services: FileText,
  testimonials: Star,
  contact: Navigation,
  team: FileText,
  pricing: CreditCard,
  features: Star,
  blog: FileText,
  cta: Star,
  stats: FileText,
  faq: FileText,
  newsletter: FileText,
};

const sectionColors = {
  navbar: "bg-blue-500",
  hero: "bg-purple-500", 
  about: "bg-green-500",
  footer: "bg-orange-500",
  gallery: "bg-pink-500",
  services: "bg-indigo-500",
  testimonials: "bg-yellow-500",
  contact: "bg-red-500",
  team: "bg-cyan-500",
  pricing: "bg-emerald-500",
  features: "bg-violet-500",
  blog: "bg-rose-500",
  cta: "bg-purple-500",
  stats: "bg-blue-500",
  faq: "bg-green-500",
  newsletter: "bg-orange-500",
};

export const SectionEditor = ({ 
  section, 
  isSelected = false, 
  onUpdate, 
  onSelect, 
  onRemove,
  onMoveUp,
  onMoveDown,
  availableSections = [] 
}: SectionEditorProps) => {
  const [isExpanded, setIsExpanded] = useState(isSelected);
  const [colorInput, setColorInput] = useState(section.backgroundColor);
  const [activeTab, setActiveTab] = useState('content');
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

  // Button Elements Management
  const addButtonElement = () => {
    const newButton: ButtonElement = {
      id: Date.now().toString(),
      text: 'New Button',
      variant: 'primary',
      size: 'md'
    };
    onUpdate({ buttonElements: [...(section.buttonElements || []), newButton] });
  };

  const updateButtonElement = (id: string, updates: Partial<ButtonElement>) => {
    const updatedButtons = (section.buttonElements || []).map(btn => 
      btn.id === id ? { ...btn, ...updates } : btn
    );
    onUpdate({ buttonElements: updatedButtons });
  };

  const removeButtonElement = (id: string) => {
    const updatedButtons = (section.buttonElements || []).filter(btn => btn.id !== id);
    onUpdate({ buttonElements: updatedButtons });
  };

  // Form Elements Management
  const addFormElement = () => {
    const newForm: FormElement = {
      id: Date.now().toString(),
      type: 'text',
      label: 'New Field',
      placeholder: 'Enter text...',
      required: false
    };
    onUpdate({ formElements: [...(section.formElements || []), newForm] });
  };

  const updateFormElement = (id: string, updates: Partial<FormElement>) => {
    const updatedForms = (section.formElements || []).map(form => 
      form.id === id ? { ...form, ...updates } : form
    );
    onUpdate({ formElements: updatedForms });
  };

  const removeFormElement = (id: string) => {
    const updatedForms = (section.formElements || []).filter(form => form.id !== id);
    onUpdate({ formElements: updatedForms });
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
              <span className="capitalize font-semibold">{t(section.type as any)}</span>
              <Badge variant="outline" className="ml-2 text-xs">
                {section.backgroundColor === 'transparent' ? t('noBackground') : t('customBackground')}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {onMoveUp && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveUp();
                }}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
            )}
            {onMoveDown && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveDown();
                }}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            )}
            {onRemove && section.type !== 'navbar' && section.type !== 'hero' && section.type !== 'footer' && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              {isExpanded ? '−' : '+'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 space-y-6">
          <Separator />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
              <TabsTrigger value="layout" className="text-xs">Layout</TabsTrigger>
              <TabsTrigger value="styling" className="text-xs">Styling</TabsTrigger>
              <TabsTrigger value="advanced" className="text-xs">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              {/* Text Elements Editor */}
              <div className="space-y-2">
                <TextElementEditor
                  textElements={section.textElements || []}
                  onUpdate={(textElements) => onUpdate({ textElements })}
                />
              </div>

              {/* Button Elements Editor */}
              {(section.type === 'hero' || section.type === 'cta') && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <MousePointer className="w-4 h-4" />
                      Buttons
                    </Label>
                    <Button
                      onClick={addButtonElement}
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Button
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {(section.buttonElements || []).map((button, index) => (
                      <Card key={button.id} className="p-3">
                        <CardContent className="p-0 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Button {index + 1}</span>
                            <Button
                              onClick={() => removeButtonElement(button.id)}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <Input
                            value={button.text}
                            onChange={(e) => updateButtonElement(button.id, { text: e.target.value })}
                            placeholder="Button text..."
                            className="text-sm"
                          />
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Select
                              value={button.variant}
                              onValueChange={(value) => updateButtonElement(button.id, { variant: value as any })}
                            >
                              <SelectTrigger className="text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="primary">Primary</SelectItem>
                                <SelectItem value="secondary">Secondary</SelectItem>
                                <SelectItem value="outline">Outline</SelectItem>
                                <SelectItem value="ghost">Ghost</SelectItem>
                                <SelectItem value="destructive">Destructive</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Select
                              value={button.size}
                              onValueChange={(value) => updateButtonElement(button.id, { size: value as any })}
                            >
                              <SelectTrigger className="text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sm">Small</SelectItem>
                                <SelectItem value="md">Medium</SelectItem>
                                <SelectItem value="lg">Large</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Elements Editor */}
              {section.type === 'contact' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Form Fields
                    </Label>
                    <Button
                      onClick={addFormElement}
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Field
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {(section.formElements || []).map((form, index) => (
                      <Card key={form.id} className="p-3">
                        <CardContent className="p-0 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Field {index + 1}</span>
                            <Button
                              onClick={() => removeFormElement(form.id)}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <Input
                            value={form.label}
                            onChange={(e) => updateFormElement(form.id, { label: e.target.value })}
                            placeholder="Field label..."
                            className="text-sm"
                          />
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Select
                              value={form.type}
                              onValueChange={(value) => updateFormElement(form.id, { type: value as any })}
                            >
                              <SelectTrigger className="text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="textarea">Textarea</SelectItem>
                                <SelectItem value="select">Select</SelectItem>
                                <SelectItem value="checkbox">Checkbox</SelectItem>
                                <SelectItem value="radio">Radio</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={form.required}
                                onCheckedChange={(checked) => updateFormElement(form.id, { required: checked })}
                              />
                              <Label className="text-xs">Required</Label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}



              {/* Company Info for Navbar */}
              {section.type === 'navbar' && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{t('companyName')}</Label>
                    <Input
                      value={section.companyName || ''}
                      onChange={(e) => onUpdate({ companyName: e.target.value })}
                      placeholder="Enter company name..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{t('slogan')}</Label>
                    <Input
                      value={section.slogan || ''}
                      onChange={(e) => onUpdate({ slogan: e.target.value })}
                      placeholder="Enter slogan (optional)..."
                    />
                  </div>
                </div>
              )}

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

              {/* Gallery Images */}
              {section.type === 'gallery' && (
                <div className="space-y-2">
                  <GalleryUploader
                    images={section.galleryImages || []}
                    onImagesChange={(images) => onUpdate({ galleryImages: images })}
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
                               {t(sect.type as any)}
                             </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="layout" className="space-y-4">
              {/* Layout Controls */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Layout className="w-4 h-4" />
                  Layout Type
                </Label>
                <Select
                  value={section.layout || 'stack'}
                  onValueChange={(value) => onUpdate({ layout: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stack">Stack</SelectItem>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="flex">Flex</SelectItem>
                    <SelectItem value="masonry">Masonry</SelectItem>
                  </SelectContent>
                </Select>

                {section.layout === 'grid' && (
                  <div className="space-y-2">
                    <Label className="text-sm">Columns</Label>
                    <Slider
                      value={[section.columns || 1]}
                      onValueChange={([value]) => onUpdate({ columns: value })}
                      max={6}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>6</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-sm">Gap</Label>
                  <Slider
                    value={[section.gap || 4]}
                    onValueChange={([value]) => onUpdate({ gap: value })}
                    max={12}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>12</span>
                  </div>
                </div>
              </div>

              {/* Alignment Controls */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <AlignLeft className="w-4 h-4" />
                  Alignment
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant={section.alignment === 'left' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUpdate({ alignment: 'left' })}
                  >
                    <AlignLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={section.alignment === 'center' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUpdate({ alignment: 'center' })}
                  >
                    <AlignCenter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={section.alignment === 'right' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUpdate({ alignment: 'right' })}
                  >
                    <AlignRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={section.alignment === 'justify' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUpdate({ alignment: 'justify' })}
                  >
                    <AlignJustify className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Spacing Controls */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  Padding
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Top</Label>
                    <Input
                      type="number"
                      value={section.padding?.top || 0}
                      onChange={(e) => onUpdate({ 
                        padding: { 
                          ...section.padding, 
                          top: parseInt(e.target.value) || 0 
                        } 
                      })}
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Bottom</Label>
                    <Input
                      type="number"
                      value={section.padding?.bottom || 0}
                      onChange={(e) => onUpdate({ 
                        padding: { 
                          ...section.padding, 
                          bottom: parseInt(e.target.value) || 0 
                        } 
                      })}
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Left</Label>
                    <Input
                      type="number"
                      value={section.padding?.left || 0}
                      onChange={(e) => onUpdate({ 
                        padding: { 
                          ...section.padding, 
                          left: parseInt(e.target.value) || 0 
                        } 
                      })}
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Right</Label>
                    <Input
                      type="number"
                      value={section.padding?.right || 0}
                      onChange={(e) => onUpdate({ 
                        padding: { 
                          ...section.padding, 
                          right: parseInt(e.target.value) || 0 
                        } 
                      })}
                      className="text-xs"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="styling" className="space-y-4">
              {/* Font Controls */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Type className="w-4 h-4" />
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
                
                <ColorPicker
                  color={section.backgroundColor || '#ffffff'}
                  onColorChange={(color) => onUpdate({ backgroundColor: color })}
                  label="Background Color"
                />

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

              {/* Text Color Controls */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Text Color
                </Label>
                
                <ColorPicker
                  color={section.textColor || '#000000'}
                  onColorChange={(color) => onUpdate({ textColor: color })}
                  label="Text Color"
                />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              {/* Border Controls */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Box className="w-4 h-4" />
                  Border
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Width</Label>
                    <Input
                      type="number"
                      value={section.borderWidth || 0}
                      onChange={(e) => onUpdate({ borderWidth: parseInt(e.target.value) || 0 })}
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Radius</Label>
                    <Input
                      type="number"
                      value={section.borderRadius || 0}
                      onChange={(e) => onUpdate({ borderRadius: parseInt(e.target.value) || 0 })}
                      className="text-xs"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Color</Label>
                  <Input
                    type="text"
                    value={section.borderColor || ''}
                    onChange={(e) => onUpdate({ borderColor: e.target.value })}
                    placeholder="Border color..."
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Shadow Controls */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Shadow
                </Label>
                <Select
                  value={section.shadow || 'none'}
                  onValueChange={(value) => onUpdate({ shadow: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="md">Medium</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="xl">Extra Large</SelectItem>
                    <SelectItem value="2xl">2XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Animation Controls */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Animation
                </Label>
                <Select
                  value={section.animation || 'none'}
                  onValueChange={(value) => onUpdate({ animation: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="fadeIn">Fade In</SelectItem>
                    <SelectItem value="slideUp">Slide Up</SelectItem>
                    <SelectItem value="slideDown">Slide Down</SelectItem>
                    <SelectItem value="zoomIn">Zoom In</SelectItem>
                    <SelectItem value="bounce">Bounce</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Opacity Control */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Opacity</Label>
                <Slider
                  value={[section.opacity || 100]}
                  onValueChange={([value]) => onUpdate({ opacity: value })}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Size Controls */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Size Constraints</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Max Width</Label>
                    <Input
                      type="text"
                      value={section.maxWidth || ''}
                      onChange={(e) => onUpdate({ maxWidth: e.target.value })}
                      placeholder="e.g., 1200px, 100%"
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Min Height</Label>
                    <Input
                      type="text"
                      value={section.minHeight || ''}
                      onChange={(e) => onUpdate({ minHeight: e.target.value })}
                      placeholder="e.g., 400px, 50vh"
                      className="text-xs"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
};