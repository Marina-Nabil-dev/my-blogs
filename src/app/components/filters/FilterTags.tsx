import { useState } from 'react';
import { FilterProps } from '@/app/types/filters';
import SearchInput from './SearchInput';

interface FilterTagsProps extends FilterProps {
  options: string[];
}

export default function FilterTags({ selectedValues, onChange, title, options }: FilterTagsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);

  const handleTagClick = (tag: string) => {
    const newValues = selectedValues.includes(tag)
      ? selectedValues.filter(v => v !== tag)
      : [...selectedValues, tag];
    onChange(newValues);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search tags..."
      />
      <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
        { (showAllTags ? options : options.slice(0,8))
          .filter(tag => 
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${selectedValues.includes(tag)
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
            >
              {tag}
            </button>
          ))}
      </div>
      {options.length > 5 && (
                    <button
                      id="show-more-categories"
                      onClick={() => setShowAllTags(!showAllTags)}
                      className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 !rounded-button whitespace-nowrap cursor-pointer"
                    >
                      {showAllTags ? "Show less" : "Show more"}
                    </button>
                  )}
    </div>
  );
} 