import { NextResponse } from "next/server";
import dbConnect, { collectionNamesObj } from "@/lib/mongodb";

// GET ALL USERS
export async function GET() {
  try {
    const userCollection = await dbConnect(
      collectionNamesObj.userCollection
    );

    const users = await userCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users.",
      },
      { status: 500 }
    );
  }
}