import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

export enum Colors{
    Silver = 1,
    Blue = 2,
    Green = 3,
    Black = 4,
    White = 5,
    Yellow = 6,
    Beige = 7,
    Grey = 8,
    Pink = 9,
    Purple = 10,
    Brown = 11,
    Orange = 12,
    Violet = 13,
    Lilac = 14,
    Indigo = 15,
    DarkBlue = 16,
    Red = 17

}

export function getColorLabel(colorValue: number): string {
  const { language } = useContext(LanguageContext);
  const ColorsWords = language.color;

  // Retorna o nome da cor com base no valor do enum Colors
  switch (colorValue) {
    case Colors.Red:
      return ColorsWords.red;
    case Colors.Silver:
      return ColorsWords.silver;
    case Colors.Blue:
      return ColorsWords.blue;
    case Colors.Green:
      return ColorsWords.green;
    case Colors.Black:
      return ColorsWords.black;
    case Colors.White:
      return ColorsWords.white;
    case Colors.Yellow:
      return ColorsWords.yellow;
    case Colors.Beige:
      return ColorsWords.beige;
    case Colors.Grey:
      return ColorsWords.grey;
    case Colors.Pink:
      return ColorsWords.pink;
    case Colors.Purple:
      return ColorsWords.purple;
    case Colors.Brown:
      return ColorsWords.brown;
    case Colors.Orange:
      return ColorsWords.orange;
    case Colors.Violet:
      return ColorsWords.Violet;
    case Colors.Lilac:
      return ColorsWords.lilac;
    case Colors.Indigo:
      return ColorsWords.indigo;
    case Colors.DarkBlue:
      return ColorsWords.darkblue;
    default:
      return "";
  }
}
