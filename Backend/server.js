import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/mongodb.js'
import authRouter from './Routes/authRoutes.js'

import dns from "dns";
import userRouter from './Routes/userRoutes.js'
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const port = process.env.PORT || 4000
connectDB();
const allowedOrigins = ['http://localhost:5173']

app.use(express.json())
app.use(cors({origin: allowedOrigins, credentials: true}))
app.use(cookieParser())


app.get('/', (req, res) => res.send('Backed is working'))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(port, () => console.log(`server is running on port ${port}`));