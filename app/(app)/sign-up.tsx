import Logo from "@/components/Logo";
import { useModal } from "@/contexts/ModalContext";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { showModal } = useModal();

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err: any) {
      // --- BLOQUE DE ERROR MEJORADO ---
      console.log(JSON.stringify(err, null, 2));

      const clerkError = isClerkAPIResponseError(err)
        ? (err as any)
        : null;

      const errorCode = clerkError?.errors[0]?.code;
      const originalMessage = (clerkError?.errors[0]?.longMessage || clerkError?.errors[0]?.message || "").toLowerCase();

      let errorMessage = "Ups, ocurrió un error, ¡por favor intenta de nuevo!";

      if (errorCode === "form_identifier_exists" || originalMessage.includes("taken") || originalMessage.includes("already exists")) {
        errorMessage = "Este correo electrónico ya está registrado.";
      } else if (errorCode === "form_password_validation_failed" || originalMessage.includes("password")) {
        errorMessage = "La contraseña debe tener al menos 8 caracteres.";
      } else if (errorCode === "form_identifier_invalid" || originalMessage.includes("identifier is invalid")) {
        errorMessage = "El correo electrónico no es válido. Ejemplo: usuario@correo.com";
      } else if (errorCode === "form_param_nil" || originalMessage.includes("enter email address")) {
        errorMessage = "Por favor, ingresa tu correo electrónico.";
      } else if (clerkError?.errors[0]) {
        errorMessage = clerkError.errors[0].longMessage || clerkError.errors[0].message;
      }

      showModal({
        type: "alert",
        title: "Atención",
        description: errorMessage,
      });
      // -------------------------------
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.log(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      // También mejoramos el error aquí por si acaso
      console.log(JSON.stringify(err, null, 2));

      let errorMessage = "El código de verificación es incorrecto";

      if (isClerkAPIResponseError(err)) {
        errorMessage = err.errors[0]?.longMessage || err.errors[0]?.message || errorMessage;
      }

      showModal({
        type: "alert",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#08130D" }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "android" ? 30 : 0}
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
                  Verifica tu correo
                </H1>
                <Paragraph
                  color="rgba(255,255,255,0.7)"
                  style={{ textAlign: "center" }}
                >
                  Hemos enviado un código de verificación a {emailAddress}
                </Paragraph>
              </YStack>

              <Card padding="$4" gap="$2" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
                <YStack gap="$2">
                  <YStack gap="$2">
                    <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Código de verificación</Label>
                    <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                      value={code}
                      placeholder="Ingresa el código"
                      onChangeText={setCode}
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      focusStyle={{
                        borderColor: "#1FC451",
                      }}
                      style={{ color: "#ffffff" }}
                      keyboardType="numeric"
                      autoComplete="one-time-code"
                    />
                  </YStack>

                  <Spacer />

                  <Button
                    size="$4"
                    bg="#1FC451"
                    color="white"
                    borderColor="#1FC451"
                    pressStyle={{ bg: "#17993E", borderColor: "#17993E" }}
                    onPress={onVerifyPress}
                    disabled={!isLoaded || isLoading}
                    opacity={!isLoaded || isLoading ? 0.5 : 1}
                  >
                    {isLoading ? "Verificando..." : "Verificar correo"}
                  </Button>
                </YStack>
              </Card>

              <XStack
                gap="$2"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Paragraph color="rgba(255,255,255,0.7)">
                  ¿No recibiste el código?
                </Paragraph>
                <Button
                  variant="outlined"
                  size="$3"
                  borderColor="#1FC451"
                  color="#1FC451"
                  onPress={() => setPendingVerification(false)}
                >
                  Reenviar
                </Button>
              </XStack>
            </YStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#08130D" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 30 : 0}
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
                Crear cuenta
              </H1>
              <Paragraph
                color="rgba(255,255,255,0.7)"
                style={{ textAlign: "center" }}
              >
                Regístrate para comenzar
              </Paragraph>
            </YStack>

            <Card padding="$4" gap="$2" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
              <YStack gap="$2">
                <YStack gap="$2">
                  <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Correo electrónico</Label>
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
                  <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Contraseña</Label>
                  <YStack style={{ position: "relative", width: "100%", justifyContent: "center" }}>
                    <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                      secureTextEntry={!showPassword}
                      value={password}
                      placeholder="Crea una contraseña"
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
                    <Button
                      style={{ position: "absolute", right: 4 }}
                      size="$3"
                      chromeless
                      onPress={() => setShowPassword(!showPassword)}
                      icon={<Feather name={showPassword ? "eye" : "eye-off"} size={20} color="rgba(255,255,255,0.5)" />}
                    />
                  </YStack>
                </YStack>

                <Spacer />

                <Button
                  size="$4"
                  bg="#1FC451"
                  color="white"
                  borderColor="#1FC451"
                  pressStyle={{ bg: "#17993E", borderColor: "#17993E" }}
                  onPress={onSignUpPress}
                  disabled={!isLoaded || isLoading}
                  opacity={!isLoaded || isLoading ? 0.5 : 1}
                >
                  {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                </Button>
              </YStack>
            </Card>

            <XStack
              gap="$2"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Paragraph color="rgba(255,255,255,0.7)">
                ¿Ya tienes una cuenta?
              </Paragraph>

              <Button
                variant="outlined"
                size="$3"
                borderColor="#1FC451"
                color="#1FC451"
                onPress={() => {
                  if (router.canGoBack()) {
                    router.back();
                  } else {
                    router.replace("/sign-in");
                  }
                }}
              >
                Iniciar sesión
              </Button>
            </XStack>
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}