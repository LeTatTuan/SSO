import express from "express";
import homeController from '../controller/homeController';
import apiController from '../controller/apiController';
import loginController from '../controller/loginController';
import passport from "passport";
import { isLogin } from '../middleware/checkUser';
import passportController from "../controller/passportController";

const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
    //path, handler
    router.get("/", isLogin, homeController.handleHelloWord);
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    router.post("/delete-user/:id", homeController.handleDelteUser)
    router.get("/update-user/:id", homeController.getUpdateUserPage);
    router.post("/user/update-user", homeController.handleUpdateUser);

    //rest api
    //GET - R, POST- C, PUT - U, DELETE - D
    router.get("/api/test-api", apiController.testApi);
    router.get('/login', isLogin, loginController.getLoginPage);
    router.post('/login', function (req, res, next) {
        passport.authenticate('local', function (error, user, info) {
            if (error) {
                return res.status(500).json(error);
            }
            if (!user) {
                return res.status(401).json(info.message);
            }

            req.login(user, function (err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        })(req, res, next);
    });
    router.post('/logout', passportController.handleLogout);

    return app.use("/", router);
}

export default initWebRoutes;