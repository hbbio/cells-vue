import { onUnmounted, ref, type UnwrapRef } from "vue";

import type { AnyCell } from "@okcontract/cells";

export const useCell = <T>(cell: AnyCell<T>) => {
	const state = ref(undefined as undefined | T);
	onUnmounted(
		cell.subscribe((value) => {
			if (value instanceof Error)
				// @todo integrate error management with Vue?
				console.log(`error in cell[${cell.id}]: ${value}`);
			else state.value = value as UnwrapRef<T>;
		}),
	);
	return state;
};
