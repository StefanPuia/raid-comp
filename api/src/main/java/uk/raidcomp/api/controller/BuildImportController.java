package uk.raidcomp.api.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import uk.raidcomp.api.controller.dto.imports.ImportBuildDto;
import uk.raidcomp.api.controller.dto.imports.ImportBuildsResponseDto;
import uk.raidcomp.api.mapper.BuildMapper;
import uk.raidcomp.raidhelper.RaidHelperDelegate;

@Controller("/build/import")
@AllArgsConstructor
public class BuildImportController {
  private final RaidHelperDelegate delegate;
  private final BuildMapper mapper;

  @Post("/raid-helper")
  public HttpResponse<ImportBuildsResponseDto> importFromRaidHelper(
      @Valid @Body ImportBuildDto body) {
    return HttpResponse.created(
        new ImportBuildsResponseDto(
            delegate.createBuilds(body.raw()).stream().map(mapper::toImportDto).toList()));
  }
}
