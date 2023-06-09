import { ChangeEvent, useEffect, useState } from 'react';
import TextInputLabel from './TextInputLabel';

type TextInputProps = {
  type: 'text' | 'password' | 'email';
  id: string;
  className?: string;
  value: string;
  label: string;
  error?: string;
  hideAsterisk?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  onChange: (value: string) => void;
};

const TextInput = ({
  type,
  id,
  className,
  error,
  value,
  label,
  required,
  hideAsterisk,
  minLength,
  maxLength,
  onChange,
}: TextInputProps) => {
  const [isErrorShown, setIsErrorShown] = useState(false);

  useEffect(() => {
    if (!error) return;
    setIsErrorShown(true);
  }, [error]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsErrorShown(false);
    onChange(e.target.value);
  };

  return (
    <div className={`flex flex-col ${className ?? ''}`}>
      <label className="heading-2 mb-2" htmlFor={id}>
        <TextInputLabel
          label={label}
          error={isErrorShown ? error : undefined}
          required={required && !hideAsterisk}
        />
      </label>
      <input
        type={type}
        id={id}
        className="text-input"
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default TextInput;
