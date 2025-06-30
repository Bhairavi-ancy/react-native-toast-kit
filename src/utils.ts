import { BORDER_COLORS, BACKGROUND_COLORS, TEXT_COLORS, SUBTITLE_COLORS } from './constants';
import { ToastType } from './types';

export function getToastColors(type: ToastType) {
  return {
    toastBorderColor: BORDER_COLORS[type],
    toastBackgroundColor: BACKGROUND_COLORS[type],
    textColor: TEXT_COLORS[type],
    subtitleColor: SUBTITLE_COLORS[type],
  };
}
