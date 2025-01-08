import { create } from 'zustand';

const useCaptainStore = create((set) => ({
  captain: null,
  isLoading: false,
  error: null,
  setCaptain: (captainData) => set({ captain: captainData }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  updateCaptain: (captainData) => set({ captain: captainData }),
}));

export default useCaptainStore;