import {Client} from "@heroiclabs/nakama-js";
import { v4 as uuidv4 } from 'uuid';

export default class Nakama {
    constructor() {
        this.useSSL = false;
        this.verboseLog = false
        this.client = new Client("defaultkey", "127.0.0.1", "7350", this.useSSL);
        this.session;
        this.socket;
        this.match;
        this.ticket;
    }
    initiate = async() => {
        const create = true;    
        const username = uuidv4();    
        this.session = await this.client.authenticateCustom(username, create, username);
        console.log("session user id: ", this.session.user_id);
        this.socket = this.client.createSocket(this.useSSL, this.verboseLog);

        await this.socket.connect(this.session);
        console.log("socket connected");

        const payload = {"pp": "poopoo"};
        const rpcid = "print_test";
        const poo = await this.client.rpc(this.session, rpcid, payload);

        this.socket.onmatchpresence = (matchpresence) => {
            console.info("Received match presence update:", matchpresence);
        }

        this.socket.onmatchdata = (data) => {
            console.log("data received: ", data.data)
        }
    }
    createAuthMatch = async() => {
        const payload = {};
        const rpcid = "create_match";
        let id = await this.client.rpc(this.session, rpcid, payload);
        console.log("match created with id: ", id.payload.matchid)
        return id.payload.matchid;
        
    }

    joinMatch = async(id) => {
        this.match = await this.socket.joinMatch(id);
        console.log("joined match with id: ", id)
    }

    listMatches = async() => {
        const payload = {};
        const rpcid = "list_matches";
        let matches = await this.client.rpc(this.session, rpcid, payload);
        console.log("match list: ", matches.payload.matches);
        return matches.payload.matches;
    }


    send_sheep = async() => {
        console.log(this.match.match_id)
        let opcode = 1;
        let data = "sheep";
        this.socket.sendMatchState(this.match.match_id, opcode, data);
    }

}