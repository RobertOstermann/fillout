import { mergeDeepLeft } from "ramda";
import type { StateCreator } from "zustand";
import { create } from "zustand";
import type { PersistOptions } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { AppState } from "@/store/persist/AppStore";
import { AppStore } from "@/store/persist/AppStore";

export type PersistStoreState = AppState;

export type PersistStoreStateCreate<T> = StateCreator<
  PersistStoreState,
  [["zustand/persist", unknown], ["zustand/immer", never]],
  [],
  T
>;

export const ZUSTAND_CLIENT_KEY = "StatTracker_Zustand_Cache";

const options: PersistOptions<PersistStoreState> = {
  name: ZUSTAND_CLIENT_KEY,
  // By default this is a shallow merge.
  // A deep merge allows for nested methods, but is 15 times slower than a shallow merge.
  merge: (persistedState: any, currentState: PersistStoreState) =>
    mergeDeepLeft(persistedState, currentState),
  version: 1,
};

export const usePersistStore = create<PersistStoreState>()(
  persist(
    immer((...props) => ({
      ...AppStore(...props),
    })),
    options,
  ),
);
