<script lang="ts">
	import Paper, { Content } from '@smui/paper';
	import type { Build, BuildPlayer } from '$lib/types';
	import { _ } from 'svelte-i18n';
	import Player from '$lib/components/Player.svelte';
	import type { VersionedContext } from '$lib/versioning/VersionedContext';

	export let group: number | 'none';
	export let displayAsGrid: boolean = false;

	export let build: Build;
	export let context: VersionedContext;
	let players: BuildPlayer[];
	$: players = build.players.filter((p) => p.group === group);
</script>

<Paper>
	<Content>
		<div class="header">
			<span>{$_(`build.groups.group_${group}`)}</span>
			<span>
				{players.length}
			</span>
		</div>

		{#if displayAsGrid}
			<div class="spread">
				{#each players as player}
					<Player {player} {context} />
				{/each}
			</div>
		{:else}
			<div>
				{#each players as player}
					<Player {player} {context} />
				{/each}
			</div>
		{/if}
	</Content>
</Paper>

<style>
	.header {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.spread {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, auto));
		column-gap: var(--spacing-m);
	}
</style>
