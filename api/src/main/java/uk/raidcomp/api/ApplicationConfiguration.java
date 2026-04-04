package uk.raidcomp.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.WebExpressionAuthorizationManager;
import org.springframework.web.client.support.RestClientHttpServiceGroupConfigurer;
import org.springframework.web.service.registry.ImportHttpServices;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import uk.raidcomp.cloudflare.turnstile.client.TurnstileClient;
import uk.raidcomp.cloudflare.turnstile.config.TurnstileConfiguration;
import uk.raidcomp.wowaudit.client.WowAuditClient;
import uk.raidcomp.wowaudit.config.WowAuditConfiguration;

@Configuration
@EnableScheduling
@EnableJpaAuditing
@EnableWebSecurity
@EnableConfigurationProperties({TurnstileConfiguration.class, WowAuditConfiguration.class})
@ImportHttpServices(group = "wowaudit", types = WowAuditClient.class)
@ImportHttpServices(group = "turnstile", types = TurnstileClient.class)
@ComponentScan(basePackages = {"uk.raidcomp.**"})
public class ApplicationConfiguration implements WebMvcConfigurer {
  @Value("${build.import.allowedIpRange:127.0.0.1}")
  private String importAllowedIpRange;

  @Bean
  public SecurityFilterChain securityFilterChain(final HttpSecurity http) {
    return http.csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(
            auth ->
                auth.requestMatchers("/build/import/raid-helper")
                    .access(
                        new WebExpressionAuthorizationManager(
                            "hasIpAddress('%s')".formatted(importAllowedIpRange)))
                    .anyRequest()
                    .permitAll())
        .build();
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry
        .addMapping("/**")
        .allowedOrigins("http://localhost:5173", "https://dev.raidcomp.uk", "https://raidcomp.uk")
        .allowedMethods("*")
        .allowedHeaders("*")
        .allowCredentials(true);
  }

  @Bean
  RestClientHttpServiceGroupConfigurer groupConfigurer() {
    return groups -> {
      groups
          .filterByName("wowaudit")
          .forEachClient((ignored, builder) -> builder.baseUrl("https://wowaudit.com"));

      groups
          .filterByName("turnstile")
          .forEachClient(
              (ignored, builder) -> builder.baseUrl("https://challenges.cloudflare.com"));
    };
  }
}
