package uk.raidcomp.api.delegate;

import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uk.raidcomp.api.data.entity.BuildEntity;
import uk.raidcomp.api.data.repository.BuildRepository;
import uk.raidcomp.api.mapper.BuildMapper;
import uk.raidcomp.api.mapper.PlayerMapper;
import uk.raidcomp.api.model.Build;
import uk.raidcomp.api.model.Player;
import uk.raidcomp.game.version.GameVersion;

@Service
@AllArgsConstructor
@Transactional
public class BuildDelegate {
  public static final int MAX_BUILD_AGE = 30;
  public static final String PRUNE_SCHEDULE_CRON = "0 0 0 * * *";

  private final BuildRepository repository;
  private final BuildMapper buildMapper;
  private final PlayerMapper playerMapper;

  private String generateBuildId() {
    final UUID randomId = UUID.randomUUID();
    return randomId.toString().substring(0, 8);
  }

  public Optional<Build> findById(final String buildId) {
    final Optional<BuildEntity> build = repository.findById(buildId);
    build.ifPresent(
        buildEntity -> {
          buildEntity.setLastSeen(Instant.now());
          repository.save(buildEntity);
        });
    return build.map(buildMapper::toDomain);
  }

  public Build create(
      final GameVersion gameVersion, final String name, final List<Player> players) {
    final BuildEntity build = new BuildEntity();
    build.setId(generateBuildId());
    build.setGameVersion(gameVersion);
    build.setName(name);
    build.setPlayers(players.stream().map(playerMapper::toModel).toList());
    return buildMapper.toDomain(repository.save(build));
  }

  public long deleteOldBuilds() {
    final Instant earliest =
        Instant.now().atOffset(ZoneOffset.UTC).minusDays(MAX_BUILD_AGE).toInstant();
    return repository.deleteByLastSeenBefore(earliest);
  }
}
