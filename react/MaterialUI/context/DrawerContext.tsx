import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useMediaQuery, useTheme } from "@mui/material";

export interface DrawerContextData {
  drawerOpen: boolean;
  toggleDrawerOpen: (open?: any) => void;
}

const DrawerContext = createContext<DrawerContextData | undefined>(undefined);

export const DrawerContextProvider: React.FC = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawerOpen: DrawerContextData["toggleDrawerOpen"] = useCallback(
    (open) => {
      const newState =
        typeof open === "boolean" && open !== undefined ? open : !drawerOpen;
      setDrawerOpen(newState);
    },
    [setDrawerOpen, drawerOpen]
  );

  const theme = useTheme();
  const isNotSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const screenSize = useRef(isNotSmall);

  useEffect(() => {
    // If the screen is adjusted, toggle to default closed for mobile, open for desktop
    if (screenSize.current !== isNotSmall) {
      if (isNotSmall) {
        setDrawerOpen(true);
      } else {
        setDrawerOpen(false);
      }

      screenSize.current = isNotSmall;
    }
  }, [isNotSmall]);

  const providerData = useMemo<DrawerContextData>(
    () => ({
      drawerOpen,
      toggleDrawerOpen,
    }),
    [toggleDrawerOpen, drawerOpen]
  );

  return (
    <DrawerContext.Provider value={providerData}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = (): DrawerContextData => {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error(
      "useDrawerContext may only be used in a descendant of DrawerContextProvider"
    );
  }

  return ctx;
};
