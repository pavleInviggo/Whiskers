import { WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as os from 'os';
import { Feeding } from '../generated/prisma/client';

@WebSocketGateway({ cors: {origin: '*'} })
export class FeederGateway implements OnGatewayConnection{
    
    @WebSocketServer() server: Server;

    handleConnection(client: Socket) {
        client.emit('hello', {instance: os.hostname() });
    }

    broadcastFeeding(feeding: Feeding) {
        this.server.emit('feeding', feeding); // for now: only sockets on THIS process
    }
}