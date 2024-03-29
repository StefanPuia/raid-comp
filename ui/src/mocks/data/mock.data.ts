import type { BuildPlayer } from "$lib/service/api";
import { InviteStatus } from "$lib/consts";

export const livePlayers: BuildPlayer[] = [
  {
    name: "Alfrothir",
    class: "Shaman",
    status: InviteStatus.Invited,
    spec: "ShamanRestoration",
    group: 1
  },
  {
    name: "Albionna",
    class: "Priest",
    // spec: "PriestHoly",
    status: InviteStatus.Tentative
    // group: 1,
  },
  {
    name: "Angélinaholy",
    class: "Paladin",
    // spec: "PaladinHoly",
    status: InviteStatus.Accepted
    // group: 1,
  },
  {
    name: "Badumtis",
    class: "Monk",
    spec: "MonkBrewmaster",
    status: InviteStatus.Declined
    // group: 1,
  },
  {
    name: "Betræyer",
    realm: "Test",
    class: "DemonHunter",
    spec: "DemonHunterHavoc",
    status: InviteStatus.Unknown
    // group: 1,
  },
  {
    name: "Luleradhiqe",
    class: "Druid",
    status: InviteStatus.Accepted,
    spec: "DruidRestoration"
    // group: 2,
  },
  // {
  //   name: "Pigor",
  //   class: "Warrior",
  //   spec: "WarriorProtection",
  //   status: InviteStatus.Accepted,
  //   group: 2,
  // },
  {
    name: "Rakann",
    class: "Paladin",
    spec: "PaladinRetribution",
    status: InviteStatus.Accepted,
    group: 2
  },
  {
    name: "Sephmeow",
    class: "Druid",
    // spec: "DruidGuardian",
    status: InviteStatus.Accepted
    // group: 2,
  },
  {
    name: "Shiftmypantz",
    class: "Druid",
    spec: "DruidRestoration",
    status: InviteStatus.Accepted,
    group: 2
  },
  {
    name: "Vicpal",
    class: "Paladin",
    spec: "PaladinProtection",
    status: InviteStatus.Accepted,
    group: 3
  },
  // {
  //   name: "Ameliorate",
  //   class: "Priest",
  //   spec: "PriestShadow",
  //   status: InviteStatus.Accepted,
  //   group: 3,
  // },
  {
    name: "Artemmiss",
    class: "Hunter",
    spec: "HunterMarksmanship",
    status: InviteStatus.Accepted,
    group: 3
  },
  {
    name: "Benafllock",
    class: "Warlock",
    spec: "WarlockAffliction",
    status: InviteStatus.Accepted,
    group: 3
  },
  {
    name: "Blacklíly",
    class: "Warlock",
    spec: "WarlockAffliction",
    status: InviteStatus.Accepted,
    group: 3
  },
  {
    name: "Chhe",
    class: "Mage",
    spec: "MageFire",
    status: InviteStatus.Accepted,
    group: 4
  },
  {
    name: "Christene",
    class: "Paladin",
    spec: "PaladinRetribution",
    status: InviteStatus.Accepted,
    group: 4
  },
  {
    name: "Chullee",
    class: "Monk",
    spec: "MonkWindwalker",
    status: InviteStatus.Accepted,
    group: 4
  },
  {
    name: "Cultmaster",
    class: "Shaman",
    spec: "ShamanElemental",
    status: InviteStatus.Accepted,
    group: 4
  },
  {
    name: "Enthiriel",
    class: "Paladin",
    spec: "PaladinRetribution",
    status: InviteStatus.Accepted,
    group: 4
  },
  {
    name: "Eyotadk",
    class: "DeathKnight",
    spec: "DeathKnightUnholy",
    status: InviteStatus.Accepted,
    group: 5
  },
  // {
  //   name: "Freyjr",
  //   class: "Warrior",
  //   spec: "WarriorFury",
  //   status: InviteStatus.Accepted,
  //   group: 5,
  // },
  {
    name: "Furyseeker",
    class: "DemonHunter",
    spec: "DemonHunterHavoc",
    status: InviteStatus.Accepted,
    group: 5
  },
  {
    name: "Gunnaer",
    class: "Warlock",
    spec: "WarlockAffliction",
    status: InviteStatus.Accepted,
    group: 5
  },
  {
    name: "Gwynblaidd",
    class: "DeathKnight",
    spec: "DeathKnightFrost",
    status: InviteStatus.Accepted,
    group: 5
  },
  {
    name: "Hazzaa",
    class: "DemonHunter",
    spec: "DemonHunterHavoc",
    status: InviteStatus.Accepted,
    group: 6
  },
  {
    name: "Hrutkata",
    class: "Hunter",
    spec: "HunterBeastmastery",
    status: InviteStatus.Accepted,
    group: 6
  },
  {
    name: "Kharnifex",
    class: "Shaman",
    spec: "ShamanElemental",
    status: InviteStatus.Accepted,
    group: 6
  },
  {
    name: "Kólo",
    class: "Mage",
    spec: "MageFire",
    status: InviteStatus.Accepted,
    group: 6
  },
  {
    name: "Lamyniella",
    class: "Rogue",
    spec: "RogueOutlaw",
    status: InviteStatus.Accepted,
    group: 6
  },
  {
    name: "Likoskila",
    class: "Monk",
    spec: "MonkWindwalker",
    status: InviteStatus.Accepted,
    group: 7
  },
  {
    name: "Linkidudie",
    class: "Hunter",
    spec: "HunterMarksmanship",
    status: InviteStatus.Accepted,
    group: 7
  },
  {
    name: "Makedonass",
    class: "Paladin",
    spec: "PaladinRetribution",
    status: InviteStatus.Accepted,
    group: 7
  },
  {
    name: "Miechhunt",
    class: "Hunter",
    spec: "HunterMarksmanship",
    status: InviteStatus.Accepted,
    group: 7
  },
  {
    name: "Minirax",
    class: "Rogue",
    spec: "RogueOutlaw",
    status: InviteStatus.Accepted,
    group: 7
  },
  {
    name: "Mudomon",
    class: "Hunter",
    spec: "HunterBeastmastery",
    status: InviteStatus.Accepted,
    group: 8
  },
  {
    name: "Nanthos",
    class: "Shaman",
    spec: "ShamanElemental",
    status: InviteStatus.Accepted,
    group: 8
  },
  {
    name: "Nepotisme",
    class: "DeathKnight",
    spec: "DeathKnightUnholy",
    status: InviteStatus.Accepted,
    group: 8
  },
  {
    name: "Notsoulburn",
    class: "Warlock",
    status: InviteStatus.Accepted,
    spec: "WarlockDemonology",
    group: 8
  },
  {
    name: "Ogerin",
    class: "Mage",
    spec: "MageFrost",
    status: InviteStatus.Accepted,
    group: 8
  }
];
