import { ToastContainerProps } from 'react-toastify';

export const SOCKET_PATH = '/api/socketio';
export const TOAST_PROPS: ToastContainerProps = {
  position: 'bottom-left',
  theme: 'light',
  autoClose: 3000,
};
