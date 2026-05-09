const http = require("http");

const PORT = Number(process.env.PORT || 3000);

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Happy Share backend is running",
      health: "/health"
    })
  );
});

server.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
