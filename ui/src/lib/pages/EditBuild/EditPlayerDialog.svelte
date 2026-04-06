<script lang="ts">
	import SegmentedButton, { Segment } from '@smui/segmented-button';
	import Dialog, { Actions, Content, Title } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import { _ } from 'svelte-i18n';
	import { GROUP_NONE, InviteStatus } from '$lib/consts';
	import Textfield from '@smui/textfield';
	import WarcraftIcon from '$lib/components/WarcraftIcon.svelte';
	import AttendanceIcon from '$lib/components/AttendanceIcon.svelte';
	import type { Build, BuildPlayer, GroupId } from '$lib/types';
	import type { VersionedContext } from '$lib/versioning/VersionedContext';
	import { currentlyEditingPlayerId, editingBuild } from '$lib/store';

	export let context: VersionedContext;
	export let open: boolean;

	let currentlyEditing: BuildPlayer | undefined;

	const groups: GroupId[] = [GROUP_NONE, 1, 2, 3, 4, 5, 6, 7, 8];
	const defaultClass = context.gameVersion.getClasses()[0];

	let build: Build | null;
	let playerName: string | null = null;
	let selectedClass: string | undefined = defaultClass.slug;
	let selectedSpec: string | undefined = undefined;
	let selectedStatus: string | undefined = InviteStatus.Invited;
	let selectedGroup: GroupId | undefined = GROUP_NONE;

	editingBuild.subscribe((b) => {
		build = b;
	});

	currentlyEditingPlayerId.subscribe((id) => {
		currentlyEditing = build?.players.find((p) => p.id === id);
		playerName = currentlyEditing?.name ?? null;
		selectedClass = currentlyEditing?.class.slug ?? defaultClass.slug;
		selectedSpec = currentlyEditing?.spec?.slug ?? undefined;
		selectedStatus = currentlyEditing?.status ?? InviteStatus.Invited;
		selectedGroup = currentlyEditing?.group ?? GROUP_NONE;
		open = !!id;
	});

	$: {
		if (!open) {
			currentlyEditingPlayerId.set(null);
		}
	}

	const reset = () => {
		playerName = null;
		selectedClass = defaultClass.slug;
		selectedSpec = undefined;
		selectedStatus = InviteStatus.Invited;
	};

	const handleSave = () => {
		editingBuild.update((build) => {
			if (build) {
				if (currentlyEditing) {
					build.players.splice(build.players.indexOf(currentlyEditing), 1);
				}
				build.players.push(
					context.gameVersion.createPlayer({
						name: playerName ?? '',
						class: context.gameVersion.getClassFromSlug(selectedClass).slug,
						spec: context.gameVersion.getSpecFromSlug(selectedSpec).slug,
						status: (selectedStatus as InviteStatus | null) ?? InviteStatus.Unknown,
						group: selectedGroup ?? GROUP_NONE,
					}),
				);
			}
			return build;
		});
		reset();
	};

	const handleRemove = () => {
		editingBuild.update((build) => {
			if (build && currentlyEditing) {
				build.players.splice(build.players.indexOf(currentlyEditing), 1);
			}
			return build;
		});
		reset();
	};

	const findPreselectedSpec = () => {
		selectedSpec = context.gameVersion
			.getSpecs()
			.filter((s) => s.playerClass.slug === selectedClass)[0].slug;
	};
</script>

<Dialog
	bind:open
	aria-labelledby="simple-title"
	aria-describedby="simple-content"
	surface$style="max-width: calc(100vw - 32px);"
>
	<Title id="simple-title">{$_('build.add.title')}</Title>
	<Content id="simple-content">
		<div class="content">
			<div class="input-wrapper">
				<Textfield
					label={$_('build.add.name')}
					type="text"
					bind:value={playerName}
					input$style="text-align: center; font-size: var(--spacing-m)"
					style="min-width: 250px; width: 100%"
				/>
			</div>
			<div class="class-wrapper">
				<SegmentedButton
					onchange={() => findPreselectedSpec()}
					bind:selected={selectedClass}
					segments={context.gameVersion.getClasses().map((c) => c.slug)}
					singleSelect
				>
					{#snippet segment(segment)}
						<Segment {segment} title={$_(`classes.${segment}`)}>
							<WarcraftIcon
								src={context.iconProvider.getSrc(
									context.gameVersion.getClassFromSlug(segment).icon,
								)}
							/>
						</Segment>
					{/snippet}
				</SegmentedButton>
			</div>
			<div class="spec-wrapper">
				<SegmentedButton
					bind:selected={selectedSpec}
					segments={context.gameVersion
						.getSpecs()
						.filter((s) => s.playerClass.slug === selectedClass)
						.map((s) => s.slug)}
					singleSelect
				>
					{#snippet segment(segment)}
						<Segment {segment} title={$_(`specs.${segment}`)}>
							<WarcraftIcon
								src={context.iconProvider.getSrc(context.gameVersion.getSpecFromSlug(segment).icon)}
							/>
						</Segment>
					{/snippet}
				</SegmentedButton>
			</div>
			<div class="status-wrapper">
				<SegmentedButton
					bind:selected={selectedStatus}
					segments={Object.values(InviteStatus)}
					singleSelect
				>
					{#snippet segment(segment)}
						<Segment {segment} title={$_(`status.${segment}`)}>
							<AttendanceIcon status={segment} />
						</Segment>
					{/snippet}
				</SegmentedButton>
			</div>
			<div class="status-wrapper">
				<SegmentedButton bind:selected={selectedGroup} segments={groups} singleSelect>
					{#snippet segment(segment)}
						<Segment {segment} title={$_(`build.groups.group_${segment}`)}>
							<Label style="color: var(--palette-text-primary);"
								>{$_(`build.add.groups.group_${segment}`)}</Label
							>
						</Segment>
					{/snippet}
				</SegmentedButton>
			</div>
		</div>
	</Content>
	<Actions>
		{#if currentlyEditing}
			<Button class="button-danger" onclick={() => handleRemove()}>
				<Label>{$_('buttons.remove')}</Label>
			</Button>
		{/if}
		<Button class="button-cancel">
			<Label>{$_('buttons.cancel')}</Label>
		</Button>
		<Button onclick={() => handleSave()} class="button-safe">
			<Label>{$_(currentlyEditing ? 'buttons.save' : 'buttons.add')}</Label>
		</Button>
	</Actions>
</Dialog>

<style>
	.content {
		display: grid;
		place-items: center;
	}

	.input-wrapper {
		width: 100%;
		text-align: center;
	}
</style>
