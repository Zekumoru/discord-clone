import { ReactNode } from 'react';
import CircledXButton from '../CircledXButton';
import InsetListItem from './InsetListItem';

type InsetTextInputProps = {
  value: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  postfixElement?: ReactNode;
  onChange: (value: string) => void;
};

const InsetTextInput = ({
  value,
  placeholder,
  onChange,
  minLength,
  maxLength,
  postfixElement,
  disabled,
}: InsetTextInputProps) => {
  return (
    <InsetListItem className="w-full">
      <input
        type="text"
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent font-medium text-white outline-none placeholder:text-silvergrey-400"
        placeholder={placeholder}
        disabled={disabled}
      />
      {postfixElement}
    </InsetListItem>
  );
};

export default InsetTextInput;
