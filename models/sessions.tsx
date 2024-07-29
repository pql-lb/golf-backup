// models/Payments.js
import mongoose from "mongoose";

const SessionsSchema = new mongoose.Schema({
    token: String,
    date: Date,
});

export default mongoose.models.Sessions ||
    mongoose.model("Sessions", SessionsSchema);
