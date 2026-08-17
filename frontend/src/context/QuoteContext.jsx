import { createContext, useCallback, useContext, useMemo, useState } from "react";
import QuoteModal from "@/components/QuoteModal";

const QuoteContext = createContext(null);

export const useQuote = () => useContext(QuoteContext);

export function QuoteProvider({ children }) {
  const [state, setState] = useState({ open: false, context: "general" });

  const openQuote = useCallback((context = "general") => {
    setState({ open: true, context });
  }, []);
  const closeQuote = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  const value = useMemo(
    () => ({ ...state, openQuote, closeQuote }),
    [state, openQuote, closeQuote],
  );

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteModal />
    </QuoteContext.Provider>
  );
}
