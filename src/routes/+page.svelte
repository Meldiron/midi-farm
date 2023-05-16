<script lang="ts">
	import { browser } from '$app/environment';
	import { actions } from '$lib/actions';
	import { coins } from '$lib/coins';
	import Field from '$lib/Field.svelte';
	import { fields } from '$lib/fields';
	import { onMount } from 'svelte';

	const max = 4;
	for (let x = 0; x < max; x++) {
		for (let y = 0; y < max; y++) {
			$fields = [
				...$fields,
				{
					id: `${y}_${x}`,
					died: false,
					needsWater: false,
					level: 0
				}
			];
		}
	}

	let gameStarted = false;
	let error = '';

	let currentY = 0;

	let downKeys: string[] = [];

	onMount(() => {
		if (browser) {
			connect();
		}
	});

	async function connect() {
		try {
			await WebMidi.enable();

			WebMidi.inputs[0].addListener('noteon', (e: any) => {
				if (!downKeys.includes(e.note.identifier)) {
					downKeys = [...downKeys, e.note.identifier];
				}
				if (e.note.accidental && e.note.name === 'C') {
					const canPlant = $coins >= 10;

					const allowedFields = $fields.filter((f) => f.died === false && f.level === 0);

					if (canPlant && allowedFields.length > 0) {
						const field = allowedFields[Math.floor(Math.random() * allowedFields.length)];
						field.level = 1;
						$coins -= 10;
					}
					return;
				}

				if (e.note.accidental) {
					return;
				}

				if (e.note.octave === 3) {
					if (e.note.name === 'C') {
						currentY = 0;
					} else if (e.note.name === 'D') {
						currentY = 1;
					} else if (e.note.name === 'E') {
						currentY = 2;
					} else if (e.note.name === 'F') {
						currentY = 3;
					} else if (e.note.name === 'G') {
						currentY = 4;
					} else if (e.note.name === 'A') {
						currentY = 5;
					} else if (e.note.name === 'B') {
						currentY = 6;
					}
				} else if (e.note.octave === 4) {
					setTimeout(() => {
						let currentX = 0;

						if (e.note.name === 'C') {
							currentX = 0;
						} else if (e.note.name === 'D') {
							currentX = 1;
						} else if (e.note.name === 'E') {
							currentX = 2;
						} else if (e.note.name === 'F') {
							currentX = 3;
						} else if (e.note.name === 'G') {
							currentX = 4;
						} else if (e.note.name === 'A') {
							currentX = 5;
						} else if (e.note.name === 'B') {
							currentX = 6;
						}

						$actions = `${currentX}_${currentY}`;
					}, 100);
				}
			});

			WebMidi.inputs[0].addListener('noteoff', (e: any) => {
				if (downKeys.includes(e.note.identifier)) {
					downKeys = downKeys.filter((key) => key !== e.note.identifier);
				}

				if (e.note.accidental) {
					return;
				}

				if (e.note.octave === 3) {
					currentY = 0;
				} else if (e.note.octave === 4) {
					$actions = '';
				}
			});

			gameStarted = true;
		} catch (err: any) {
			error = err.message;
		}
	}
</script>

{#if gameStarted}
	<div class="relative">
		<div class="absolute right-[100%] top-[56px] h-[calc(100%-56px)]">
			<div class="h-full mr-2 grid grid-rows-4 text-white text-2xl text-center font-bold gap-4">
				<div class={`${downKeys.includes('C3') ? 'bg-[#84c273]' : ''} p-2 rounded-xl relative row-span-1 gap-1 flex items-center justify-center`}>
					C<span class="text-lg text-white/50">3</span>
				</div>
				<div class={`${downKeys.includes('D3') ? 'bg-[#84c273]' : ''} p-2 rounded-xl relative row-span-1 gap-1 flex items-center justify-center`}>
					D<span class="text-lg text-white/50">3</span>
				</div>
				<div class={`${downKeys.includes('E3') ? 'bg-[#84c273]' : ''} p-2 rounded-xl relative row-span-1 gap-1 flex items-center justify-center`}>
					E<span class="text-lg text-white/50">3</span>
				</div>
				<div class={`${downKeys.includes('F3') ? 'bg-[#84c273]' : ''} p-2 rounded-xl relative row-span-1 gap-1 flex items-center justify-center`}>
					F<span class="text-lg text-white/50">3</span>
				</div>
			</div>
		</div>

		<div class="mb-2 grid grid-cols-4 text-white text-2xl text-center font-bold gap-4">
			<div class={`${downKeys.includes('C4') ? 'bg-[#84c273]' : ''} p-2 rounded-xl relative row-span-1 gap-1 flex items-center justify-center`}>
				C<span class="text-lg text-white/50">4</span>
			</div>
			<div class={`${downKeys.includes('D4') ? 'bg-[#84c273]' : ''} p-2 rounded-xl relative row-span-1 gap-1 flex items-center justify-center`}>
				D<span class="text-lg text-white/50">4</span>
			</div>
			<div class={`${downKeys.includes('E4') ? 'bg-[#84c273]' : ''} p-2 rounded-xl relative row-span-1 gap-1 flex items-center justify-center`}>
				E<span class="text-lg text-white/50">4</span>
			</div>
			<div class={`${downKeys.includes('F4') ? 'bg-[#84c273]' : ''} p-2 rounded-xl relative row-span-1 gap-1 flex items-center justify-center`}>
				F<span class="text-lg text-white/50">4</span>
			</div>
		</div>

		<div
			class="grid grid-cols-4 grid-rows-4 border-[1rem] rounded-xl bg-[#6D5720] border-[#6D5720] gap-4"
		>
			{#each $fields as field}
				<Field {field} />
			{/each}
		</div>
	</div>
{:else}
	<button class="text-white/75 bg-white/10 px-6 py-2 rounded-md" on:click={connect}
		>Play Game</button
	>
	{#if error}
		<p class="text-white text-center">{error}</p>
	{/if}
{/if}
