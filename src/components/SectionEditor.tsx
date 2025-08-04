import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SectionData } from "./WebsiteBuilder";
import { 
  Palette, 
  Image, 
  Trash2, 
  Navigation, 
  Star, 
  FileText, 
  CreditCard 
} from "lucide-react";

interface SectionEditorProps {
  section: SectionData;
  onUpdate: (updates: Partial<SectionData>) => void;
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

export const SectionEditor = ({ section, onUpdate }: SectionEditorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [colorInput, setColorInput] = useState(section.backgroundColor);
  
  const Icon = sectionIcons[section.type];

  const handleContentChange = (content: string) => {
    onUpdate({ content });
  };

  const handleBackgroundChange = (backgroundColor: string) => {
    setColorInput(backgroundColor);
    onUpdate({ backgroundColor });
  };

  const removeBackground = () => {
    onUpdate({ backgroundColor: 'transparent', backgroundImage: undefined });
    setColorInput('transparent');
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader 
        className="pb-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${sectionColors[section.type]} text-white`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <span className="capitalize font-semibold">{section.type}</span>
              <Badge variant="outline" className="ml-2 text-xs">
                {section.backgroundColor === 'transparent' ? 'No Background' : 'Custom Background'}
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
        <CardContent className="pt-0 space-y-4">
          <Separator />
          
          {/* Content Editor */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Content</Label>
            <Textarea
              value={section.content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder={`Enter ${section.type} content...`}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Background Controls */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Background
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
                Apply
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
                Remove Background
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
                style={{ backgroundColor: section.backgroundColor, color: section.backgroundColor === 'transparent' ? 'inherit' : 'white' }}
              >
                {section.backgroundColor === 'transparent' ? 'No Background' : 'Sample Text'}
              </span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};