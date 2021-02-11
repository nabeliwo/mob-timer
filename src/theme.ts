import { defaultFrame, defaultPalette, defaultSize } from 'smarthr-ui'

export const htmlFontSize = 10

const pxToRem = (value: number) => `${value / htmlFontSize}rem`

export const palette = defaultPalette

export const size = {
  font: {
    SHORT: `${defaultSize.font.SHORT}px`,
    TALL: `${defaultSize.font.TALL}px`,
    GRANDE: `${defaultSize.font.GRANDE}px`,
    VENTI: `${defaultSize.font.VENTI}px`,
  },
  space: {
    XXS: pxToRem(defaultSize.space.XXS),
    XS: pxToRem(defaultSize.space.XS),
    S: pxToRem(defaultSize.space.S),
    M: pxToRem(defaultSize.space.M),
    L: pxToRem(defaultSize.space.L),
    XL: pxToRem(defaultSize.space.XL),
    XXL: pxToRem(defaultSize.space.XXL),
  },
}

export const frame = defaultFrame
