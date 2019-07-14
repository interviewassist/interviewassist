const express = require("express");
const { getImage } = require("../utils/image-util")
const Topic = require("../models/topic")

const router = new express.Router()

router.get("/topics", async (req, res) => {
    try {
        const topics = await Topic.find({})

        if (!topics) {
            return res.status(404).send()
        }

        res.send(topics)
    } catch (e) {
        res.status(500).send()
    }
})

router.post("/topics", async (req, res) => {
    const topic = new Topic({
        ...req.body
    })

    try {
        await topic.save()
        res.status(201).send(topic)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get("/topics/thumbnail/:imageId", async (req, res) => {
    const data = await getImage("image.topic.interviewassist", req.params.imageId)
    res.status(200).send(Buffer.from(data).toString('base64'))
})

module.exports = router;