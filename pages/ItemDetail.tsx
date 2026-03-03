import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, MessageCircle, Star, CheckCircle, ChevronLeft, Share2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const allItems = [
  { id: 1, name: "Vintage Levi's Denim Jacket", price: 25, size: "M", condition: "Good", category: "Jackets", color: "Blue", style: "Casual", seller: { name: "Sofia R.", university: "UCM Madrid", rating: 4.8, sales: 12, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia", verified: true }, aiScore: 87, description: "Classic vintage Levi's denim jacket in good condition. Minor wear on the cuffs adds to its character. Perfect for layering in autumn and spring.", images: ["https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=600&h=700&fit=crop", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop", "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=300&fit=crop"], tags: ["Casual", "Vintage", "Denim", "Layering", "Autumn"], exchangeType: "sell" },
  { id: 2, name: "Floral Summer Dress", price: 18, size: "S", condition: "Like New", category: "Dresses", color: "Multicolor", style: "Boho", seller: { name: "Maria G.", university: "UPM Madrid", rating: 5.0, sales: 7, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria", verified: true }, aiScore: 95, description: "Beautiful floral summer dress worn only twice. Lightweight fabric, perfect for festivals or campus events. No stains or damage.", images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=700&fit=crop", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop", "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=300&fit=crop"], tags: ["Boho", "Summer", "Floral", "Festival", "Light"], exchangeType: "swap" },
  { id: 3, name: "Cream Knit Sweater", price: 20, size: "L", condition: "Good", category: "Tops", color: "Cream", style: "Cozy", seller: { name: "Emma T.", university: "Complutense", rating: 4.6, sales: 5, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", verified: false }, aiScore: 82, description: "Soft cream knit sweater from Zara. Gently used, no pilling. Great for cold evenings or cozy study sessions.", images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=700&fit=crop", "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop", "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&h=300&fit=crop"], tags: ["Knitwear", "Cozy", "Autumn", "Zara", "Soft"], exchangeType: "sell" },
  { id: 4, name: "Black Slim Trousers", price: 15, size: "M", condition: "Fair", category: "Bottoms", color: "Black", style: "Smart Casual", seller: { name: "Ana L.", university: "UAM", rating: 4.3, sales: 3, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana", verified: false }, aiScore: 72, description: "Slim-fit black trousers, slightly faded from washing but still presentable. Perfect for office or smart casual looks.", images: ["https://images.unsplash.com/photo-1594938298603-c8148c4b4086?w=600&h=700&fit=crop", "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=300&fit=crop", "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=300&h=300&fit=crop"], tags: ["Smart", "Office", "Classic", "Black", "Slim"], exchangeType: "donate" },
  { id: 5, name: "Puffer Winter Jacket", price: 40, size: "XL", condition: "Like New", category: "Jackets", color: "Green", style: "Sporty", seller: { name: "Laura P.", university: "UC3M", rating: 4.9, sales: 20, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura", verified: true }, aiScore: 93, description: "Warm army-green puffer jacket. Worn only once last winter. Excellent insulation, water-resistant outer shell.", images: ["https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&h=700&fit=crop", "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=300&h=300&fit=crop", "https://images.unsplash.com/photo-1544441893-675973e31985?w=300&h=300&fit=crop"], tags: ["Winter", "Sporty", "Warm", "Puffer", "Green"], exchangeType: "sell" },
];

const similarItems = [
  { id: 3, name: "Cream Knit Sweater", price: 20, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop" },
  { id: 5, name: "Puffer Winter Jacket", price: 40, image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=300&h=300&fit=crop" },
  { id: 6, name: "Silk Blouse Ivory", price: 22, image: "https://images.unsplash.com/photo-1485518882345-15568b007407?w=300&h=300&fit=crop" },
  { id: 8, name: "High-Waist Jeans", price: 28, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop" },
];

const conditionColors: Record<string, string> = {
  "Like New": "bg-white text-foreground border-foreground hover:bg-white",
  Good: "bg-white text-foreground border-foreground hover:bg-white",
  Fair: "bg-white text-foreground border-foreground hover:bg-white",
};

export default function ItemDetail() {
  const { id } = useParams();
  const item = allItems.find((i) => i.id === Number(id)) ?? allItems[0];
  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const scoreLabel =
    item.aiScore >= 90 ? "Excellent" : item.aiScore >= 80 ? "Good" : item.aiScore >= 70 ? "Fair" : "Poor";
  const scoreColor =
    item.aiScore >= 90 ? "bg-sage" : item.aiScore >= 80 ? "bg-warm-beige" : "bg-muted-foreground";

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-6">
        {/* Breadcrumb */}
        <Link to="/browse" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="h-4 w-4" /> Back to Browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Photo Gallery */}
          <div className="space-y-3">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
              <img
                src={item.images[activeImg]}
                alt={item.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            <div className="flex gap-2">
              {item.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`h-16 w-16 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? "border-foreground scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Item Info */}
          <div className="space-y-5">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground leading-tight">{item.name}</h1>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setSaved(!saved)}
                    aria-label="Save item"
                  >
                    <Heart className={`h-5 w-5 ${saved ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Share">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              </div>
              <p className="text-3xl font-extrabold text-accent mb-1">${item.price}</p>
              <Badge className={`text-xs border ${conditionColors[item.condition] ?? "bg-muted text-muted-foreground"} hover:bg-current`}>
                {item.condition}
              </Badge>
              <Badge className="ml-2 text-xs bg-sage text-sage-dark border-0 hover:bg-sage">
                {item.exchangeType === "sell" ? "For Sale" : item.exchangeType === "swap" ? "For Swap" : "Free / Donate"}
              </Badge>
            </div>

            {/* AI Tags */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                <Zap className="h-3 w-3" /> AI-Generated Tags
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white text-foreground border border-foreground hover:bg-white">Size {item.size}</Badge>
                <Badge className="bg-white text-foreground border border-foreground hover:bg-white">{item.color}</Badge>
                <Badge className="bg-white text-foreground border border-foreground hover:bg-white">{item.category}</Badge>
                <Badge className="bg-white text-foreground border border-foreground hover:bg-white">{item.style}</Badge>
                {item.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} className="bg-white text-foreground border border-foreground hover:bg-white text-xs">{tag}</Badge>
                ))}
              </div>
            </div>

            {/* AI Quality Score */}
            <div className="bg-card border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Zap className="h-4 w-4" /> AI Quality Score
                </p>
                <span className="text-sm font-bold text-primary">{item.aiScore}% - {scoreLabel}</span>
              </div>
              <Progress value={item.aiScore} className="h-2 [&>div]:bg-primary-foreground" />
              <p className="text-xs text-foreground mt-2">
                Based on photo analysis of fabric quality, visible wear, and overall condition.
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Description</p>
              <p className="text-sm text-foreground leading-relaxed">{item.description}</p>
            </div>

            {/* Seller Card */}
            <div className="bg-card border rounded-xl p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Seller</p>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={item.seller.avatar} />
                  <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
                    {item.seller.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">{item.seller.name}</p>
                    {item.seller.verified && (
                      <span className="flex items-center gap-0.5 text-[10px] font-semibold text-accent bg-accent/10 px-1.5 py-0.5 rounded-full border border-accent/20">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{item.seller.university}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-0.5 text-xs">
                      <Star className="h-3 w-3 fill-mustard text-mustard" />
                      <span className="font-medium">{item.seller.rating}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">{item.seller.sales} items sold</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-white text-foreground border border-foreground hover:bg-white/80 font-semibold h-11"
                onClick={() => setMessageSent(true)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {messageSent ? <><CheckCircle className="h-4 w-4 mr-2" />Message Sent!</> : "Message Seller"}
              </Button>
              <Button
                variant="outline"
                className={`flex-1 h-11 font-semibold border-foreground text-foreground hover:bg-white ${saved ? "bg-white" : ""}`}
                onClick={() => setSaved(!saved)}
              >
                <Heart className={`h-4 w-4 mr-2 ${saved ? "fill-current" : ""}`} />
                {saved ? <><CheckCircle className="h-3 w-3 mr-1" />Saved</> : "Save Item"}
              </Button>
            </div>
          </div>
        </div>

        {/* Similar Items */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-foreground mb-4">Similar Items</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {similarItems.map((s) => (
              <Link key={s.id} to={`/item/${s.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow group border-0 shadow-sm">
                  <img src={s.image} alt={s.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <CardContent className="p-3">
                    <p className="text-sm font-medium truncate">{s.name}</p>
                    <p className="text-accent font-bold">${s.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
