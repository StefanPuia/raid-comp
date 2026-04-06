<script lang="ts">
	import { _ } from 'svelte-i18n';
	import BottomAppBar, { Section } from '@smui-extra/bottom-app-bar';
	import Tooltip, { Wrapper } from '@smui/tooltip';
	import Fab, { Icon } from '@smui/fab';
	import ResetBuildDialog from '../ResetBuildDialog.svelte';
	import SaveBuildDialog from '$lib/pages/EditBuild/SaveBuildDialog.svelte';
	import EditPlayerDialog from '$lib/pages/EditBuild/EditPlayerDialog.svelte';
	import ChangeGameVersionDialog from '$lib/pages/EditBuild/ChangeGameVersionDialog.svelte';
	import LeftSide from '$lib/pages/EditBuild/BottomBar/LeftSide.svelte';
	import BurgerMenu from '$lib/pages/EditBuild/BottomBar/BurgerMenu.svelte';
	import RightSide from '$lib/pages/EditBuild/BottomBar/RightSide.svelte';
	import type { VersionedContext } from '$lib/versioning/VersionedContext';

	export let context: VersionedContext;
	export let toggleGrouped: () => void;

	let changeVersionDialog = false;
	let editPlayerDialog = false;
	let saveBuildOpen = false;
	let resetBuildOpen = false;
</script>

<BottomAppBar variant="static" color={'secondary'}>
	<Section>
		<div class="display-small">
			<BurgerMenu
				{toggleGrouped}
				openSaveBuildDialog={() => (saveBuildOpen = true)}
				openChangeGameVersionDialog={() => (changeVersionDialog = true)}
				openResetBuildDialog={() => (resetBuildOpen = true)}
			/>
		</div>
		<div class="display-large">
			<LeftSide
				openChangeGameVersionDialog={() => (changeVersionDialog = true)}
				openResetBuildDialog={() => (resetBuildOpen = true)}
			/>
		</div>
	</Section>
	<Section>
		<Wrapper>
			<Fab
				aria-label={$_('cta.addPlayer')}
				color={'primary'}
				onclick={() => (editPlayerDialog = true)}
			>
				<Icon class="material-icons">add</Icon>
			</Fab>
			<Tooltip yPos="above">{$_('cta.addPlayer')}</Tooltip>
		</Wrapper>
	</Section>
	<Section>
		<div class="display-large">
			<RightSide {toggleGrouped} openSaveBuildDialog={() => (saveBuildOpen = true)} />
		</div>
	</Section>
</BottomAppBar>

<ResetBuildDialog bind:open={resetBuildOpen} />
<ChangeGameVersionDialog {context} bind:open={changeVersionDialog} />
<EditPlayerDialog bind:open={editPlayerDialog} {context} />
<SaveBuildDialog {context} bind:open={saveBuildOpen} />

<style>
	.display-large {
		@media screen and (min-width: 516px) {
			display: block;
		}
		@media screen and (max-width: 515px) {
			display: none;
		}
	}

	.display-small {
		@media screen and (min-width: 516px) {
			display: none;
		}
		@media screen and (max-width: 515px) {
			display: block;
		}
	}
</style>
