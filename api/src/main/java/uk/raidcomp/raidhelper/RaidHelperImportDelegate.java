package uk.raidcomp.raidhelper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uk.raidcomp.api.model.imported.ImportedBuild;
import uk.raidcomp.raidhelper.csv.RaidHelperImportParser;
import uk.raidcomp.raidhelper.mapper.PlayerSignupMapper;

@Service
@AllArgsConstructor
public class RaidHelperImportDelegate {
  private final RaidHelperImportParser parser;
  private final PlayerSignupMapper mapper;

  public ImportedBuild getBuild(final String raw) {
    return mapper.toDomain(parser.parse(raw));
  }
}
