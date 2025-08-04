import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface LogoUploaderProps {
  logo?: string;
  onLogoChange: (logo: string | undefined) => void;
}

export const LogoUploader = ({ logo, onLogoChange }: LogoUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onLogoChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onLogoChange(undefined);
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
          {t('uploadLogo')}
        </Button>
        
        {logo && (
          <Button
            onClick={removeLogo}
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
          >
            <X className="w-3 h-3" />
            {t('removeLogo')}
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

      {logo && (
        <div className="p-2 border rounded bg-muted/30">
          <img 
            src={logo} 
            alt="Logo preview" 
            className="h-8 w-auto object-contain"
          />
        </div>
      )}
    </div>
  );
};