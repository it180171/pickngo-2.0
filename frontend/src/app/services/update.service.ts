import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {Unit} from "../models/unit";
import {webSocket} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  socket$?: WebSocketSubject<Unit>;
  constructor() { }

  startWebsocket(): WebSocketSubject<Unit> {
    this.socket$ = webSocket("ws://localhost:8080/api/updates");
    return this.socket$;
  }
}
