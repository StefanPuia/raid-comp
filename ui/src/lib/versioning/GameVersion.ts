import type { BuildPlayer } from '#lib/types.ts';
import { PlayerClass } from '#lib/versioning/PlayerClass.ts';
import { PlayerSpec } from '#lib/versioning/PlayerSpecialisation.ts';
import { RaidBuff } from '#lib/versioning/RaidBuff.ts';
import { RaidUtility } from '#lib/versioning/RaidUtility.ts';
import { UNKNOWN_CLASS, UNKNOWN_SPEC } from '#lib/consts.ts';
import { error } from '@sveltejs/kit';
import { sortBySlug, sortBySlugMoveLast } from '#lib/sort.ts';
import type { GameVersionSource } from '#lib/versioning/GameVersionSource.ts';
import type { BuildPlayer as ApiPlayer } from '#lib/service/api.ts';

export abstract class GameVersion {
	protected buffs: RaidBuff[] = [];
	protected utilities: RaidUtility[] = [];
	protected classes: PlayerClass[] = [];
	protected specs: PlayerSpec[] = [];

	protected constructor(versionSource: GameVersionSource) {
		this.buffs = versionSource.buffs.map(RaidBuff.fromSource).sort(sortBySlug);
		this.utilities = versionSource.utilities.map(RaidUtility.fromSource).sort(sortBySlug);
		this.classes = versionSource.classes
			.map((c) => PlayerClass.fromSource(c, this.buffs, this.utilities))
			.sort(sortBySlugMoveLast(UNKNOWN_CLASS));
		this.specs = versionSource.specs
			.map((s) => PlayerSpec.fromSource(s, this.classes, this.buffs, this.utilities))
			.sort(sortBySlugMoveLast(UNKNOWN_SPEC));
	}

	abstract getSlug(): GameVersionSlug;

	getBuffs(): RaidBuff[] {
		return this.buffs;
	}

	getClasses(): PlayerClass[] {
		return this.classes;
	}

	getClassFromSlug(slug: string | undefined) {
		return (
			this.getClasses().find((c) => c.slug === slug) ??
			this.getClasses().find((c) => c.slug === UNKNOWN_CLASS)!
		);
	}

	getSpecs(): PlayerSpec[] {
		return this.specs;
	}

	getSpecFromSlug(slug: string | undefined) {
		return (
			this.getSpecs().find((s) => s.slug === slug) ??
			this.getSpecs().find((s) => s.slug === UNKNOWN_SPEC)!
		);
	}

	getUtilities(): RaidUtility[] {
		return this.utilities;
	}

	countClasses(players: BuildPlayer[], playerClass: PlayerClass): number {
		return players.filter((p) => p.class.slug === playerClass.slug).length;
	}

	countBuffs(players: BuildPlayer[], raidBuff: RaidBuff): number {
		return players.filter((p) => {
			return (
				p.spec?.buffs?.find((b) => b.slug === raidBuff.slug) ||
				p.class.buffs.find((b) => b.slug === raidBuff.slug)
			);
		}).length;
	}

	countUtilities(players: BuildPlayer[], raidUtility: RaidUtility): number {
		return players.filter((p) => {
			return (
				p.spec?.utilities?.find((u) => u.slug === raidUtility.slug) ||
				p.class.utilities.find((u) => u.slug === raidUtility.slug)
			);
		}).length;
	}

	createPlayer(source: ApiPlayer): BuildPlayer {
		const playerClass = this.getClasses().find((c) => c.slug === source.class);
		if (!playerClass) {
			throw error(400, 'Not a valid player class');
		}
		return {
			id: crypto.randomUUID(),
			name: source.name,
			realm: source.realm,
			class: playerClass,
			spec: this.getSpecs().find((s) => s.slug === source.spec),
			status: source.status,
			group: source.group,
		};
	}
}

export enum GameVersionSlug {
	LIVE = 'live',
	DRAGONFLIGHT = 'dragonflight',
	// WOTLK = 'wotlk',
	FOREVER = 'forever',
}
