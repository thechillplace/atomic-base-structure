import {MMKV} from 'react-native-mmkv';
import {DefaultValue} from 'recoil';

const storage = new MMKV();

const whitelist = ['textState'];

const persistEffect =
  key =>
  ({setSelf, onSet}) => {
    const savedValue = storage.getString(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet(newValue => {
      if (newValue instanceof DefaultValue) {
        storage.delete(key);
      } else {
        storage.set(key, JSON.stringify(newValue));
      }
    });
  };

export const cleanPersist = () => {
  const keys = storage.getAllKeys();
  const keyNeedDel = keys?.filter(
    e => whitelist?.findIndex(el => el === e) === -1,
  );
  keyNeedDel.forEach(e => storage.delete(e));
};

export default persistEffect;
