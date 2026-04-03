package uk.raidcomp.api.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.raidcomp.api.controller.dto.imports.ImportBuildDto;
import uk.raidcomp.api.controller.dto.imports.ImportBuildsResponseDto;
import uk.raidcomp.api.mapper.BuildMapper;
import uk.raidcomp.raidhelper.RaidHelperDelegate;

@RestController
@RequestMapping("/build/import")
@AllArgsConstructor
public class BuildImportController {
  private final RaidHelperDelegate delegate;
  private final BuildMapper mapper;

  @PostMapping("/raid-helper")
  public ResponseEntity<ImportBuildsResponseDto> importFromRaidHelper(
      @Valid @RequestBody ImportBuildDto body) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(
            new ImportBuildsResponseDto(
                delegate.createBuilds(body.raw()).stream().map(mapper::toImportDto).toList()));
  }
}
