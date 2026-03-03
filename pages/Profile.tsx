import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoStar, IoCreateOutline, IoTrashOutline, IoLockClosedOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const badges = [
  { id: 1, emoji: "🛍️", name: "First Sale", desc: "Sold your first item", earned: true, xp: 50 },
  { id: 2, emoji: "💚", name: "5 Items Saved", desc: "Saved 5 items from waste", earned: true, xp: 100 },
  { id: 3, emoji: "🌍", name: "Eco Hero", desc: "Completed 10 sustainable swaps", earned: true, xp: 200 },
  { id: 4, emoji: "📸", name: "Photo Pro", desc: "Uploaded 5 photos with AI tags", earned: true, xp: 75 },
  { id: 5, emoji: "⭐", name: "Top Rated", desc: "Received 5 five-star reviews", earned: false, xp: 150 },
  { id: 6, emoji: "🔥", name: "Streak Keeper", desc: "Active for 7 days in a row", earned: false, xp: 120 },
  { id: 7, emoji: "♻️", name: "Swap Master", desc: "Completed 20 swaps", earned: false, xp: 300 },
  { id: 8, emoji: "🎖️", name: "Campus Legend", desc: "Reached Level 10", earned: false, xp: 500 },
];

const activityFeed = [
  { id: 1, type: "sold", icon: "🛍️", text: "You sold Vintage Levi's Denim Jacket", time: "2 hours ago", xp: 50 },
  { id: 2, type: "saved", icon: "💚", text: "You saved Floral Summer Dress", time: "Yesterday", xp: 5 },
  { id: 3, type: "bought", icon: "🛒", text: "You bought Cream Knit Sweater", time: "3 days ago", xp: 30 },
  { id: 4, type: "donated", icon: "🎁", text: "You donated Black Slim Trousers", time: "Last week", xp: 75 },
  { id: 5, type: "badge", icon: "🏅", text: 'Earned badge "Eco Hero"', time: "Last week", xp: 200 },
];

