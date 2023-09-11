import { NavItemType } from '@/types/menu';
import { atom } from 'recoil';
interface RouteMenu {
  value: string;
  label: string;
  path: string;
}
interface LicenseMenu {
  mainMenu: NavItemType[];
  settingMenu: NavItemType[];
  //This format for Main Page with dropdown menu. Can get menu by parent key 
  mainPageRoute: {
    [x: string]: RouteMenu[];
  };
  //This format for Setting Page with Navbar menu. Can get menu by parent key 
  settingPageRoute: {
    [x: string]: NavItemType[];
  };
}

export const licenseMenuAtom = atom<LicenseMenu>({
  key: 'licenseMenuAtom',
  default: {
    mainMenu: [],
    settingMenu: [],
    mainPageRoute: {},
    settingPageRoute: {}
  }
});
