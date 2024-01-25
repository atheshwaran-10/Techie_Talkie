import { useContext } from 'react';
import { UsersConnectionContext } from '@/contexts/users-connection';
import { UsersStateContext } from '@/contexts/users-settings';
import VideoPlug from "@/components/video-plug"
const VideoContainer = ({
  id,
  muted,
  visible,
  children,
  userPicture,
}: SingleVideoProps) => {

  return (
    <div
      key={id}
      className="relative group h-fit drop-shadow-2xl shadow-indigo-500/50"
    >
      {!visible && <VideoPlug userPicture={userPicture} />}
      <div className={`${!visible ? 'hidden' : ''}`}>{children}</div>
    </div>
  );
};

export default VideoContainer;

type SingleVideoProps = {
  id: string;
  muted: boolean;
  visible: boolean;
  children: React.ReactNode;
  stream: MediaStream;
  userPicture: string;
  onMutePeer?: (id: string) => void;
  onRemovePeer?: (id: string) => void;
};
