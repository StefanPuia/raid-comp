<script lang="ts">
	import WarcraftIcon from '$lib/components/WarcraftIcon.svelte';
	import { PlayerRole } from '$lib/consts';
	import { _ } from 'svelte-i18n';
	import type { VersionedContext } from '$lib/versioning/VersionedContext';
	import type { Build } from '$lib/types';

	export let build: Build;
	export let context: VersionedContext;

	const total = build.players.length;
	const tanks = build.players.filter((p) => p.spec?.isTank()).length;
	const healers = build.players.filter((p) => p.spec?.isHealer()).length;
	const rangedDPS = build.players.filter((p) => p.spec?.isRangedDPS()).length;
	const meleeDPS = build.players.filter((p) => p.spec?.isMeleeDPS()).length;
</script>

<div class="roles">
	{#if total}
		<div class="role">
			<WarcraftIcon
				src={context.iconProvider.getSrc('inv_misc_groupneedmore')}
				label={$_('build.roles.total')}
			/>
			<span>{total}</span>
		</div>
	{/if}
	{#if tanks}
		<div class="role">
			<WarcraftIcon
				src={context.iconProvider.getForRole(PlayerRole.Tank)}
				label={$_('build.roles.Tank')}
			/>
			<span>{tanks}</span>
		</div>
	{/if}
	{#if healers}
		<div class="role">
			<WarcraftIcon
				src={context.iconProvider.getForRole(PlayerRole.Healer)}
				label={$_('build.roles.Healer')}
			/>
			<span>{healers}</span>
		</div>
	{/if}
	{#if rangedDPS}
		<div class="role">
			<WarcraftIcon
				src={context.iconProvider.getForRole(PlayerRole.RangedDPS)}
				label={$_('build.roles.RangedDPS')}
			/>
			<span>{rangedDPS}</span>
		</div>
	{/if}
	{#if meleeDPS}
		<div class="role">
			<WarcraftIcon
				src={context.iconProvider.getForRole(PlayerRole.MeleeDPS)}
				label={$_('build.roles.MeleeDPS')}
			/>
			<span>{meleeDPS}</span>
		</div>
	{/if}
</div>

<style>
	.roles {
		margin-top: var(--spacing-l);
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
		user-select: none;
		place-content: center;

		@media only screen and (max-width: 650px) {
			& {
				place-items: center;
			}
		}
	}

	.role {
		display: grid;
		grid-template-columns: min-content 3em;
		gap: var(--spacing-xs);
		align-items: center;

		& > span {
			font-size: var(--spacing-m);
		}
	}
</style>
