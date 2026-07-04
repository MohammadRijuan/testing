import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const db = client.db("test");
  const banners = await db.collection("banners").find().toArray();

  return NextResponse.json(banners);
}

export async function POST(req) {
  const data = await req.json();

  const db = client.db("test");

  await db.collection("banners").insertOne({
    name: data.name,
    image: data.image,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}