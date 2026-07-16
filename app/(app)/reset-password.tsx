import Logo from "@/components/Logo";
import { useModal } from "@/contexts/ModalContext";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { ClerkAPIResponseError } from "@clerk/types";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Keyboard, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  Card,
  H1,
  Input,
  Label,
  Paragraph,
  XStack,
  YStack,
} from "tamagui";

export default function ResetPasswordPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  const { showModal } = useModal();

  // Handle the submission to send the reset code
  const onRequestReset = async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });

      setSuccessfulCreation(true);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle the submission to verify the code and set the new password
  const onResetPassword = async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (result.status === "complete") {
        showModal({
          type: "dialog",
          title: "¡Éxito!",
          description: "Tu contraseña ha sido restablecida correctamente.",
          cancelText: "Continuar",
          onCancel: async () => {
            await setActive({ session: result.createdSessionId });
          },
        });
      } else {
        console.log(result);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (err: any) => {
    const clerkError = isClerkAPIResponseError(err)
      ? (err as ClerkAPIResponseError)
      : null;

    const errorCode = clerkError?.errors[0]?.code;
    const originalMessage = clerkError?.errors[0]?.longMessage || clerkError?.errors[0]?.message || "";

    let errorMessage = "Ups, ocurrió un error, ¡por favor intenta de nuevo!";

    if (errorCode === "form_identifier_not_found") {
      errorMessage = "No se encontró ninguna cuenta con este correo electrónico.";
    } else if (errorCode === "form_password_length_too_short") {
      errorMessage = "La contraseña debe tener al menos 8 caracteres.";
    } else if (errorCode === "form_code_incorrect") {
      errorMessage = "El código de verificación es incorrecto.";
    } else if (originalMessage.includes("already signed in") || errorCode === "session_exists") {
      errorMessage = "Ya tienes una sesión iniciada. Por favor, cierra sesión primero antes de restablecer tu contraseña.";
    } else if (originalMessage.toLowerCase().includes("data breach") || errorCode === "form_password_pwned") {
      errorMessage = "Por seguridad, no puedes usar esta contraseña porque ha sido expuesta en filtraciones de datos de internet. Por favor, elige una contraseña diferente y más segura.";
    } else if (clerkError?.errors[0]) {
      errorMessage = originalMessage;
    }

    showModal({
      type: "dialog",
      title: "Error",
      description: errorMessage,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#08130D", paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <XStack p="$4" style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
          <Feather name="arrow-left" size={24} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
      </XStack>

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
            style={{ justifyContent: "center", minHeight: "100%", paddingBottom: 100 }}
          >
            <Logo />

            <YStack gap="$2" style={{ alignItems: "center" }}>
              <H1 color="#ffffff" style={{ textAlign: "center", fontSize: 28 }}>
                Restablecer Contraseña
              </H1>
              <Paragraph
                color="rgba(255,255,255,0.7)"
                style={{ textAlign: "center" }}
              >
                {!successfulCreation
                  ? "Ingresa tu correo para recibir un código de verificación"
                  : "Ingresa el código que enviamos a tu correo y tu nueva contraseña"}
              </Paragraph>
            </YStack>

            <Card padding="$4" gap="$2" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0} mt="$4">
              {!successfulCreation ? (
                <YStack gap="$4">
                  <YStack gap="$2">
                    <Label color="#ffffff" hoverStyle={{ color: "#ffffff" }} pressStyle={{ color: "#ffffff" }}>Correo electrónico</Label>
                    <Input
                      cursorColor="#ffffff"
                      selectionColor="#0D5E26"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      value={emailAddress}
                      placeholder="usuario@correo.com"
                      onChangeText={setEmailAddress}
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      focusStyle={{ borderColor: "#1FC451" }}
                    />
                  </YStack>

                  <Button
                    size="$4"
                    bg="#1FC451"
                    color="white"
                    borderColor="#1FC451"
                    pressStyle={{ bg: "#17993E", borderColor: "#17993E" }}
                    onPress={onRequestReset}
                    disabled={!isLoaded || isLoading || emailAddress === ""}
                    opacity={(!isLoaded || isLoading || emailAddress === "") ? 0.5 : 1}
                  >
                    {isLoading ? "Enviando..." : "Enviar Código"}
                  </Button>
                </YStack>
              ) : (
                <YStack gap="$4">
                  <YStack gap="$2">
                    <Label color="#ffffff" hoverStyle={{ color: "#ffffff" }} pressStyle={{ color: "#ffffff" }}>Código de Verificación</Label>
                    <Input
                      cursorColor="#ffffff"
                      selectionColor="#0D5E26"
                      keyboardType="number-pad"
                      value={code}
                      placeholder="123456"
                      onChangeText={setCode}
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      focusStyle={{ borderColor: "#1FC451" }}
                    />
                  </YStack>

                  <YStack gap="$2">
                    <Label color="#ffffff" hoverStyle={{ color: "#ffffff" }} pressStyle={{ color: "#ffffff" }}>Nueva Contraseña</Label>
                    <YStack style={{ position: "relative", width: "100%", justifyContent: "center" }}>
                      <Input
                        cursorColor="#ffffff"
                        selectionColor="#0D5E26"
                        secureTextEntry={!showPassword}
                        value={password}
                        placeholder="Mínimo 8 caracteres"
                        onChangeText={setPassword}
                        borderWidth={0}
                        bg="rgba(255,255,255,0.05)"
                        color="#ffffff"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        focusStyle={{ borderColor: "#1FC451" }}
                        style={{ paddingRight: 45 }}
                      />
                      <TouchableOpacity
                        style={{ position: "absolute", right: 8, padding: 8, justifyContent: "center", height: "100%" }}
                        activeOpacity={0.6}
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="rgba(255,255,255,0.5)" />
                      </TouchableOpacity>
                    </YStack>
                  </YStack>

                  <Button
                    size="$4"
                    bg="#1FC451"
                    color="white"
                    borderColor="#1FC451"
                    pressStyle={{ bg: "#17993E", borderColor: "#17993E" }}
                    onPress={onResetPassword}
                    disabled={!isLoaded || isLoading || code === "" || password === ""}
                    opacity={(!isLoaded || isLoading || code === "" || password === "") ? 0.5 : 1}
                  >
                    {isLoading ? "Guardando..." : "Guardar Nueva Contraseña"}
                  </Button>
                </YStack>
              )}
            </Card>
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
