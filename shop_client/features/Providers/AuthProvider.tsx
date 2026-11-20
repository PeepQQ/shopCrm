"use client";
import { getMe, refresh } from "../../shared/api";
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
          await refresh();
          const res = await getMe();

          dispatch(setUser(res.data));
        } catch {}
      }
    };

    initAuth();
  }, [dispatch]);

  return children;
};
