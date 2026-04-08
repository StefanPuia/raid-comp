<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import SingleGroupDisplay from '$lib/components/GroupDisplay/SingleGroupDisplay.svelte';
	import type { Build } from '$lib/types';
	import type { VersionedContext } from '$lib/versioning/VersionedContext';

	export let build: Build;
	export let context: VersionedContext;

	const spanDevices = {
		desktop: 3,
		tablet: 4,
		phone: 4,
	};
</script>

<LayoutGrid>
	{#each { length: 8 } as _, i (i)}
		<Cell {spanDevices}>
			<SingleGroupDisplay group={i + 1} {build} {context} />
		</Cell>
	{/each}
	{#if build.players.find((p) => p.group === 'none')}
		<Cell span={12}>
			<SingleGroupDisplay group="none" displayAsGrid {build} {context} />
		</Cell>
	{/if}
</LayoutGrid>
