const express = require('express')
const axios = require('axios')
const redis = require('redis')

const router = express.Router()
const redisPort = process.env.REDIS_URL || 6379
const redisClient = redis.createClient(redisPort)

checkCache = (req, res, next) {
    const { slug, id } = req.params
    redisClient.get(`${slug}:${id}`, (err, data) => {
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
        if(data != null){
            res.send(data)
        } else {
            
        }
    })
}

router.get("/:slug/:id", checkCache, async (req, res) => {
    try {
        const {slug, id} = req.params

        const swapiInfo = await axios.get(`https://rec-swapi.herokuapp.com/api/${slug}/${id}`)

        const swapiData = swapiInfo.swapiData

        redisClient.setex(`${slug}:${id}`, 30, JSON.stringify(swapiData) )

        return res.json(swapiData)
    } catch(error) {
        console.log(error)
        return resx.status(500).json(error)
    }
})

module.exports = router