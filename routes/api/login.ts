import { HandlerContext } from "$fresh/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
import { create, verify, getNumericDate, Payload, Header} from "https://deno.land/x/djwt@v2.7/mod.ts";
import { key } from "../../utils/auth.ts"

const client = new SmtpClient();
const { MAIL_USER, MAIL_PWD, MAIL_HOST, MAIL_PORT, MAIL_FROM } = Deno.env.toObject();

export const handler = async(_req: Request, _ctx: HandlerContext): Promise<Response> => {

  const connectConfig: any = {
    hostname: MAIL_HOST,
    port: parseInt(MAIL_PORT),
    username: MAIL_USER,
    password: MAIL_PWD,
  };
  await client.connectTLS(connectConfig);
  
  await client.send({
    from: MAIL_FROM,
    to: '',
    subject: "Welcome!",
    content: "Hi from Vuelancer!",
  });
  
  await client.close();

  const jwt = await create({ alg: "HS512", typ: "JWT" }, { foo: Math.random() }, key);

  return new Response(jwt);
};
