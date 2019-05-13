import { Context } from "koa";
import { verify } from "./jwt";
import * as config from "./config";

export default function sendFile(ctx: Context) {
  if (ctx.path.indexOf("..") !== -1) {
    ctx.status = 400;
    ctx.body = "Invalid path.";
  }

  const token: string = ctx.header["jwt-auth-service-token"];

  if (!token) {
    ctx.status = 400;
    ctx.body = "Invalid token.";
  }

  const decodedToken = verify(token);

  if (decodedToken.valid) {
    const settings = config.get();
    const { username, permissions } = decodedToken.value;
    
    const joinedPath = path.join(settings.root, ctx.path);

    const evalArgs = {
      username,
      permissions,
      root: settings.root
    }

  } else {
    ctx.status = 401;
    ctx.body = "Access denied.";
  }
}
