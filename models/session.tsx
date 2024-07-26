// models/Session.js
import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    token: String,
    pi: String,
    date: Date,
});

export default mongoose.models.Session ||
    mongoose.model("Session", SessionSchema);
