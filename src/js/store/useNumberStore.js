import { create } from "zustand";

const useNumberStore = create((set) => ({
  number: 42,
  increase: () => set((state) => ({ number: state.number + 1 })),
  decrease: () => set((state) => ({ number: state.number - 1 })),
  setNumber: (newNumber) => set({ number: newNumber }),
}));

export default useNumberStore;
