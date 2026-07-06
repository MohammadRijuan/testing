import { NextResponse } from "next/server";
import dbConnect, { collectionNamesObj } from "@/lib/mongodb";
import { uploadImage } from "@/lib/uploadImage";





// GET ALL HERO BANNERS

export async function GET() {
  try {
    const heroBannerCollection = await dbConnect(
      collectionNamesObj.heroBannerCollection
    );

    const banners = await heroBannerCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: banners,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Hero Banner Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch hero banners.",
      },
      { status: 500 }
    );
  }
}



// CREATE HERO BANNER

export async function POST(request) {
  try {
    const heroBannerCollection = await dbConnect(
      collectionNamesObj.heroBannerCollection
    );

    const formData = await request.formData();

    const image = formData.get("image");
    const alt = formData.get("alt");

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Hero banner image is required.",
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadedImage = await uploadImage(buffer);

    // Banner document
    const banner = {
      imageUrl: uploadedImage.secure_url,
      publicId: uploadedImage.public_id,
      alt: alt || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to MongoDB
    const result = await heroBannerCollection.insertOne(banner);

    return NextResponse.json(
      {
        success: true,
        message: "Hero banner created successfully.",
        insertedId: result.insertedId,
        data: banner,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Hero Banner Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create hero banner.",
      },
      { status: 500 }
    );
  }
}