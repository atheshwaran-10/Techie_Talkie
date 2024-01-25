import { createContext, useContext, useEffect, useState } from 'react';


import { KeyValue, Nullable, PeerId, RoomId } from '@/common/types';
import { append } from '@/common/utils';

import {RTCcontext} from './RTCcontext';

export const UsersUpdaterContext = createContext<any>({});
export const UsersStateContext = createContext<any>({});

export default function UsersSettingsProvider({ children }: any) {
  const socket = useContext(RTCcontext);

  const [streams, setStreams] = useState<Record<PeerId, JSX.Element>>({});

  const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});
  const [isHidden, setIsHidden] = useState<KeyValue<boolean>>({});
  const [avatars, setAvatars] = useState<KeyValue<string>>({});
  const [names, setNames] = useState<KeyValue<string>>({});

  const [sharedScreenTrack, setSharedScreenTrack] =
    useState<Nullable<MediaStreamTrack>>(null);

  useEffect(() => {
    socket.on('user:toggled-video', (peerId: PeerId) =>
      setIsHidden(append({ [peerId]: !isHidden[peerId] }))
    );
  }, [isHidden]);

  useEffect(() => {
    socket.on('user:toggled-audio', (peerId: PeerId) =>
      setIsMuted(append({ [peerId]: !isMuted[peerId] }))
    );
  }, [isMuted]);

  return (
    <UsersStateContext.Provider
      value={{
        streams,
        isMuted,
        isHidden,
        avatars,
        names,
        sharedScreenTrack,
      }}
    >
      <UsersUpdaterContext.Provider
        value={{
          setIsMuted,
          setIsHidden,
          setAvatars,
          setStreams,
          setNames,
          setSharedScreenTrack,
          muteUser: (id: PeerId) => socket.emit('host:mute-user', id),
        }}
      >
        {children}
      </UsersUpdaterContext.Provider>
    </UsersStateContext.Provider>
  );
}
