package uk.raidcomp.cloudflare.turnstile.client;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;
import uk.raidcomp.cloudflare.turnstile.dto.ValidationRequestDto;
import uk.raidcomp.cloudflare.turnstile.dto.ValidationResponseDto;

@HttpExchange(accept = APPLICATION_JSON_VALUE, headers = "User-Agent=raidcomp.uk")
public interface TurnstileClient {

  @PostExchange("/turnstile/v0/siteverify")
  ValidationResponseDto validate(@RequestBody ValidationRequestDto body);
}
