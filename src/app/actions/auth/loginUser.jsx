"use server"

import dbConnect, { collectionNamesObj } from "@/lib/mongodb";
import bcrypt from "bcryptjs"; 

export const loginUser = async (payload) => {
    const { email, password } = payload;

    const userCollection = dbConnect(collectionNamesObj.userCollection)
    const user = await userCollection.findOne({ email });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
}