import { writable } from 'svelte/store';

export const actions = writable<string|null>(null);