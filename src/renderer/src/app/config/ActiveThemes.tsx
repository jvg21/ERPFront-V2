import { ThemeType } from "../../@types/ThemeType"
import { DarkTheme } from "../themes/Dark.theme"
import { ForestTheme } from "../themes/Forest.theme"
import { LightTheme } from "../themes/Light.theme"
import { OceanTheme } from "../themes/Ocean.theme"
import { SpaceTheme } from "../themes/Space.theme"

type ActiveThemesType = {
    Dark: ThemeType,
    Light: ThemeType,
    Ocean:ThemeType,
    Forest:ThemeType,
    Space:ThemeType
}

export const ActiveThemes: ActiveThemesType = {
    Dark: DarkTheme,
    Light: LightTheme,
    Ocean:OceanTheme,
    Forest:ForestTheme,
    Space:SpaceTheme
}