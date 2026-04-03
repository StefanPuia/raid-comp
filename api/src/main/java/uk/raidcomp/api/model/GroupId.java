package uk.raidcomp.api.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum GroupId {
  NONE("none"),
  GROUP1(1),
  GROUP2(2),
  GROUP3(3),
  GROUP4(4),
  GROUP5(5),
  GROUP6(6),
  GROUP7(7),
  GROUP8(8);

  private final String stringValue;
  private final Integer intValue;

  GroupId(final String stringValue) {
    this.stringValue = stringValue;
    this.intValue = null;
  }

  GroupId(final Integer intValue) {
    this.stringValue = intValue.toString();
    this.intValue = intValue;
  }

  public static GroupId of(final int groupId) {
    return Arrays.stream(values())
        .filter(e -> e.intValue != null)
        .filter(e -> e.intValue == groupId)
        .findFirst()
        .orElseThrow();
  }

  @JsonCreator
  public static GroupId deserialize(final String value) {
    return Arrays.stream(values())
        .filter(group -> group.stringValue.equalsIgnoreCase(value))
        .findFirst()
        .orElseThrow();
  }

  @JsonValue
  public Object serialize() {
    return intValue != null ? intValue : stringValue;
  }
}
