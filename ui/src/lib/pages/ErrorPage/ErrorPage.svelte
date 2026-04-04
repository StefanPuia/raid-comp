<script lang="ts">
	import Button, { Label } from '@smui/button';
	import { _ } from 'svelte-i18n';
	import { ApiError } from '$lib/service/error';

	export let error: unknown;
	let apiError: ApiError;
	$: apiError = ApiError.deserialize(error);

	const reload = () => {
		window.location.reload();
	};
</script>

<div class="page">
	<div class="wrapper">
		<div class="title">
			<h2>{$_(`error.${apiError.id}`)}</h2>
		</div>
		<Button href="/" variant="raised" style="margin-right: var(--spacing-xs);">
			<Label>{$_('error.goBack')}</Label>
		</Button>
		<Button
			on:click={reload}
			variant="raised"
			style="margin-left: var(--spacing-xs); background-color: var(--palette-secondary-main)"
		>
			<Label>{$_('error.reload')}</Label>
		</Button>
	</div>
</div>

<style>
	.page {
		display: grid;
		place-items: center;
		height: 100vh;
	}

	.wrapper {
		text-align: center;
	}

	.title {
		padding-bottom: var(--spacing-xxl);
	}
</style>
