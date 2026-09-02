import React, { createContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Likes } from '../API/Likes';

export const FavoritesContext = createContext();

const FAVORITES_KEY = 'favorites';

const sameId = (a, b) => String(a) === String(b);

const readLocalFavorites = () => {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => readLocalFavorites());
  const [loading, setLoading] = useState(true);
  const skipNextSync = useRef(true);

  useEffect(() => {
    const loadFavorites = async () => {
      const local = readLocalFavorites();
      try {
        const { data } = await axios.get(Likes);
        const serverItems = Array.isArray(data) ? data : [];
        if (local.length > 0) {
          setFavorites(local);
          await Promise.all(local.map((item) => axios.post(Likes, item).catch(() => {})));
        } else if (serverItems.length > 0) {
          setFavorites(serverItems);
          localStorage.setItem(FAVORITES_KEY, JSON.stringify(serverItems));
        }
      } catch {
        setFavorites(local);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

    if (loading) return;

    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }

    const sync = async () => {
      try {
        const { data } = await axios.get(Likes);
        const serverItems = Array.isArray(data) ? data : [];
        await Promise.all(
          serverItems.map((item) => axios.delete(`${Likes}/${item.id}`).catch(() => {}))
        );
        await Promise.all(favorites.map((item) => axios.post(Likes, item).catch(() => {})));
      } catch {
      }
    };

    const timer = setTimeout(sync, 250);
    return () => clearTimeout(timer);
  }, [favorites, loading]);

  const addToFavorites = (product) => {
    if (!product) return;
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.find((item) => sameId(item.id, product.id));
      if (exists) return prevFavorites;
      return [...prevFavorites, product];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => !sameId(item.id, productId))
    );
  };

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.find((item) => sameId(item.id, product.id));
      if (exists) {
        return prevFavorites.filter((item) => !sameId(item.id, product.id));
      }
      return [...prevFavorites, product];
    });
  };

  const isFavorited = (productId) => {
    return favorites.some((item) => sameId(item.id, productId));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorited,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
