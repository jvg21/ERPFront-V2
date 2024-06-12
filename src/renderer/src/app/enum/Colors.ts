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
    // Retorna o nome da cor com base no valor do enum Colors
    switch (colorValue) {
      case Colors.Red:
        return "Red";
      case Colors.Silver:
        return "Silver";
      case Colors.Blue:
        return "Blue";
      case Colors.Green:
        return "Green";
      case Colors.Black:
        return "Black";
      case Colors.White:
        return "White";
      case Colors.Yellow:
        return "Yellow";
      case Colors.Beige:
        return "Beige";
      case Colors.Grey:
        return "Grey";
      case Colors.Pink:
        return "Pink";
      case Colors.Purple:
        return "Purple";
      case Colors.Brown:
        return "Brown";
      case Colors.Orange:
        return "Orange";
      case Colors.Violet:
        return "Violet";
      case Colors.Lilac:
        return "Lilac";
      case Colors.Indigo:
        return "Indigo";
      case Colors.DarkBlue:
        return "Dark Blue";
      default:
        return "";
    }
  }
