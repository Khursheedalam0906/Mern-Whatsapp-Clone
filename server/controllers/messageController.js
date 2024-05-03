import Conversation from "../models/conversationSchema.js";
import Message from "../models/messageSchema.js";

export const newMessage = async (req, res) => {
  const payload = req.body;
  try {
    const newMessage = new Message(payload);
    await newMessage.save();
    await Conversation.findByIdAndUpdate(payload.conversationId, {
      message: payload.text,
    });
    return res.status(200).json("Message has been sent successfully");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  const id = req.params.id;
  try {
    const messages = await Message.find({ conversationId: id });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
