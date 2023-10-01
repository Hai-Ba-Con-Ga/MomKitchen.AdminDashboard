/* eslint-disable @typescript-eslint/no-empty-function */
import config from "@/config";
// ==============================|| CONFIG - HOOKS  ||============================== //
import { FontFamily, I18n, PresetColor, ThemeDirection, ThemeMode } from '@/types/config';

const useConfig = () => ({
    ...config,
    onChangeContainer: () => {},
    onChangeLocalization: (lang: I18n) => {console.log(lang)
    },
    onChangeMode: (mode: ThemeMode) => {console.log(mode)},
    onChangePresetColor: (theme: PresetColor) => {console.log(theme)},
    onChangeDirection: (direction: ThemeDirection) => {console.log(direction)},
    onChangeMiniDrawer: (miniDrawer: boolean) => {console.log(miniDrawer)},
    onChangeFontFamily: (fontFamily: FontFamily) => {console.log(fontFamily)}
})

export default useConfig;
