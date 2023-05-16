import { db } from "@/config";
import mongoose from "mongoose";

export const connectToDB = async () => {
    mongoose.set("strictQuery", false);

    const dbURI = `mongodb+srv://${db.user}:${encodeURIComponent(db.password)}@${
        db.host
    }/?retryWrites=true&w=majority`;

    const options = {
        dbName: db.name,
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10, // Maintain up to 10 socket connections
    };
    if (mongoose.connection.readyState === 1) {
        console.log("MongoDB is already connected");
        return;
    }
    try {
        await mongoose.connect(dbURI, options);
        console.info("Mongoose default connection open to " + dbURI);
    } catch (err) {
        console.error("Mongoose default connection error: " + err);
    }

    // When the connection is disconnected
    mongoose.connection.on("disconnected", () => {
        console.info("Mongoose default connection disconnected");
    });

    // // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.info("Mongoose default connection disconnected through app termination");
        process.exit(0);
    });
};
