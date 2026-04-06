<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Tooltip, { Wrapper } from '@smui/tooltip';
	import IconButton from '@smui/icon-button';

	export let openResetBuildDialog: () => void;
	export let openChangeGameVersionDialog: () => void;
</script>

<Wrapper>
	<IconButton
		class="material-icons"
		aria-label={$_('cta.resetBuild')}
		style="color: var(--palette-error-main)"
		onclick={() => openResetBuildDialog()}
	>
		delete_forever
	</IconButton>
	<Tooltip yPos="above">{$_('cta.resetBuild')}</Tooltip>
</Wrapper>
<Wrapper>
	<IconButton
		class="material-icons"
		aria-label={$_('cta.reportBug')}
		style="color: var(--palette-warning-main)"
		onclick={() => window.open('https://github.com/StefanPuia/raid-comp/issues')}
	>
		bug_report
	</IconButton>
	<Tooltip yPos="above">{$_('cta.reportBug')}</Tooltip>
</Wrapper>
<Wrapper>
	<IconButton
		class="material-icons"
		aria-label={$_('cta.changeGameVersion')}
		style="color: var(--palette-info-main)"
		onclick={() => openChangeGameVersionDialog()}
	>
		extension
	</IconButton>
	<Tooltip yPos="above">{$_('cta.changeGameVersion')}</Tooltip>
</Wrapper>
