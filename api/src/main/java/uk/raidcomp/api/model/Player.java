package uk.raidcomp.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import uk.raidcomp.game.WarcraftPlayerClass;
import uk.raidcomp.game.WarcraftPlayerSpec;

public record Player(
    @NotNull String name,
    @Nullable String realm,
    @NotNull @JsonProperty("class") WarcraftPlayerClass className,
    @Nullable WarcraftPlayerSpec spec,
    @NotNull InviteStatus status,
    @Nullable GroupId groupId) {}
