import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { TextElement } from "../pages/Editor";
import { useLanguage } from "@/hooks/useLanguage";
import { Plus, Trash2, Type, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

interface TextElementEditorProps {
  textElements: TextElement[];
  onUpdate: (textElements: TextElement[]) => void;
}

export const TextElementEditor = ({ textElements, onUpdate }: TextElementEditorProps) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('basic');

  const addTextElement = () => {
    const newElement: TextElement = {
      id: Date.now().toString(),
      content: "New text",
      fontSize: "text-base",
      fontFamily: "font-normal",
      textAlign: 'left',
      fontWeight: 'font-normal',
      textDecoration: 'none',
      letterSpacing: 'tracking-normal',
      lineHeight: 'leading-normal'
    };
    onUpdate([...textElements, newElement]);
  };

  const updateTextElement = (id: string, updates: Partial<TextElement>) => {
    onUpdate(textElements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const removeTextElement = (id: string) => {
    onUpdate(textElements.filter(el => el.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Type className="w-4 h-4" />
          {t('textElements')}
        </Label>
        <Button
          onClick={addTextElement}
          size="sm"
          variant="outline"
          className="flex items-center gap-1"
        >
          <Plus className="w-3 h-3" />
          {t('addText')}
        </Button>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {textElements.map((element, index) => (
          <Card key={element.id} className="p-3">
            <CardContent className="p-0 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Text {index + 1}</span>
                <Button
                  onClick={() => removeTextElement(element.id)}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic" className="text-xs">Basic</TabsTrigger>
                  <TabsTrigger value="advanced" className="text-xs">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-2">
                  <Input
                    value={element.content}
                    onChange={(e) => updateTextElement(element.id, { content: e.target.value })}
                    placeholder="Enter text content..."
                    className="text-sm"
                  />
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={element.fontSize}
                      onValueChange={(value) => updateTextElement(element.id, { fontSize: value })}
                    >
                      <SelectTrigger className="text-xs">
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
                        <SelectItem value="text-5xl">5XL</SelectItem>
                        <SelectItem value="text-6xl">6XL</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select
                      value={element.fontFamily}
                      onValueChange={(value) => updateTextElement(element.id, { fontFamily: value })}
                    >
                      <SelectTrigger className="text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="font-normal">Normal</SelectItem>
                        <SelectItem value="font-medium">Medium</SelectItem>
                        <SelectItem value="font-semibold">Semibold</SelectItem>
                        <SelectItem value="font-bold">Bold</SelectItem>
                        <SelectItem value="font-sans">Sans</SelectItem>
                        <SelectItem value="font-serif">Serif</SelectItem>
                        <SelectItem value="font-mono">Mono</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-2">
                  {/* Text Alignment */}
                  <div className="space-y-2">
                    <Label className="text-xs">Alignment</Label>
                    <div className="flex gap-1">
                      <Button
                        variant={element.textAlign === 'left' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateTextElement(element.id, { textAlign: 'left' })}
                        className="flex-1"
                      >
                        <AlignLeft className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={element.textAlign === 'center' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateTextElement(element.id, { textAlign: 'center' })}
                        className="flex-1"
                      >
                        <AlignCenter className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={element.textAlign === 'right' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateTextElement(element.id, { textAlign: 'right' })}
                        className="flex-1"
                      >
                        <AlignRight className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={element.textAlign === 'justify' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateTextElement(element.id, { textAlign: 'justify' })}
                        className="flex-1"
                      >
                        <AlignJustify className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Font Weight */}
                  <div className="space-y-2">
                    <Label className="text-xs">Font Weight</Label>
                    <Select
                      value={element.fontWeight || 'font-normal'}
                      onValueChange={(value) => updateTextElement(element.id, { fontWeight: value })}
                    >
                      <SelectTrigger className="text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="font-thin">Thin</SelectItem>
                        <SelectItem value="font-light">Light</SelectItem>
                        <SelectItem value="font-normal">Normal</SelectItem>
                        <SelectItem value="font-medium">Medium</SelectItem>
                        <SelectItem value="font-semibold">Semibold</SelectItem>
                        <SelectItem value="font-bold">Bold</SelectItem>
                        <SelectItem value="font-extrabold">Extra Bold</SelectItem>
                        <SelectItem value="font-black">Black</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Text Decoration */}
                  <div className="space-y-2">
                    <Label className="text-xs">Text Decoration</Label>
                    <Select
                      value={element.textDecoration || 'none'}
                      onValueChange={(value) => updateTextElement(element.id, { textDecoration: value })}
                    >
                      <SelectTrigger className="text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="underline">Underline</SelectItem>
                        <SelectItem value="line-through">Line Through</SelectItem>
                        <SelectItem value="overline">Overline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Letter Spacing */}
                  <div className="space-y-2">
                    <Label className="text-xs">Letter Spacing</Label>
                    <Select
                      value={element.letterSpacing || 'tracking-normal'}
                      onValueChange={(value) => updateTextElement(element.id, { letterSpacing: value })}
                    >
                      <SelectTrigger className="text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tracking-tighter">Tighter</SelectItem>
                        <SelectItem value="tracking-tight">Tight</SelectItem>
                        <SelectItem value="tracking-normal">Normal</SelectItem>
                        <SelectItem value="tracking-wide">Wide</SelectItem>
                        <SelectItem value="tracking-wider">Wider</SelectItem>
                        <SelectItem value="tracking-widest">Widest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Line Height */}
                  <div className="space-y-2">
                    <Label className="text-xs">Line Height</Label>
                    <Select
                      value={element.lineHeight || 'leading-normal'}
                      onValueChange={(value) => updateTextElement(element.id, { lineHeight: value })}
                    >
                      <SelectTrigger className="text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leading-none">None</SelectItem>
                        <SelectItem value="leading-tight">Tight</SelectItem>
                        <SelectItem value="leading-snug">Snug</SelectItem>
                        <SelectItem value="leading-normal">Normal</SelectItem>
                        <SelectItem value="leading-relaxed">Relaxed</SelectItem>
                        <SelectItem value="leading-loose">Loose</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Text Color */}
                  <div className="space-y-2">
                    <Label className="text-xs">Text Color</Label>
                    <Input
                      type="text"
                      value={element.color || ''}
                      onChange={(e) => updateTextElement(element.id, { color: e.target.value })}
                      placeholder="e.g., #000000, red, hsl(...)"
                      className="text-xs"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};