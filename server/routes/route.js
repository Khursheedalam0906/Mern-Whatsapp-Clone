import express from "express";
import { getUsers, userController } from "../controllers/userController.js";
import {
  getConversation,
  newConversation,
} from "../controllers/conversationController.js";
import { getMessages, newMessage } from "../controllers/messageController.js";
import { upload } from "../middleware/upload.js";
import { getImage, uploadImage } from "../controllers/imageController.js";

const router = express.Router();

router.post("/adduser", userController);
router.get("/getusers", getUsers);
router.post("/conversation/add", newConversation);
router.post("/conversation/get", getConversation);
router.post("/message/add", newMessage);
router.get("/message/get/:id", getMessages);
//
///
router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);
///

//

export default router;
