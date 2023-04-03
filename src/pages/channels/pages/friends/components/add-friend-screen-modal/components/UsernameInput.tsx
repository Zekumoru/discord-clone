type UsernameInputProps = {
  username: string;
  placeholder: string;
  onChange: (username: string) => void;
  required?: boolean;
};

const UsernameInput = ({
  username,
  placeholder,
  onChange,
  required,
}: UsernameInputProps) => {
  let previewTag = '#0000';
  const match = username.match(/#\d*/)?.[0];
  if (match) {
    previewTag = match.padEnd(5, '0').substring(match.length);
  }

  const handleUsernameChange = (username: string) => {
    const tagLength = username.match(/#\d*$/)?.[0].length ?? 0;
    if (tagLength > 5 || username.length > 32 + tagLength) return;
    if (!tagLength && username.includes('#')) return;

    onChange(username);
  };

  return (
    <div className="relative w-full">
      <div className="absolute top-[-1px]  p-2.5">
        <span className="text-transparent">{username}</span>
        {username && <span className="text-silvergrey-300">{previewTag}</span>}
      </div>
      <input
        type="text"
        className="text-input w-full text-white"
        value={username}
        onChange={(e) => handleUsernameChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default UsernameInput;
