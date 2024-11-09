import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor = '#1A1A1A', darkColor = '#0D0D0D', ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <View
      style={[
        { backgroundColor, borderColor: '#00A7E1', borderWidth: 1, shadowColor: '#00FF00', shadowOpacity: 0.5, shadowRadius: 4 },
        style,
      ]}
      {...otherProps}
    />
  );
}
