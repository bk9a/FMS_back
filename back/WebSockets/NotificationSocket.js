var socket = require("socket.io");

class NotificationSocket {
  static io;
  static sockets = [];
  static SendNotification = ({ UserId, Data }) => {
    if (UserId && Data) {
      for (var i = 0; i < this.sockets.length; i++) {
        if (this.sockets[i].UserId + "" === UserId + "") {
          this.sockets[i].Socket.emit("newNotification", Data);
        }
      }
    }
  };

  static SetServer(server) {
    this.io = socket(server, { path: "/notification" });
    this.io.on("connection", (socket) => {
      console.log("new connection notification", socket.id);

      socket.on("setUser", (data) => {
        if (data.UserId) {
          var Temp = this.sockets.filter(
            (s) => s.SocketId === socket.id && s.UserId === data.UserId
          );
          if (Temp.length === 0) {
            this.sockets.push({
              UserId: data.UserId,
              SocketId: socket.id,
              Socket: socket,
            });
          }
        }
        //  console.log({ notificationsockets: this.sockets });
      });
      socket.on("disconnect", () => {
        this.sockets = this.sockets.filter((s) => s.SocketId !== socket.id);
        //  console.log("diconnect notification:" + socket.id);
        //  console.log({ notificationsockets: this.sockets });
      });
    });
  }
}

module.exports = NotificationSocket;
