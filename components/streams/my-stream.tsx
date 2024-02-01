import { useContext } from 'react';
import {User} from "@prisma/client"
import { UsersConnectionContext } from '@/contexts/users-connection';
import useCurrentUser from "@/hooks/useCurrentUser";
import VideoContainer from '@/components/video-container';
import  PeerVideo  from '@/components/peer';

export default function MyStream({
  stream,
  muted,
  visible,
}: {
  stream: MediaStream;
  muted: boolean;
  visible: boolean;
}) {
  const { data }: { data?: { currentUser?: User } } = useCurrentUser();
  const avatar =data?.currentUser?.image;
  const { myId } = useContext(UsersConnectionContext);

  return (
    <VideoContainer
      id={myId}
      muted={muted}
      visible={visible}
      stream={stream}
      userPicture={avatar!}
    >
      <PeerVideo stream={stream} name={"You"} isMe={true} />
    </VideoContainer>
  );
}
