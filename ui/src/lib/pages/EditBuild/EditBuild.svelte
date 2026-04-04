<script lang="ts">
	import EditingBottomBar from './BottomBar/EditingBottomBar.svelte';
	import RoleDisplay from '$lib/components/RoleDisplay/RoleDisplay.svelte';
	import { GameVersionFactory } from '$lib/versioning/GameVersionFactory';
	import GroupDisplay from '$lib/components/GroupDisplay/GroupDisplay.svelte';
	import ChecklistDisplay from '$lib/components/ChecklistDisplay/ChecklistDisplay.svelte';
	import RoleCount from '$lib/components/RoleCount.svelte';
	import { _ } from 'svelte-i18n';
	import Loading from '$lib/components/Loading.svelte';
	import type { Build, BuildPageParams } from '$lib/types';
	import ErrorPage from '$lib/pages/ErrorPage/ErrorPage.svelte';
	import { createBuildData } from '$lib';
	import { editingBuild } from '$lib/store';
	import { GameVersionSlug } from '$lib/versioning/GameVersion';

	const routeToCorrectBuildUrl = (gameVersion: GameVersionSlug, build: Build) => {
		const buildUrl = `/build/${build.buildId}/edit`;
		if (build.gameVersion !== gameVersion) {
			window.location.href = `/${build.gameVersion}${buildUrl}`;
		}
	};

	export let params: BuildPageParams;
	const context = GameVersionFactory.getContext(params.gameVersion);
	editingBuild.update((build) => {
		if (build) {
			return build;
		}

		let editing: Build | null = null;
		if (params.build) {
			editing = createBuildData(params.build, context);
		} else {
			editing = {
				gameVersion: context.gameVersion.getSlug(),
				buildId: '',
				name: $_('build.new'),
				players: [],
				meta: {
					total: 0,
					tanks: 0,
					healers: 0,
					dps: 0,
					rangedDps: 0,
					meleeDps: 0,
					unknown: 0,
					description: $_('build.new'),
				},
			};
		}
		routeToCorrectBuildUrl(context.gameVersion.getSlug(), editing);
		return editing;
	});

	let grouped = false;
	let creatingBuild = false;
</script>

<svelte:head>
	{#if $editingBuild}
		<title>{$_('build.page.edit.title', { values: { buildName: $editingBuild.name } })}</title>
	{:else}
		<title
			>{$_('build.page.new.title', {
				values: { version: $_(`versions.${params.gameVersion}`) },
			})}</title
		>
	{/if}
</svelte:head>

{#if params.error}
	<ErrorPage error={params.error} />
{:else if $editingBuild}
	{#if creatingBuild}
		<Loading />
	{/if}

	<div class="content">
		<div class="page">
			{#if grouped}
				<RoleCount build={$editingBuild} {context} />
				<GroupDisplay build={$editingBuild} {context} />
			{:else}
				<RoleDisplay build={$editingBuild} {context} />
			{/if}
			<ChecklistDisplay build={$editingBuild} {context} />
		</div>
	</div>
	<EditingBottomBar {context} toggleGrouped={() => (grouped = !grouped)} />
{/if}

<style>
	.page {
		@media screen and (min-width: 1200px) {
			max-width: 1200px;
			margin-left: auto;
			margin-right: auto;
		}

		padding-top: var(--spacing-s);
		padding-bottom: var(--spacing-s);
	}
</style>
