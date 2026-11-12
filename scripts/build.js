import { build, context } from "esbuild";
import { createServer } from "node:http";
import { resolve, extname, sep } from "node:path";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
const dev = process.argv.includes("--serve");
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });
const html = (await readFile("index.html", "utf8"))
  .replace("/src/main.js", "/app.js")
  .replace("</head>", '  <link rel="stylesheet" href="/app.css" />\n  </head>');
await writeFile("dist/index.html", html);
const options = {
  entryPoints: ["src/main.js"],
  bundle: true,
  outfile: "dist/app.js",
  format: "esm",
  target: ["es2022"],
  minify: !dev,
  define: {
    "process.env.NODE_ENV": JSON.stringify(dev ? "development" : "production"),
  },
  logLevel: "info",
};
if (dev) {
  const ctx = await context(options);
  await ctx.watch();
  const root = resolve('dist');
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
  createServer(async (req, res) => {
    try {
      const path = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
      if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
      const file = path === root ? resolve(root, 'index.html') : path;
      const data = await readFile(file);
      res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
      res.end(data);
    } catch { res.writeHead(404); res.end('Not found'); }
  }).listen(4173, '0.0.0.0', () => console.log('EMBER: http://localhost:4173'));

} else await build(options);
