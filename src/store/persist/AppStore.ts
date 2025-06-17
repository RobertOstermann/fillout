import type { PersistStoreStateCreate } from "@/store/PersistStore";

export type AppState = {
  app: {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
  };
};

export const AppStore: PersistStoreStateCreate<AppState> = (set) => ({
  app: {
    sidebarOpen: true,
    setSidebarOpen: (open) =>
      set((state) => {
        state.app.sidebarOpen = open;
      }),
  },
});
