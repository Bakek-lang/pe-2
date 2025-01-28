import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNumberStore = create(
  persist(
    (set) => ({
      number: 42,
      increase: () => set((state) => ({ number: state.number + 1 })),
      decrease: () => set((state) => ({ number: state.number - 1 })),
      setNumber: (newNumber) => set({ number: newNumber }),
    }),
    {
      name: "numberStorage",
    }
  )
);

export default useNumberStore;
