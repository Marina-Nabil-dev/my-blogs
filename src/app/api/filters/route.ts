import { NextResponse } from 'next/server';
import { FilterData } from './../../types/filters';

export async function GET() {
  
try {
    const response = await fetch("https://dummyjson.com/c/43d9-2eaf-45de-84d0");

    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }

    const data: FilterData[] = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch filters:", error);
    return NextResponse.json({ error: "Failed to fetch filters" }, { status: 500 });

  }
} 