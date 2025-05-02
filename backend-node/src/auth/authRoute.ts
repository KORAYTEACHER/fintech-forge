import { Router } from "express";
import { signup, signin, verifyEmail, googleCallback, githubCallback, resetPassword, refreshToken, generateResetToken, verifyResetToken } from "./authController";
import passport from "passport";


const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get("/verify-email/:token", verifyEmail);
authRouter.post("/reset-password", generateResetToken);
authRouter.post("/reset-password/:token", resetPassword);
authRouter.get("/verify-token/:token",verifyResetToken);

authRouter.post("/refresh", refreshToken);


authRouter.get("/google", passport.authenticate('google'));
authRouter.get("/google/callback", passport.authenticate('google', { session:false, failureRedirect: '/login'}), googleCallback);

authRouter.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});


authRouter.get("/github", passport.authenticate('github'));
authRouter.get("/github/callback", passport.authenticate('github', { session:false, failureRedirect: '/login' }), githubCallback);



export default authRouter;