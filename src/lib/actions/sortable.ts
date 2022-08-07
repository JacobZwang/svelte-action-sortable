import { browser } from '$app/env';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';

export default function createSortable<T>(list: Writable<T[]>) {
	let itemMoving: T | undefined;
	let itemOver: T | undefined;
	let separator: HTMLHRElement;

	const nodes: Map<T, HTMLElement> = new Map();

	function clearSeparator() {
		if (document.body.contains(separator)) document.body.removeChild(separator);
	}

	if (browser) {
		document.head.appendChild(document.createElement('style'));
		separator = document.createElement('hr');
	}

	return [
		function sortable(node: HTMLElement): SvelteActionReturnType {
			node.addEventListener('mouseleave', () => {
				itemMoving = undefined;
				clearSeparator();
			});

			node.addEventListener('mouseup', () => {
				clearSeparator();
				if (!itemMoving) return;
				list.update((list) => {
					const fromIndex = list.indexOf(itemMoving);
					list.splice(fromIndex, 1);
					list.splice(itemMoving !== itemOver ? list.indexOf(itemOver) : fromIndex, 0, itemMoving);
					return list;
				});
				itemMoving = undefined;
			});
		},
		function target(node: HTMLElement, item: T): SvelteActionReturnType {
			nodes.set(item, node);
			node.addEventListener('mousedown', () => {
				itemMoving = item;
			});

			node.addEventListener('mouseover', () => {
				itemOver = item;

				clearSeparator();

				if (itemMoving) {
					const rectBelow = node.getBoundingClientRect();
					const rectAbove = nodes
						.get(get(list)[get(list).indexOf(item) - 1])
						?.getBoundingClientRect() ?? {
						bottom: rectBelow.top - 4
					};

					separator.style.position = 'fixed';
					separator.style.borderRadius = '4px';
					separator.style.border = '0';
					separator.style.borderTop = '4px solid';
					separator.style.borderColor = item === itemMoving ? 'gray' : 'black';
					separator.style.pointerEvents = 'none';
					separator.style.boxSizing = 'border-box';
					separator.style.top = `${rectAbove.bottom + (rectBelow.top - rectAbove.bottom) / 2}px`;
					separator.style.transform = 'translateY(-50%)';
					separator.style.width = `${rectAbove.width}px`;
					separator.style.left = `${rectAbove.left}px`;
					document.body.appendChild(separator);
				}
			});

			return {
				destroy() {
					nodes.delete(item);
				}
			};
		}
	] as const;
}
