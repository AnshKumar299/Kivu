// routes/authRoutes.js
const { Signup, Login, Logout } = require("../controllers/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

// Auth routes
router.post("/signup", Signup);
router.post("/login", Login);
router.post('/logout',Logout)

// Route to verify the user (can be used by frontend to check session)
router.get("/verify", userVerification, (req, res) => {
  res.json({ status: true, user: req.user.username });
});

module.exports = router;
