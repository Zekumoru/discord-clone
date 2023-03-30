import { ReactNode } from 'react';

type TextInputProps = {
  type: 'text' | 'password' | 'email';
  id: string;
  className?: string;
  labelContent: ReactNode | string;
  value: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  onChange: (value: string) => void;
};

const TextInput = ({
  type,
  id,
  className,
  labelContent,
  value,
  required,
  minLength,
  maxLength,
  onChange,
}: TextInputProps) => {
  return (
    <div className={`flex flex-col ${className ?? ''}`}>
      <label
        className="mb-2 text-xs font-bold uppercase text-silvergrey-300"
        htmlFor={id}
      >
        {labelContent}
      </label>
      <input
        type={type}
        id={id}
        className="rounded bg-background-700 p-2.5 leading-none text-silvergrey-300 outline-none"
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
};

export default TextInput;
