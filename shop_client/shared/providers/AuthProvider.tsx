"use client";
import { getMe, refresh } from "../api";
import { setUser } from "@/store/user/user.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await getMe();

        dispatch(setUser(res.data));
      } catch {
        try {
          const user = await refresh();

          dispatch(setUser(user.data));
        } catch {}
      }
    };

    initAuth();
  }, [dispatch]);

  return children;
};
