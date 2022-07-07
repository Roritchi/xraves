/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { UserSchema, User } from "../utils/db.ts"
import Login, { LoginPage, LoginType, LoginProps } from "../islands/Login.tsx";

export const handler: Handlers<LoginProps> = {
  async POST(req, ctx) {
    const data = await req.formData();

    const type = parseInt(data.get("type") as string || "0") as LoginType;
    const page = parseInt(data.get("page") as string || "0") as LoginPage;

    if(page == LoginPage.Register) {
      User.insertOne({
        username: data.get("username") as string,
        password: data.get("password") as string,
        phone: data.get("phone") as string,
      } as UserSchema)
    } else if(page == LoginPage.Login) {
      User.findOne({
        username: data.get("username") as string,
        password: data.get("password") as string,
        phone: data.get("phone") as string,
      })
    }

    const resp = await ctx.render({ page, type });
    resp.headers.set("X-Custom-Header", "Hello");
    return resp;
  },
};

export default function LoginView({ data }: any) {
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

        </p>
        <div class={tw`w-1/2 mx-auto`}>
          <Login {...data} />
        </div>
      </div>
    </div>
  );
}
