package uk.raidcomp.wowaudit.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Arrays;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import uk.raidcomp.game.WarcraftPlayerClass;

@RequiredArgsConstructor
public enum WowAuditPlayerClass {
  DEATH_KNIGHT("Death Knight", WarcraftPlayerClass.DEATH_KNIGHT),
  DEMON_HUNTER("Demon Hunter", WarcraftPlayerClass.DEMON_HUNTER),
  DRUID("Druid", WarcraftPlayerClass.DRUID),
  EVOKER("Evoker", WarcraftPlayerClass.EVOKER),
  HUNTER("Hunter", WarcraftPlayerClass.HUNTER),
  MAGE("Mage", WarcraftPlayerClass.MAGE),
  MONK("Monk", WarcraftPlayerClass.MONK),
  PALADIN("Paladin", WarcraftPlayerClass.PALADIN),
  PRIEST("Priest", WarcraftPlayerClass.PRIEST),
  ROGUE("Rogue", WarcraftPlayerClass.ROGUE),
  SHAMAN("Shaman", WarcraftPlayerClass.SHAMAN),
  WARLOCK("Warlock", WarcraftPlayerClass.WARLOCK),
  WARRIOR("Warrior", WarcraftPlayerClass.WARRIOR);

  @JsonValue private final String value;
  @Getter private final WarcraftPlayerClass wowClass;

  @JsonCreator
  public static WowAuditPlayerClass deserialize(final String value) {
    return Arrays.stream(values())
        .filter(e -> e.value.equalsIgnoreCase(value))
        .findFirst()
        .orElseThrow();
  }
}
