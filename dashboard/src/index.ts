import mongoose from "mongoose";
import { app } from "./app";

//* MongoDB connection function
const startDBConnection = async () => {
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth"); //* Path to mongodb services [kubernetes]
        console.log("Connected to Auth MongoDB");
    } catch (err) {
        console.log(err);
    }
};

app.listen(3001, () => {
    console.log("Auth service listening on port 3001!");
});

//* Connecting to mongoDB
startDBConnection();
