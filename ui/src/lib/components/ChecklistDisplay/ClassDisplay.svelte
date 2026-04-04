<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ChecklistCounter from '$lib/components/ChecklistDisplay/ChecklistCounter.svelte';
	import ChecklistWrapper from '$lib/components/ChecklistDisplay/ChecklistWrapper.svelte';
	import type { Build } from '$lib/types';
	import type { VersionedContext } from '$lib/versioning/VersionedContext';

	export let build: Build;
	export let context: VersionedContext;
</script>

<ChecklistWrapper title={$_(`build.checklist.classes`)}>
	{#each context.gameVersion.getClasses() as playerClass}
		<ChecklistCounter
			label={$_(`classes.${playerClass.slug}`)}
			count={context.gameVersion.countClasses(build.players, playerClass)}
			iconSrc={context.iconProvider.getSrc(playerClass.icon)}
			colour={playerClass.colour}
		/>
	{/each}
</ChecklistWrapper>
