import { MessageSquare, Users, Star, Sparkles } from "lucide-react"

interface AppHeaderProps {
  feedbackCount: number
}

export function AppHeader({ feedbackCount }: AppHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-accent/10 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:32px_32px] opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:48px_48px] opacity-30" />

      <div className="absolute top-20 left-10 opacity-10">
        <Sparkles className="h-8 w-8 text-luxury-gold animate-pulse" />
      </div>
      <div className="absolute top-32 right-16 opacity-10">
        <Sparkles className="h-6 w-6 text-warm-accent animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      <div className="absolute bottom-20 left-1/4 opacity-10">
        <Sparkles className="h-4 w-4 text-luxury-gold animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-32 lg:py-40">
        <div className="text-center space-y-12 fade-in">
          <div className="space-y-6">
            <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl font-light tracking-tight">
              <span className="brand-title">Mokadderul's</span>
            </h1>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-normal text-primary">Feedback App</h2>
          </div>

          <p className="elegant-subtitle text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed">
            Your feedback shapes our future. Join the conversation and help us build something
            <span className="text-luxury-gold font-medium"> extraordinary </span>
            together.
          </p>

          <div className="flex items-center justify-center gap-12 pt-12">
            <div className="flex items-center gap-4 text-muted-foreground fade-in-stagger glass-card px-6 py-3 rounded-full">
              <MessageSquare className="h-5 w-5 text-luxury-gold" />
              <span className="text-sm font-medium">{feedbackCount} Insights</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground fade-in-stagger glass-card px-6 py-3 rounded-full">
              <Users className="h-5 w-5 text-warm-accent" />
              <span className="text-sm font-medium">Community Driven</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground fade-in-stagger glass-card px-6 py-3 rounded-full">
              <Star className="h-5 w-5 text-luxury-gold" />
              <span className="text-sm font-medium">Premium Experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
