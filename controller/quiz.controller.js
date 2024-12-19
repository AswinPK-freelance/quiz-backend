import Quiz from '../models/quiz.model.js';


export const createQuiz = async (req, res) => {
    try {
        const { stage } = req.body;

        const questionCount = await Quiz.countDocuments({ stage });

        if (questionCount >= 5) {
            return res.status(400).json({
                success: false,
                message: `Stage ${stage} already has 5 questions. Cannot add more questions.`
            });
        }

        const quiz = await Quiz.create(req.body);
        res.status(201).json({
            success: true,
            data: quiz
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


export const getQuizzes = async (req, res) => {
    try {
        const { stage } = req.query;
        let filter = {};
        if (stage) {
            filter.stage = stage;
        }
        const quizzes = await Quiz.find(filter).sort('-createdAt');
        return res.status(200).json({
            success: true,
            data: quizzes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req?.params?.id);
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: quiz
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateQuiz = async (req, res) => {
    try {
        const { stage } = req.body;

        const existingQuiz = await Quiz.findById(req?.params?.id);
        if (!existingQuiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found',
            });
        }

        if (stage && stage !== existingQuiz.stage) {
            const questionCount = await Quiz.countDocuments({ stage });

            if (questionCount >= 5) {
                return res.status(400).json({
                    success: false,
                    message: `Stage ${stage} already has 5 questions. Cannot move this question to that stage.`,
                });
            }
        }

        const quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            data: quiz,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req?.params?.id);
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Quiz deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
