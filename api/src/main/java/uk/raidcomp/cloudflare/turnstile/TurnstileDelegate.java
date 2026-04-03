package uk.raidcomp.cloudflare.turnstile;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uk.raidcomp.cloudflare.turnstile.client.TurnstileClient;
import uk.raidcomp.cloudflare.turnstile.config.TurnstileConfiguration;
import uk.raidcomp.cloudflare.turnstile.dto.ValidationRequestDto;

@Service
@AllArgsConstructor
public class TurnstileDelegate {
  private final TurnstileConfiguration configuration;
  private final TurnstileClient client;

  public boolean validate(final String token) {
    return client.validate(new ValidationRequestDto(configuration.secretKey(), token)).success();
  }
}
