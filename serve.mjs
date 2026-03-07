import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;
const DIST = path.join(__dirname, "dist");

const MIME = {
  ".html": "text/html",
  ".js":   "application/javascript",
  ".mjs":  "application/javascript",
  ".css":  "text/css",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif":  "image/gif",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
  ".ttf":  "font/ttf",
  ".webp": "image/webp",
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split("?")[0];
  let filePath = path.join(DIST, urlPath);

  // Serve index.html for all non-asset routes (SPA fallback)
  const serveIndex = () => {
    const indexPath = path.join(DIST, "index.html");
    if (!fs.existsSync(indexPath)) {
      res.writeHead(503, { "Content-Type": "text/plain" });
      res.end("Build not found. Run: npm run build");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(indexPath).pipe(res);
  };

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    serveIndex();
  }
});

server.listen(PORT, () => {
  console.log(`AlerGica dev server running at http://localhost:${PORT}`);
  console.log(`Serving from: ${DIST}`);
  console.log("(Run 'npm run build' first if dist/ does not exist)");
});
