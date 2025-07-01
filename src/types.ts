import { ReactNode } from "react";
import { TextStyle } from "react-native";

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastVariantType = 'solid'|'native';

export interface ToastProps {
  message: string;
  msgColor?:string;
  msgStyle?:TextStyle;

  subMessage?:string;
  subMsgColor?:string;
  subMsgStyle?:TextStyle;

  borderColor?:string;
  bgColor?:string;
  borderWidth?:number;
  borderRadius?:number;

  icon?: ReactNode;

  iconPosition?:'start'|'end'|'center';
  iconSpacing?:number

  type?: ToastType;
  duration?: number;

  position?: 'top' | 'bottom' | 'center';
  slideDirection?: 'left' | 'right' | 'none';

  onClose?: () => void;

  actionText?: string;
  actionTextStyle?:TextStyle;
  actionTextColor?:string;

  autoDismiss?:boolean;
  variant?:string;

  onActionPress?: () => void;

  customToast?:ReactNode;
}



export interface ToastCardProps extends Omit<ToastProps, 'duration' | 'position' | 'slideDirection' | 'customToast'> {
}


