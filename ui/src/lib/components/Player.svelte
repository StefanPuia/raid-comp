<script lang="ts">
	import type { BuildPlayer } from '$lib/types';
	import WarcraftIcon from '$lib/components/WarcraftIcon.svelte';
	import AttendanceIcon from '$lib/components/AttendanceIcon.svelte';
	import { _ } from 'svelte-i18n';
	import type { VersionedContext } from '$lib/versioning/VersionedContext';
	import { currentlyEditingPlayerId } from '$lib/store';
	import { PlayerRole } from '$lib/consts';

	export let player: BuildPlayer;
	export let context: VersionedContext;
	export let grouped: boolean | undefined = undefined;

	const editPlayerListener = () => {
		currentlyEditingPlayerId.set(player.id);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="player" onclick={editPlayerListener}>
	<div class="icon">
		{#if grouped}
			<WarcraftIcon
				label={$_(`build.roles.${player.spec?.role ?? 'Unknown'}`)}
				src={context.iconProvider.getForRole(player.spec?.role ?? PlayerRole.Unknown)}
			/>
		{/if}
		<WarcraftIcon
			label={$_(player.spec ? `specs.${player.spec.slug}` : `classes.${player.class.slug}`)}
			src={context.iconProvider.getSrc(player.spec?.icon ?? player.class.icon)}
		/>
	</div>
	<span class="name" style="color: var(--player-class-colour-{player.class.slug})"
		>{player.name}</span
	>
	<AttendanceIcon status={player.status} />
</div>

<style>
	.player {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: var(--spacing-m);
		padding: var(--spacing-xs);
		margin: var(--spacing-xss) 0;
		border-radius: var(--spacing-xxs);
		align-items: center;
		user-select: none;
		/*cursor: ${isClickable && "pointer"};*/

		& > .icon {
			display: flex;
			gap: var(--spacing-xs);
		}

		&:hover {
			background-color: var(--palette-secondary-dark);
		}
	}

	.name {
		font-weight: 500;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
</style>
