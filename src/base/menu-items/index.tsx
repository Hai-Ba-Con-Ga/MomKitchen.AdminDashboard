// project import
// import dashboard from './dashboard';
import { NavItemType } from '@/types/menu';
import { admin } from "./@homekitchen/admin";
// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [
    admin,
    // dashboard, widget, applications, formsTables, chartsMap, pages, other
  ]

};

export default menuItems;
