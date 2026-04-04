<script lang="ts">
	import Dialog, { Actions, Content, Title } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import { _ } from 'svelte-i18n';
	import { editingBuild } from '$lib/store';

	export let open: boolean;

	const handleDelete = () => {
		editingBuild.update((build) => {
			if (build) {
				build.players = [];
			}
			return build;
		});
	};
</script>

<Dialog bind:open aria-labelledby="simple-title" aria-describedby="simple-content">
	<Title id="simple-title">{$_('build.reset.title')}</Title>
	<Content id="simple-content">{$_('build.reset.confirm')}</Content>
	<Actions>
		<Button on:click={() => handleDelete()} class="button-danger">
			<Label>{$_('buttons.ok')}</Label>
		</Button>
		<Button class="button-cancel">
			<Label>{$_('buttons.cancel')}</Label>
		</Button>
	</Actions>
</Dialog>
