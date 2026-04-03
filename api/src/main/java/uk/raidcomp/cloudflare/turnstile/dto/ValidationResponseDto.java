package uk.raidcomp.cloudflare.turnstile.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;
import java.util.List;

public record ValidationResponseDto(
    boolean success,
    @JsonProperty("error-codes") List<String> errorCodes,
    @Nullable String hostname,
    @JsonProperty("challenge_ts") @Nullable String challengeTs,
    @Nullable String action,
    @Nullable String cdata) {}
