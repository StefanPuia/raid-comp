<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ChecklistCounter from '#lib/components/ChecklistDisplay/ChecklistCounter.svelte';
	import ChecklistWrapper from '#lib/components/ChecklistDisplay/ChecklistWrapper.svelte';
	import type { Build } from '#lib/types.ts';
	import type { VersionedContext } from '#lib/versioning/VersionedContext.ts';

	export let build: Build;
	export let context: VersionedContext;
</script>

<ChecklistWrapper title={$_(`build.checklist.utilities`)} warning>
	{#each context.gameVersion.getUtilities() as utility (utility.slug)}
		<ChecklistCounter
			label={$_(`utility.${utility.slug}`)}
			count={context.gameVersion.countUtilities(build.players, utility)}
			iconSrc={context.iconProvider.getSrc(utility.icon)}
		/>
	{/each}
</ChecklistWrapper>
