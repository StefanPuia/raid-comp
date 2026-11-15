<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Tooltip, { Label, Wrapper } from '@smui/tooltip';
	import IconButton, { Icon } from '@smui/icon-button';

	export let openResetBuildDialog: () => void;
	export let openChangeGameVersionDialog: () => void;
</script>

<Wrapper>
	<IconButton
		aria-label={$_('cta.resetBuild')}
		style="color: var(--palette-error-main)"
		onclick={() => openResetBuildDialog()}
	>
		<Icon class="material-icons">delete_forever</Icon>
	</IconButton>
	<Tooltip yPos="above"><Label>{$_('cta.resetBuild')}</Label></Tooltip>
</Wrapper>
<Wrapper>
	<IconButton
		aria-label={$_('cta.reportBug')}
		style="color: var(--palette-warning-main)"
		onclick={() => window.open('https://github.com/StefanPuia/raid-comp/issues')}
	>
		<Icon class="material-icons">bug_report</Icon>
	</IconButton>
	<Tooltip yPos="above"><Label>{$_('cta.reportBug')}</Label></Tooltip>
</Wrapper>
<Wrapper>
	<IconButton
		aria-label={$_('cta.changeGameVersion')}
		style="color: var(--palette-info-main)"
		onclick={() => openChangeGameVersionDialog()}
	>
		<Icon class="material-icons">extension</Icon>
	</IconButton>
	<Tooltip yPos="above"><Label>{$_('cta.changeGameVersion')}</Label></Tooltip>
</Wrapper>
