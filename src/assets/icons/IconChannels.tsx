import IconProps from './types';

const IconChannels = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? ''}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.5 5.20732C3.5 4.79311 3.83579 4.45732 4.25 4.45732H20.75C21.1642 4.45732 21.5 4.79311 21.5 5.20732C21.5 5.62154 21.1642 5.95732 20.75 5.95732H4.25C3.83579 5.95732 3.5 5.62154 3.5 5.20732ZM3.5 9.70732C3.5 9.29311 3.83579 8.95732 4.25 8.95732H16C16.4142 8.95732 16.75 9.29311 16.75 9.70732C16.75 10.1215 16.4142 10.4573 16 10.4573H4.25C3.83579 10.4573 3.5 10.1215 3.5 9.70732ZM3.5 14.2073C3.5 13.7931 3.83579 13.4573 4.25 13.4573H20.75C21.1642 13.4573 21.5 13.7931 21.5 14.2073C21.5 14.6215 21.1642 14.9573 20.75 14.9573H4.25C3.83579 14.9573 3.5 14.6215 3.5 14.2073ZM3.5 18.7073C3.5 18.2931 3.83579 17.9573 4.25 17.9573H18C18.4142 17.9573 18.75 18.2931 18.75 18.7073C18.75 19.1215 18.4142 19.4573 18 19.4573H4.25C3.83579 19.4573 3.5 19.1215 3.5 18.7073Z" />
    </svg>
  );
};

export default IconChannels;