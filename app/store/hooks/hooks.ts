import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, AppStore, RootState } from "../store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";
import { TLoginFormInputs } from "@/app/types/types";

// Хук для отслеживания ошибки ввода логин формы
export function useErrorStatus(errors: FieldErrors<TLoginFormInputs>) {
  const [statusNameError, setStatusNameError] = useState(false);

  useEffect(() => {
    setStatusNameError(true);
  }, [errors.name]);
  return {
    statusNameError,
    setStatusNameError,
  };
}

// Хук для получения текущего пути
export const useAppPathName = (): string => {
  return usePathname();
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
