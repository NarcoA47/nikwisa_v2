import React from "react";

interface Option {
  id: string | number;
  slug: string;
  title: string;
}

interface FormRowSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (id: string, value: string) => void;
  id: string;
}

const FormRowSelect: React.FC<FormRowSelectProps> = ({
  label,
  value,
  options,
  onChange,
  id,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-semibold">
      {label}
    </label>
    <select
      id={id}
      className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
    >
      <option value="" disabled>
        -- Select an option --
      </option>
      {options?.map((option) => (
        <option key={option.id} value={option.slug}>
          {option.title}
        </option>
      ))}
    </select>
  </div>
);

export default FormRowSelect;
