import { create } from "zustand";

const useRingStore = create((set) => ({
  metal: "gold",
  stone: "round",

  setMetal: (metal) => set({ metal }),
  setStone: (stone) => set({ stone }),
}));

export default useRingStore;