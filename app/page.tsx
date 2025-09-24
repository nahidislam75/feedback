"use client"

import { useState, useEffect } from "react"
import { AppHeader } from "@/components/feedback/app-header"
import { FeedbackForm } from "@/components/feedback/feedback-form"
import { FeedbackList } from "@/components/feedback/feedback-list"
import type { Feedback } from "@/app/api/feedback/route"

export default function FeedbackApp() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([])

  // Load feedback on component mount
  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    try {
      const response = await fetch("/api/feedback")
      if (response.ok) {
        const data = await response.json()
        setFeedbackList(data)
      }
    } catch (error) {
      console.error("Error fetching feedback:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader feedbackCount={feedbackList.length} />

      <div className="mx-auto max-w-4xl px-6 py-16 space-y-20">
        <FeedbackForm onSubmitSuccess={fetchFeedback} />
        <FeedbackList feedbackList={feedbackList} onUpdate={fetchFeedback} />
      </div>
    </div>
  )
}
