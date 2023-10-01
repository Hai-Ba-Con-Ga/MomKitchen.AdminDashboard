import { menuAtom } from '@/base/store/atoms/menu';
import { DefaultValue, selector } from 'recoil';
/* import { formatSettingsAtom } from '../atoms';
import {
  // Currency,
  CurrencySetting,
  DateSetting,
  FormatSetting,
  NumberSetting,
  TimeSetting,
  Timezone
} from '@settings/general/types/interface';
import { Country } from '@base/types/setting';
import { Currency } from '@base/types/common'; */

export const menuWithOpenItem = selector({
  key: 'menuWithOpenItem',
  get: ({ get }) => {
    const menuState = get(menuAtom);
    return menuState?.openItem ?? [];
  },
  set: ({ set, get }, newData) => {
    const menuState = get(menuAtom);
    set(menuAtom, {
      ...menuState,
      openItem: newData instanceof DefaultValue ? [] : newData
    });
  }
});

export const menuWithDrawerOpen = selector({
  key: 'menuWithDrawerOpen',
  get: ({ get }) => {
    const menuState = get(menuAtom);
    return menuState?.drawerOpen ?? false;
  },
  set: ({ set, get }, newData) => {
    const menuState = get(menuAtom);
    set(menuAtom, {
      ...menuState,
      drawerOpen: newData instanceof DefaultValue ? false : newData
    });
  }
});
/* 
//========FormatSetting======

export const numberSettingSelector = selector<NumberSetting>({
  key: 'numberSettingSelector',
  get: ({ get }) => {
    const formatSettings = get(formatSettingsAtom);
    let result = formatSettings.find((item: FormatSetting) => item.key == 'number');
    return result?.value as NumberSetting;
  }
});

export const dateSettingSelector = selector<DateSetting>({
  key: 'dateSettingSelector',
  get: ({ get }) => {
    const formatSettings = get(formatSettingsAtom);
    let result = formatSettings.find((item: FormatSetting) => item.key == 'date')!;
    return result?.value as DateSetting;
  }
});

export const countrySettingSelector = selector<Country[]>({
  key: 'countrySettingSelector',
  get: ({ get }) => {
    const formatSettings = get(formatSettingsAtom);
    let result = formatSettings.find((item: FormatSetting) => item.key == 'country');
    return result?.value as Country[];
  }
});

export const availableCountrySelector = selector<Country[]>({
  key: 'availableCountrySelector',
  get: ({ get }) => {
    const formatSettings = get(formatSettingsAtom);
    const FormatSetting = formatSettings.find((item: FormatSetting) => item.key == 'country');
    return FormatSetting?.value as Country[];
  }
});
export const currencySettingSelector = selector<CurrencySetting>({
  key: 'currencySettingSelector',
  get: ({ get }) => {
    const formatSettings = get(formatSettingsAtom);
    let result = formatSettings.find((item: FormatSetting) => item.key == 'currency');
    return result?.value as CurrencySetting;
  }
});
export const usedCurrenciesSelector = selector<Currency[]>({
  key: 'usedCurrenciesSelector',
  get: ({ get }) => {
    const formatSettings = get(formatSettingsAtom);
    const FormatSetting = formatSettings.find((item: FormatSetting) => item.key == 'currency');
    const currencySettings = FormatSetting?.value as CurrencySetting;
    return currencySettings.usedCurrencies as Currency[];
  }
});

export const timeSettingSelector = selector<TimeSetting>({
  key: 'timeSettingSelector',
  get: ({ get }) => {
    const formatSettings = get(formatSettingsAtom);
    let result = formatSettings.find((item: FormatSetting) => item.key == 'time');
    return result?.value as TimeSetting;
  }
});

export const TimezoneSelector = selector<Timezone[]>({
  key: 'timezoneSelector',
  get: ({ get }) => {
    const formatSettings = get(formatSettingsAtom);
    let result = formatSettings.find((item: FormatSetting) => item.key == 'timezone');
    return result?.value as Timezone[];
  }
});

export const defaultCurrencySelector = selector<Currency>({
  key: 'defaultCurrencySelector',
  get: ({ get }) => {
    const formatSettings = get(formatSettingsAtom);
    const currencySettings = formatSettings.find((item: FormatSetting) => item.key == 'currency');
    const currencies = currencySettings?.value as CurrencySetting;
    const defaultCurrencies = currencies.usedCurrencies.find((item: Currency) => item.isDefault == true);
    return defaultCurrencies as Currency;
  }
});
 */