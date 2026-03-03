import { useState, useRef } from "react";
import { Camera, Upload, Sparkles, Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const conditions = ["Like New", "Good", "Fair", "Poor"];
const exchangeTypes = [
  { value: "sell", label: "Sell", desc: "List for a price" },
  { value: "swap", label: "Swap", desc: "Trade for another item" },
  { value: "donate", label: "Donate", desc: "Give it for free" },
];

const sustainabilityTips = [
  "By selling this item, you're preventing it from entering a landfill!",
  "Second-hand fashion saves water and reduces CO₂ emissions.",
  "Every swap saves ~7kg of CO₂ compared to buying new.",
  "You just extended this item's life and earned 50 XP with Eco!",
];

export default function Sell() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDone, setAiDone] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [published, setPublished] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    condition: "Good",
    exchangeType: "sell",
    size: "",
    color: "",
    category: "",
    style: "",
  });

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
      runAiTagging();
    };
    reader.readAsDataURL(file);
  };

  const runAiTagging = () => {
    setAiLoading(true);
    setAiProgress(0);
    setAiDone(false);
    const interval = setInterval(() => {
      setAiProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setAiLoading(false);
          setAiDone(true);
          setForm((prev) => ({
            ...prev,
            title: prev.title || "Casual Denim Jacket",
            size: "M",
            color: "Blue",
            category: "Jackets",
            style: "Casual",
            condition: "Good",
          }));
          return 100;
        }
        return p + 4;
      });
    }, 60);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handlePhotoUpload(file);
  };

  const handleSubmit = () => {
    setPublished(true);
  };

  const tip = sustainabilityTips[Math.floor(Math.random() * sustainabilityTips.length)];

  if (published) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-primary mb-2">Listing Published!</h2>
          <p className="text-muted-foreground mb-4">{tip}</p>
          <div className="bg-sage/20 border border-sage/40 rounded-xl p-4 mb-6">
            <p className="text-sm font-semibold text-primary flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" /> +50 XP earned with Eco!
            </p>
          </div>
          <Button onClick={() => { setPublished(false); setPhotoPreview(null); setAiDone(false); setForm({ title: "", description: "", price: "", condition: "Good", exchangeType: "sell", size: "", color: "", category: "", style: "" }); }}
            className="bg-primary text-primary-foreground font-semibold">
            List Another Item
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-deep-green py-8 pt-24">
        <div className="container">
          <h1 className="text-3xl font-bold text-primary-foreground">List an Item</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">Upload a photo - our AI will tag it for you automatically</p>
        </div>
      </div>

      <div className="container py-8 pt-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Upload */}
            <div>
              <Label className="text-sm font-semibold mb-2 block">Photo</Label>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl transition-all cursor-pointer flex flex-col items-center justify-center text-center p-10 ${photoPreview ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"}`}
              >
                {photoPreview ? (
                  <div className="relative">
                    <img src={photoPreview} alt="Upload preview" className="max-h-48 rounded-xl object-contain" />
                    <p className="text-xs text-muted-foreground mt-2">Click to change</p>
                  </div>
                ) : (
                  <>
                    <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                      <Camera className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-semibold text-foreground">Drag & drop a photo</p>
                    <p className="text-sm text-muted-foreground mt-1">or click to browse files</p>
                    <p className="text-xs text-muted-foreground mt-3">JPG, PNG, WEBP up to 10MB</p>
                  </>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(f); }}
              />

              {/* Demo button */}
              {!photoPreview && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full border-border text-foreground hover:border-primary hover:text-primary"
                  onClick={() => {
                    setPhotoPreview("https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=400&h=400&fit=crop");
                    runAiTagging();
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5 mr-2" /> Try AI Demo (use sample photo)
                </Button>
              )}
            </div>

            {/* AI Tagging */}
            {(aiLoading || aiDone) && (
              <div className="border rounded-xl p-5 bg-transparent">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className={`h-5 w-5 ${aiDone ? "text-sage" : "text-accent animate-pulse"}`} />
                  <p className="font-semibold text-sm">{aiLoading ? "AI is analyzing your photo..." : "AI tagging complete!"}</p>
                </div>
                {aiLoading && (
                  <Progress value={aiProgress} className="h-2 mb-3 [&>div]:bg-accent [&>div]:transition-all" />
                )}
                {aiDone && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[`Size: ${form.size}`, `Color: ${form.color}`, `Category: ${form.category}`, `Style: ${form.style}`, `Condition: ${form.condition}`].map((tag) => (
                      <Badge key={tag} className="bg-white text-foreground border border-foreground gap-1 shadow-sm font-medium">
                        <Check className="h-3 w-3" /> {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label className="text-sm font-semibold mb-1.5 block">Title</Label>
                <Input
                  placeholder="e.g. Vintage Denim Jacket"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-1.5 block">Price ($)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-1.5 block">Size</Label>
                <Input
                  placeholder="XS / S / M / L / XL"
                  value={form.size}
                  onChange={(e) => setForm({ ...form, size: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-1.5 block">Color</Label>
                <Input
                  placeholder="e.g. Blue"
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-1.5 block">Category</Label>
                <Input
                  placeholder="e.g. Jackets"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold mb-1.5 block">Description</Label>
              <Textarea
                placeholder="Describe the item - brand, material, any wear..."
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            {/* Condition */}
            <div>
              <Label className="text-sm font-semibold mb-2 block">Condition</Label>
              <div className="flex flex-wrap gap-2">
                {conditions.map((c) => (
                  <button
                    key={c}
                    onClick={() => setForm({ ...form, condition: c })}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${form.condition === c ? "border-primary text-primary" : "border-border hover:border-primary text-foreground"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Exchange Type */}
            <div>
              <Label className="text-sm font-semibold mb-2 block">Exchange Type</Label>
              <div className="grid grid-cols-3 gap-3">
                {exchangeTypes.map(({ value, label, desc }) => (
                  <button
                    key={value}
                    onClick={() => setForm({ ...form, exchangeType: value })}
                    className={`p-3 rounded-xl border text-left transition-all ${form.exchangeType === value ? "border-primary text-primary" : "border-border hover:border-primary text-foreground"}`}
                  >
                    <p className="font-semibold text-sm">{label}</p>
                    <p className={`text-xs mt-0.5 ${form.exchangeType === value ? "text-primary" : "text-muted-foreground"}`}>{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!form.title}
              className="w-full h-12 bg-sage text-sage-dark font-bold text-base hover:bg-sage/90"
            >
              <Upload className="h-4 w-4 mr-2" /> Publish Listing
            </Button>
          </div>

          {/* Live Preview */}
          <div>
            <Label className="text-sm font-semibold mb-2 block flex items-center gap-1">
              <Eye className="h-4 w-4" /> Live Preview
            </Label>
            <Card className="overflow-hidden border-2 border-dashed border-border sticky top-20">
              <div className="h-56 bg-muted flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Camera className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    <p className="text-xs">Photo preview</p>
                  </div>
                )}
              </div>
              <CardContent className="p-4 space-y-2">
                <p className="font-semibold text-sm truncate">{form.title || "Item title"}</p>
                <div className="flex flex-wrap gap-1">
                  {form.size && <Badge className="text-[10px] bg-white text-foreground border border-foreground shadow-sm font-medium">📏 {form.size}</Badge>}
                  {form.color && <Badge className="text-[10px] bg-white text-foreground border border-foreground shadow-sm font-medium">🎨 {form.color}</Badge>}
                  {form.category && <Badge className="text-[10px] bg-white text-foreground border border-foreground shadow-sm font-medium">👗 {form.category}</Badge>}
                  {form.condition && <Badge variant="secondary" className="text-[10px] bg-white text-foreground border border-foreground shadow-sm font-medium">{form.condition}</Badge>}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-accent">
                    {form.exchangeType === "donate" ? "Free" : form.price ? `$${form.price}` : "$-"}
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    {form.exchangeType === "sell" ? "For Sale" : form.exchangeType === "swap" ? "For Swap" : "Donate"}
                  </Badge>
                </div>
                {form.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{form.description}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
