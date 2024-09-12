import { createContext, useContext, useEffect, useState } from "react";
import { products } from "@/mock/products";

const SearchContext = createContext();
export const useSearchContext = () => useContext(SearchContext)