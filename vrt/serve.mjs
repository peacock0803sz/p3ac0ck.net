// Serves a static build for the VRT, started by playwright.config.ts:
//   VRT_DIST=<dir> VRT_PORT=<port> node vrt/serve.mjs
// A directory is served by its index.html, like Cloudflare Pages does.
import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { pipeline } from "node:stream/promises";

const root = path.resolve(process.env.VRT_DIST ?? "dist");
const port = Number(process.env.VRT_PORT ?? 4400);

const types = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function stat(file) {
  try {
    return statSync(file, { throwIfNoEntry: false });
  } catch {
    return undefined; // ENOTDIR, a NUL byte in the path, ...
  }
}

/** The file to serve for a decoded URL path, `{ redirect }`, or undefined. */
function lookup(pathname) {
  const file = path.join(root, pathname);
  if (file !== root && !file.startsWith(root + path.sep)) return undefined;
  const found = stat(file);
  if (found?.isDirectory()) {
    if (!pathname.endsWith("/")) return { redirect: true };
    return lookup(path.posix.join(pathname, "index.html"));
  }
  return found?.isFile() ? { file, size: found.size } : undefined;
}

if (!lookup("/index.html")) {
  console.error(`vrt/serve.mjs: no index.html in ${root}`);
  process.exit(1);
}

createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { allow: "GET, HEAD" }).end();
    return;
  }
  let url;
  let target;
  try {
    url = new URL(req.url ?? "/", "http://127.0.0.1");
    target = lookup(decodeURIComponent(url.pathname));
  } catch {
    res.writeHead(400).end();
    return;
  }
  if (!target) {
    res.writeHead(404, { "content-type": "text/plain" }).end("Not found\n");
    return;
  }
  if (target.redirect) {
    res.writeHead(301, { location: `${url.pathname}/${url.search}` }).end();
    return;
  }
  const type = types[path.extname(target.file).toLowerCase()];
  res.writeHead(200, {
    "content-type": type ?? "application/octet-stream",
    "content-length": target.size,
  });
  if (req.method === "HEAD") res.end();
  else pipeline(createReadStream(target.file), res).catch(() => {});
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}/`);
});
