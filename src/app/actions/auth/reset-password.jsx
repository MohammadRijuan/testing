"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import dbConnect, { collectionNamesObj } from "@/lib/mongodb";

export async function resetPassword(token, newPassword) {
  try {
    if (!token || !newPassword) {
      return {
        success: false,
        message: "Missing required information.",
      };
    }

    // Optional: enforce a minimum password length
    if (newPassword.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters long.",
      };
    }

    const userCollection = await dbConnect(
      collectionNamesObj.userCollection
    );

    // Hash the token from the URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find a user with a matching token that hasn't expired
    const user = await userCollection.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return {
        success: false,
        message: "This reset link is invalid or has expired.",
      };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and remove reset fields
    await userCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
        },
        $unset: {
          resetPasswordToken: "",
          resetPasswordExpires: "",
        },
      }
    );

    return {
      success: true,
      message: "Password updated successfully.",
    };
  } catch (error) {
    console.error("Reset Password Error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}