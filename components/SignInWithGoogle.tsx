import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import { View as RNView, Text as RNText } from "react-native";
import { Button, Spinner, Text, View } from "tamagui";
import { Modal, StyleSheet } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useModal } from "@/contexts/ModalContext";

// Preloads the browser for Android devices to reduce authentication load time
// See: https://docs.expo.dev/guides/authentication/#improving-user-experience
export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function SignInWithGoogle() {
  useWarmUpBrowser();
  const router = useRouter();
  const [isFinalizing, setIsFinalizing] = useState(false);

  const { showModal } = useModal();

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();

  const onPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: "plant-or",
          path: "sign-in",
        }),
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setIsFinalizing(true);
        await setActive!({
          session: createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
          },
        });
        // Layout useEffect will handle navigation to "/"
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // See https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections#handle-missing-requirements
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      setIsFinalizing(false);
      
      let errorMessage = "Ocurrió un error al iniciar sesión con Google.";
      
      const errorCode = err?.errors?.[0]?.code;
      if (errorCode === "user_quota_exceeded") {
         errorMessage = "Límite de 100 usuarios en modo de prueba alcanzado. No es posible crear más cuentas hasta pasar a Producción.";
      } else if (err?.errors?.[0]?.longMessage) {
         errorMessage = err.errors[0].longMessage;
      } else if (err?.errors?.[0]?.message) {
         errorMessage = err.errors[0].message;
      }

      showModal({
        type: "dialog",
        title: "Atención",
        description: errorMessage,
      });
    }
  }, [router, startSSOFlow, showModal]);

  return (
    <>
      <Button
        variant="outlined"
        borderColor="rgba(255,255,255,0.4)"
        borderWidth={1}
        color="#ffffff"
        onPress={onPress}
        icon={<AntDesign name="google" size={18} color="#ffffff" />}
      >
        Iniciar sesión con Google
      </Button>

      {isFinalizing && (
        <Modal transparent visible animationType="fade">
          <RNView style={{ flex: 1, backgroundColor: "rgba(8,19,13,0.85)", justifyContent: "center", alignItems: "center" }}>
            <Spinner size="large" color="#1FC451" />
            <RNText style={{ color: "#ffffff", fontWeight: "600", marginTop: 16 }}>Completando inicio de sesión...</RNText>
          </RNView>
        </Modal>
      )}
    </>
  );
}