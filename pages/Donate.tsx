import { useState, useRef } from "react";
import { Camera, Sparkles, Check, Heart, Leaf, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const conditions = ["Like New", "Good", "Fair"];

const recipients = [
  { value: "anyone", label: "Anyone on Campus", desc: "First come, first served", icon: "👋" },
  { value: "bank", label: "Clothing Bank", desc: "Donated to campus charity", icon: "🏦" },
  { value: "student", label: "Student in Need", desc: "Matched to a verified request", icon: "🤝" },
];

const ecoTips = [
  "You're giving this item a second life — that's real impact!",
  "Donating saves ~4kg of textile waste per item.",
  "Every donation earns you Eco XP and keeps clothes out of landfills.",
  "Your generosity helps fellow students dress sustainably.",
];

export default function Donate() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDone, setAiDone] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [donated, setDonated] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    condition: "Good",
    recipient: "anyone",
    size: "",
    color: "",
    category: "",
  });

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
            title: prev.title || "Knit Cardigan",
            size: "S",
            color: "Cream",
            category: "Knitwear",
            condition: "Good",
          }));
          return 100;
        }
        return p + 4;
      });
    }, 60);
  };

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
      runAiTagging();
    };
    reader.readAsDataURL(file);
  };

  const tip = ecoTips[Math.floor(Math.random() * ecoTips.length)];

  if (donated) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-sage/20 mx-auto mb-5">
            <Heart className="h-10 w-10 text-sage" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Item Donated!</h2>
          <p className="text-muted-foreground text-sm mb-4">{tip}</p>
          <div className="bg-sage/20 border border-sage/40 rounded-xl p-4 mb-6 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-sage" />
            <p className="text-sm font-semibold text-primary">+75 XP earned with Eco!</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                setDonated(false);
                setPhotoPreview(null);
                setAiDone(false);
                setForm({ title: "", description: "", condition: "Good", recipient: "anyone", size: "", color: "", category: "" });
              }}
              className="bg-sage text-sage-dark font-semibold hover:bg-sage/90"
            >
              Donate Another Item
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-deep-green py-8 pt-24">
        <div className="container">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-sage/20 text-sage border-sage/40 font-medium text-xs px-3 py-1">
              <Leaf className="h-3 w-3 mr-1 inline" /> Zero Waste
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground">Donate an Item</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">Give clothes a second life — for free</p>
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Photo Picker */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Photo</Label>

          {photoPreview ? (
            /* Preview */
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-muted">
              <img src={photoPreview} alt="Selected" className="w-full h-full object-cover" />
              <button
                onClick={() => { setPhotoPreview(null); setAiDone(false); setAiLoading(false); }}
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/60 flex items-center justify-center"
              >
                <X className="h-4 w-4 text-white" />
              </button>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full"
              >
                <Camera className="h-3.5 w-3.5" /> Change
              </button>
            </div>
          ) : (
            /* Picker buttons */
            <div className="space-y-2">
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-border bg-muted/30 active:bg-muted/60 transition-colors"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">Take or select a photo</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Camera · Photo Library</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setPhotoPreview("https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop");
                  runAiTagging();
                }}
                className="w-full flex items-center gap-3 p-4 rounded-2xl border border-sage/40 bg-sage/10 active:bg-sage/20 transition-colors"
              >
                <div className="h-12 w-12 rounded-xl bg-sage/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-sage-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">Try AI Demo</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Use a sample photo to see AI tagging</p>
                </div>
              </button>
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(f); }}
          />
        </div>

        {/* AI Tagging */}
        {(aiLoading || aiDone) && (
          <div className="border rounded-xl p-4 bg-transparent">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className={`h-5 w-5 ${aiDone ? "text-sage" : "text-sage animate-pulse"}`} />
              <p className="font-semibold text-sm">
                {aiLoading ? "AI is analyzing your photo..." : "AI tagging complete!"}
              </p>
            </div>
            {aiLoading && (
              <Progress value={aiProgress} className="h-2 mb-3 [&>div]:bg-sage [&>div]:transition-all" />
            )}
            {aiDone && (
              <div className="flex flex-wrap gap-2 mt-2">
                {[`Size: ${form.size}`, `Color: ${form.color}`, `Category: ${form.category}`, `Condition: ${form.condition}`].map((tag) => (
                  <Badge key={tag} className="bg-white text-foreground border border-foreground gap-1 shadow-sm font-medium">
                    <Check className="h-3 w-3" /> {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Item Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label className="text-sm font-semibold mb-1.5 block">Title</Label>
            <Input
              placeholder="e.g. Cream Knit Cardigan"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
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
            <Label className="text-sm font-semibold mb-1.5 block">Category</Label>
            <Input
              placeholder="e.g. Knitwear"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
          <div className="col-span-2">
            <Label className="text-sm font-semibold mb-1.5 block">Description</Label>
            <Textarea
              placeholder="Any brand, material, or details worth sharing..."
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </div>

        {/* Condition */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Condition</Label>
          <div className="flex flex-wrap gap-2">
            {conditions.map((c) => (
              <button
                key={c}
                onClick={() => setForm({ ...form, condition: c })}
                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                  form.condition === c
                    ? "border-primary text-primary"
                    : "border-border hover:border-primary text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Recipient */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Who should receive it?</Label>
          <div className="grid grid-cols-1 gap-3">
            {recipients.map(({ value, label, desc, icon }) => (
              <button
                key={value}
                onClick={() => setForm({ ...form, recipient: value })}
                className={`p-4 rounded-xl border text-left transition-all flex items-center gap-4 ${
                  form.recipient === value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary text-foreground"
                }`}
              >
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="font-semibold text-sm">{label}</p>
                  <p className={`text-xs mt-0.5 ${form.recipient === value ? "text-primary/70" : "text-muted-foreground"}`}>{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Eco impact note */}
        <div className="bg-sage/10 border border-sage/30 rounded-xl p-4 flex gap-3 items-start">
          <Leaf className="h-5 w-5 text-sage mt-0.5 flex-shrink-0" />
          <p className="text-sm text-foreground">
            <span className="font-semibold">Eco Impact:</span> Donating this item saves an estimated{" "}
            <span className="font-semibold text-sage">4 kg of textile waste</span> and earns you{" "}
            <span className="font-semibold">+75 XP</span>.
          </p>
        </div>

        {/* CTA */}
        <Button
          onClick={() => setDonated(true)}
          disabled={!form.title}
          className="w-full h-14 bg-sage text-sage-dark font-bold text-base hover:bg-sage/90 rounded-2xl"
        >
          <Heart className="h-5 w-5 mr-2" /> Donate Item
        </Button>
      </div>
    </main>
  );
}