/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { UserSchema, User } from "../utils/db.ts"
import { HandlerContext } from "$fresh/server.ts";

export const handler = async (_req: Request, _ctx: HandlerContext) : Promise<Response> => {
  const users = await User.find().toArray();

  return _ctx.render({ users })
}

interface HomeProps {
  data: {
    users: Array<UserSchema>;
  }
}

export default function Home({ data: { users } }: HomeProps) {

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
            <p>{user.email}</p>
          </div>))}
        </p>
      </div>
    </div>
  );
}
