import { useAuth, useUser } from "@clerk/clerk-expo";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { useRouter, useSegments, withLayoutContext } from "expo-router";
import React from "react";
import { Spinner, View } from "tamagui";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from 'expo-network';
import { checkIsOffline } from "@/lib/network";

// Create a JS-based Stack (not Native Stack) for full animation control
const { Navigator } = createStackNavigator();
const JsStack = withLayoutContext(Navigator);

export default function Layout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const segments = useSegments();

  const [isOffline, setIsOffline] = React.useState(false);
  const [networkChecked, setNetworkChecked] = React.useState(false);

  // Guardar sesión cuando estamos online
  React.useEffect(() => {
    if (isSignedIn && user) {
      AsyncStorage.setItem('offline_user_profile', JSON.stringify({
        id: user.id,
        fullName: user.fullName,
        primaryEmailAddress: { emailAddress: user.primaryEmailAddress?.emailAddress },
        unsafeMetadata: user.unsafeMetadata
      }));
      AsyncStorage.setItem('has_offline_session', 'true');
    }
  }, [isSignedIn, user]);

  // Verificar estado de red de forma síncrona y robusta
  React.useEffect(() => {
    let isMounted = true;

    const checkNetwork = async () => {
      const isCurrentlyOffline = await checkIsOffline();
      if (isMounted) {
        setIsOffline(isCurrentlyOffline);
        setNetworkChecked(true);
      }
    };

    // Primera comprobación inmediata
    checkNetwork();

    // En lugar de un intervalo (que gasta batería), escuchamos cuando la app vuelve a estar activa.
    // Esto cubre el caso en el que el usuario baja la barra de notificaciones, cambia el Wi-Fi/Datos y vuelve a la app.
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkNetwork();
      }
    });

    return () => { 
      isMounted = false; 
      subscription.remove();
    };
  }, []);

  // LÓGICA CENTRAL:
  // - effectivelyLoaded: necesitamos saber el estado de red ANTES de decidir algo.
  //   Si estamos offline, no necesitamos que Clerk cargue.
  //   Si estamos online, esperamos a que Clerk termine de cargar.
  const effectivelyLoaded = networkChecked && (isOffline || isLoaded);

  // - effectivelySignedIn: si estamos offline, SIEMPRE dejamos entrar (Guest Offline).
  //   Si estamos online, respetamos lo que diga Clerk.
  const effectivelySignedIn = isOffline || isSignedIn;

  React.useEffect(() => {
    if (!effectivelyLoaded) return;

    const inAuthGroup = segments[1] === "sign-in" || segments[1] === "sign-up";
    const onRegistroTab = segments[1] === "(tabs)" && segments[2] === "registro";

    if (!effectivelySignedIn && !inAuthGroup && !onRegistroTab) {
      router.replace("/sign-in");
    } else if (effectivelySignedIn && inAuthGroup) {
      router.replace("/");
    }
  }, [effectivelySignedIn, effectivelyLoaded, segments]);

  if (!effectivelyLoaded) {
    return (
      <View flex={1} bg="#08130D" style={{ justifyContent: "center", alignItems: "center" }}>
        <Spinner size="large" color="#1FC451" />
      </View>
    );
  }

  return (
    <JsStack
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#08130D" },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: { animation: "timing", config: { duration: 350 } },
          close: { animation: "timing", config: { duration: 350 } },
        },
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      {/* Navegación de tabs (App principal) */}
      <JsStack.Screen name="(tabs)" options={{ headerShown: false, animationEnabled: false }} />
      <JsStack.Screen name="plant/[id]" options={{ headerShown: false, gestureEnabled: false }} />

      {/* Vistas de Autenticación */}
      <JsStack.Screen name="sign-in" options={{ headerShown: false, animationEnabled: false, gestureEnabled: false }} />
      <JsStack.Screen name="sign-up" options={{ headerShown: false, gestureEnabled: false }} />
      <JsStack.Screen name="about" options={{ headerShown: false, gestureEnabled: false }} />
      <JsStack.Screen
        name="alert-modal"
        options={{
          headerShown: false,
          presentation: "modal",
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
    </JsStack>
  );
}
