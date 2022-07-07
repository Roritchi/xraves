/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";

export enum LoginType {
  Email,
  MagicEmail,
  Phone,
  MagicPhone,
  Default = Email,
}

const LOGIN_TYPE_BUTTONS = [
  { type: LoginType.Email, text: 'E-Mail & Passwort' },
  { type: LoginType.MagicEmail, text: 'Magic E-Mail' },
  { type: LoginType.Phone, text: 'Handynummer & Passwort' },
  { type: LoginType.MagicPhone, text: 'Magic SMS' },
]

export enum LoginPage {
  Login,
  Register,
}

export interface LoginProps {
  page: LoginPage;
  type: LoginType;
}

export default function Login(props: LoginProps) {
  console.log(props)
  const [page, setPage] = useState(props.page || 0);
  const [type, setType] = useState(props.type || LoginType.Default);

  return (
    <div class={tw`w-full`}>
      <button class={tw`w-1/2 p-2 border-none focus:outline-none hover:opacity-75`} style={{ borderBottom: page == LoginPage.Login ? '2px solid red' : '' }} onClick={() => setPage(LoginPage.Login)}>Login</button>
      <button class={tw`w-1/2 p-2 border-none focus:outline-none hover:opacity-75`} style={{ borderBottom: page == LoginPage.Register ? '2px solid red' : '' }} onClick={() => setPage(LoginPage.Register)}>Register</button>
      <div hidden={page != LoginPage.Register} class={tw`w-full p-2`}>
        <form action="/login" method="post">
          <input type="hidden" name="page" value={page} />
          <input type="hidden" name="type" value={type} />

          <label style={{ display: type == LoginType.Email || type == LoginType.MagicEmail ? 'block' : 'none' }} for="login-email">E-Mail</label>
          <input style={{ display: type == LoginType.Email || type == LoginType.MagicEmail ? 'block' : 'none' }} class={tw`bg-gray-800 px-2 py-1 rounded-sm border border-black block w-full`} type="email" name="email" id="login-email" />
          <label style={{ display: type == LoginType.Phone || type == LoginType.MagicPhone ? 'block' : 'none' }} for="login-phone">Handynummer</label>
          <input style={{ display: type == LoginType.Phone || type == LoginType.MagicPhone ? 'block' : 'none' }} class={tw`bg-gray-800 px-2 py-1 rounded-sm border border-black block w-full`} type="tel" name="phone" id="login-phone" />
          <label style={{ display: type == LoginType.Email || type == LoginType.Phone ? 'block' : 'none' }} for="login-password">Passwort</label>
          <input style={{ display: type == LoginType.Email || type == LoginType.Phone ? 'block' : 'none' }} class={tw`bg-gray-800 px-2 py-1 rounded-sm border border-black block w-full`} name="password" type="password" id="login-password" />
        
          <button type="submit">Submit</button>
        </form>
        <p>oder registriere dich an mit...</p>
        { LOGIN_TYPE_BUTTONS.map(btn => (
          <button style={{ borderColor: type == btn.type ? 'red' : '' }} onClick={() => setType(btn.type)} class={tw`w-full p-3 my-2 border border-black bg-[#222] rounded-sm hover:bg-[#252525] focus:outline-none`}>{btn.text}</button>
        )) }
      </div>
      <div hidden={page != LoginPage.Login} class={tw`w-full p-2`}>
        <form action="/login" method="post">
          <input type="hidden" name="page" value={page} />
          <input type="hidden" name="type" value={type} />

          <label style={{ display: type == LoginType.Email || type == LoginType.MagicEmail ? 'block' : 'none' }} for="login-email">E-Mail</label>
          <input style={{ display: type == LoginType.Email || type == LoginType.MagicEmail ? 'block' : 'none' }} class={tw`bg-gray-800 px-2 py-1 rounded-sm border border-black block w-full`} type="email" name="email" id="login-email" />
          <label style={{ display: type == LoginType.Phone || type == LoginType.MagicPhone ? 'block' : 'none' }} for="login-phone">Handynummer</label>
          <input style={{ display: type == LoginType.Phone || type == LoginType.MagicPhone ? 'block' : 'none' }} class={tw`bg-gray-800 px-2 py-1 rounded-sm border border-black block w-full`} type="tel" name="phone" id="login-phone" />
          <label style={{ display: type == LoginType.Email || type == LoginType.Phone ? 'block' : 'none' }} for="login-password">Passwort</label>
          <input style={{ display: type == LoginType.Email || type == LoginType.Phone ? 'block' : 'none' }} class={tw`bg-gray-800 px-2 py-1 rounded-sm border border-black block w-full`} name="password" type="password" id="login-password" />
        
          <button type="submit">Submit</button>
        </form>
        <p>oder melde dich an mit...</p>
        { LOGIN_TYPE_BUTTONS.map(btn => (
          <button style={{ borderColor: type == btn.type ? 'red' : '' }} onClick={() => setType(btn.type)} class={tw`w-full p-3 my-2 border border-black bg-[#222] rounded-sm hover:bg-[#252525] focus:outline-none`}>{btn.text}</button>
        )) }
      </div>
    </div>
  )
}
