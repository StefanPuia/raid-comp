package uk.raidcomp.api.delegate;

import static uk.raidcomp.api.delegate.BuildDelegate.PRUNE_SCHEDULE_CRON;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ScheduleDelegate {

  private final BuildDelegate buildDelegate;

  @Scheduled(cron = PRUNE_SCHEDULE_CRON)
  public void deleteOldBuilds() {
    log.info("Pruning old builds...");
    final var buildsDeleted = buildDelegate.deleteOldBuilds();
    if (buildsDeleted > 0) {
      log.info("Pruned {} records", buildsDeleted);
    }
  }
}
