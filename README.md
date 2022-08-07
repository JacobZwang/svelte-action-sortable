# svelte-action-sortable
Minimal Svelte action to add drag and drop sorting to a list.

```svelte
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
```

## Why?
Existing libraries such as [svelte-sortable-list](https://github.com/brunomolteni/) use extra dom nodes and require resturcturing your markup. svelte-action-sortable only uses 1 single dom node to indicate where the item will be moved to and does not require you to change your markup at all.