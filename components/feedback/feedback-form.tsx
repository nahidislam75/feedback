"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { StarRating } from "@/components/ui/star-rating";
import { Send, Sparkles } from "lucide-react";

interface FeedbackFormProps {
  onSubmitSuccess: () => void;
}

export function FeedbackForm({ onSubmitSuccess }: FeedbackFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !feedback.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to submit your feedback",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Missing Rating",
        description: "Please provide a star rating for your feedback",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          feedback: feedback.trim(),
          rating,
        }),
      });

      if (response.ok) {
        toast({
          title: "Thank you!",
          description: "Your feedback has been submitted successfully.",
        });

        setName("");
        setEmail("");
        setFeedback("");
        setRating(0);

        onSubmitSuccess();
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Unable to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-lg card-hover relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-luxury-gold/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-warm-accent/10 to-transparent rounded-full translate-y-12 -translate-x-12" />

      <CardHeader className="space-y-6 pb-10 relative">
        <div className="flex items-center justify-center gap-3">
          <Sparkles className="h-6 w-6 text-luxury-gold" />
          <CardTitle className="section-title text-4xl text-center text-foreground font-playfair">
            Submit Your Feedback
          </CardTitle>
          <Sparkles className="h-6 w-6 text-luxury-gold" />
        </div>
        <CardDescription className="elegant-subtitle text-center text-xl text-muted-foreground max-w-2xl mx-auto">
          We value every voice. Share your experience and help us improve our
          journey together.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8 relative">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 border-border/30 focus:border-luxury-gold transition-all duration-300 bg-input/50 backdrop-blur-sm luxury-input text-base"
                required
              />
            </div>
            <div className="space-y-4">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 border-border/30 focus:border-luxury-gold transition-all duration-300 bg-input/50 backdrop-blur-sm luxury-input text-base"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">
              Overall Rating
            </Label>
            <div className="flex items-center gap-4 p-6 rounded-xl bg-accent/20 border border-border/20">
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                size="lg"
              />
              <span className="text-base text-muted-foreground font-medium">
                {rating > 0 ? (
                  <span className="text-luxury-gold">
                    {rating} star{rating !== 1 ? "s" : ""} -{" "}
                    {rating === 5
                      ? "Exceptional!"
                      : rating === 4
                      ? "Great!"
                      : rating === 3
                      ? "Good"
                      : rating === 2
                      ? "Fair"
                      : "Needs improvement"}
                  </span>
                ) : (
                  "Click to rate"
                )}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Label
              htmlFor="feedback"
              className="text-sm font-medium text-foreground"
            >
              Your Feedback
            </Label>
            <Textarea
              id="feedback"
              placeholder="Share your thoughts, suggestions, or experiences..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={6}
              className="border-border/30 focus:border-luxury-gold transition-all duration-300 resize-none bg-input/50 backdrop-blur-sm luxury-input text-base leading-relaxed"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 text-lg font-medium luxury-button text-primary-foreground relative overflow-hidden group"
          >
            <span className="flex items-center justify-center gap-3">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  Submit Feedback
                </>
              )}
            </span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
