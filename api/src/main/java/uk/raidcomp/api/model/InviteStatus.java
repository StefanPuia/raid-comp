package uk.raidcomp.api.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum InviteStatus {
  INVITED("invited"),
  TENTATIVE("tentative"),
  ACCEPTED("accepted"),
  BACKUP("backup"),
  DECLINED("declined"),
  BENCHED("benched"),
  UNKNOWN("unknown");

  @JsonValue private final String value;

  public static Optional<InviteStatus> findByValue(final String value) {
    return Arrays.stream(values())
        .filter(status -> status.value.equalsIgnoreCase(value))
        .findFirst();
  }

  @JsonCreator
  public static InviteStatus deserialize(final String value) {
    return findByValue(value).orElseThrow();
  }

  public boolean isInactive() {
    return List.of(DECLINED, UNKNOWN).contains(this);
  }

  public boolean isActive() {
    return !isInactive();
  }
}
