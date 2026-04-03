package uk.raidcomp.game.version;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Arrays;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum GameVersion {
  LIVE("live"),
  DRAGONFLIGHT("dragonflight"),
  WOTLK("wotlk");

  public static final GameVersion DEFAULT = GameVersion.LIVE;

  @JsonValue private final String value;

  @JsonCreator
  public static GameVersion deserialize(final String value) {
    return Arrays.stream(values())
        .filter(e -> e.value.equalsIgnoreCase(value))
        .findFirst()
        .orElseThrow();
  }
}
