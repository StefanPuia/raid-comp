package uk.raidcomp.api.controller.dto.imports;

import jakarta.validation.constraints.NotBlank;

public record ImportBuildDto(@NotBlank String raw) {}
