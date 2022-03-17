import {atom} from 'recoil';
import persistEffect from './persist-effect';

export const textState = atom({
  key: 'textState',
  default: '',
  effects_UNSTABLE: [persistEffect('text_state')],
});
