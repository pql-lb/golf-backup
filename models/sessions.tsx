// models/Payments.js
import mongoose from "mongoose";

const SessionsSchema = new mongoose.Schema({
    token: String,
    date: Date,
    input1: String,
    input2: String,
    input3: String,
});

export default mongoose.models.Sessions ||
    mongoose.model("Sessions", SessionsSchema);
