import { timeout } from 'shared';
import { reactive, ref, shallowRef } from 'vue';
import { createEventHook, EventHookOn } from '@vueuse/core';

export interface UsePromiseStateRetrun<TResult, TError, TPayload> {
  isReady: boolean;
  isLoading: boolean;
  counter: number;
  startTime: number;
  endTime: number;
  state: TResult;
  error: TError;
  onError: EventHookOn<TError>;
  execute: (delay?: number, payload?: TPayload) => Promise<TResult>;
}

export function usePromiseState<TResult, TError = unknown, TPayload = any>(
  promise: (payload?: any) => Promise<TResult>,
  onError?: (e: TError) => void,
): UsePromiseStateRetrun<TResult, TError, TPayload> {
  const isReady = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const counter = ref<number>(0);
  const startTime = ref<number>(undefined);
  const endTime = ref<number>(undefined);

  const state = shallowRef<TResult>(undefined);
  const error = shallowRef<TError>(undefined);

  const errorEvent = createEventHook<TError>();
  if (onError) errorEvent.on(onError);

  async function execute(delay?: number, payload?: TPayload): Promise<TResult> {
    isReady.value = false;
    isLoading.value = true;
    startTime.value = Date.now();
    endTime.value = undefined;
    error.value = undefined;

    try {
      if (delay > 0) await timeout(delay);

      const data = await promise(payload);
      state.value = data;
      isReady.value = true;
      counter.value++;
    } catch (e) {
      error.value = e as TError;
      errorEvent.trigger(error.value);
    } finally {
      isLoading.value = false;
      endTime.value = Date.now();
    }

    return state.value;
  }

  return reactive({
    isReady,
    isLoading,
    counter,
    startTime,
    endTime,
    state,
    error,
    onError: errorEvent.on,
    execute,
  });
}
