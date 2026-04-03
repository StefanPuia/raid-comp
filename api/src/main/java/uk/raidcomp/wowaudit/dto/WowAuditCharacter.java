package uk.raidcomp.wowaudit.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record WowAuditCharacter(
    String name,
    String realm,
    @JsonProperty("class") WowAuditPlayerClass className,
    String role,
    String note) {}
