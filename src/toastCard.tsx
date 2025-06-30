import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { ToastCardProps } from './types';
import { getToastColors } from './utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_BORDER_COLOR, DEFAULT_SUBTITLE_COLOR, DEFAULT_TEXT_COLOR } from './constants';

const { width } = Dimensions.get('window');

const ToastCard: React.FC<ToastCardProps> = ({
  message,
  subMessage,
  type,
  icon,
  iconPosition,
  iconSpacing,
  msgColor,
  msgStyle,
  subMsgColor,
  subMsgStyle,
  borderColor,
  bgColor,
  borderWidth,
  borderRadius,
  actionText, actionTextColor, actionTextStyle, onActionPress,
  variant, autoDismiss,
  onClose,
}) => {
  const { toastBorderColor, toastBackgroundColor, textColor, subtitleColor } = getToastColors(type);

  let iconAllignment: 'flex-start' | 'flex-end' | 'center' = 'flex-end';
  if (iconPosition === 'start') iconAllignment = 'flex-start';
  else if (iconPosition === 'center') iconAllignment = 'center';


  const iconMap = {
    success: <Icon name="check-circle" size={24} color={textColor} />,
    error: <Icon name="close-circle" size={24} color={textColor} />,
    info: <Icon name="information" size={24} color={textColor} />,
    warning: <Icon name="alert-circle" size={24} color={textColor} />,
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.toastBox,
          {
            alignItems: iconAllignment,
            borderColor: borderColor ?? toastBorderColor ?? DEFAULT_BORDER_COLOR,
            backgroundColor: bgColor ?? toastBackgroundColor ?? DEFAULT_BACKGROUND_COLOR,
            borderWidth,
            borderRadius,
          },
        ]}
      >


        {(icon || iconMap[type]) && <View style={[styles.iconWrapper, { marginRight: iconSpacing }]}>
          {icon || iconMap[type]}
        </View>}

        <View style={styles.content}>
          <Text style={[styles.title, { color: textColor ?? msgColor ?? DEFAULT_TEXT_COLOR }, msgStyle]}>{message}</Text>
          <Text style={[styles.subtitle, { color: subtitleColor ?? subMsgColor ?? DEFAULT_SUBTITLE_COLOR }, subMsgStyle]}>{subMessage}</Text>
        </View>

        {!autoDismiss && <Pressable
          onPress={onClose}
          hitSlop={10}
          style={styles.closeIconWrapper}
        >
          <Icon name="close-thick" size={14} color={textColor || msgColor} />
        </Pressable>}
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  toastBox: {
    flexDirection: 'row',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    width: width * 0.9,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  closeIconWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 4,
    zIndex: 10,
  },

});

export default ToastCard;
