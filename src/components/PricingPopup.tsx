import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Globe, Crown, Star } from "lucide-react";
import { toast } from "sonner";

interface PricingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: 'monthly' | 'annual') => void;
  isEditorLocked?: boolean;
  changeCount?: number;
}

const PricingPopup = ({ isOpen, onClose, onSelectPlan, isEditorLocked = false, changeCount = 0 }: PricingPopupProps) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');

  const handlePlanSelect = (plan: 'monthly' | 'annual') => {
    setSelectedPlan(plan);
    onSelectPlan(plan);
    toast.success(`${plan === 'monthly' ? 'Monthly' : 'Annual'} plan selected!`);
    onClose();
  };

  const monthlyFeatures = [
    "Subdomain hosting (yoursite.aqallai.dev)",
    "Custom website builder",
    "Mobile-responsive design",
    "AI-powered content generation",
    "Live preview editing",
    "Basic templates library",
    "Email support",
    "SSL certificate included",
    "Basic analytics",
    "Up to 5 pages"
  ];

  const annualFeatures = [
    "Custom domain included (yoursite.com)",
    "Everything in Monthly plan",
    "Priority customer support",
    "Advanced templates library",
    "SEO optimization tools",
    "Advanced analytics dashboard",
    "Remove Aqall AI branding",
    "Custom CSS/HTML editing",
    "E-commerce integration",
    "Unlimited pages",
    "Free domain for 1 year",
    "2 months free (save 16%)"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={isEditorLocked ? undefined : onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {isEditorLocked && (
            <div className="mb-4 p-3 bg-orange-100 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 text-orange-800">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Free Trial Limit Reached</span>
              </div>
              <p className="text-sm text-orange-700 mt-1">
                You've made {changeCount} changes. Choose a plan to continue editing your website.
              </p>
            </div>
          )}
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            {isEditorLocked ? 'Unlock Full Editor Access' : 'Choose Your Publishing Plan'}
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            {isEditorLocked 
              ? 'Continue editing and publish your website with unlimited access'
              : 'Select the perfect plan to publish your website and share it with the world'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Monthly Plan */}
          <Card className="relative border-2 hover:border-primary/50 transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-xl mb-2">Starter Plan</CardTitle>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">19 SAR</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
              <Badge variant="secondary" className="mx-auto mt-2">
                Most Popular
              </Badge>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {monthlyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => handlePlanSelect('monthly')}
                className="w-full"
                size="lg"
              >
                <Globe className="w-4 h-4 mr-2" />
                {isEditorLocked ? 'Unlock Editor + Subdomain' : 'Start with Subdomain'}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Your site will be available at: yoursite.aqallai.dev
              </p>
            </CardContent>
          </Card>

          {/* Annual Plan */}
          <Card className="relative border-2 border-primary bg-primary/5 hover:border-primary transition-all duration-300">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-1">
                <Star className="w-3 h-3 mr-1" />
                Best Value
              </Badge>
            </div>
            <CardHeader className="text-center pb-4 pt-6">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-gradient-to-r from-primary/20 to-primary/30 rounded-full">
                  <Crown className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl mb-2">Pro Plan</CardTitle>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg text-muted-foreground line-through">228 SAR</span>
                  <div className="text-3xl font-bold text-primary">192 SAR</div>
                </div>
                <div className="text-sm text-muted-foreground">per year (16 SAR/month)</div>
                <div className="text-xs text-green-600 font-medium">Save 36 SAR!</div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {annualFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className={`text-sm ${feature.includes('Everything in Monthly') ? 'text-muted-foreground' : ''}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => handlePlanSelect('annual')}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                size="lg"
              >
                <Globe className="w-4 h-4 mr-2" />
                {isEditorLocked ? 'Unlock Editor + Custom Domain' : 'Get Custom Domain'}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Your site will be available at: yoursite.com (domain included)
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2 text-center">What happens after you select a plan?</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">1</span>
              </div>
              <p>Choose your domain name</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">2</span>
              </div>
              <p>Complete secure payment</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold">3</span>
              </div>
              <p>Your website goes live!</p>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground mt-4">
          All plans include 30-day money-back guarantee • No setup fees • Cancel anytime
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingPopup; 