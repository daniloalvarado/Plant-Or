import { useClerk } from "@clerk/clerk-expo";
import { Modal, Text, View, StyleSheet, Pressable } from "react-native";
import { Button } from "tamagui";
import { useState } from "react";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";

export const SignOutButton = ({ onSignOutStart }: { onSignOutStart?: () => void }) => {
  const { signOut } = useClerk();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme() ?? "dark";
  const theme = Colors[colorScheme];

  const handleConfirmSignOut = async () => {
    setModalVisible(false);
    if (onSignOutStart) onSignOutStart();
    try {
      await signOut();
    } catch (e) {
      console.error(e);
    } finally {
      router.replace("/sign-in");
    }
  };

  return (
    <>
      <Button theme="red" borderColor="$borderColor" onPress={() => setModalVisible(true)}>
        <Text style={{ color: '#ff4d4f', fontWeight: 'bold' }}>Cerrar Sesión</Text>
      </Button>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colorScheme === 'dark' ? '#12221A' : '#ffffff' }]}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text, marginBottom: 12 }}>Cerrar Sesión</Text>
            <Text style={{ fontSize: 15, color: theme.icon, marginBottom: 24, lineHeight: 22 }}>
              ¿Estás seguro de que deseas cerrar tu sesión en Plant-Or?
            </Text>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={[styles.button, { flex: 1, backgroundColor: "rgba(255,255,255,0.05)" }]}
              >
                <Text style={{ color: theme.text, textAlign: 'center', fontWeight: 'bold' }}>Cancelar</Text>
              </Pressable>

              <Pressable
                onPress={handleConfirmSignOut}
                style={[styles.button, { flex: 1, backgroundColor: "#ff4d4f" }]}
              >
                <Text style={{ color: "#ffffff", textAlign: 'center', fontWeight: 'bold' }}>Salir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    width: '100%',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
  }
});
