<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ChecklistCounter from '$lib/components/ChecklistDisplay/ChecklistCounter.svelte';
	import ChecklistWrapper from '$lib/components/ChecklistDisplay/ChecklistWrapper.svelte';
	import type { Build } from '$lib/types';
	import type { VersionedContext } from '$lib/versioning/VersionedContext';

	export let build: Build;
	export let context: VersionedContext;
</script>

<ChecklistWrapper title={$_(`build.checklist.utilities`)} warning>
	{#each context.gameVersion.getUtilities() as utility}
		<ChecklistCounter
			label={$_(`utility.${utility.slug}`)}
			count={context.gameVersion.countUtilities(build.players, utility)}
			iconSrc={context.iconProvider.getSrc(utility.icon)}
		/>
	{/each}
</ChecklistWrapper>
