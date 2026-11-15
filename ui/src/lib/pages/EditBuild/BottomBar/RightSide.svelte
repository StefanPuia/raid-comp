<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Tooltip, { Label, Wrapper } from '@smui/tooltip';
	import IconButton, { Icon } from '@smui/icon-button';

	export let toggleGrouped: () => void;
	export let openSaveBuildDialog: () => void;
</script>

<!--<Wrapper>-->
<!--	<IconButton-->
<!--		class="material-icons"-->
<!--		aria-label={$_('cta.importBuild')}-->
<!--		style="color: var(&#45;&#45;palette-warning-light)"-->
<!--	>-->
<!--		system_update_alt-->
<!--	</IconButton>-->
<!--	<Tooltip yPos="above">{$_('cta.importBuild')}</Tooltip>-->
<!--</Wrapper>-->
<Wrapper>
	<IconButton
		aria-label={$_('cta.changeViewMode')}
		style="color: var(--palette-info-main)"
		onclick={() => toggleGrouped()}
	>
		<Icon class="material-icons">grid_view</Icon>
	</IconButton>
	<Tooltip yPos="above"><Label>{$_('cta.changeViewMode')}</Label></Tooltip>
</Wrapper>
<Wrapper>
	<IconButton
		aria-label={$_('cta.saveBuild')}
		style="color: var(--palette-success-main)"
		onclick={() => openSaveBuildDialog()}
	>
		<Icon class="material-icons">save</Icon>
	</IconButton>
	<Tooltip yPos="above"><Label>{$_('cta.saveBuild')}</Label></Tooltip>
</Wrapper>
