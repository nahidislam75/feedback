import { type NextRequest, NextResponse } from "next/server"
import { feedbackStorage, type Feedback } from "@/lib/feedback-storage"

export async function GET() {
  try {
    console.log(" GET request - fetching all feedback")

    const allFeedback = await feedbackStorage.getAll()
    const sortedFeedback = allFeedback.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    console.log(" GET request - current storage length:", sortedFeedback.length)

    return NextResponse.json(sortedFeedback)
  } catch (error) {
    console.error("Error fetching feedback:", error)
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, feedback, rating } = body

    console.log(" POST request body:", { name, email, feedback, rating })

    
    if (!name || !email || !feedback) {
      return NextResponse.json({ error: "Name, email, and feedback are required" }, { status: 400 })
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 })
    }

    
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Please provide a rating between 1 and 5 stars" }, { status: 400 })
    }

    const timestamp = Date.now().toString()
    const randomPart = Math.random().toString(36).substring(2, 11)
    const id = `${timestamp}_${randomPart}`

  
    const newFeedback: Feedback = {
      id,
      name: name.trim(),
      email: email.trim(),
      feedback: feedback.trim(),
      rating: Number(rating),
      createdAt: new Date().toISOString(),
    }

    console.log(" Creating new feedback with ID:", id)

    await feedbackStorage.add(newFeedback)

    const newLength = await feedbackStorage.getLength()
    console.log(" Feedback added, new storage length:", newLength)

    return NextResponse.json({ message: "Feedback submitted successfully", feedback: newFeedback }, { status: 201 })
  } catch (error) {
    console.error("Error submitting feedback:", error)
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 })
  }
}
