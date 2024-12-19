import { body } from 'express-validator';

export const quizValidationRules = () => {
    return [
        body('text')
            .trim()
            .notEmpty()
            .withMessage('Question text is required'),
        body('stage')
            .isInt({ min: 1 })
            .withMessage('Stage is required and minimum value is 1'),

        body('options')
            .isArray({ min: 4, max: 4 })
            .withMessage('There must be exactly 4 options')
            .custom(options => {
                options.forEach(option => {
                    if (typeof option !== 'string' || option.trim().length === 0) {
                        throw new Error('Each option must be a non-empty string');
                    }
                });
                return true;
            })
            .withMessage('Options should be an array with exactly 4 non-empty strings'),

        body('correctOption')
            .isInt({ min: 0, max: 3 })
            .withMessage('Correct option index must be an integer between 0 and 3'),

        body('explanation')
            .trim()
            .notEmpty()
            .withMessage('Explanation is required')
    ];
};
