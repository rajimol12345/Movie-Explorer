import React, { createContext, useReducer, useContext, useEffect } from "react";

// --- Contexts ---
const FavoritesContext = createContext();
const FavoritesDispatchContext = createContext();

// --- Initial State ---
const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

// --- Reducer Function ---
function favoritesReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE": {
      // Prevent duplicate favorites
      if (state.favorites.some((m) => m.id === action.payload.id)) {
        return state;
      }
      const updated = [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return { favorites: updated };
    }

    case "REMOVE_FAVORITE": {
      const filtered = state.favorites.filter((m) => m.id !== action.payload.id);
      localStorage.setItem("favorites", JSON.stringify(filtered));
      return { favorites: filtered };
    }

    default:
      return state;
  }
}

// --- Provider Component ---
export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Optional: keep localStorage synced on every change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  return (
    <FavoritesContext.Provider value={state}>
      <FavoritesDispatchContext.Provider value={dispatch}>
        {children}
      </FavoritesDispatchContext.Provider>
    </FavoritesContext.Provider>
  );
}

// --- Custom Hooks ---
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
}

export function useFavoritesDispatch() {
  const context = useContext(FavoritesDispatchContext);
  if (!context)
    throw new Error("useFavoritesDispatch must be used within a FavoritesProvider");
  return context;
}
