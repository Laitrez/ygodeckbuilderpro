import { createSlice } from '@reduxjs/toolkit';

const deckSlice = createSlice({
  name: 'deck',
  initialState: {
    mainDeck: [],
    extraDeck: [],
  },
  reducers: {
    addCard: (state, action) => {
      const { card, isExtraDeck } = action.payload;

      const targetDeck = isExtraDeck ? state.extraDeck : state.mainDeck;
      const maxCards = isExtraDeck ? 15 : 60;

      // Vérifie la limite de 3 exemplaires et la taille du deck
      const cardCount = targetDeck.filter((c) => c.id === card.id).length;
      if (targetDeck.length < maxCards && cardCount < 3) {
        targetDeck.push(card);
      }
    },
    removeCard: (state, action) => {
      const { cardId, isExtraDeck } = action.payload;
      const targetDeck = isExtraDeck ? state.extraDeck : state.mainDeck;

      // Supprime une occurrence de la carte
      const index = targetDeck.findIndex((c) => c.id === cardId);
      if (index !== -1) targetDeck.splice(index, 1);
    },
    clearDeck: (state) => {
      state.mainDeck = [];
      state.extraDeck = [];
    },
  },
});

export const { addCard, removeCard, clearDeck } = deckSlice.actions;
export default deckSlice.reducer;
