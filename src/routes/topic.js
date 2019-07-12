const express = require("express");
const { getImage } = require("../utils/image-util")
const Topic = require("../models/topic")

const router = new express.Router()

router.get("/topics/thumbnail/:imageId", async (req, res) => {
    const data = await getImage("image.topic.interviewassist", req.params.imageId)
    res.setHeader('content-type', 'image/png')
    res.status(200).send(data)
})

module.exports = router;