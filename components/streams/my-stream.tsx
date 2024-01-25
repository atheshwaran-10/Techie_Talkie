import { useContext } from 'react';

import { MYSELF } from '@/common/constants';
import { UsersConnectionContext } from '@/contexts/users-connection';

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
  const avatar ='';
  const { myId } = useContext(UsersConnectionContext);

  return (
    <VideoContainer
      id={myId}
      muted={muted}
      visible={visible}
      stream={stream}
      userPicture={avatar}
    >
      <PeerVideo stream={stream} name={MYSELF} isMe={true} />
    </VideoContainer>
  );
}
