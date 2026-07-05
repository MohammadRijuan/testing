"use server";

import dbConnect, { collectionNamesObj } from "@/lib/mongodb";
import { sendWelcomeEmail } from "@/lib/sendEmail";
import bcrypt from "bcryptjs";


export const registerUser = async (payload) => {
  const userCollection = await dbConnect(collectionNamesObj.userCollection);

  const { name, email, password } = payload;

  if (!email || !password) {
    return {
      success: false,
      message: "Missing information",
    };
  }

  const exists = await userCollection.findOne({ email });

  if (exists) {
    return {
      success: false,
      message: "Email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,

    // automatic role
    role: "user",

    createdAt: new Date(),
  };

  const result = await userCollection.insertOne(newUser);

  await sendWelcomeEmail(name, email);

  

  return {
    success: result.acknowledged,
  };
};