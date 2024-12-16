import { Message } from "../models/messages.model.js"; // Modelo de mensajes

/**
 * @description Initialize socket connection
 * @param {Object} io - Socket.io instance
 * @returns {void}
 */
export const initializeSocket = async (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", async (data) => {
      const { roomId, sender, receiver, content } = data;

      try {
        const newMessage = new Message({ roomId, sender, receiver, content });
        await newMessage.save();

        io.to(roomId).emit("receiveMessage", newMessage);
      } catch (error) {
        console.error("Error al guardar el mensaje:", error);
        socket.emit("errorMessage", "No se pudo enviar el mensaje.");
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}