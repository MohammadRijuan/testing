"use server";

import crypto from "crypto";
import dbConnect, { collectionNamesObj } from "@/lib/mongodb";
import { sendResetEmail } from "@/lib/sendResetEmail";

export async function forgotPassword(email) {
  try {
    if (!email) {
      return {
        success: false,
        message: "Email is required.",
      };
    }

    const userCollection = await dbConnect(
      collectionNamesObj.userCollection
    );

    const user = await userCollection.findOne({ email });

    // Don't reveal whether the email exists
    if (!user) {
      return {
        success: true,
        message:
          "If an account with that email exists, a password reset link has been sent.",
      };
    }

    // Generate secure random token
    const rawToken = crypto.randomBytes(32).toString("hex");

    // Hash the token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    // Token expires in 30 minutes
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    // Save hashed token and expiry
    await userCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          resetPasswordToken: hashedToken,
          resetPasswordExpires: expiresAt,
        },
      }
    );

    // Reset link sent to the user
    const resetLink = `http://localhost:3000/reset-password?token=${rawToken}`;

    // Send email
    await sendResetEmail(user.name, user.email, resetLink);

    return {
      success: true,
      message:
        "If an account with that email exists, a password reset link has been sent.",
    };
  } catch (error) {
    console.error("Forgot Password Error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}