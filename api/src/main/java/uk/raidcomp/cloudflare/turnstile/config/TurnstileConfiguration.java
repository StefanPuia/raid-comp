package uk.raidcomp.cloudflare.turnstile.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(TurnstileConfiguration.PREFIX)
public record TurnstileConfiguration(String secretKey) {
  public static final String PREFIX = "turnstile";
}
