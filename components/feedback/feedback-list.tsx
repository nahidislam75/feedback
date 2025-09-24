import { MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FeedbackCard } from "./feedback-card"
import type { Feedback } from "@/app/api/feedback/route"

interface FeedbackListProps {
  feedbackList: Feedback[]
  onUpdate: () => void
}

export function FeedbackList({ feedbackList, onUpdate }: FeedbackListProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="section-title text-4xl lg:text-5xl text-foreground">Community Insights</h2>
        <p className="elegant-subtitle text-muted-foreground max-w-2xl mx-auto">
          Discover what others are saying and join the conversation
        </p>
      </div>

      {feedbackList.length === 0 ? (
        <Card className="border-0 shadow-lg bg-card/60 backdrop-blur-sm">
          <CardContent className="pt-16 pb-16 text-center">
            <MessageSquare className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
            <h3 className="section-title text-2xl text-muted-foreground mb-3">No feedback yet</h3>
            <p className="body-text text-muted-foreground">
              Be the first to share your thoughts and start the conversation.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {feedbackList.map((item) => (
            <FeedbackCard key={item.id} feedback={item} onUpdate={onUpdate} onDelete={onUpdate} />
          ))}
        </div>
      )}
    </div>
  )
}

export type { Feedback }
