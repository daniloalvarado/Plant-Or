import React from 'react';
import { ScrollView, Pressable, Text } from 'react-native';
import { XStack, YStack, Input } from 'tamagui';

interface RadioSelectProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  horizontal?: boolean;
}

export const RadioSelect = React.memo(function RadioSelect({ options, value, onChange, horizontal = false }: RadioSelectProps) {
  const renderButtons = () =>
    options.map((opt) => {
      const isSelected = opt === 'Otro' ? value?.toString().startsWith('Otro') : value === opt;
      return (
        <Pressable
          key={opt}
          onPress={() => onChange(isSelected ? '' : opt)}
          style={({ pressed }) => ({
            backgroundColor: isSelected ? 'rgba(31,196,81,0.2)' : 'rgba(255,255,255,0.04)',
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
    <YStack gap="$2">
      <XStack flexWrap="wrap" gap="$2">
        {renderButtons()}
      </XStack>
      {value?.toString().startsWith('Otro') && (
        <Input 
          placeholder="Especifique otro..." 
          value={value === 'Otro' ? '' : value.replace(/^Otro:?\s*/, '')} 
          onChangeText={(t) => onChange('Otro: ' + t)}
          borderWidth={1} 
          borderColor={(value === 'Otro' || value.replace(/^Otro:?\s*/, '').trim() === '') ? '#ff4444' : "#ffffff"} 
          focusStyle={{ borderColor: (value === 'Otro' || value.replace(/^Otro:?\s*/, '').trim() === '') ? '#ff4444' : "#ffffff" }}
          cursorColor="#ffffff" selectionColor="#0D5E26" bg="rgba(255,255,255,0.05)" color="#ffffff"
        />
      )}
    </YStack>
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
    if (opt === 'Otro') {
      const hasOtro = (Array.isArray(value) ? value : []).some(v => v?.startsWith?.('Otro'));
      if (hasOtro) {
        onChange((Array.isArray(value) ? value : []).filter(v => !v.startsWith('Otro')));
      } else {
        onChange([...(Array.isArray(value) ? value : []), 'Otro']);
      }
      return;
    }
    if ((Array.isArray(value) ? value : []).includes(opt)) {
      onChange((Array.isArray(value) ? value : []).filter((item) => item !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <YStack gap="$2">
      <XStack flexWrap="wrap" gap="$2">
        {options.map((opt) => {
        const isSelected = opt === 'Otro' ? (Array.isArray(value) ? value : []).some(v => v?.startsWith?.('Otro')) : (Array.isArray(value) ? value : []).includes(opt);
        return (
          <Pressable
            key={opt}
            onPress={() => toggleOption(opt)}
            style={({ pressed }) => ({
              backgroundColor: isSelected ? 'rgba(31,196,81,0.2)' : 'rgba(255,255,255,0.04)',
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
      })}</XStack>
      {(Array.isArray(value) ? value : []).some(v => v?.startsWith?.('Otro')) && (
        <Input 
          placeholder="Especifique otro..." 
          value={(Array.isArray(value) ? value : []).find(v => v?.startsWith?.('Otro')) === 'Otro' ? '' : (Array.isArray(value) ? value : []).find(v => v?.startsWith?.('Otro'))?.replace(/^Otro:?\s*/, '') || ''} 
          onChangeText={(t) => {
            const newValue = value.filter(v => !v.startsWith('Otro'));
            newValue.push('Otro: ' + t);
            onChange(newValue);
          }}
          borderWidth={1} 
          borderColor={(Array.isArray(value) ? value : []).some(v => v === 'Otro' || (v?.startsWith('Otro:') && v.replace(/^Otro:?\s*/, '').trim() === '')) ? '#ff4444' : "#ffffff"} 
          focusStyle={{ borderColor: (Array.isArray(value) ? value : []).some(v => v === 'Otro' || (v?.startsWith('Otro:') && v.replace(/^Otro:?\s*/, '').trim() === '')) ? '#ff4444' : "#ffffff" }}
          cursorColor="#ffffff" selectionColor="#0D5E26" bg="rgba(255,255,255,0.05)" color="#ffffff"
        />
      )}
    </YStack>
  );
}, (prev, next) => {
  const prevValue = Array.isArray(prev.value) ? prev.value : [];
  const nextValue = Array.isArray(next.value) ? next.value : [];
  const prevOptions = Array.isArray(prev.options) ? prev.options : [];
  const nextOptions = Array.isArray(next.options) ? next.options : [];
  
  return prevValue.join(',') === nextValue.join(',') && 
         prevOptions.join(',') === nextOptions.join(',');
});


