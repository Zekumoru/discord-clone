import InsetListItem from './InsetListItem';

type InsetTextInputProps = {
  value: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  onChange: (value: string) => void;
};

const InsetTextInput = ({
  value,
  placeholder,
  onChange,
  minLength,
  maxLength,
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
      />
    </InsetListItem>
  );
};

export default InsetTextInput;
