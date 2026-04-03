package uk.raidcomp.wowaudit.config;

import static java.util.function.Predicate.not;

import java.util.Arrays;
import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(WowAuditConfiguration.PREFIX)
public record WowAuditConfiguration(String keys) {
  public static final String PREFIX = "wowaudit";

  public List<String> getKeys() {
    return Arrays.stream(keys().split(";")).map(String::trim).filter(not(String::isBlank)).toList();
  }
}
