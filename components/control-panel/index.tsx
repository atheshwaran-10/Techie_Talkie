import { useContext } from 'react';
import { UsersConnectionContext } from '@/contexts/users-connection';
import { UsersStateContext } from '@/contexts/users-settings';
import {ArrowBigLeftDash,Video,VideoOff,MicIcon,MicOff,PhoneOff,ScreenShare,MessageCircle,Users} from "lucide-react"
import CrossLineDiv from '@/common/components/cross-line-div';

const ControlPanel = ({
  muted,
  visible,
  chat,
  screenTrack,
  screen,
  onToggle,
  onLeave,
}: any) => {
  const { sharedScreenTrack: shared, streams } = useContext(UsersStateContext);
  const { users } = useContext(UsersConnectionContext);

  return (
    <>
      {(screenTrack || shared) && (
        <button
          onClick={() => onToggle("fullscreen")}
          className={`${common} bg-sky-400 hover:bg-sky-500`}
        >
          <ArrowBigLeftDash />
        </button>
      )}

      <div className="flex flex-auto place-content-center items-center gap-6">
        <button
          onClick={() => onToggle("video", Object.values(users))}
          data-for="visibility"
          data-tip={`${!visible ? "switch on" : "switch off"}`}
          className={`${common} relative bg-sky-400 hover:bg-sky-500`}
        >
          {visible ? <Video /> : <VideoOff />}
        </button>

        <button
          onClick={() => onToggle("audio")}
          data-for="audio"
          data-tip={`${muted ? "unmute" : "mute"}`}
          className={`${common} relative bg-sky-400 hover:bg-sky-500`}
        >
          {muted ? <MicOff /> : <MicIcon />}
        </button>

        <button
          onClick={onLeave}
          data-for="hangUp"
          data-tip="hang up"
          className={`${common} bg-red-600 hover:bg-red-500`}
        >
          <PhoneOff />
        </button>

        <button
          onClick={() => onToggle("screen")}
          disabled={shared}
          className={`${common} ${
            screen
              ? "bg-sky-400 hover:bg-sky-500"
              : "bg-sky-400 hover:bg-sky-500"
          }`}
          data-for="shareScreen"
          data-tip="share your screen"
        >
          <ScreenShare />
        </button>

        <button
          data-for="chat"
          data-tip="chat with everyone"
          onClick={() => onToggle("chat")}
          className={`${common} ${
            chat ? "bg-sky-400 hover:bg-sky-500" : "bg-sky-400 hover:bg-sky-500"
          }`}
        >
          <MessageCircle />
        </button>
        <ParticipantsCount
          onClick={() => onToggle("users")}
          count={Object.keys(streams).length + 1}
        />
      </div>
    </>
  );
};

export default ControlPanel;

const common = 'p-3 rounded-xl text-white';

const ParticipantsCount = ({ count, onClick }: any) => {
  return (
    <div className="inline-block relative">
      <button
        onClick={onClick}
        className="inline-block flex justify-center items-center h-12 w-12 rounded-xl overflow-hidden bg-sky-400"
      >
        <Users className='text-white'/>
      </button>
      <span className="place-content-center absolute top-0 right-0 block h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-sky-300 text-xs text-center text-black">
        {count}
      </span>
    </div>
  );
};
