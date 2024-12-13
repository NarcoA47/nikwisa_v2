import React from "react";

type FormRowProps = {
  type: string;
  name: string;
  value: string | number;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  labelText?: string;
  placeholder?: string;
};

export const FormRow: React.FC<FormRowProps> = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeholder,
}) => {
  return (
    <div className="form-row mb-4">
      <label
        htmlFor={name}
        className="form-label block text-gray-700 font-bold mb-2"
      >
        {labelText || name}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="form-input w-full p-2 border rounded"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="form-input w-full p-2 border rounded"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
