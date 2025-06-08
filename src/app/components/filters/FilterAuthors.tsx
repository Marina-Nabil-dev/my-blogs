import { useState } from 'react';
import { FilterProps } from '@/app/types/filters';
import SearchInput from './SearchInput';

export default function FilterAuthors({ selectedValues, onChange, title ,options}: FilterProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleCheckboxChange = (author: string) => {
    const newValues = selectedValues.includes(author)
      ? selectedValues.filter(v => v !== author)
      : [...selectedValues, author];
    onChange(newValues);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search authors..."
      />
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {options
          .filter(author => 
            author.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(author => (
            <label
              key={author}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(author)}
                onChange={() => handleCheckboxChange(author)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>{author}</span>
            </label>
          ))}
      </div>
    </div>
  );
} 