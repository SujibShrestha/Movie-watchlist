import {type CorsOptions } from "cors";

const allowedOrigins: string[] = [
  "http://localhost:3000", // frontend dev
  "http://127.0.0.1:3000"
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

  credentials: true
};

export default corsOptions;
