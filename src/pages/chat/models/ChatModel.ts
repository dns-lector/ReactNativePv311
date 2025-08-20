import ChatMessage from "../types/ChatMessage";

class ChatModel {
    static #instance: ChatModel|null = null;
    static get instance(): ChatModel {
        if(ChatModel.#instance == null) {
            ChatModel.#instance = new ChatModel();
        }
        return ChatModel.#instance;
    }

    messages: Array<ChatMessage> = [];
}

export default ChatModel;