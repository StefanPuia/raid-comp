<script lang="ts">
	import { Turnstile } from 'svelte-turnstile';
	import Snackbar from '@smui/snackbar';
	import Dialog, { Actions, Content, Title } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import { _ } from 'svelte-i18n';
	import { createBuild, mapToApi } from '$lib/service/api';
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
	import { ApiError } from '$lib/service/error';
	import type { VersionedContext } from '$lib/versioning/VersionedContext';
	import Loading from '$lib/components/Loading.svelte';
	import { editingBuild } from '$lib/store';

	export let context: VersionedContext;
	export let open: boolean;

	let creatingBuild: boolean = false;
	let buildName: string | null = $editingBuild?.name || $_('build.new');
	let errorSnackbar: Snackbar;
	let error: string | null = null;
	let turnstileToken: string = '';

	const handleSave = () => {
		const newBuild = mapToApi({
			...$editingBuild!,
			name: buildName || $_('build.new'),
			gameVersion: context.gameVersion.getSlug(),
		});
		creatingBuild = true;
		createBuild({
			...newBuild,
			token: turnstileToken,
		})
			.then(({ data: { buildId } }) => {
				window.location.href = `/build/${buildId}`;
			})
			.catch((err) => {
				creatingBuild = false;
				error = err instanceof ApiError ? $_(`error.${err.id}`) : err.message;
				errorSnackbar.open();
			});
	};
</script>

{#if creatingBuild}
	<Loading />
{/if}

<Dialog bind:open aria-labelledby="simple-title" aria-describedby="simple-content">
	<Title id="simple-title">{$_('build.save.title')}</Title>
	{#if $editingBuild?.players.length}
		<Content id="simple-content">
			<Textfield
				type="text"
				bind:value={buildName}
				label={$_('build.save.input')}
				style="min-width: 250px; margin-bottom: var(--spacing-s); width: 100%"
			/>
			<Turnstile
				on:turnstile-callback={({ detail: { token } }) => (turnstileToken = token)}
				forms={false}
				siteKey={PUBLIC_TURNSTILE_SITE_KEY}
			/>
		</Content>
		<Actions>
			<Button class="button-cancel">
				<Label>{$_('buttons.cancel')}</Label>
			</Button>
			<Button on:click={() => handleSave()} class="button-safe">
				<Label>{$_('buttons.save')}</Label>
			</Button>
		</Actions>
	{:else}
		<Content>
			{$_('build.save.emptyBuild')}
		</Content>
		<Actions>
			<Button class="button-cancel">
				<Label>{$_('buttons.ok')}</Label>
			</Button>
		</Actions>
	{/if}
</Dialog>

<Snackbar bind:this={errorSnackbar} class="error">
	<Label>{error}</Label>
</Snackbar>
