import Conversation from "../models/conversationSchema.js";

export const newConversation = async (req, res) => {
  try {
    const { senderId, receverId } = req.body;
    const exist = await Conversation.findOne({
      members: { $all: [receverId, senderId] },
    });
    if (exist) {
      return res.status(200).json("Conversation already exist");
    } else {
      const newConversation = new Conversation({
        members: [senderId, receverId],
      });
      await newConversation.save();
      return res.status(201).json("Conversation save successfully");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { senderId, receverId } = req.body;
    const conversation = await Conversation.findOne({
      members: { $all: [receverId, senderId] },
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
