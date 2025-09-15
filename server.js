import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import { dbConnection } from './database/dbConnection.js'
import authRoutes from './routes/authRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import campaignRoutes from './routes/campaignRoutes.js'
import communicationRoutes from './routes/communicationRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import segmentRoutes from './routes/segmentRoutes.js'
import './config/passport.js'

const app = express();
dotenv.config({ path: "./config/.env" })

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());

dbConnection();

app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);
app.use("/campaigns", campaignRoutes);
app.use("/communication", communicationRoutes);
app.use("/ai", aiRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/segments", segmentRoutes)

app.listen(process.env.PORT, () => { console.log("server listening on port", process.env.PORT) });
