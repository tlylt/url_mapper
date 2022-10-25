import UrlModel from "./url-model.js"
import mongoose from "mongoose"
import "dotenv/config"

export async function connectMongoDB() {
    try {
        const mongoDB = process.env.DB_URI ?? "mongodb://mongo:27017/urls";
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB", error)
    }
}

export async function createUrlMapping(params) {
    return new UrlModel(params)
}

export async function getUrlMapping(fromUrl) {
    return UrlModel.findOne({ fromUrl: fromUrl })
}

export async function getUrlMappings() {
    const results = UrlModel.find({}).sort({ createdAt: -1 })
    const urls = []
    for await (const doc of results) {
        urls.push(doc)
    }
    return urls
}

export async function deleteUrlMapping(fromUrl) {
    return UrlModel.deleteOne({ fromUrl: fromUrl })
}

export async function deleteAllUrlMappings() {
    return UrlModel.deleteMany({})
}

export async function updateUrlMapping(fromUrl, newToUrl) {
    const urlMapping = await UrlModel.findOne({ fromUrl: fromUrl })
    const oldToUrl = urlMapping.toUrl
    urlMapping.toUrl = newToUrl
    urlMapping.save()
    return {
        fromUrl: fromUrl,
        toUrl: newToUrl,
        oldToUrl: oldToUrl
    }
}
