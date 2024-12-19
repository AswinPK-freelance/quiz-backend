import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Question text is required'],
    },
    stage: {
        type: Number,
        required: [true, 'Stage is required'],
        min: [1, 'Stage cannot be negative'],
        default: 1
    },
    options: {
        type: [String],
        required: [true, 'Options are required'],
        validate: {
            validator: function (v) {
                return v.length === 4;
            },
            message: 'There must be exactly 4 options'
        }
    },
    correctOption: {
        type: Number,
        required: [true, 'Correct option index is required'],
        min: [0, 'Correct option index cannot be negative'],
        max: [3, 'Correct option index cannot be greater than 3']
    },
    explanation: {
        type: String,
        required: [true, 'Explanation is required'],
    }
}, {
    timestamps: true
});

export default mongoose.model('Quiz', quizSchema);
