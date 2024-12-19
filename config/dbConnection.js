import mongoose from "mongoose";
import Quiz from "../models/quiz.model.js";
import quizData from "../data/quiz.data.js";

export const connect = async () => {
    try {
        const uri = process.env.DB_URL || "mongodb://localhost:27017/";
        mongoose.set("strictQuery", false);

        await mongoose.connect(uri, {
            dbName: process.env.DB_NAME || "Quiz",
        });
        console.log(`Connected to the database ${process.env.DB_NAME || "Quiz"}`);
        const count = await Quiz.countDocuments();

        if (count === 0) {
            console.log("Collection is empty, inserting default data...");
            await Quiz.insertMany(quizData);
            console.log("Insertion of data completed")
        }
        else {
            console.log("Datas are already present in the database.")
        }
    } catch (error) {
        console.error("Database connection error:\n", error);
        return false;
    }
};
