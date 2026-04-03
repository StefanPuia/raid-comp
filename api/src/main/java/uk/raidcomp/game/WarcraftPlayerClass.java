package uk.raidcomp.game;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum WarcraftPlayerClass {
  DEATH_KNIGHT("DeathKnight"),
  DEMON_HUNTER("DemonHunter"),
  DRUID("Druid"),
  EVOKER("Evoker"),
  HUNTER("Hunter"),
  MAGE("Mage"),
  MONK("Monk"),
  PALADIN("Paladin"),
  PRIEST("Priest"),
  ROGUE("Rogue"),
  SHAMAN("Shaman"),
  WARLOCK("Warlock"),
  WARRIOR("Warrior"),
  UNKNOWN("Unknown");

  @JsonValue private final String value;

  @JsonCreator
  public static WarcraftPlayerClass deserialize(final String value) {
    return Arrays.stream(values())
        .filter(e -> e.value.equalsIgnoreCase(value))
        .findFirst()
        .orElseThrow();
  }
}
