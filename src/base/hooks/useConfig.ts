/* eslint-disable @typescript-eslint/no-empty-function */
import config from "@/config";
// ==============================|| CONFIG - HOOKS  ||============================== //
import { FontFamily, I18n, PresetColor, ThemeDirection, ThemeMode } from '@/types/config';

const useConfig = () => ({
    ...config,
    onChangeContainer: () => {},
    onChangeLocalization: (lang: I18n) => {},
    onChangeMode: (mode: ThemeMode) => {},
    onChangePresetColor: (theme: PresetColor) => {},
    onChangeDirection: (direction: ThemeDirection) => {},
    onChangeMiniDrawer: (miniDrawer: boolean) => {},
    onChangeFontFamily: (fontFamily: FontFamily) => {}
})

export default useConfig;
