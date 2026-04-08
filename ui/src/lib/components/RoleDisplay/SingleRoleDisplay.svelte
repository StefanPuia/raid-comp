<script lang="ts">
	import Paper, { Content } from '@smui/paper';
	import type { Build, BuildPlayer } from '$lib/types';
	import type { PlayerRole } from '$lib/consts';
	import WarcraftIcon from '$lib/components/WarcraftIcon.svelte';
	import { _ } from 'svelte-i18n';
	import Player from '$lib/components/Player.svelte';
	import type { VersionedContext } from '$lib/versioning/VersionedContext';

	export let role: PlayerRole;
	export let displayAsGrid: boolean = false;
	export let build: Build;
	export let context: VersionedContext;

	let players: BuildPlayer[];
	$: players = build.players.filter((p) => p.spec?.role === role);
</script>

<Paper>
	<Content>
		<div class="header">
			<WarcraftIcon src={context.iconProvider.getForRole(role)} label={$_(`build.roles.${role}`)} />
			<span>{$_(`build.roles.${role}`)}</span>
			<span class="count">
				{players.length}
			</span>
		</div>

		{#if displayAsGrid}
			<div class="spread">
				{#each players as player (player.id)}
					<Player {player} {context} />
				{/each}
			</div>
		{:else}
			<div>
				{#each players as player (player.id)}
					<Player {player} {context} />
				{/each}
			</div>
		{/if}
	</Content>
</Paper>

<style>
	.header {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: var(--spacing-xs);
		margin-bottom: var(--spacing-s);
	}

	.spread {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, auto));
		column-gap: var(--spacing-m);
	}

	.count {
		font-weight: bold;
		font-size: var(--spacing-m);
	}
</style>
