import { writable } from 'svelte/store';
import type { Field } from './types';

export const fields = writable<Field[]>([]);