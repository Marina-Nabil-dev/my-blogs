
interface FilterDateProps {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  onChange: (dateRange: { start: Date | null; end: Date | null }) => void;
}

export default function FilterDate({ dateRange, onChange }: FilterDateProps) {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    onChange({ ...dateRange, start: date });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    onChange({ ...dateRange, end: date });
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Date Range</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={dateRange.start?.toISOString().split('T')[0] || ''}
            onChange={handleStartDateChange}
            className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={dateRange.end?.toISOString().split('T')[0] || ''}
            onChange={handleEndDateChange}
            className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
} 