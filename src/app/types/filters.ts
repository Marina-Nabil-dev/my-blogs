export interface FilterProps {
  selectedValues: string[];
  onChange: (values: string[]) => void;
  title: string;
}

export interface SortByProps {
  selectedValue: string;
  onChange: (value: string) => void;
  options: string[];
}

export interface FilterData {
  categories: string[];
  authors: string[];
  tags: string[];
  readingTime: string[];
  sortOptions: string[];
  dateRange: {
    min: string,
    max: string
  }
} 