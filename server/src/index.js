import "dotenv/config";
import httpServer from "./app.js";

const PORT = 8000;

// Start HTTP Server only after DB is ready
const server =  httpServer.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
});

// Graceful Shutdown (Optional Best Practice)
process.on("SIGINT", async () => {
    console.log("\nShutting down gracefully...");
    server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
    });
});



