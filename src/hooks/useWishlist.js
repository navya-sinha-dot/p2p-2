import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    axios
      .get(`http://localhost:3001/wishlist/${user.id}`)
      .then((res) => {
        setWishlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [wishlist]);

  return wishlist;
};
