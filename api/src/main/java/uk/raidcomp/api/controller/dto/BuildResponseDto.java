package uk.raidcomp.api.controller.dto;

import java.util.List;
import uk.raidcomp.game.version.GameVersion;

public record BuildResponseDto(
    String buildId, GameVersion gameVersion, String name, List<PlayerDto> players) {}
