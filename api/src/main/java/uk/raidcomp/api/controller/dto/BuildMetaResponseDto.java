package uk.raidcomp.api.controller.dto;

public record BuildMetaResponseDto(
    String name, Integer total, Integer tanks, Integer healers, Integer dps, Integer unknown) {}
