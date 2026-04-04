<script lang="ts">
	import { GameVersionFactory } from '$lib/versioning/GameVersionFactory';
	import { _ } from 'svelte-i18n';
	import type { Build, BuildPageParams } from '$lib/types';
	import ErrorPage from '$lib/pages/ErrorPage/ErrorPage.svelte';
	import WarcraftIcon from '$lib/components/WarcraftIcon.svelte';
	import RoleCount from '$lib/components/RoleCount.svelte';
	import GroupDisplay from '$lib/components/GroupDisplay/GroupDisplay.svelte';
	import RoleDisplay from '$lib/components/RoleDisplay/RoleDisplay.svelte';
	import ChecklistDisplay from '$lib/components/ChecklistDisplay/ChecklistDisplay.svelte';
	import ViewingBottomBar from '$lib/pages/ViewBuild/ViewingBottomBar.svelte';
	import { createBuildData } from '$lib';

	export let params: BuildPageParams;
	const context = GameVersionFactory.getContext(params.gameVersion);

	const build: Build | undefined = params.build
		? createBuildData(params.build, context)
		: undefined;
</script>

<svelte:head>
	{#if build}
		<title>{$_('build.page.view.title', { values: { buildName: build.name } })}</title>
		<meta name="description" content={build.meta.description} />
	{/if}
</svelte:head>

{#if params.error}
	<ErrorPage error={params.error} />
{:else if build}
	<div class="page content">
		<div class="title">
			<WarcraftIcon
				src={context.iconProvider.getVersionIcon()}
				label={$_(`versions.${params.gameVersion}`)}
			/>
			{build.name}
		</div>
		{#if params.grouped}
			<RoleCount {build} {context} />
			<GroupDisplay {build} {context} />
		{:else}
			<RoleDisplay {build} {context} />
		{/if}
		<ChecklistDisplay {build} {context} />
	</div>
	<ViewingBottomBar {build} grouped={params.grouped} />
{/if}

<style>
	.page {
		@media screen and (min-width: 1200px) {
			max-width: 1200px;
			margin-left: auto;
			margin-right: auto;
		}

		padding-bottom: var(--bottom-bar-size);
	}

	.title {
		box-sizing: border-box;
		font-size: var(--spacing-l);
		padding: var(--spacing-m);
		text-align: center;
	}
</style>
