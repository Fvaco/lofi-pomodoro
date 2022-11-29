import { DefaultColors } from 'tailwindcss/types/generated/colors'

type Shades = keyof DefaultColors['slate'];

type ColorsWithoutShades = 'white' | 'black' | 'transparent' | 'inherit' | 'current';
type ColorsWithShades = keyof Omit<DefaultColors, ColorsWithoutShades>;

type ColorShades = `${ColorsWithShades}-${Shades}`;

export type ColorNames = ColorsWithoutShades | ColorsWithShades
export type Colors = ColorShades | ColorsWithoutShades;