import React from "react";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  isLoading?: boolean;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  isLoading = false,
}: SearchBarProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
      />
      <Button type="submit" isLoading={isLoading} size="md">
        Search
      </Button>
    </form>
  );
}
