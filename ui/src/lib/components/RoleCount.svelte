<script lang="ts">
	import WarcraftIcon from '$lib/components/WarcraftIcon.svelte';
	import { PlayerRole } from '$lib/consts';
	import { _ } from 'svelte-i18n';
	import type { VersionedContext } from '$lib/versioning/VersionedContext';
	import type { Build } from '$lib/types';

	export let build: Build;
	export let context: VersionedContext;
</script>

<div class="roles">
	{#if build.meta.total}
		<div class="role">
			<WarcraftIcon
				src={context.iconProvider.getSrc('inv_misc_groupneedmore')}
				label={$_('build.roles.total')}
			/>
			<span>{build.meta.total}</span>
		</div>
	{/if}
	{#if build.meta.unknown}
		<div class="role">
			<WarcraftIcon
				src={context.iconProvider.getForRole(PlayerRole.Unknown)}
				label={$_('build.roles.Unknown')}
			/>
			<span>{build.meta.unknown}</span>
		</div>
	{/if}
	{#if build.meta.tanks}
		<div class="role">
			<WarcraftIcon
				src={context.iconProvider.getForRole(PlayerRole.Tank)}
				label={$_('build.roles.Tank')}
			/>
			<span>{build.meta.tanks}</span>
		</div>
	{/if}
	{#if build.meta.healers}
		<div class="role">
			<WarcraftIcon
				src={context.iconProvider.getForRole(PlayerRole.Healer)}
				label={$_('build.roles.Healer')}
			/>
			<span>{build.meta.healers}</span>
		</div>
	{/if}
	{#if build.meta.rangedDps}
		<div class="role">
			<WarcraftIcon
				src={context.iconProvider.getForRole(PlayerRole.RangedDPS)}
				label={$_('build.roles.RangedDPS')}
			/>
			<span>{build.meta.rangedDps}</span>
		</div>
	{/if}
	{#if build.meta.meleeDps}
		<div class="role">
			<WarcraftIcon
				src={context.iconProvider.getForRole(PlayerRole.MeleeDPS)}
				label={$_('build.roles.MeleeDPS')}
			/>
			<span>{build.meta.meleeDps}</span>
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
