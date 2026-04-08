<script lang="ts">
	import { _ } from 'svelte-i18n';
	import BottomAppBar, { Section } from '@smui-extra/bottom-app-bar';
	import Tooltip, { Wrapper } from '@smui/tooltip';
	import IconButton from '@smui/icon-button';
	import type { Build } from '$lib/types';

	export let build: Build;
	export let grouped: boolean | undefined;
</script>

<BottomAppBar variant="static" color="secondary">
	<Section>
		<Wrapper>
			<IconButton
				class="material-icons"
				aria-label={$_('cta.reportBug')}
				style="color: var(--palette-warning-main)"
				onclick={() => window.open('https://github.com/StefanPuia/raid-comp/issues', '_blank')}
			>
				bug_report
			</IconButton>
			<Tooltip yPos="above">{$_('cta.reportBug')}</Tooltip>
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
				class="material-icons"
				aria-label={$_('cta.newBuild')}
				style="color: var(--palette-success-main)"
				href="/build"
				data-sveltekit-reload
			>
				add_box
			</IconButton>
			<Tooltip yPos="above">{$_('cta.newBuild')}</Tooltip>
		</Wrapper>
		<Wrapper>
			<IconButton
				class="material-icons"
				aria-label={$_('cta.editBuild')}
				style="color: var(--palette-info-main)"
				href="/build/{build.buildId}/edit"
			>
				edit
			</IconButton>
			<Tooltip yPos="above">{$_('cta.editBuild')}</Tooltip>
		</Wrapper>
		<Wrapper>
			<IconButton
				class="material-icons"
				aria-label={$_('cta.changeViewMode')}
				style="color: var(--palette-info-main)"
				href={'/build' + (grouped ? '/' : '/g/') + build.buildId}
			>
				grid_view
			</IconButton>
			<Tooltip yPos="above">{$_('cta.changeViewMode')}</Tooltip>
		</Wrapper>
	</Section>
</BottomAppBar>
