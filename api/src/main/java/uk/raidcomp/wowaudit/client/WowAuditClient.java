package uk.raidcomp.wowaudit.client;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import java.util.List;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import uk.raidcomp.wowaudit.dto.WowAuditCharacter;
import uk.raidcomp.wowaudit.dto.WowAuditTeam;

@HttpExchange(value = "/v1", accept = APPLICATION_JSON_VALUE, headers = "User-Agent=raidcomp.uk")
public interface WowAuditClient {

  @GetExchange("/team")
  WowAuditTeam getTeam(@RequestHeader(AUTHORIZATION) String apiKey);

  @GetExchange("/characters")
  List<WowAuditCharacter> getCharacters(@RequestHeader(AUTHORIZATION) String apiKey);
}
