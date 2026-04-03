package uk.raidcomp.wowaudit.model;

import jakarta.annotation.Nullable;
import uk.raidcomp.wowaudit.dto.WowAuditPlayerClass;

public record TeamCharacter(
    String character,
    @Nullable String discordId,
    WowAuditPlayerClass className,
    String realm,
    String role) {}
