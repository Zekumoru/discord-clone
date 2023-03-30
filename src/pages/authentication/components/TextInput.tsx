import { ReactNode, useId } from 'react';

type TextInputProps = {
  type: 'text' | 'password' | 'email';
  className?: string;
  labelContent: ReactNode;
  value: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  onChange: (value: string) => void;
};

const TextInput = ({
  type,
  className,
  labelContent,
  value,
  required,
  minLength,
  maxLength,
  onChange,
}: TextInputProps) => {
  const id = useId();

  return (
    <div className={`flex flex-col ${className ?? ''}`}>
      <label
        className="mb-2 uppercase font-bold text-silvergrey-300 text-xs"
        htmlFor={`email-${id}`}
      >
        {labelContent}
      </label>
      <input
        type={type}
        id={`email-${id}`}
        className="bg-background-700 rounded p-2.5 outline-none leading-none text-silvergrey-300"
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
