import { NextResponse } from "next/server";
import { PostWithDetails } from "@/app/types/post";
import postsData from "@/data/posts.json";

export async function GET() {
  try {
    const posts: PostWithDetails[] = postsData as unknown as PostWithDetails[];
    // const posts = await fetch("https://fakerapi.it/api/v2/books?_quantity=6");
    // console.log(posts);

    // if (!posts.ok) throw new Error("Failed to fetch data");

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
