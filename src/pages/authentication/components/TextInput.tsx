import { ReactNode, useId } from 'react';

type TextInputProps = {
  type: 'text' | 'password' | 'email';
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
        className="mb-2 text-xs font-bold uppercase text-silvergrey-300"
        htmlFor={`email-${id}`}
      >
        {labelContent}
      </label>
      <input
        type={type}
        id={`email-${id}`}
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
