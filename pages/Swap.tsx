import { useState, useRef } from "react";
import { Camera, Sparkles, Check, ArrowLeftRight, Leaf, X } from "lucide-react";
import { IoSwapHorizontalOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const swapListings = [
  {
    id: 1,
    seller: "Sofia R.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    offering: "Vintage Levi's Jacket",
    offeringImage: "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=300&h=300&fit=crop",
    offeringSize: "M",
    offeringCondition: "Good",
    wanting: "Any cozy sweater or hoodie",
    wantingSize: "S–M",
    tags: ["Casual", "Denim"],
    xp: 120,
  },
  {
    id: 2,
    seller: "Maria G.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    offering: "Floral Summer Dress",
    offeringImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop",
    offeringSize: "S",
    offeringCondition: "Like New",
    wanting: "Trousers or jeans, any colour",
    wantingSize: "S",
    tags: ["Feminine", "Summer"],
    xp: 95,
  },
  {
    id: 3,
    seller: "Emma T.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    offering: "Cream Knit Sweater",
    offeringImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop",
    offeringSize: "L",
    offeringCondition: "Good",
    wanting: "Jacket or coat for autumn",
    wantingSize: "M–L",
    tags: ["Cosy", "Knitwear"],
    xp: 80,
  },
  {
    id: 4,
    seller: "Ana L.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
    offering: "Ripped Denim Pants",
    offeringImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop",
    offeringSize: "M",
    offeringCondition: "Fair",
    wanting: "Casual dress or skirt",
    wantingSize: "S–M",
    tags: ["Smart Casual", "Basics"],
    xp: 60,
  },
];

const conditions = ["Like New", "Good", "Fair"];

const ecoTips = [
  "Every swap saves ~7 kg of CO₂ compared to buying new.",
  "Swapping keeps clothes in circulation longer — real circular fashion!",
  "You just matched with a swap partner and earned 50 XP!",
];

export default function Swap() {
  const [tab, setTab] = useState<"browse" | "post">("browse");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDone, setAiDone] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [posted, setPosted] = useState(false);
  const [proposed, setProposed] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    condition: "Good",
    size: "",
    color: "",
    category: "",
    wantDesc: "",
    wantSize: "",
    wantCategory: "",
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
            title: prev.title || "Puffer Winter Jacket",
            size: "L",
            color: "Black",
            category: "Outerwear",
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

  if (posted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-sage/20 mx-auto mb-5">
            <ArrowLeftRight className="h-10 w-10 text-sage" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Swap Listed!</h2>
          <p className="text-muted-foreground text-sm mb-4">{tip}</p>
          <div className="bg-sage/20 border border-sage/40 rounded-xl p-4 mb-6 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-sage" />
            <p className="text-sm font-semibold text-primary">+50 XP earned with Eco!</p>
          </div>
          <Button
            onClick={() => { setPosted(false); setPhotoPreview(null); setAiDone(false); setForm({ title: "", description: "", condition: "Good", size: "", color: "", category: "", wantDesc: "", wantSize: "", wantCategory: "" }); setTab("browse"); }}
            className="bg-sage text-sage-dark font-semibold hover:bg-sage/90"
          >
            Browse Swap Partners
          </Button>
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
            <Badge className="bg-accent/20 text-accent border-accent/40 font-medium text-xs px-3 py-1">
              <Leaf className="h-3 w-3 mr-1 inline" /> Circular Fashion
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground">Swap Items</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">Trade clothes with students — no money needed</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="container pt-5">
        <div className="flex bg-muted/40 rounded-xl p-1 gap-1">
          {(["browse", "post"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all capitalize ${
                tab === t
                  ? "bg-white shadow text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "browse" ? "Browse Swaps" : "Post a Swap"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Browse tab ──────────────────────────────────── */}
      {tab === "browse" && (
        <div className="px-4 py-5 space-y-4">
          <p className="text-xs text-muted-foreground">
            {swapListings.length} students looking to swap near you
          </p>

          {swapListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden border border-border rounded-2xl shadow-sm">
              <CardContent className="p-0">
                {/* Item image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={listing.offeringImage}
                    alt={listing.offering}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                    {listing.tags.map((tag) => (
                      <Badge key={tag} className="bg-black/50 text-white border-0 text-[10px]">{tag}</Badge>
                    ))}
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white/90 text-foreground border-0 text-[10px] font-semibold">
                      {listing.offeringCondition}
                    </Badge>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-3">
                  {/* Seller row */}
                  <div className="flex items-center gap-2">
                    <img
                      src={listing.avatar}
                      alt={listing.seller}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                    <p className="text-xs font-semibold text-foreground">{listing.seller}</p>
                    <Badge className="ml-auto bg-accent/20 text-accent border-accent/30 text-[10px]">⭐ {listing.xp} XP</Badge>
                  </div>

                  {/* Offering */}
                  <div>
                    <p className="text-sm font-bold text-primary">{listing.offering}</p>
                    <p className="text-xs text-muted-foreground">Size {listing.offeringSize}</p>
                  </div>

                  {/* Wants */}
                  <div className="flex items-start gap-2 bg-muted/40 rounded-xl px-3 py-2">
                    <IoSwapHorizontalOutline className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">Wants in return</p>
                      <p className="text-xs text-foreground font-medium">{listing.wanting}</p>
                      <p className="text-[10px] text-muted-foreground">Size: {listing.wantingSize}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  {proposed === listing.id ? (
                    <div className="flex items-center gap-2 py-2 justify-center">
                      <Check className="h-4 w-4 text-sage" />
                      <p className="text-sm font-semibold text-sage">Swap proposed! Waiting for reply…</p>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setProposed(listing.id)}
                      className="w-full bg-sage text-sage-dark font-semibold hover:bg-sage/90"
                    >
                      <ArrowLeftRight className="h-4 w-4 mr-2" /> Propose Swap
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ── Post tab ──────────────────────────────────── */}
      {tab === "post" && (
        <div className="px-4 py-5 space-y-5">
          {/* What you're offering */}
          <div className="space-y-3">
            <p className="text-base font-bold text-primary">What you're offering</p>

            {/* Photo Picker */}
            <Label className="text-sm font-semibold mb-1 block">Photo</Label>

            {photoPreview ? (
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
                    setPhotoPreview("https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400&h=400&fit=crop");
                    runAiTagging();
                  }}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border border-accent/40 bg-accent/10 active:bg-accent/20 transition-colors"
                >
                  <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-accent-foreground" />
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
                <Sparkles className={`h-5 w-5 ${aiDone ? "text-sage" : "text-accent animate-pulse"}`} />
                <p className="font-semibold text-sm">
                  {aiLoading ? "AI is analyzing your photo..." : "AI tagging complete!"}
                </p>
              </div>
              {aiLoading && (
                <Progress value={aiProgress} className="h-2 mb-3 [&>div]:bg-accent [&>div]:transition-all" />
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

          {/* Item details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label className="text-sm font-semibold mb-1.5 block">Item Title</Label>
              <Input
                placeholder="e.g. Puffer Winter Jacket"
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
                placeholder="e.g. Outerwear"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <Label className="text-sm font-semibold mb-1.5 block">Description</Label>
              <Textarea
                placeholder="Brand, material, any wear to note..."
                rows={2}
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

          {/* Divider */}
          <div className="border-t border-border" />

          {/* What you want */}
          <div>
            <p className="text-base font-bold text-primary mb-4">What you want in return</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label className="text-sm font-semibold mb-1.5 block">Describe what you're looking for</Label>
                <Textarea
                  placeholder="e.g. Any cozy sweater or hoodie in good condition"
                  rows={2}
                  value={form.wantDesc}
                  onChange={(e) => setForm({ ...form, wantDesc: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-1.5 block">Preferred Size</Label>
                <Input
                  placeholder="e.g. S–M"
                  value={form.wantSize}
                  onChange={(e) => setForm({ ...form, wantSize: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-1.5 block">Category</Label>
                <Input
                  placeholder="e.g. Knitwear"
                  value={form.wantCategory}
                  onChange={(e) => setForm({ ...form, wantCategory: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Eco note */}
          <div className="bg-sage/10 border border-sage/30 rounded-xl p-4 flex gap-3 items-start">
            <Leaf className="h-5 w-5 text-sage mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground">
              <span className="font-semibold">Eco Impact:</span> Every swap saves an estimated{" "}
              <span className="font-semibold text-sage">7 kg of CO₂</span> versus buying new, and earns you{" "}
              <span className="font-semibold">+50 XP</span>.
            </p>
          </div>

          <Button
            onClick={() => setPosted(true)}
            disabled={!form.title}
            className="w-full h-14 bg-sage text-sage-dark font-bold text-base hover:bg-sage/90 rounded-2xl"
          >
            <ArrowLeftRight className="h-5 w-5 mr-2" /> Post Swap
          </Button>
        </div>
      )}
    </main>
  );
}