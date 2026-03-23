import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@app/styles/theme';

type Props = {
  title: string;
};

export const SectionTitle = ({ title }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
