import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import dbConnect, { collectionNamesObj } from "@/lib/mongodb";
import { uploadImage } from "@/lib/uploadImage";
import cloudinary from "@/lib/cloudinary";



// UPDATE HERO BANNER

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    const heroBannerCollection = await dbConnect(
      collectionNamesObj.heroBannerCollection
    );

    const formData = await request.formData();

    const image = formData.get("image");
    const alt = formData.get("alt");

    const existingBanner = await heroBannerCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!existingBanner) {
      return NextResponse.json(
        {
          success: false,
          message: "Hero banner not found.",
        },
        { status: 404 }
      );
    }

    const updatedData = {
      alt: alt || existingBanner.alt,
      updatedAt: new Date(),
    };

    // Upload new image if provided
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadedImage = await uploadImage(buffer);

      // Delete old image from Cloudinary
      if (existingBanner.publicId) {
        await cloudinary.uploader.destroy(existingBanner.publicId);
      }

      updatedData.imageUrl = uploadedImage.secure_url;
      updatedData.publicId = uploadedImage.public_id;
    }

    await heroBannerCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedData,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Hero banner updated successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("PATCH Hero Banner Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update hero banner.",
      },
      {
        status: 500,
      }
    );
  }
}



// DELETE HERO BANNER

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const heroBannerCollection = await dbConnect(
      collectionNamesObj.heroBannerCollection
    );

    const banner = await heroBannerCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!banner) {
      return NextResponse.json(
        {
          success: false,
          message: "Hero banner not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Delete image from Cloudinary
    if (banner.publicId) {
      await cloudinary.uploader.destroy(banner.publicId);
    }

    await heroBannerCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Hero banner deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DELETE Hero Banner Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete hero banner.",
      },
      {
        status: 500,
      }
    );
  }
}