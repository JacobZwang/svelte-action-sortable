<script lang="ts">
	import { writable } from 'svelte/store';
	import { flip } from 'svelte/animate';
	import createSortable from '$lib/actions/sortable';

	const list = writable(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
	const [sortable, target] = createSortable(list);
</script>

<div use:sortable>
	{#each $list as item (item)}
		<div animate:flip use:target={item}>
			{item}
		</div>
	{/each}
</div>
