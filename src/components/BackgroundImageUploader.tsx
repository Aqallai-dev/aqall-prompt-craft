import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface BackgroundImageUploaderProps {
  backgroundImage?: string;
  onBackgroundImageChange: (image: string | undefined) => void;
}

export const BackgroundImageUploader = ({ 
  backgroundImage, 
  onBackgroundImageChange 
}: BackgroundImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onBackgroundImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackgroundImage = () => {
    onBackgroundImageChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button
          onClick={() => fileInputRef.current?.click()}
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
        >
          <Upload className="w-3 h-3" />
          {t('uploadBackground')}
        </Button>
        
        {backgroundImage && (
          <Button
            onClick={removeBackgroundImage}
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
          >
            <X className="w-3 h-3" />
            Remove Image
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {backgroundImage && (
        <div className="p-2 border rounded bg-muted/30">
          <div 
            className="h-12 w-full rounded bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <Image className="w-4 h-4 text-white drop-shadow-lg" />
          </div>
        </div>
      )}
    </div>
  );
};