import { Message } from "../models/messages.model.js"; // Modelo de mensajes

export const initializeSocket = async (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Manejar el envío de mensajes
    socket.on("sendMessage", async (data) => {
      const { roomId, sender, receiver, content } = data;

      try {
        // Guardar el mensaje en la base de datos
        const newMessage = new Message({ roomId, sender, receiver, content });
        await newMessage.save();

        // Emitir el mensaje a todos en la sala
        io.to(roomId).emit("receiveMessage", newMessage);
      } catch (error) {
        console.error("Error al guardar el mensaje:", error);
        socket.emit("errorMessage", "No se pudo enviar el mensaje.");
      }
    });

    // Manejar desconexión
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}