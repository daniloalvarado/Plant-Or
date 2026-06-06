import React from 'react';
import { ScrollView, Pressable, Text } from 'react-native';
import { XStack, YStack } from 'tamagui';

interface RadioSelectProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  horizontal?: boolean;
}

export const RadioSelect = React.memo(function RadioSelect({ options, value, onChange, horizontal = false }: RadioSelectProps) {
  const renderButtons = () =>
    options.map((opt) => {
      const isSelected = value === opt;
      return (
        <Pressable
          key={opt}
          onPress={() => onChange(opt)}
          style={({ pressed }) => ({
            backgroundColor: pressed 
              ? (isSelected ? '#15963c' : 'rgba(255,255,255,0.08)') 
              : (isSelected ? 'rgba(31,196,81,0.2)' : 'rgba(255,255,255,0.04)'),
            borderColor: isSelected ? '#1FC451' : 'rgba(255,255,255,0.15)',
            borderWidth: 1,
            borderRadius: 100,
            paddingVertical: 8,
            paddingHorizontal: 16,
            marginRight: horizontal ? 8 : 0,
            marginBottom: horizontal ? 0 : 8,
            justifyContent: 'center',
            alignItems: 'center',
          })}
        >
          <Text style={{ 
            color: isSelected ? '#1FC451' : 'rgba(255,255,255,0.7)',
            fontSize: 13,
            fontWeight: isSelected ? '600' : '400',
            textAlign: 'center',
            flexShrink: 1,
          }}>
            {opt}
          </Text>
        </Pressable>
      );
    });

  if (horizontal) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack>{renderButtons()}</XStack>
      </ScrollView>
    );
  }

  return (
    <XStack flexWrap="wrap" gap="$2">
      {renderButtons()}
    </XStack>
  );
}, (prev, next) => {
  return prev.value === next.value && 
         prev.horizontal === next.horizontal && 
         prev.options.join(',') === next.options.join(',');
});

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
}

export const MultiSelect = React.memo(function MultiSelect({ options, value, onChange }: MultiSelectProps) {
  const toggleOption = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((item) => item !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <XStack flexWrap="wrap" gap="$2">
      {options.map((opt) => {
        const isSelected = value.includes(opt);
        return (
          <Pressable
            key={opt}
            onPress={() => toggleOption(opt)}
            style={({ pressed }) => ({
              backgroundColor: pressed 
                ? (isSelected ? '#15963c' : 'rgba(255,255,255,0.08)') 
                : (isSelected ? 'rgba(31,196,81,0.2)' : 'rgba(255,255,255,0.04)'),
              borderColor: isSelected ? '#1FC451' : 'rgba(255,255,255,0.15)',
              borderWidth: 1,
              borderRadius: 100,
              paddingVertical: 8,
              paddingHorizontal: 16,
              justifyContent: 'center',
              alignItems: 'center',
            })}
          >
            <Text style={{ 
              color: isSelected ? '#1FC451' : 'rgba(255,255,255,0.7)',
              fontSize: 13,
              fontWeight: isSelected ? '600' : '400',
              textAlign: 'center',
              flexShrink: 1,
            }}>
              {opt}
            </Text>
          </Pressable>
        );
      })}
    </XStack>
  );
}, (prev, next) => {
  const prevValue = Array.isArray(prev.value) ? prev.value : [];
  const nextValue = Array.isArray(next.value) ? next.value : [];
  const prevOptions = Array.isArray(prev.options) ? prev.options : [];
  const nextOptions = Array.isArray(next.options) ? next.options : [];
  
  return prevValue.join(',') === nextValue.join(',') && 
         prevOptions.join(',') === nextOptions.join(',');
});
