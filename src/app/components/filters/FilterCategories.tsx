import { useState } from 'react';
import { FilterProps } from '@/app/types/filters';
import SearchInput from './SearchInput';

interface FilterCategoriesProps extends FilterProps {
  options: string[];
}

export default function FilterCategories({ selectedValues, onChange, title, options }: FilterCategoriesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const handleCheckboxChange = (category: string) => {
    const newValues = selectedValues.includes(category)
      ? selectedValues.filter(v => v !== category)
      : [...selectedValues, category];
    onChange(newValues);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search categories..."
      />
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {(showAllCategories
                      ? options
                      : options.slice(0, 5)
                    )
          .filter(category => 
            category.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(category => (
            <label
              key={category}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(category)}
                onChange={() => handleCheckboxChange(category)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>{category}</span>
            </label>
          ))}    
      </div>
      {options.length > 5 && (
                    <button
                      id="show-more-categories"
                      onClick={() => setShowAllCategories(!showAllCategories)}
                      className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 !rounded-button whitespace-nowrap cursor-pointer"
                    >
                      {showAllCategories ? "Show less" : "Show more"}
                    </button>
                  )}
    </div>
  );
} 