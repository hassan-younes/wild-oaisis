/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {useLocalStorageState} from "../hooks/useLocalStorageState";
import { createContext, useContext, useEffect } from "react";

const DarkModeContext = createContext();

 function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(true, "isDarkMode");

useEffect(()=>{
  
  if(isDarkMode) document.documentElement.classList.add("dark-mode")
   else document.documentElement.classList.remove("dark-mode")
  },[isDarkMode])

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
function useDarkMode(){
  const context= useContext(DarkModeContext)
  if(context===undefined) throw new Error("DarkModeContext was used outside of DarkModeProvider")
    return context
}

export { DarkModeProvider,useDarkMode}
