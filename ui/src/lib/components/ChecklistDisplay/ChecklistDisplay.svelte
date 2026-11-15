<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import ClassDisplay from '#lib/components/ChecklistDisplay/ClassDisplay.svelte';
	import BuffsDisplay from '#lib/components/ChecklistDisplay/BuffsDisplay.svelte';
	import UtilitiesDisplay from '#lib/components/ChecklistDisplay/UtilitiesDisplay.svelte';
	import type { Build } from '#lib/types.ts';
	import type { VersionedContext } from '#lib/versioning/VersionedContext.ts';

	export let build: Build;
	export let context: VersionedContext;

	const spanDevices = {
		desktop: 4,
		tablet: 5,
		phone: 4,
	};
</script>

<LayoutGrid style="margin-bottom: var(--bottom-bar-size)">
	<Cell {spanDevices}>
		<ClassDisplay {build} {context} />
	</Cell>
	<Cell {spanDevices}>
		<BuffsDisplay {build} {context} />
	</Cell>
	<Cell {spanDevices}>
		<UtilitiesDisplay {build} {context} />
	</Cell>
</LayoutGrid>
