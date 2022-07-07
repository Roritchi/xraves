/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { UserSchema, User } from "../utils/db.ts"

const users = await User.find().toArray();

export default function Home() {
  User.insertOne({
    username: Math.random().toString(),
    password: Math.random().toString(),
    phone: Math.random().toString(),
  } as UserSchema)

  return (
    <div class={tw`w-screen h-screen bg-[#333] text-white`}>
      <head>
        <title>xraves</title>
      </head>
      <div class={tw`p-4 mx-auto max-w-screen-md`}>
        <img
          src="/logo.png"
          class={tw`h-8`}
          alt="the xraves logo: the text xraves as colorfull letters"
        />
        <p class={tw`my-6`}>
          {users.map(user => (<div>
            <p>{JSON.stringify(user)}</p>
          </div>))}
        </p>
      </div>
    </div>
  );
}
