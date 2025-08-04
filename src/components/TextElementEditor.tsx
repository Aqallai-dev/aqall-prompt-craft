import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { TextElement } from "../pages/Editor";
import { useLanguage } from "@/hooks/useLanguage";
import { Plus, Trash2, Type } from "lucide-react";

interface TextElementEditorProps {
  textElements: TextElement[];
  onUpdate: (textElements: TextElement[]) => void;
}

export const TextElementEditor = ({ textElements, onUpdate }: TextElementEditorProps) => {
  const { t } = useLanguage();

  const addTextElement = () => {
    const newElement: TextElement = {
      id: Date.now().toString(),
      content: "New text",
      fontSize: "text-base",
      fontFamily: "font-normal"
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};