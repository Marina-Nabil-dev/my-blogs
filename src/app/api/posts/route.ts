import { NextResponse } from "next/server";
import { PostWithDetails } from '@/app/api/types/post';


export async function GET() {
  try {
    const response = await fetch("https://dummyjson.com/c/63dc-8803-4502-9ca7");

    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }

    const data: PostWithDetails[] = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}