import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
} from 'react-native';
import ToastCard from './toastCard';
import { ToastProps } from './types';


const Toast: React.FC<ToastProps> = ({
  message,
  msgColor = '#000',
  msgStyle,

  subMessage = '',
  subMsgColor = '#333',
  subMsgStyle,

  borderColor,
  bgColor,
  borderWidth = 1,
  borderRadius = 12,

  icon,
  iconPosition = 'center',
  iconSpacing = 12,

  type,
  duration = 300,
  position = 'bottom',
  slideDirection = 'none',

  onClose,

  actionText = '',
  actionTextStyle,
  actionTextColor = '',
  onActionPress,

  autoDismiss = true,
  variant = "solid",
  customToast,

}) => {

  const translateX = useRef(new Animated.Value(
    slideDirection === 'left' ? -300 : 300
  )).current;

  const translateY = useRef(new Animated.Value(
    position === 'top' ? -100 : 100
  )).current;


  const initialX =
    slideDirection === 'left' ? -300 :
      slideDirection === 'right' ? 300 : 0;

  const initialY =
    position === 'top' ? -100 :
      position === 'bottom' ? 100 : 0;

  useEffect(() => {

    const enterAnimation = Animated.parallel(
      [Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })])

    const exitAnimation = Animated.parallel([
      Animated.timing(translateX, {
        toValue: initialX,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: initialY,
        duration: 300,
        useNativeDriver: true,
      })
    ])

    const animationSequence = autoDismiss ? Animated.sequence([
      enterAnimation,
      Animated.delay(duration),
      exitAnimation
    ])
      :

      Animated.sequence([
        enterAnimation,
        Animated.delay(duration),
      ])

    animationSequence.start(() => {
      if (autoDismiss) {
        onClose?.();
      }
    });

  }, []);

  const getTransformStyle = () => {

    if (position == "center" && slideDirection === 'none') {
      return
    }
    if (slideDirection === 'left' || slideDirection === 'right' || position === 'center') {
      return {
        transform: [
          { translateX: translateX },
        ],
      };
    }
    else if (slideDirection === 'none') {
      return {
        transform: [
          { translateY: translateY },
        ],
      };
    };
  }

  const toastComponent = customToast ?? (
    <ToastCard
      message={message}
      subMessage={subMessage}
      type={type}
      icon={icon}
      iconPosition={iconPosition}
      iconSpacing={iconSpacing}
      msgColor={msgColor}
      msgStyle={msgStyle}
      subMsgColor={subMsgColor}
      subMsgStyle={subMsgStyle}
      borderColor={borderColor}
      bgColor={bgColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      actionText={actionText}
      actionTextColor={actionTextColor}
      actionTextStyle={actionTextStyle}
      onActionPress={onActionPress}
      onClose={onClose}
      variant={variant}
      autoDismiss={autoDismiss}
    />
  )
  return (
    <Animated.View
      style={[
        styles.toast,
        getTransformStyle(),
        {
          top: position === 'top' ? 20 : undefined,
          bottom: position === 'bottom' ? 20 : undefined,
        },
      ]}
    >
      {toastComponent}

    </Animated.View>
  );
};


const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  action: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 12,
  },
});

export default Toast;
