
import quizRoutes from "../routes/quiz.routes.js";

function setupRouteHandler(app) {
    app.use(`/api/quiz`, quizRoutes);
}

export default setupRouteHandler;  
