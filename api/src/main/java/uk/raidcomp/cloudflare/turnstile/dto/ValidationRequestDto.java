package uk.raidcomp.cloudflare.turnstile.dto;

public record ValidationRequestDto(String secret, String response) {}
