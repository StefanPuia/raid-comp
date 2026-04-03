package uk.raidcomp.api.data.repository;

import java.time.Instant;
import org.springframework.data.repository.CrudRepository;
import uk.raidcomp.api.data.entity.BuildEntity;

public interface BuildRepository extends CrudRepository<BuildEntity, String> {
  long deleteByLastSeenBefore(Instant lastSeenMax);
}
