import { useState, useEffect } from "react";
import { Search, X } from "lucide-react"; // icons
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { searchTasks } from "../taskSlice";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState(query);

  const dispatch = useDispatch<AppDispatch>();

  // debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(query);
    }, 500);

    return () => {
      clearTimeout(handler); // cleanup timeout on query change
    };
  }, [query]);

  // fire redux dispatch when debounced value changes
  useEffect(() => {
    dispatch(searchTasks({ searchTerm: debounced }));
  }, [debounced, dispatch]);

  return (
    <div className="flex items-center gap-2 border rounded-2xl px-3 py-2 shadow-sm w-full max-w-md">
      <Search className="text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="flex-1 outline-none bg-transparent"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
