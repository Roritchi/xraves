import {
    Bson,
    MongoClient,
    ObjectId
  } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
  
const client = new MongoClient();
console.log(Deno.env.get("MONGO_URI"))
await client.connect(Deno.env.get("MONGO_URI") as string);

const db = client.database("xraves");

export enum UserType {
    Nutzer,
    Veranstalter,
    Moderator,
    Admin,
}

export interface UserSchema {
    _id: ObjectId;
    email: string;
    phone: string;
    password: string;
    type: UserType;
}

export const User = db.collection<UserSchema>("users");

export default db;