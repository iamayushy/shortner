function checkValidUrl (link) {
    try {
        new URL(link)
        return true
    } catch (error) {
        return false
    }
}

function shortLink (link) {
    const shrortUrl = Math.random().toString(36).slice(-8);
    return shrortUrl
}

module.exports = {
    checkValidUrl,
    shortLink
}