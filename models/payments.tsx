// models/Payments.js
import mongoose from "mongoose";

const PaymentsSchema = new mongoose.Schema({
    token: String,
    pi: String,
    date: Date,
});

export default mongoose.models.Payments ||
    mongoose.model("Payments", PaymentsSchema);
