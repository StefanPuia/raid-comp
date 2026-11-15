<script lang="ts">
	import { PlayerRole } from '#lib/consts.ts';
	import LayoutGrid, { Cell, InnerGrid } from '@smui/layout-grid';
	import SingleRoleDisplay from '#lib/components/RoleDisplay/SingleRoleDisplay.svelte';
	import type { Build } from '#lib/types.ts';
	import type { VersionedContext } from '#lib/versioning/VersionedContext.ts';

	export let build: Build;
	export let context: VersionedContext;

	const spanDevices = {
		desktop: 4,
		tablet: 4,
		phone: 4,
	};
</script>

<LayoutGrid>
	<Cell {spanDevices}>
		<InnerGrid>
			<Cell span={12}>
				<SingleRoleDisplay role={PlayerRole.Tank} {build} {context} />
			</Cell>
			<Cell span={12}>
				<SingleRoleDisplay role={PlayerRole.Healer} {build} {context} />
			</Cell>
		</InnerGrid>
	</Cell>
	<Cell {spanDevices}>
		<SingleRoleDisplay role={PlayerRole.RangedDPS} {build} {context} />
	</Cell>
	<Cell {spanDevices}>
		<SingleRoleDisplay role={PlayerRole.MeleeDPS} {build} {context} />
	</Cell>
	{#if build.players.find((p) => p.spec?.role === PlayerRole.Unknown)}
		<Cell span={12}>
			<SingleRoleDisplay role={PlayerRole.Unknown} displayAsGrid {build} {context} />
		</Cell>
	{/if}
</LayoutGrid>
