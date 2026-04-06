<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Tooltip, { Wrapper } from '@smui/tooltip';
	import IconButton from '@smui/icon-button';

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
		class="material-icons"
		aria-label={$_('cta.changeViewMode')}
		style="color: var(--palette-info-main)"
		onclick={() => toggleGrouped()}
	>
		grid_view
	</IconButton>
	<Tooltip yPos="above">{$_('cta.changeViewMode')}</Tooltip>
</Wrapper>
<Wrapper>
	<IconButton
		class="material-icons"
		aria-label={$_('cta.saveBuild')}
		style="color: var(--palette-success-main)"
		onclick={() => openSaveBuildDialog()}
	>
		save
	</IconButton>
	<Tooltip yPos="above">{$_('cta.saveBuild')}</Tooltip>
</Wrapper>
