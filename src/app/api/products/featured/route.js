import { NextResponse } from "next/server";

import dbConnect, {
  collectionNamesObj,
} from "@/lib/mongodb";

export async function GET() {
  try {
    const productCollection = await dbConnect(
      collectionNamesObj.productsCollection
    );

    const featuredProducts = await productCollection
      .find({
        featured: true,
      })
      .sort({
        createdAt: -1,
      })
      .limit(6)
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: featuredProducts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Featured Products Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch featured products.",
      },
      {
        status: 500,
      }
    );
  }
}