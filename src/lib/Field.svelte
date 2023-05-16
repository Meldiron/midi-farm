<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { actions } from './actions';
	import { coins } from './coins';
	import type { Field } from './types';

	export let field: Field;

	let waterTimeout: any = null;
	let waterStart = Date.now();

	let isAnimating = false;
	let animateTimeout: any = null;

	let tick = 0;

	$: {
		if ($actions === field.id) {
			onAction();
		}
	}

	$: {
		if (isAnimating === true) {
			if (!animateTimeout) {
				animateTimeout = setTimeout(() => {
					isAnimating = false;
					animateTimeout = null;
				}, 300);
			}
		}
	}

	onMount(() => {
		if (browser) {
			setInterval(() => {
				tick++;

				if (field.level >= 1 && !field.needsWater && waterTimeout === null) {
					const isAction = Math.random() < 0.2;

					if (isAction) {
						field.needsWater = true;
						waterStart = Date.now();
						waterTimeout = setTimeout(() => {
							field.needsWater = false;
							field.died = true;
							field.level = 0;
						}, 10000);
					}
				}
			}, 1000);
		}
	});

	function onAction() {
		isAnimating = true;

		if (field.died) {
			if ($coins >= 5) {
				$coins -= 5;
				field.died = false;
			} else {
				isAnimating = false;
			}
			return;
		}

		if (field.level === 0) {
			field.died = true;
			return;
		}

		if (field.needsWater) {
			if (waterTimeout !== null) {
				clearTimeout(waterTimeout);
				waterTimeout = null;
			}

			field.needsWater = false;
			field.level++;

			if (field.level >= 5) {
				field.level = 0;
				$coins += 20;
			}

			return;
		}

		field.died = true;
		field.level = 0;
	}
</script>

<div
	class={`relative col-span-1 row-span-1 ${isAnimating ? 'animate-click' : ''}`}
>
	<img
		class="object-cover w-full h-full rounded-xl"
		src={field.needsWater ? '/water.svg' : field.died ? '/dead.svg' : 'dirt.svg'}
		alt="Field"
	/>

	{#if field.level > 0}
		<div class="absolute inset-0">
			<img class="object-cover w-full h-full" src={`/level${field.level}.svg`} alt="Field" />
		</div>
	{/if}

	{#key tick}
		{#if field.needsWater}
			<div class="absolute w-full left-0 bottom-[-8px] flex items-center justify-center">
				<p class="rounded-full bg-[#a1843f] text-white text-xs font-bold py-1 px-3">
					{10 - Math.round(Math.abs(Date.now() - waterStart) / 1000)}
				</p>
			</div>
		{/if}
	{/key}
		</div>
