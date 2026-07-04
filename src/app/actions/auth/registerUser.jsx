"use server"

import dbConnect, { collectionNamesObj } from "@/lib/mongodb";
import bcrypt from "bcryptjs"; 

export const registerUser = async (payload) => {
  const userCollection = dbConnect(collectionNamesObj.userCollection)

  const { name, email, password } = payload;
  if (!email || !password) return null;


  const user = await userCollection.findOne({ email });
  if (user) return null;


  const hashedPassword = await bcrypt.hash(password, 10);


  const safePayload = {
    name,
    email,
    password: hashedPassword,
  };

  const result = await userCollection.insertOne(safePayload);
  
  return {
    acknowledged: result.acknowledged,
    insertedId: result.insertedId.toString(),
  };
};