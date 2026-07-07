import { NextResponse } from "next/server";
import slugify from "slugify";

import dbConnect, {
  collectionNamesObj,
} from "@/lib/mongodb";

import { uploadImage } from "@/lib/uploadImage";

// ======================================
// GET ALL PRODUCTS
// ======================================

export async function GET() {
  try {
    const productCollection = await dbConnect(
      collectionNamesObj.productsCollection
    );

    const products = await productCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: products,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET Products Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products.",
      },
      {
        status: 500,
      }
    );
  }
}

// ======================================
// CREATE PRODUCT
// ======================================

export async function POST(request) {
  try {
    const productCollection = await dbConnect(
      collectionNamesObj.productsCollection
    );

    const formData = await request.formData();

    const image = formData.get("image");

    const name = formData.get("name");
    const category = formData.get("category");
    const description = formData.get("description");

    const price = Number(formData.get("price"));
    const discountPrice = Number(
      formData.get("discountPrice")
    );

    const stock = Number(formData.get("stock"));

    const featured =
      formData.get("featured") === "true";

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Product image is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Generate slug
    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Prevent duplicate slug
    const existingProduct =
      await productCollection.findOne({
        slug,
      });

    if (existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A product with this name already exists.",
        },
        {
          status: 400,
        }
      );
    }

    // Upload Image

    const bytes = await image.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadedImage = await uploadImage(
      buffer,
      "products"
    );

    // Create Product

    const product = {
      name,

      slug,

      category,

      description,

      price,

      discountPrice,

      stock,

      featured,

      images: [
        {
          imageUrl: uploadedImage.secure_url,
          publicId: uploadedImage.public_id,
        },
      ],

      createdAt: new Date(),

      updatedAt: new Date(),
    };

    const result =
      await productCollection.insertOne(product);

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully.",

        insertedId: result.insertedId,

        data: product,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST Product Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product.",
      },
      {
        status: 500,
      }
    );
  }
}