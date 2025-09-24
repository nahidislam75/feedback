"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function StarRating({ rating, onRatingChange, readonly = false, size = "md", className }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-7 w-7",
  }

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value)
    }
  }

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0)
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoverRating || rating)
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            className={cn(
              "transition-all duration-300 star-luxury",
              !readonly && "hover:scale-110 cursor-pointer",
              readonly && "cursor-default",
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                /* Enhanced star colors with luxury gold gradient */
                isActive ? "fill-luxury-gold text-luxury-gold" : "fill-none text-muted-foreground/30",
                !readonly && "hover:text-luxury-gold transition-colors duration-200",
              )}
              style={{
                /* Added subtle glow effect for active stars */
                filter: isActive ? "drop-shadow(0 0 4px rgba(255, 215, 0, 0.3))" : "none",
              }}
            />
          </button>
        )
      })}
    </div>
  )
}
