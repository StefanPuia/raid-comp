import { writable } from 'svelte/store';
import type { Build } from '#lib/types.ts';

export const currentlyEditingPlayerId = writable<string | null>();
export const editingBuild = writable<Build | null>();
