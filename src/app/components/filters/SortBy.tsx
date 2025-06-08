import { SortByProps } from '@/app/types/filters';
import { FiChevronDown } from 'react-icons/fi';

export default function SortBy({ selectedValue, onChange, options }: SortByProps) {
  return (
    <div className="relative">
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <FiChevronDown className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
} 