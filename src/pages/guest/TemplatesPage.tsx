import { useState, useMemo } from "react";
import { SearchBar } from "@/components/molecules/SearchBar";
import { TemplateCard } from "@/components/molecules/TemplateCard";
import { templateRegistry } from "@/templates/registry";

export function GuestTemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return templateRegistry;
    return templateRegistry.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Templates</h1>
        <p className="text-gray-500">
          Find the perfect design for your event. Click Preview to see a live demo.
        </p>
      </div>

      <div className="mb-8 max-w-md">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name or category..."
        />
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-gray-400">No templates match your search.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  );
}
