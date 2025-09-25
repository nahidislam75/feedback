"use client";

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
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Save, X } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";
import type { Feedback } from "@/app/api/feedback/route";

interface FeedbackCardProps {
  feedback: Feedback;
  onUpdate: () => void;
  onDelete: () => void;
}

export function FeedbackCard({
  feedback,
  onUpdate,
  onDelete,
}: FeedbackCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: feedback.name,
    email: feedback.email,
    feedback: feedback.feedback,
    rating: feedback.rating,
  });
  const { toast } = useToast();

  const handleSaveEdit = async () => {
    if (
      !editForm.name.trim() ||
      !editForm.email.trim() ||
      !editForm.feedback.trim()
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (editForm.rating === 0) {
      toast({
        title: "Missing Rating",
        description: "Please provide a star rating",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`/api/feedback/${feedback.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm), // Now includes rating in the request
      });

      if (response.ok) {
        toast({
          title: "Updated Successfully",
          description: "Your feedback has been updated.",
        });
        setIsEditing(false);
        onUpdate();
      } else {
        throw new Error("Failed to update feedback");
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Unable to update feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/feedback/${feedback.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Deleted Successfully",
          description: "Feedback has been removed.",
        });
        onDelete();
      } else {
        throw new Error("Failed to delete feedback");
      }
    } catch (error) {
      toast({
        title: "Deletion Failed",
        description: "Unable to delete feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      name: feedback.name,
      email: feedback.email,
      feedback: feedback.feedback,
      rating: feedback.rating, // Reset rating to original value
    });
  };

  return (
    <Card className="border-0 shadow-lg bg-card/90 backdrop-blur-sm card-hover fade-in">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1 flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="text-lg font-semibold h-10 bg-input"
                  placeholder="Name"
                />
                <Input
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="text-sm h-9 bg-input"
                  placeholder="Email"
                />
                <div className="flex items-center gap-3">
                  <StarRating
                    rating={editForm.rating}
                    onRatingChange={(rating) =>
                      setEditForm({ ...editForm, rating })
                    }
                  />
                  <span className="text-sm text-muted-foreground">
                    {editForm.rating} star{editForm.rating !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feedback.name}
                  </CardTitle>
                  <StarRating rating={feedback.rating} readonly size="sm" />
                </div>
                <CardDescription className="text-muted-foreground">
                  {feedback.email}
                </CardDescription>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs text-muted-foreground bg-accent px-3 py-1 rounded-full">
              {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {isEditing ? (
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleSaveEdit}
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                  <Save className="h-4 w-4 text-primary" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={cancelEdit}
                  className="h-8 w-8 p-0 hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                  <Pencil className="h-4 w-4 text-primary" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDelete}
                  className="h-8 w-8 p-0 hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editForm.feedback}
            onChange={(e) =>
              setEditForm({ ...editForm, feedback: e.target.value })
            }
            rows={4}
            className="resize-none bg-input"
            placeholder="Feedback"
          />
        ) : (
          <p className="body-text text-foreground whitespace-pre-wrap">
            {feedback.feedback}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
