import { ThemeType } from "../../@types/ThemeType"
import { DarkTheme } from "../themes/Dark.theme"
import { LightTheme } from "../themes/Light.theme"

type ActiveThemesType = {
    Dark: ThemeType,
    Light: ThemeType
}

export const ActiveThemes: ActiveThemesType = {
    Dark: DarkTheme,
    Light: LightTheme
}