const myListings = [
  { id: 1, name: "Vintage Levi's Denim Jacket", price: 25, status: "Active", image: "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=200&h=200&fit=crop" },
  { id: 3, name: "Cream Knit Sweater", price: 20, status: "Active", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop" },
  { id: 9, name: "Striped Linen Shirt", price: 16, status: "Sold", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&h=200&fit=crop" },
];

const levels = [
  { level: 1, name: "Eco Newcomer", minXp: 0 },
  { level: 2, name: "Green Starter", minXp: 100 },
  { level: 3, name: "Swap Buddy", minXp: 250 },
  { level: 4, name: "Eco Explorer", minXp: 500 },
  { level: 5, name: "Sustainability Star", minXp: 900 },
  { level: 6, name: "Campus Champion", minXp: 1400 },
];

export default function Profile() {
  const location = useLocation();
  const [tab, setTab] = useState(location.search.includes("view=listings") ? "listings" : "activity");
  useEffect(() => {
    setTab(location.search.includes("view=listings") ? "listings" : "activity");
  }, [location.search]);
  const xp = 680;
  const currentLevel = levels.filter((l) => xp >= l.minXp).pop()!;
  const nextLevel = levels.find((l) => l.minXp > xp);
  const progress = nextLevel
    ? ((xp - currentLevel.minXp) / (nextLevel.minXp - currentLevel.minXp)) * 100
    : 100;

  const [listings, setListings] = useState(myListings);

  const deleteListingItem = (id: number) =>
    setListings((prev) => prev.filter((l) => l.id !== id));

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-deep-green py-4 sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-foreground">Profile</h1>
        </div>
      </div>

      {tab !== "listings" && (
        <>
          {/* User Info */}
          <div className="bg-deep-green/50 py-6 border-b border-deep-green">
            <div className="container flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-accent flex-shrink-0">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                <AvatarFallback className="bg-sage text-primary-foreground text-sm font-bold">AL</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-primary-foreground">Alex López</h2>
                <p className="text-primary-foreground/85 text-sm">UCM Madrid · Member since Sept 2024</p>
                <div className="flex items-center gap-2 mt-2">
                  <IoStar className="h-4 w-4 fill-mustard text-mustard" />
                  <span className="text-primary-foreground font-semibold text-sm">4.8</span>
                  <span className="text-primary-foreground/80 text-xs">· 15 transactions</span>
                </div>
                <div className="mt-3">
                  <p className="text-accent font-bold text-lg">{xp.toLocaleString()} XP Points</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-8 space-y-8">
            {/* Eco Mascot (simple like Profile sections) */}
            <div className="bg-deep-green/50 py-6">
              <div className="container flex items-start gap-3">

                {/* Image */}
                <img
                  src={import.meta.env.BASE_URL + "llama.jpeg"}
                  alt="Eco mascot llama"
                  className="h-30 w-20 object-contain flex-shrink-0"
                />

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-primary-foreground">
                    Eco says:
                  </h3>
                  <p className="text-sm text-primary-black/85 mt-1">
                    You've sold <span className="font-semibold">3 items</span> this month.
                    You're just <span className="font-semibold">220 XP</span> away from
                    <span className="font-semibold"> Level 5 - Sustainability Star</span>. Keep it up to unlock new badges and rewards!
                  </p>
                </div>

              </div>
            </div>

            {/* Level Progress */}
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-black/70 font-semibold uppercase tracking-wide">Sustainability Level</p>
                    <p className="text-lg font-bold text-black">
                      Level {currentLevel.level} – {currentLevel.name}
                    </p>
                  </div>
                  {nextLevel && (
                    <div className="text-right">
                      <p className="text-xs text-black/70">Next up</p>
                      <p className="text-sm font-semibold text-black">Level {nextLevel.level} · {nextLevel.name}</p>
                      <p className="text-xs text-black/70">{nextLevel.minXp - xp} XP to go</p>
                    </div>
                  )}
                </div>
                <Progress value={progress} className="h-3 [&>div]:bg-primary-foreground [&>div]:transition-all" />
                <div className="flex justify-between text-xs text-black/70 mt-1.5">
                  <span>{currentLevel.minXp} XP</span>
                  <span className="font-semibold text-black">{xp} XP</span>
                  <span>{nextLevel?.minXp ?? "MAX"} XP</span>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Badges & Rewards</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {badges.map((badge) => (
                  <Card
                    key={badge.id}
                    className={`border-0 shadow-lg transition-all ${badge.earned ? "hover:shadow-lg" : "opacity-50"}`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`text-3xl mb-2 ${!badge.earned ? "grayscale" : ""}`}>
                        {badge.earned ? badge.emoji : <span className="relative inline-block">{badge.emoji}<IoLockClosedOutline className="absolute -bottom-1 -right-1 h-3 w-3 text-muted-foreground" /></span>}
                      </div>
                      <p className="text-xs font-semibold text-foreground">{badge.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{badge.desc}</p>
                      <Badge
                        className={`mt-2 text-[10px] ${badge.earned ? "bg-accent/20 text-accent-foreground border-accent/30" : "bg-muted text-muted-foreground border-border"}`}
                      >
                        +{badge.xp} XP
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </>
      )}

        {/* Tabs: Activity + My Listings */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-muted h-10">
            <TabsTrigger value="activity" className="data-[state=active]:bg-white data-[state=active]:text-primary-foreground">
              Activity Feed
            </TabsTrigger>
            <TabsTrigger value="listings" className="data-[state=active]:bg-white data-[state=active]:text-primary-foreground">
              My Listings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="mt-4">
            <div className="space-y-3">
              {activityFeed.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-card border rounded-xl p-4 shadow-lg">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <Badge className="bg-sage/20 text-sage-dark border-sage/30 text-[10px] shrink-0">
                    +{item.xp} XP
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="listings" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden border-0 shadow-lg
                 hover:shadow-lg transition-shadow">
                  <div className="relative h-40">
                    <img src={listing.image} alt={listing.name} className="w-full h-full object-cover" />
                    <Badge
                      className={`absolute top-2 left-2 text-[10px] ${listing.status === "Active" ? "bg-sage text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                      {listing.status}
                    </Badge>
                  </div>
                  <CardContent className="p-3">
                    <p className="font-semibold text-sm truncate">{listing.name}</p>
                    <p className="text-accent font-bold mb-3">${listing.price}</p>
                    <div className="flex gap-2">
                      <Link to={`/item/${listing.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full text-xs border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                          <IoCreateOutline className="h-3 w-3 mr-1" /> Edit
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-destructive hover:bg-destructive/10"
                        onClick={() => deleteListingItem(listing.id)}
                      >
                        <IoTrashOutline className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Link to="/sell">
                <div className="border-2 border-dashed border-border rounded-xl h-full min-h-48 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer p-6 text-center">
                  <span className="text-3xl">+</span>
                  <p className="text-sm font-medium">Add New Listing</p>
                </div>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
    </main>
  );
}
