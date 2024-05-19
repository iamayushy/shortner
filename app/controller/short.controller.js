const { checkValidUrl, shortLink } = require("../helper");
const shortSchema = require("../models/short.model");
const {SHORTLY_DOMAIN} = process.env;

async function createShortLink(req, res) {
    try {
        const { link } = req.body;
        if (link && checkValidUrl(link)) {
            const shortText = shortLink(link);
            const writeToDB = await shortSchema.create({
                originalUrl: link,
                shortId: shortText,
                createdAt: new Date().toISOString(),
            });

            if (writeToDB) {
                return res.status(200).json({
                    url: `${SHORTLY_DOMAIN}/${shortText}`,
                });
            }
            return res.status(200).json({ shortUrl: shortText, link });
        } else {
            return res.status(400).json({
                message: "Invalid Url, Please enter a correct URL"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

async function getTotalClicks(req, res) {
    try {
        const { shortId } = req.params;
        const getTotalClicks = await shortSchema.findOne({ shortId });
        const {clicks, shortId: shortText} = getTotalClicks;
        return res.status(200).json({
            url: `${SHORTLY_DOMAIN}/${shortText}`,
            clicks
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
        });
    }
}

async function getShortUrl (req, res) {
    try {
        const { shortId } = req.params;
        const getUrl = await shortSchema.findOne({ shortId });

        if(getUrl) {
            await shortSchema.findByIdAndUpdate(getUrl._id, {
                $inc: {
                    clicks: 1
                }
            })
            return res.status(301).redirect(`${getUrl.originalUrl}`);
        }
        return res.status(404).json({
            message: "Url not found"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}


module.exports = {createShortLink, getShortUrl, getTotalClicks};