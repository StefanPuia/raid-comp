package uk.raidcomp.api.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import uk.raidcomp.api.model.GroupId;
import uk.raidcomp.api.model.InviteStatus;
import uk.raidcomp.game.WarcraftPlayerClass;
import uk.raidcomp.game.WarcraftPlayerSpec;

public record PlayerDto(
    @NotNull String name,
    @Nullable String realm,
    @NotNull @JsonProperty("class") WarcraftPlayerClass className,
    @Nullable WarcraftPlayerSpec spec,
    @NotNull InviteStatus status,
    @Nullable GroupId group) {}
