import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
import compression from "compression"
import "dotenv/config"
import { createUrlMapping, getAllUrls, redirectUrl, deleteUrlMapping, getUrlMapping, deleteAllUrlMappings, updateUrlMapping } from "./controller/url-controller.js"
import { connectMongoDB } from "./model/repository.js"

const app = express()
const router = express.Router()

app.options("*", cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(morgan("tiny"))
app.use(helmet())
app.use(compression())
app.use("/api/v1", router).all((_, res) => {
    res.setHeader("content-type", "application/json")
    res.setHeader("Access-Control-Allow-Origin", "*")
})

// Error handling
app.use((err, _, res, next) => {
    console.log(err)
    res.status(500).send({ message: "Server error" })
    next(err);
})

// CHECK SERVER ALIVE
router.get("/status", (_, res) => {
    res.status(200).send({ message: "Hello World from URL Mapping Service" })
})

// GET
// ALL MAPPING OF SPECIFIC SHORT URL to ORIGINAL URL
router.get("/urls/:fromUrl", getUrlMapping)

// GET
// ALL MAPPING OF SHORT URL TO ORIGINAL URL
router.get("/urls", getAllUrls)

// POST
// CREATE NEW SHORT URL TO ORIGINAL URL MAPPING
router.post("/urls", createUrlMapping)

// PUT
// UPDATE SHORT URL TO ORIGINAL URL MAPPING
router.put("/urls/:fromUrl", updateUrlMapping)

// DELETE
// DELETE SHORT URL TO ORIGINAL URL MAPPING
router.delete("/urls/:fromUrl", deleteUrlMapping)

// DELETE ALL URL MAPPING
router.delete("/urls/", deleteAllUrlMappings)

// REDIRECT
const redirectRouter = express.Router();
redirectRouter.get("/r/:fromUrl", redirectUrl)
app.use('/', redirectRouter);

(async () => {
    await connectMongoDB()
})();

app.listen(8000, () => console.log("express server listening on port 8000"))

export { app }