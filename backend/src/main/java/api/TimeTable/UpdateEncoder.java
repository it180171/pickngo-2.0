package api.TimeTable;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.unit.UnitDTO;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class UpdateEncoder implements Encoder.Text<UnitDTO> {

    ObjectMapper objectMapper = new ObjectMapper();


    @Override
    public String encode(UnitDTO unitDTO) throws EncodeException {
        try {
            return objectMapper.writeValueAsString(unitDTO);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void init(EndpointConfig endpointConfig) {

    }

    @Override
    public void destroy() {

    }
}
