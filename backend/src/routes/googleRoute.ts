import express from "express"
import * as Google from "../controllers/googleController"

const googleRouter = express.Router();

// on start call to get google user
googleRouter.get("/login", Google.startGoogleAuth);
googleRouter.get("/callback", Google.handleGoogleCallback)

// get user info
// id
googleRouter.get("/user", Google.getUserInfo)

googleRouter.post("/verify", Google.verifyGoogleUser)

export default googleRouter;