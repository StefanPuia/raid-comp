<script lang="ts">
	import { _ } from 'svelte-i18n';
	import BottomAppBar, { Section } from '@smui-extra/bottom-app-bar';
	import Tooltip, { Label, Wrapper } from '@smui/tooltip';
	import IconButton, { Icon } from '@smui/icon-button';
	import type { Build } from '#lib/types.ts';

	export let build: Build;
	export let grouped: boolean | undefined;
</script>

<BottomAppBar variant="static" color="secondary">
	<Section>
		<Wrapper>
			<IconButton
				aria-label={$_('cta.reportBug')}
				style="color: var(--palette-warning-main)"
				onclick={() => window.open('https://github.com/StefanPuia/raid-comp/issues', '_blank')}
			>
				<Icon class="material-icons">bug_report</Icon>
			</IconButton>
			<Tooltip yPos="above"><Label>{$_('cta.reportBug')}</Label></Tooltip>
		</Wrapper>
		<!--    <Wrapper>-->
		<!--      <IconButton class="material-icons" aria-label="{$_('cta.exportBuild')}"-->
		<!--                  style="color: var(&#45;&#45;palette-info-main)">-->
		<!--        file_upload-->
		<!--      </IconButton>-->
		<!--      <Tooltip yPos="above">{$_("cta.exportBuild")}</Tooltip>-->
		<!--    </Wrapper>-->
	</Section>
	<Section></Section>
	<Section>
		<Wrapper>
			<IconButton
				aria-label={$_('cta.newBuild')}
				style="color: var(--palette-success-main)"
				href="/build"
				data-sveltekit-reload
			>
				<Icon class="material-icons">add_box</Icon>
			</IconButton>
			<Tooltip yPos="above"><Label>{$_('cta.newBuild')}</Label></Tooltip>
		</Wrapper>
		<Wrapper>
			<IconButton
				aria-label={$_('cta.editBuild')}
				style="color: var(--palette-info-main)"
				href="/build/{build.buildId}/edit"
			>
				<Icon class="material-icons">edit</Icon>
			</IconButton>
			<Tooltip yPos="above"><Label>{$_('cta.editBuild')}</Label></Tooltip>
		</Wrapper>
		<Wrapper>
			<IconButton
				aria-label={$_('cta.changeViewMode')}
				style="color: var(--palette-info-main)"
				href={'/build' + (grouped ? '/' : '/g/') + build.buildId}
			>
				<Icon class="material-icons">grid_view</Icon>
			</IconButton>
			<Tooltip yPos="above"><Label>{$_('cta.changeViewMode')}</Label></Tooltip>
		</Wrapper>
	</Section>
</BottomAppBar>
