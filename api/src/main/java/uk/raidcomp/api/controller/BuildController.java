package uk.raidcomp.api.controller;

import jakarta.validation.Valid;
import java.time.Duration;
import lombok.AllArgsConstructor;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.raidcomp.api.controller.dto.BuildMetaResponseDto;
import uk.raidcomp.api.controller.dto.BuildResponseDto;
import uk.raidcomp.api.controller.dto.CreateBuildRequestDto;
import uk.raidcomp.api.controller.dto.CreateBuildResponseDto;
import uk.raidcomp.api.delegate.BuildDelegate;
import uk.raidcomp.api.mapper.BuildMapper;
import uk.raidcomp.api.mapper.PlayerMapper;
import uk.raidcomp.cloudflare.turnstile.TurnstileDelegate;

@RestController
@RequestMapping("/builds")
@AllArgsConstructor
public class BuildController {
  private final BuildDelegate buildDelegate;
  private final TurnstileDelegate turnstileDelegate;
  private final BuildMapper buildMapper;
  private final PlayerMapper playerMapper;

  private BodyBuilder cacheableOkResponse() {
    return ResponseEntity.ok().cacheControl(CacheControl.maxAge(Duration.ofDays(30)).cachePublic());
  }

  @GetMapping("/{buildId}")
  public ResponseEntity<BuildResponseDto> getSingleBuild(@PathVariable final String buildId) {
    return buildDelegate
        .findById(buildId)
        .map(buildMapper::toDto)
        .map(cacheableOkResponse()::body)
        .orElseGet(ResponseEntity.notFound()::build);
  }

  @GetMapping("/{buildId}/meta")
  public ResponseEntity<BuildMetaResponseDto> getBuildMeta(@PathVariable final String buildId) {
    return buildDelegate
        .findById(buildId)
        .map(buildMapper::toMeta)
        .map(cacheableOkResponse()::body)
        .orElseGet(ResponseEntity.notFound()::build);
  }

  @PostMapping
  public ResponseEntity<CreateBuildResponseDto> createBuild(
      @Valid @RequestBody final CreateBuildRequestDto createBuildRequestDto) {
    return turnstileDelegate.validate(createBuildRequestDto.token())
        ? ResponseEntity.ok(
            buildMapper.toCreated(
                buildDelegate.create(
                    createBuildRequestDto.gameVersion(),
                    createBuildRequestDto.name(),
                    createBuildRequestDto.players().stream().map(playerMapper::toDomain).toList())))
        : ResponseEntity.status(HttpStatus.FORBIDDEN).build();
  }
}
