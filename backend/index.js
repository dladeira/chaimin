const app = require("./app.js");
const mongoose = require("mongoose");

require("dotenv").config({ path: "../.env" });

async function bootstrap() {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    app.listen(3039);
    console.log("-- Finished! Listening on port 3039");
}

bootstrap();
