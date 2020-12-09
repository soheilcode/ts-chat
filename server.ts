import express from "express";
import cors from "cors";
import http from "http";
export class Server {


  private app!: express.Application;
  private server!: http.Server;
  private io!: SocketIO.Server;
  private port!: string | number;
  private onlineUsers : string[] = []

  constructor() {
    this.setup();
    this.listen();
  }

  private setup() : void {
    this.app = express();
    this.app.use(cors());
    this.server = http.createServer(this.app);
    this.port = process.env.PORT || 8080 ;
    this.io = require("socket.io")(this.server, {
      cors: true,
      origins: ["http://localhost:3000"],
  });
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log("SERVER LIVE ON PORT ", this.port);
    });

    this.app.get('/api/onlineUsers' , (req , res) => {
      res.send(this.onlineUsers)
    })

    this.io.on("connect", (socket: any) => {
      console.log(socket.id + ' JOINED!');
     
      socket.on('chat' , (message : object) => {
        this.io.emit('chat' , message)
      })

      socket.on('join' , (username : string) => {
        socket.username = username
        this.onlineUsers.push(username)
        this.io.emit('join' , username)
      })
      socket.on("disconnect", () => {
        console.log(socket.id + ' DISCONNECTED!')
        if(socket.username) {
          this.io.emit('dc' , socket.username)
          const newUsers = [...this.onlineUsers]
          newUsers.splice(newUsers.indexOf(socket.username) , 1)
          this.onlineUsers = newUsers
        }
      });
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}

