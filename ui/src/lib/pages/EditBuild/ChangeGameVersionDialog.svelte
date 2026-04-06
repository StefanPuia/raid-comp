<script lang="ts">
	import List, { Item, Text } from '@smui/list';
	import Dialog, { Actions, Content, Title } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import { _ } from 'svelte-i18n';
	import { GameVersionSlug } from '$lib/versioning/GameVersion';
	import WarcraftIcon from '$lib/components/WarcraftIcon.svelte';
	import { GameVersionFactory } from '$lib/versioning/GameVersionFactory';
	import type { VersionedContext } from '$lib/versioning/VersionedContext';

	export let context: VersionedContext;
	export let open: boolean;

	const currentVersion = context.gameVersion.getSlug();

	const versions = Object.values(GameVersionSlug)
		.filter((v) => v !== currentVersion)
		.map((slug) => ({
			slug,
			iconProvider: GameVersionFactory.createIconProvider(slug),
		}));
	const handleChange = () => {
		if (selectedVersion && selectedVersion !== currentVersion) {
			window.location.href = `/${selectedVersion}/build`;
		}
	};

	let selectedVersion: string;
</script>

<Dialog bind:open aria-labelledby="simple-title" aria-describedby="simple-content">
	<Title id="simple-title">{$_('build.changeVersion.title')}</Title>
	<Content id="simple-content">
		<p style="color: var(--palette-error-main); font-weight: bold;">
			{$_('build.changeVersion.confirm')}
		</p>
		<p>
			{$_('build.changeVersion.current')}:
			<WarcraftIcon src={context.iconProvider.getVersionIcon()} />
			<span class="current"><strong>{$_(`versions.${currentVersion}`)}</strong></span>
		</p>

		<List class="demo-list">
			{#each versions as version}
				<Item
					onSMUIAction={() => (selectedVersion = version.slug)}
					style="{selectedVersion === version.slug
						? 'background-color: var(--palette-success-dark);'
						: ''} border-radius: var(--spacing-xs); display: flex; gap: var(--spacing-s);"
				>
					<WarcraftIcon src={version.iconProvider.getVersionIcon()} />
					<Text>{$_(`versions.${version.slug}`)}</Text>
				</Item>
			{/each}
		</List>
	</Content>
	<Actions>
		<Button onclick={() => handleChange()} class="button-danger">
			<Label>{$_('buttons.ok')}</Label>
		</Button>
		<Button class="button-cancel">
			<Label>{$_('buttons.cancel')}</Label>
		</Button>
	</Actions>
</Dialog>

<style>
	.current {
		color: var(--palette-info-main);
	}
</style>
