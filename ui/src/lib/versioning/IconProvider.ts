import { PlayerRole } from '$lib/consts';

export abstract class IconProvider {
	abstract getVersionIcon(size?: string): string;

	public getSrc(icon: string, size: string = '36'): string {
		return `https://render-eu.worldofwarcraft.com/icons/${size}/${icon}.jpg`;
	}

	public getForRole(role: PlayerRole, size?: string): string {
		switch (role) {
			case PlayerRole.Tank:
				return this.getSrc('inv_shield_04', size);
			case PlayerRole.Healer:
				return this.getSrc('spell_nature_protectionformnature', size);
			case PlayerRole.RangedDPS:
				return this.getSrc('inv_ammo_arrow_01', size);
			case PlayerRole.MeleeDPS:
				return this.getSrc('ability_ghoulfrenzy', size);
			case PlayerRole.Unknown:
				return this.getSrc('inv_misc_questionmark', size);
		}
	}
}
