// models/Payments.js
import mongoose from "mongoose";

const SessionsSchema = new mongoose.Schema({
    token: String,
    date: Date,
    field1: String,
    field2: String,
    field3: String,
    pi: String,
});

export default mongoose.models.Sessions ||
    mongoose.model("Sessions", SessionsSchema);
