const express = require("express");
const { signup, login, verifyToken, getUser, refreshToken, logout } = require("../controllers/user-controller");


const router = express.Router();



router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get('/refresh', refreshToken, verifyToken, getUser);
//verify token refresh for after the 30s if user is still using the website
router.post("/logout", verifyToken, logout);
module.exports = router;


//ss attacks pretending to be you prevented by not placing tokens into cookies inside the browser.
//sttp cookie is where you place the token starting from the backend. Using axios
//check dependencies for all installs -hiding cookie is first began by installing cookie parser