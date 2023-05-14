import { db } from "@/config";
import mongoose from "mongoose";

let isConnected = false;

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
        // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    mongoose.connection.once("connected", () => {
        console.info("Mongoose default connection open to " + dbURI);
    });

    // If the connection throws an error
    mongoose.connection.on("error", (err) => {
        console.error("Mongoose default connection error: " + err);
    });

    // When the connection is disconnected
    mongoose.connection.on("disconnected", () => {
        isConnected = false;
        console.info("Mongoose default connection disconnected");
    });

    // // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", async () => {
        await mongoose.connection.close();
        isConnected = false;
        console.info("Mongoose default connection disconnected through app termination");
        process.exit(0);
    });

    try {
        await mongoose.connect(dbURI, options);
        console.info("Mongoose connection done");
        isConnected = true;
    } catch (err) {
        console.info("Mongoose connection error");
        console.error(err);
    }
};
