import { type NextRequest, NextResponse } from "next/server";
import { feedbackStorage } from "@/lib/feedback-storage";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("[v0] PUT request received for ID:", params.id);

    const currentLength = await feedbackStorage.getLength();
    const availableIds = await feedbackStorage.getAllIds();

    console.log("[v0] Current feedbackStorage length:", currentLength);
    console.log("[v0] Available IDs:", availableIds);

    const { id } = params;
    const body = await request.json();
    const { name, email, feedback, rating } = body;

    console.log("[v0] Request body:", { name, email, feedback, rating });

    if (!name || !email || !feedback) {
      return NextResponse.json(
        { error: "Name, email, and feedback are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Please provide a rating between 1 and 5 stars" },
        { status: 400 }
      );
    }

    const updatedFeedback = await feedbackStorage.updateById(id, {
      name: name.trim(),
      email: email.trim(),
      feedback: feedback.trim(),
      rating: Number(rating),
    });

    if (!updatedFeedback) {
      console.log("[v0] Feedback not found for ID:", id);
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    console.log("[v0] Updated feedback:", updatedFeedback);

    return NextResponse.json({
      message: "Feedback updated successfully",
      feedback: updatedFeedback,
    });
  } catch (error) {
    console.error("[v0] Error updating feedback:", error);
    return NextResponse.json(
      { error: "Failed to update feedback" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("[v0] DELETE request received for ID:", params.id);

    const { id } = params;

    const deleted = await feedbackStorage.deleteById(id);

    if (!deleted) {
      console.log("[v0] Feedback not found for deletion, ID:", id);
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    console.log("[v0] Feedback deleted successfully");

    return NextResponse.json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error("[v0] Error deleting feedback:", error);
    return NextResponse.json(
      { error: "Failed to delete feedback" },
      { status: 500 }
    );
  }
}
