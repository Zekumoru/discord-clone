import { ScreenModalProps } from '../../../../../../contexts/screen-modal/ScreenModalContext';
import ticketImage from '../../../../../../assets/images/ticket.png';
import { IconLink } from '../../../../../../assets/icons';
import { toast } from 'react-toastify';

type InviteModalProps = {
  inviteId: string;
} & ScreenModalProps;

const InviteModal = ({ inviteId, close }: InviteModalProps) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_APP_URL}/invite/${inviteId}`
    );
    toast.success('Link copied');
  };

  return (
    <div className="mb-4">
      <div className="flex h-[56px] items-center justify-end px-4">
        <button className="font-medium" onClick={() => close()}>
          Skip
        </button>
      </div>

      <div className="p-4">
        <div className="heading-1 mb-2">Add some people</div>
        <p className="mx-2.5 mb-4 text-center text-silvergrey-300">
          You'll need a few people to get the most out of your server.
        </p>

        <img
          src={ticketImage}
          alt="Ticket image"
          className="mx-auto mb-6 w-60"
        />

        <div
          onClick={handleCopyLink}
          className="flex items-center gap-2 rounded bg-background-700 px-4 py-3 leading-none text-silvergrey-300"
        >
          <div className="font-medium">
            {import.meta.env.VITE_APP_URL}/invite/{inviteId}
          </div>
          <IconLink
            className="ml-auto h-6 w-6 text-silvergrey-400"
            strokeWidth={2}
          />
        </div>

        <button onClick={handleCopyLink} className="btn mt-4 font-semibold">
          Share Link
        </button>
      </div>
    </div>
  );
};

export default InviteModal;
