const express = require("express")

const port = process.env.PORT || 4000
const swapiRoutes = require('./routes/swapi-routes')

const app = express()

app.use("/swapi", swapiRoutes)


app.listen(port, () => {
    console.log(`Swapi-Redis server running on port ${port}`)
})