import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Leaf, Users, Recycle, Star, Heart, ChevronRight, Zap } from "lucide-react";
import { IoArrowForward, IoGiftOutline, IoSwapHorizontalOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const featuredListings = [
  {
    id: 1,
    name: "Vintage Levi's Denim Jacket",
    price: 25,
    size: "M",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=400&h=500&fit=crop",
    seller: "Sofia R.",
    saved: false,
  },
  {
    id: 2,
    name: "Floral Summer Dress",
    price: 18,
    size: "S",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop",
    seller: "Maria G.",
    saved: true,
  },
  {
    id: 3,
    name: "Cream Knit Sweater",
    price: 20,
    size: "L",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
    seller: "Emma T.",
    saved: false,
  },
  {
    id: 4,
    name: "Black Slim Trousers",
    price: 15,
    size: "M",
    condition: "Fair",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4086?w=400&h=500&fit=crop",
    seller: "Ana L.",
    saved: false,
  },
  {
    id: 5,
    name: "Puffer Winter Jacket",
    price: 40,
    size: "XL",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400&h=500&fit=crop",
    seller: "Laura P.",
    saved: false,
  },
];



const stats = [
  { value: 1240, label: "Items Exchanged", icon: Recycle, suffix: "+" },
  { value: 620, label: "kg CO₂ Saved", icon: Leaf, suffix: "kg" },
  { value: 380, label: "Students Involved", icon: Users, suffix: "+" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 20);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl font-bold text-mustard">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function Index() {
  const [savedItems, setSavedItems] = useState<Record<number, boolean>>(
    Object.fromEntries(featuredListings.map((l) => [l.id, l.saved]))
  );

  const toggleSave = (id: number) =>
    setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <main className="min-h-screen bg-background flex flex-col pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-deep-green flex flex-col px-4 py-6 pt-16">
        {/* Top Content */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Logo/Tagline */}
          <Badge className="bg-accent/20 text-accent border-accent/40 font-medium text-xs px-3 py-1">
            <Leaf className="h-3 w-3 mr-1 inline" /> Sustainable Fashion for Students
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl font-extrabold text-primary-foreground leading-tight">
            Your Campus,<br />
            <span style={{ color: "#B5B682" }}>Your Closet.</span>
          </h1>

          {/* Description */}
          <p className="text-sm text-foreground max-w-sm leading-relaxed">
            Buy, sell, and swap second-hand clothes with students from your university. AI-powered tagging. Zero effort. Real impact.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full mt-6 mb-6 px-2">
          <Link to="/browse" className="w-full">
            <Button size="lg" className="w-full h-12 rounded-full bg-sage text-sage-dark hover:bg-sage/90 font-semibold flex items-center justify-center gap-3 px-4">
              <span className="flex items-center justify-center bg-white/0 rounded-full">
                <IoArrowForward className="h-5 w-5 transform rotate-180" />
              </span>
              <span className="text-sm">Browse Items</span>
            </Button>
          </Link>
          <Link to="/sell" className="w-full">
            <Button size="lg" variant="outline" className="w-full h-12 rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-white/10 font-semibold flex items-center justify-center gap-3 px-4">
              <span className="text-sm">Start Selling</span>
            </Button>
          </Link>
          <div className="flex gap-3">
            <Link to="/donate" className="flex-1">
              <Button variant="outline" className="w-full h-12 rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-white/10 font-semibold flex items-center justify-center gap-2 px-4">
                <IoGiftOutline className="h-5 w-5" />
                <span className="text-sm">Donate</span>
              </Button>
            </Link>
            <Link to="/swap" className="flex-1">
              <Button variant="outline" className="w-full h-12 rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-white/10 font-semibold flex items-center justify-center gap-2 px-4">
                <IoSwapHorizontalOutline className="h-5 w-5" />
                <span className="text-sm">Swap</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured Item Card */}
        <div className="flex flex-col justify-center items-center mb-6">
          <div className="relative w-64 h-72">
            <img
              src="https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=500&h=600&fit=crop"
              alt="Second-hand fashion"
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-5 -left-5 bg-card rounded-xl shadow-lg p-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent flex-shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-foreground">AI Tagged</p>
                <p className="text-[10px] text-muted-foreground">Size M · Casual · Good</p>
              </div>
            </div>
            <div className="absolute -top-5 -right-5 bg-sage rounded-xl shadow-lg p-3">
              <p className="text-sm font-bold text-sage-dark">$18</p>
              <p className="text-[10px] text-sage-dark">Like New ✓</p>
            </div>
          </div>
        </div>
</section>
       {/* Eco Mascot Section */}
<div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-200 shadow-sm max-w-md mx-auto">
  <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
    <img 
      src={import.meta.env.BASE_URL + "llama.jpeg"}
      alt="Eco mascot" 
      className="w-full h-full object-contain" 
    />
  </div>

  <div className="flex-1">
    <p className="text-sm font-semibold text-gray-900">Hi! My name is Eco 🌿</p>
    <p className="text-xs text-gray-500 mt-1">
      Welcome to your sustainable fashion journey!
    </p>
  </div>
</div>
      

    </main>
  );
}
