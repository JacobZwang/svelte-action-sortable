<script lang="ts">
	import { writable } from 'svelte/store';
	import createSortable from '$lib/actions/sortable';
	import { flip } from 'svelte/animate';

	const list = writable(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
	const [sortable, target] = createSortable(list);
</script>

<div class="grid gap-2 max-w-sm mx-auto mt-2" use:sortable>
	{#each $list as item (item)}
		<div
			animate:flip
			class="cursor-pointer text-center p-2 select-none bg-gray-200 rounded-sm"
			use:target={item}
		>
			{item}
		</div>
	{/each}
</div>
