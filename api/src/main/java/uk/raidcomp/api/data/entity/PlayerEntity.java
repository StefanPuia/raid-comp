package uk.raidcomp.api.data.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uk.raidcomp.api.model.GroupId;
import uk.raidcomp.api.model.InviteStatus;
import uk.raidcomp.game.WarcraftPlayerClass;
import uk.raidcomp.game.WarcraftPlayerSpec;

@Getter
@Setter
@Entity(name = "player")
@NoArgsConstructor
@AllArgsConstructor
public class PlayerEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "player_seq")
  private Long id;

  private String name;
  @Nullable private String realm;

  @Enumerated(EnumType.STRING)
  private WarcraftPlayerClass className;

  @Enumerated(EnumType.STRING)
  private WarcraftPlayerSpec spec;

  @Enumerated(EnumType.STRING)
  private InviteStatus status;

  @Enumerated(EnumType.STRING)
  private GroupId groupId;
}
