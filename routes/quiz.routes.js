import express from "express";
const router = express.Router();

import { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz } from "../controller/quiz.controller.js";
import { quizValidationRules } from "../utils/quizValidation.js";
import { validate } from "../utils/validate.js";

router.post('/', quizValidationRules(), validate, createQuiz);
router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.put('/:id', quizValidationRules(), validate, updateQuiz);
router.delete('/:id', deleteQuiz);

export default router;
