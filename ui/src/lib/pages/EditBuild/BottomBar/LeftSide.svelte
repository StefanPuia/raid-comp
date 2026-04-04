<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Tooltip, { Wrapper } from '@smui/tooltip/src/index.js';
	import IconButton from '@smui/icon-button/src/index.js';

	export let openResetBuildDialog: () => void;
	export let openChangeGameVersionDialog: () => void;
</script>

<Wrapper>
	<IconButton
		class="material-icons"
		aria-label={$_('cta.resetBuild')}
		style="color: var(--palette-error-main)"
		on:click={() => openResetBuildDialog()}
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
		on:click={() => window.open('https://github.com/StefanPuia/raid-comp/issues')}
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
		on:click={() => openChangeGameVersionDialog()}
	>
		extension
	</IconButton>
	<Tooltip yPos="above">{$_('cta.changeGameVersion')}</Tooltip>
</Wrapper>
