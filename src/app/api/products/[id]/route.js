import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import dbConnect, { collectionNamesObj } from "@/lib/mongodb";
import { uploadImage } from "@/lib/uploadImage";
import cloudinary from "@/lib/cloudinary";

// ===============================
// GET SINGLE PRODUCT
// ===============================

export async function GET(request, context) {
  try {
    const { id } = await context.params;

    const productCollection = await dbConnect(
      collectionNamesObj.productsCollection
    );

    const product = await productCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product.",
      },
      {
        status: 500,
      }
    );
  }
}

// ===============================
// UPDATE PRODUCT
// ===============================

export async function PATCH(request, context) {
  try {
    const { id } = await context.params;

    const productCollection = await dbConnect(
      collectionNamesObj.productsCollection
    );

    const oldProduct = await productCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!oldProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    const formData = await request.formData();

    const image = formData.get("image");

    let images = oldProduct.images;

    if (image && image.size > 0) {
      if (oldProduct.images?.length) {
        await cloudinary.uploader.destroy(
          oldProduct.images[0].publicId
        );
      }

      const bytes = await image.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const uploadedImage = await uploadImage(
        buffer,
        "products"
      );

      images = [
        {
          imageUrl: uploadedImage.secure_url,
          publicId: uploadedImage.public_id,
        },
      ];
    }

    const updatedProduct = {
      name: formData.get("name"),
      category: formData.get("category"),
      description: formData.get("description"),

      price: Number(formData.get("price")),
      discountPrice: Number(
        formData.get("discountPrice")
      ),

      stock: Number(formData.get("stock")),

      featured:
        formData.get("featured") === "true",

      images,

      updatedAt: new Date(),
    };

    await productCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedProduct,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Product updated successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product.",
      },
      {
        status: 500,
      }
    );
  }
}

// ===============================
// DELETE PRODUCT
// ===============================

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;

    const productCollection = await dbConnect(
      collectionNamesObj.productsCollection
    );

    const product = await productCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (product.images?.length) {
      await cloudinary.uploader.destroy(
        product.images[0].publicId
      );
    }

    await productCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product.",
      },
      {
        status: 500,
      }
    );
  }
}