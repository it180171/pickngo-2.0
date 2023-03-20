package api.TimeTable;


import models.unit.UnitDTO;

import javax.enterprise.context.ApplicationScoped;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@ServerEndpoint(value = "/updates", encoders = UpdateEncoder.class)
@ApplicationScoped
public class UpdateSocket {

    private Set<Session> sessions = Collections.synchronizedSet(new HashSet<>());
    @OnOpen
    public void onOpen(Session session, @PathParam("name") String name) {
        sessions.add(session);
    }

    @OnClose
    public void onClose(Session session, @PathParam("name") String name) {
        sessions.remove(session);
    }



    @OnError
    public void onError(Session session, @PathParam("name") String name, Throwable throwable) {
        System.out.println("onError> " + name + ": " + throwable);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("name") String name) {
        System.out.println("onMessage> " + name + ": " + message);
    }

    public void sendUpdate(UnitDTO unitDTO) {
        System.out.println("update sent + " + unitDTO);
        sessions.forEach(session -> {
            session.getAsyncRemote().sendObject(unitDTO);
        });
    }
}
