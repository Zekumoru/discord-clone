type TextInputLabelProps = {
  label: string;
  error?: string;
  required?: boolean;
};

const TextInputLabel = ({ label, required, error }: TextInputLabelProps) => {
  return error ? (
    <span className="ml-0.5 text-salmon-100">
      {label} - <span className="capitalize">{error}</span>
    </span>
  ) : (
    <>
      {label} {required && <span className="ml-0.5 text-crimson-100">*</span>}
    </>
  );
};

export default TextInputLabel;
