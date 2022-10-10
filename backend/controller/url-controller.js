import { nanoid } from 'nanoid'
import {
    ormCreateUrlMapping,
    ormListAllUrlMappings,
    ormGetUrlMapping,
    ormDeleteUrlMapping,
    ormDeleteAllUrlMappings,
    ormUpdateUrlMapping
} from '../model/url-orm.js'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:8000/'

const REDIRECT_BASE_URL = BASE_URL + 'r/'

function pad(fromUrl) {
    return REDIRECT_BASE_URL + fromUrl
}

export async function getAllUrls(_, res) {
    try {
        const urls = await ormListAllUrlMappings();
        const data = urls.map(url => {
            return {
                fromUrl: pad(url.fromUrl),
                toUrl: url.toUrl,
                createdAt: url.createdAt,
                updatedAt: url.updatedAt,
                status: url.status,
            }
        })
        return res.status(200).json(
            {
                message: "List all URL mappings successfully!",
                data: data
            })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Database failure when querying!" })
    }
}

export async function getUrlMapping(req, res) {
    try {
        const fromUrl = req.params.fromUrl
        const resp = await ormGetUrlMapping(fromUrl)
        if (resp.err) {
            return res.status(404).json({ message: "Could not find URL mapping!" })
        }

        if (resp.toUrl) {
            return res.status(200).json(
                {
                    message: "Found URL mapping successfully!",
                    data: {
                        fromUrl: pad(fromUrl),
                        toUrl: resp.toUrl,
                    }
                }
            )
        }
        return res.status(404).json({ message: "Could not find URL mapping!" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Database failure when querying URL mapping!" })
    }
}

export async function createUrlMapping(req, res) {
    try {
        const data = req.body
        if (!data?.toUrl) {
            return res.status(400).json({ message: "Missing required field!" })
        }
        let fromUrl = data?.fromUrl
        if (!fromUrl) {
            fromUrl = nanoid(8)
        }
        const resp = await ormCreateUrlMapping(fromUrl, data.toUrl)
        if (resp.err) {
            return res.status(400).json({ message: "Could not create a new URL mapping!" })
        }

        console.log(`Created new mapping successfully!`)
        return res.status(201).json({
            message: `Created new URL mapping successfully!`,
            data: {
                fromUrl: REDIRECT_BASE_URL + fromUrl,
                toUrl: data.toUrl,
                createdAt: resp.createdAt,
                updatedAt: resp.updatedAt,
                status: resp.status,
            }
        })
    } catch (err) {
        return res.status(500).json({ message: "Database failure when creating new URL mapping!" })
    }
}

export async function deleteUrlMapping(req, res) {
    try {
        const fromUrl = req.params.fromUrl
        const resp = await ormGetUrlMapping(fromUrl)
        if (resp.err) {
            return res.status(404).json({ message: "Could not find URL mapping!" })
        }
        if (resp.toUrl) {
            await ormDeleteUrlMapping(fromUrl)
            return res.status(200).json(
                {
                    message: "Deleted URL mapping successfully!",
                    data: {
                        fromUrl: REDIRECT_BASE_URL + fromUrl,
                        toUrl: resp.toUrl,
                    }
                }
            )
        }
        return res.status(404).json({ message: "Could not find URL mapping!" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Database failure when deleting URL mapping!" })
    }
}

export async function deleteAllUrlMappings(_, res) {
    try {
        const resp = await ormDeleteAllUrlMappings()
        if (resp.err) {
            return res.status(404).json({ message: "Could not delete all URL mappings!" })
        } else {
            return res.status(200).json(
                {
                    message: "Deleted all URL mappings successfully!"
                }
            )
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Database failure when deleting URL mapping!" })
    }
}

export async function updateUrlMapping(req, res) {
    try {
        const fromUrl = req.params.fromUrl
        const data = req.body
        const resp = await ormUpdateUrlMapping(fromUrl, data.toUrl)
        if (resp.err) {
            return res.status(404).json({ message: "Could not find URL mapping!" })
        } else {
            return res.status(200).json(
                {
                    message: "Updated URL mapping successfully!",
                    data: {
                        fromUrl: pad(fromUrl),
                        toUrl: resp.toUrl,
                        oldToUrl: resp.oldToUrl,
                    }
                }
            )
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Database failure when updating URL mapping!" })
    }
}

export async function redirectUrl(req, res) {
    try {
        const fromUrl = req.params.fromUrl
        const resp = await ormGetUrlMapping(fromUrl)
        if (resp.err) {
            return res.status(404).json({ message: "Could not find URL mapping!" })
        }
        if (resp.toUrl) {
            return res.redirect(302, resp.toUrl)
        }
        return res.status(404).json({ message: `No Url is mapped to ${pad(fromUrl)}!` })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Database failure when redirecting!" })
    }
}
