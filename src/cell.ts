import { onUnmounted, ref, type UnwrapRef } from "vue";

import type { AnyCell } from "@okcontract/cells";

export const useCell = <T>(cell: AnyCell<T>) => {
	const state = ref(undefined as undefined | T);
	const unsubscribe = cell.subscribe((value) => {
		if (!(value instanceof Error)) state.value = value as UnwrapRef<T>;
	});
	onUnmounted(() => {
		unsubscribe();
	});
	return state;
};
