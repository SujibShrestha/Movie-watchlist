import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface SearchButtonProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchButton({ placeholder = "Search...", onSearch }: SearchButtonProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex w-full max-w-md mx-auto">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="rounded-r-none"
      />
      <Button onClick={handleSearch} className="rounded-l-none">
        Search
      </Button>
    </div>
  );
}