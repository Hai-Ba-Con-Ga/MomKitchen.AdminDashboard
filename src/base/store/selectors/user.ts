/* import { DefaultValue, selector } from 'recoil';
import { authAtom } from '../atoms/auth';

export const authWithUserProfile = selector({
  key: 'authWithUserProfile',
  get: ({ get }) => {
    const authState = get(authAtom);
    return authState?.user ?? null;
  },
  set: ({ set, get }, newData) => {
    const authState = get(authAtom);
    set(authAtom, {
      ...authState,
      user: newData instanceof DefaultValue ? null : newData
    });
  }
});
 */