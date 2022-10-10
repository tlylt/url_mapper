import {
    createUrlMapping,
    getUrlMappings,
    deleteUrlMapping,
    deleteAllUrlMappings,
    updateUrlMapping,
    getUrlMapping
} from "./repository.js"

export async function ormCreateUrlMapping(fromUrl, toUrl) {
    try {
        const newUrlMapping = await createUrlMapping({
            fromUrl,
            toUrl,
        })
        await newUrlMapping.save()
        return {
            fromUrl: newUrlMapping.fromUrl,
            toUrl: newUrlMapping.toUrl,
            createdAt: newUrlMapping.createdAt,
            updatedAt: newUrlMapping.updatedAt,
            status: newUrlMapping.status,
        }
    } catch (err) {
        console.log(err)
        console.log("ERROR: Could not create new URL mapping")
        return { err }
    }
}

export async function ormListAllUrlMappings() {
    try {
        return await getUrlMappings()
    } catch (err) {
        console.log(err)
        console.log("ERROR: Could not get all URL mappings")
        return { err }
    }
}

export async function ormGetUrlMapping(fromUrl) {
    try {
        return await getUrlMapping(fromUrl)
    } catch (err) {
        console.log(err)
        return { err }
    }
}

export async function ormDeleteUrlMapping(fromUrl) {
    try {
        return await deleteUrlMapping(fromUrl)
    } catch (err) {
        console.log(err)
        return { err }
    }
}

export async function ormDeleteAllUrlMappings(fromUrl) {
    try {
        return await deleteAllUrlMappings(fromUrl)
    } catch (err) {
        console.log(err)
        return { err }
    }
}

export async function ormUpdateUrlMapping(fromUrl, newToUrl) {
    try {
        return await updateUrlMapping(fromUrl, newToUrl)
    } catch (err) {
        console.log(err)
        return { err }
    }
}