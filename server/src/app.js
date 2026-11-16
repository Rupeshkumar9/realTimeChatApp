import express from 'express';
import cors from 'cors';
import http from "http"
import morgan from "morgan";
import messageRoutes from './routes/messages.js';
import authRoutes from './routes/auth.js';
import { Server as SocketIO } from 'socket.io';
import { initializeSocketIO } from './socket.js';
import { authenticateRoute } from './middleware/auth.js';

const app = express();
const httpServer = http.createServer(app);
const io = new SocketIO(httpServer);
initializeSocketIO(io);

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use(morgan('tiny'));

// Adding message router
app.use('/api/messages', authenticateRoute, messageRoutes);

// Adding auth router
app.use('/api/auth', authRoutes);

app.get("/", (_req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "realTimeChat API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: {
        GET: ["api/health/"]
      },
      auth: {
        POST: ["api/auth/register", "api/auth/login"]
      },
      messages: {
        GET: ["api/messages"],
        POST: ["api/messages"],
        DELETE: ["api/messages/:id"]
      }
    }
  });
});


app.get('/health', (req, res) => {
    const healthcheck = {
        uptime: process.uptime(), // Server uptime in seconds
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.status(200).json(healthcheck); // Respond with 200 OK and health data
    } catch (error) {
        healthcheck.message = error.message;
        res.status(503).json(healthcheck); // Respond with 503 Service Unavailable on error
    }
});

app.use((_req, res) => {
    res.status(404).type('text/plain').send('Page Not Found');
});

// Global Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

export default httpServer
