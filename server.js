// Kleiner lokaler Webserver für Pololingo (nur auf diesem PC erreichbar).
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5180;
const ROOT = __dirname;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon"
};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end("Nicht gefunden"); }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(data);
  });
}).listen(PORT, "127.0.0.1", () => console.log(`Pololingo läuft auf http://localhost:${PORT}  (Fenster offen lassen)`))
  .on("error", e => {
    if (e.code === "EADDRINUSE") console.log("Pololingo läuft schon. Du kannst dieses Fenster schließen.");
    else console.error(e);
  });
