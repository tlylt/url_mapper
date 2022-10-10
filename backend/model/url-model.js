import mongoose from "mongoose"

var Schema = mongoose.Schema
const UrlModelSchema = new Schema({
    // This is the short url that user defines or randomly generated
    fromUrl: {
        type: String,
        unique: true,
        required: true,
    },
    // Can be updated later, this is non-unique because we don't want to define the ownership of a external URL.
    // Hence, every user can have a short-url to the same external URL.
    toUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    status: {
        type: String, // active, paused, deleted
        default: "active",
    }
})

UrlModelSchema.pre("save", function (next) {
    this.updatedAt = Date.now()
    next()
})

export default mongoose.model("UrlModel", UrlModelSchema)
