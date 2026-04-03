package uk.raidcomp.api.data.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import java.time.Instant;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import uk.raidcomp.game.version.GameVersion;

@Getter
@Setter
@Entity(name = "builds")
@NoArgsConstructor
@AllArgsConstructor
public class BuildEntity {
  @Id private String id;

  @Enumerated(EnumType.STRING)
  private GameVersion gameVersion;

  private String name;

  @CreatedDate private Instant created;

  @LastModifiedDate private Instant lastSeen;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinTable(
      name = "build_players",
      joinColumns = @JoinColumn(name = "build_id"),
      inverseJoinColumns = @JoinColumn(name = "player_id"))
  private List<PlayerEntity> players;
}
