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
    startMatchMaker = async() => {

        this.socket.onmatchmakermatched = (matched) => {
            console.info("Received MatchmakerMatched message: ", matched);
            console.info("Matched opponents: ", matched.users);

            const matchId = null;
            this.match = this.socket.joinMatch(matchId, matched.token);
            console.log("match: ", this.match.value);
        };
          
        const query = "*";
        const minCount = 2;
        const maxCount = 2;

        this.ticket = this.socket.addMatchmaker(query, minCount, maxCount);
    }

    joinMatch = async(id) => {
        this.match = await this.socket.joinMatch(id);
    }

    send_sheep = async() => {
        console.log(this.match.match_id)
        let opcode = 1;
        let data = "sheep";
        this.socket.sendMatchState(this.match.match_id, opcode, data);
    }

}