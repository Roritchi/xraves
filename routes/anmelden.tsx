/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Login, { LoginPage } from "../islands/Login.tsx";

export default function Home() {
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
          <Login page={LoginPage.Login} />
        </div>
      </div>
    </div>
  );
}
