<script>
	import { coins } from '$lib/coins';
	import '../app.css';
</script>

<div class="mx-auto p-4 max-w-4xl w-full flex flex-col gap-6">
	<div class="flex flex-col md:flex-row gap-6 items-center justify-between">
		<header class="flex gap-2 flex-wrap">
			<button class="text-white/75 bg-white/10 px-6 py-2 rounded-md">Garden</button>
			<button class="text-white/75 bg-white/10 px-6 py-2 rounded-md">Shop</button>
			<button class="text-white/75 bg-white/10 px-6 py-2 rounded-md">Leaderboards</button>
			<button class="text-white/75 bg-white/10 px-6 py-2 rounded-md">How to Play</button>
		</header>

		<div class="flex items-center gap-1 items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="w-6 h-6 text-[#438830]"
			>
				<path
					fill-rule="evenodd"
					d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.902 7.098a3.75 3.75 0 013.903-.884.75.75 0 10.498-1.415A5.25 5.25 0 008.005 9.75H7.5a.75.75 0 000 1.5h.054a5.281 5.281 0 000 1.5H7.5a.75.75 0 000 1.5h.505a5.25 5.25 0 006.494 2.701.75.75 0 00-.498-1.415 3.75 3.75 0 01-4.252-1.286h3.001a.75.75 0 000-1.5H9.075a3.77 3.77 0 010-1.5h3.675a.75.75 0 000-1.5h-3c.105-.14.221-.274.348-.402z"
					clip-rule="evenodd"
				/>
			</svg>

			<h1 class="text-[#224e16] font-bold text-3xl">{$coins}</h1>
		</div>
	</div>
	<slot />
</div>
