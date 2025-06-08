import { FilterProps } from '@/app/types/filters';

interface FilterReadingTimeProps extends FilterProps {
  options: string[];
}

export default function FilterReadingTime({ selectedValues, onChange, title, options }: FilterReadingTimeProps) {
  const handleCheckboxChange = (time: string) => {
    const newValues = selectedValues.includes(time)
      ? selectedValues.filter(v => v !== time)
      : [...selectedValues, time];
    onChange(newValues);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
      <div className="space-y-2">
        {options.map(time => (
          <label
            key={time}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(time)}
              onChange={() => handleCheckboxChange(time)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>{time}</span>
          </label>
        ))}
      </div>
    </div>
  );
} 