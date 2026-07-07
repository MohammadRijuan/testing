import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect, { collectionNamesObj } from "@/lib/mongodb";

// PATCH: Update User Role
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    const { role } = await request.json();

    if (!role) {
      return NextResponse.json(
        {
          success: false,
          message: "Role is required.",
        },
        { status: 400 }
      );
    }

    const userCollection = await dbConnect(
      collectionNamesObj.userCollection
    );

    const result = await userCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          role,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `User role updated to ${role}.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH USER ROLE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user role.",
      },
      { status: 500 }
    );
  }
}