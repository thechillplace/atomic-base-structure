import {atom} from 'recoil';
import persistEffect from './persist-effect';

const textState = atom({
  key: 'textState',
  default: '',
  effects_UNSTABLE: [persistEffect('text_state')],
});

export default textState;
