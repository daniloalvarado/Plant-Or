import Logo from "@/components/Logo";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { useModal } from "@/contexts/ModalContext";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { ClerkAPIResponseError } from "@clerk/types";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { checkIsOffline } from "@/lib/network";
import {
  Button,
  Card,
  H1,
  Input,
  Label,
  Paragraph,
  Spacer,
  XStack,
  YStack,
} from "tamagui";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    checkIsOffline().then(setIsOffline);
  }, []);

  const { showModal } = useModal();

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.log(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling

      const clerkError = isClerkAPIResponseError(err)
        ? (err as ClerkAPIResponseError)
        : null;

      const errorCode = clerkError?.errors[0]?.code;
      const originalMessage = clerkError?.errors[0]?.longMessage || clerkError?.errors[0]?.message || "";

      let errorMessage = "Ups, ocurrió un error, ¡por favor intenta de nuevo!";

      if (isClerkAPIResponseError(err)) {
        if (originalMessage.toLowerCase().includes("already signed in")) {
          // GHOST SESSION DETECTED: Auto-recover by wiping the session and retrying
          try {
            await setActive({ session: null });
            const retryAttempt = await signIn.create({ identifier: emailAddress, password });
            if (retryAttempt.status === "complete") {
              await setActive({ session: retryAttempt.createdSessionId });
              setIsLoading(false);
              return;
            }
          } catch (retryErr) {
            console.log("Retry failed", retryErr);
          }
          errorMessage = "Ya tienes una sesión iniciada. Por favor, cierra sesión primero.";
        }
      }

      if (errorCode === "form_identifier_invalid" || originalMessage.toLowerCase().includes("identifier is invalid")) {
        errorMessage = "El correo electrónico no es válido. Ejemplo: usuario@correo.com";
      } else if (errorCode === "form_password_incorrect" || originalMessage.toLowerCase().includes("password is incorrect") || originalMessage.toLowerCase().includes("password or email address is incorrect")) {
        errorMessage = "El correo o la contraseña son incorrectos. Por favor, inténtalo de nuevo.";
      } else if (errorCode === "form_identifier_not_found") {
        errorMessage = "No se encontró ninguna cuenta con este correo electrónico.";
      } else if (errorCode === "form_param_nil" || originalMessage.toLowerCase().includes("enter email address")) {
        errorMessage = "Por favor, ingresa tu correo electrónico.";
      } else if (errorCode === "too_many_requests" || originalMessage.toLowerCase().includes("too many")) {
        errorMessage = "Demasiados intentos. Por favor espera un momento e inténtalo de nuevo.";
      } else if (originalMessage.toLowerCase().includes("monthly limit for email messages")) {
        errorMessage = "Se ha alcanzado el límite mensual de correos. Contacta al administrador.";
      } else if (errorCode === "user_quota_exceeded" || originalMessage.toLowerCase().includes("limit of 100 users")) {
        errorMessage = "Límite de 100 usuarios en modo de prueba alcanzado. No es posible crear más cuentas hasta pasar a Producción.";
      } else if (clerkError?.errors[0]) {
        errorMessage = originalMessage; // Fallback to original message if not specifically handled
      }

      showModal({
        type: "dialog",
        title: "Error",
        description: errorMessage,
        onCancel: () => {
          setIsLoading(false);
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#08130D" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"

      >
        <ScrollView
          style={{ flex: 1, backgroundColor: "#08130D" }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <YStack
            flex={1}
            p="$4"
            gap="$4"
            style={{ justifyContent: "center", minHeight: "100%" }}
          >
            <Logo />

            <YStack gap="$2" style={{ alignItems: "center" }}>
              <H1 color="#ffffff" style={{ textAlign: "center" }}>
                Bienvenido
              </H1>
              <Paragraph
                color="rgba(255,255,255,0.7)"
                style={{ textAlign: "center" }}
              >
                Inicia sesión en Plant-Or para explorar
              </Paragraph>
            </YStack>

            <Card padding="$4" gap="$2" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
              <YStack gap="$2">
                <YStack gap="$2">
                  <Label color="#ffffff" hoverStyle={{ color: "#ffffff" }} pressStyle={{ color: "#ffffff" }}>Correo electrónico</Label>
                  <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={emailAddress}
                    placeholder="Ingresa tu correo"
                    onChangeText={setEmailAddress}
                    borderWidth={0}
                    bg="rgba(255,255,255,0.05)"
                    color="#ffffff"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    focusStyle={{
                      borderColor: "#1FC451",
                    }}
                    style={{ color: "#ffffff" }}
                  />
                </YStack>

                <YStack gap="$2">
                  <Label color="#ffffff" hoverStyle={{ color: "#ffffff" }} pressStyle={{ color: "#ffffff" }}>Contraseña</Label>
                  <YStack style={{ position: "relative", width: "100%", justifyContent: "center" }}>
                    <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                      secureTextEntry={!showPassword}
                      value={password}
                      placeholder="Ingresa tu contraseña"
                      onChangeText={setPassword}
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      focusStyle={{
                        borderColor: "#1FC451",
                      }}
                      style={{ paddingRight: 45, color: "#ffffff" }}
                    />
                    <TouchableOpacity
                      style={{ position: "absolute", right: 8, padding: 8, justifyContent: "center", height: "100%" }}
                      activeOpacity={0.6}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="rgba(255,255,255,0.5)" />
                    </TouchableOpacity>
                  </YStack>
                  <XStack style={{ justifyContent: "flex-end" }} mt="$1">
                    <TouchableOpacity
                      style={{ padding: 4 }}
                      activeOpacity={0.6}
                      onPress={() => router.push("/reset-password")}
                    >
                      <Paragraph color="#1FC451" fontSize={13}>¿Olvidaste tu contraseña?</Paragraph>
                    </TouchableOpacity>
                  </XStack>
                </YStack>

                <Spacer size="$2" />

                <Button
                  size="$4"
                  bg="#1FC451"
                  color="white"
                  borderColor="#1FC451"
                  pressStyle={{ bg: "#17993E", borderColor: "#17993E" }}
                  onPress={onSignInPress}
                  disabled={!isLoaded || isLoading}
                  opacity={!isLoaded || isLoading ? 0.5 : 1}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>

                <SignInWithGoogle />
              </YStack>
            </Card>

            <XStack
              gap="$2"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Paragraph color="rgba(255,255,255,0.7)">
                ¿No tienes una cuenta?
              </Paragraph>
              <Button
                variant="outlined"
                size="$3"
                borderColor="#1FC451"
                color="#1FC451"
                onPress={() => router.push("/sign-up")}
              >
                Regístrate
              </Button>
            </XStack>

            {isOffline && (
              <>
                <Spacer size="$4" />

                <Button
                  variant="outlined"
                  size="$4"
                  borderColor="rgba(255,255,255,0.2)"
                  color="#ffffff"
                  bg="rgba(255,255,255,0.05)"
                  pressStyle={{ bg: "rgba(255,255,255,0.1)" }}
                  icon={<Feather name="wifi-off" size={18} color="#ffffff" />}
                  onPress={() => router.replace("/registro")}
                >
                  Entrar en Modo Offline
                </Button>
              </>
            )}
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
