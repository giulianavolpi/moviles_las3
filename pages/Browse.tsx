import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Camera, Heart, Star, SlidersHorizontal, X, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const listings = [
  { id: 1, name: "Vintage Levi's Denim Jacket", price: 25, size: "M", condition: "Good", category: "Jackets", color: "Blue", style: "Casual", seller: "Sofia R.", rating: 4.8, image: "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=400&h=500&fit=crop", tags: ["Casual", "Vintage", "Denim"], saved: false },
  { id: 2, name: "Floral Summer Dress", price: 18, size: "S", condition: "Like New", category: "Dresses", color: "Multicolor", style: "Boho", seller: "Maria G.", rating: 5.0, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop", tags: ["Boho", "Summer", "Floral"], saved: true },
  { id: 3, name: "Cream Knit Sweater", price: 20, size: "L", condition: "Good", category: "Tops", color: "Cream", style: "Cozy", seller: "Emma T.", rating: 4.6, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop", tags: ["Knitwear", "Cozy", "Autumn"], saved: false },
  { id: 4, name: "Black Slim Trousers", price: 15, size: "M", condition: "Fair", category: "Bottoms", color: "Black", style: "Smart Casual", seller: "Ana L.", rating: 4.3, image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4086?w=400&h=500&fit=crop", tags: ["Smart", "Office", "Classic"], saved: false },
  { id: 5, name: "Puffer Winter Jacket", price: 40, size: "XL", condition: "Like New", category: "Jackets", color: "Green", style: "Sporty", seller: "Laura P.", rating: 4.9, image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400&h=500&fit=crop", tags: ["Winter", "Sporty", "Warm"], saved: false },
  { id: 6, name: "Silk Blouse Ivory", price: 22, size: "S", condition: "Good", category: "Tops", color: "Ivory", style: "Elegant", seller: "Chloe M.", rating: 4.7, image: "https://images.unsplash.com/photo-1485518882345-15568b007407?w=400&h=500&fit=crop", tags: ["Elegant", "Silk", "Evening"], saved: false },
  { id: 7, name: "Canvas Tote Bag", price: 10, size: "One Size", condition: "Like New", category: "Accessories", color: "Natural", style: "Casual", seller: "Ines R.", rating: 4.5, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=500&fit=crop", tags: ["Eco", "Casual", "Bag"], saved: true },
  { id: 8, name: "High-Waist Jeans", price: 28, size: "M", condition: "Good", category: "Bottoms", color: "Blue", style: "Casual", seller: "Nora B.", rating: 4.4, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop", tags: ["Denim", "Casual", "Classic"], saved: false },
  { id: 9, name: "Striped Linen Shirt", price: 16, size: "L", condition: "Good", category: "Tops", color: "White", style: "Casual", seller: "Kai O.", rating: 4.6, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop", tags: ["Linen", "Summer", "Stripe"], saved: false },
];

const categories = ["All", "Tops", "Bottoms", "Jackets", "Dresses", "Accessories"];
const sizes = ["All", "XS", "S", "M", "L", "XL"];
const conditions = ["All", "Like New", "Good", "Fair"];
const colors = [
  { name: "All", hex: "#e5e7eb" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Black", hex: "#111827" },
  { name: "Cream", hex: "#fef3c7" },
  { name: "Green", hex: "#16a34a" },
  { name: "White", hex: "#f9fafb" },
  { name: "Multicolor", hex: "linear-gradient(135deg,#ef4444,#3b82f6,#22c55e)" },
];

export default function Browse() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [condition, setCondition] = useState("All");
  const [color, setColor] = useState("All");
  const [sort, setSort] = useState("newest");
  const [savedItems, setSavedItems] = useState<Record<number, boolean>>(
    Object.fromEntries(listings.map((l) => [l.id, l.saved]))
  );
  const [aiSearch, setAiSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSave = (id: number) =>
    setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }));

  const filtered = listings.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || l.category === category;
    const matchSize = size === "All" || l.size === size;
    const matchCond = condition === "All" || l.condition === condition;
    const matchColor = color === "All" || l.color === color;
    return matchSearch && matchCat && matchSize && matchCond && matchColor;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return b.id - a.id;
  });

  const hasFilters = category !== "All" || size !== "All" || condition !== "All" || color !== "All";

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Mobile Header */}
      <div className="bg-deep-green py-4 sticky top-0 z-50">
        <div className="px-4 space-y-3">
          <h1 className="text-2xl font-bold text-primary-foreground pt-4">Browse</h1>
          
          {/* Search Bar */}
          <div className="flex gap-2 pb-3 pt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white border-0 h-11 text-sm py-2.5"
              />
            </div>
            <Button
              variant={aiSearch ? "default" : "outline"}
              className={`h-14 w-14 rounded-lg flex items-center justify-center flex-shrink-0 ${aiSearch ? "bg-accent text-accent-foreground border-0" : "bg-white/10 text-primary-foreground border-white/20 hover:bg-white/20"}`}
              onClick={() => setAiSearch(!aiSearch)}
              title="Visual search"
            >
              <Camera className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              className="h-14 w-14 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/10 text-primary-foreground border-white/20 hover:bg-white/20"
              onClick={() => setShowFilters(!showFilters)}
              title="Filters"
            >
              <SlidersHorizontal className="h-6 w-6" />
            </Button>
          </div>

          {aiSearch && (
            <div className="p-2.5 bg-accent/20 border border-accent/40 rounded-lg text-xs text-primary-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Upload a photo to find similar items</span>
              <label className="ml-auto cursor-pointer bg-accent text-accent-foreground px-2 py-1 rounded text-[10px] font-semibold">
                Upload
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Filters Right Sidebar */}
      {showFilters && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setShowFilters(false)}>
          <div className="fixed top-0 right-0 h-full w-80 bg-background shadow-lg overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Category */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">Type</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${category === c ? "bg-sage text-sage-dark border-sage-dark" : "border-border text-foreground"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">Size</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${size === s ? "bg-sage text-sage-dark border-sage-dark" : "border-border text-foreground"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">Condition</p>
                <div className="flex flex-wrap gap-2">
                  {conditions.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCondition(c)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${condition === c ? "bg-sage text-sage-dark border-sage-dark" : "border-border text-foreground"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">Color</p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      title={c.name}
                      className={`h-7 w-7 rounded-full border-2 transition-transform ${color === c.name ? "border-sage scale-110" : "border-transparent"}`}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-muted-foreground text-xs"
                  onClick={() => { setCategory("All"); setSize("All"); setCondition("All"); setColor("All"); }}
                >
                  <X className="h-3 w-3 mr-1" /> Clear filters
                </Button>
              )}

              {/* Apply Button */}
              <Button 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg py-2.5 font-semibold"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-3 py-0.5 space-y-3">
        {/* Item Count */}
        <p className="text-sm font-medium text-muted-foreground">{sorted.length} items</p>

        {/* Product Grid - 2 columns for mobile */}
        <div className="grid grid-cols-2 gap-3">
          {sorted.map((item) => (
            <Link key={item.id} to={`/item/${item.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all group border-0 shadow-sm h-full flex flex-col">
                <div className="relative bg-muted aspect-square flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => { e.preventDefault(); toggleSave(item.id); }}
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform"
                  >
                    <Heart className={`h-4 w-4 ${savedItems[item.id] ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                  </button>
                  <Badge className="absolute top-2 left-2 text-[9px] bg-white text-foreground border border-foreground px-2 py-0.5">
                    {item.condition}
                  </Badge>
                </div>
                <CardContent className="p-2.5 flex-1 flex flex-col">
                  <p className="font-semibold text-xs line-clamp-2 flex-1">{item.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-sm text-accent">${item.price}</span>
                    <div className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <Star className="h-3 w-3 fill-mustard text-mustard" />
                      {item.rating}
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{item.seller}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-16">
            <p className="text-3xl mb-2">🔍</p>
            <p className="font-semibold text-foreground">No items found</p>
            <p className="text-xs text-muted-foreground mt-1">Try different filters</p>
          </div>
        )}
      </div>
    </main>
  );
}
