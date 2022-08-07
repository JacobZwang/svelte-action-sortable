<script lang="ts">
	import { writable } from 'svelte/store';
	import createSortable from '$lib/actions/sortable';
	import { flip } from 'svelte/animate';
	import { HighlightAuto } from 'svelte-highlight';
	import example from './_Example.svelte?raw';
	import github from 'svelte-highlight/styles/github';

	const list = writable(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
	const [sortable, target] = createSortable(list);
</script>

<svelte:head>
	{@html github}
</svelte:head>

<div class="grid md:grid-cols-2 gap-4 p-8">
	<div>
		<h1 class="text-3xl">Svelte Sortable Action</h1>

		<p>Minimal Svelte action to add drag and drop sorting to a list.</p>
	</div>

	<div class="flex justify-end">
		<p>
			By <a class="text-blue-500" href="https://zwa.ng" target="_blank">Jacob Zwang</a>
		</p>
	</div>

	<div class="border-solid border-2 rounded-md overflow-scroll">
		<HighlightAuto code={example} />
	</div>

	<div class="grid gap-2 w-full" use:sortable>
		{#each $list as item (item)}
			<div
				animate:flip={{ duration: 500 }}
				class="cursor-pointer hover:bg-blue-200 active:bg-blue-300 text-center p-2 select-none bg-gray-200 rounded-md"
				use:target={item}
			>
				{item}
			</div>
		{/each}
	</div>

	<div>
		<h2 class="text-2xl">Why?</h2>
		Existing libraries such as
		<a
			class="text-blue-500"
			href="https://github.com/brunomolteni/svelte-sortable-list"
			target="_blank"
		>
			svelte-sortable-list</a
		> use extra dom nodes and require resturcturing your markup. svelte-action-sortable only uses 1 single
		dom node to indicate where the item will be moved to and does not require you to change your markup
		at all.
	</div>
</div>
