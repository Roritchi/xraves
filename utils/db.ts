import {
    Bson,
    MongoClient,
    ObjectId
  } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
  
const client = new MongoClient();
await client.connect("mongodb://127.0.0.1:27017");

const db = client.database("xraves");

export enum UserType {
    Nutzer,
    Veranstalter,
    Moderator,
    Admin,
}

export interface UserSchema {
    _id: ObjectId;
    username: string;
    phone: string;
    password: string;
    type: UserType;
}

export const User = db.collection<UserSchema>("users");

export default db;