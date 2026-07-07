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

  const [forceLoaded, setForceLoaded] = React.useState(false);

  React.useEffect(() => {
    // Si sabemos de inmediato que estamos offline (usando el ping 204), no esperamos a Clerk.
    checkIsOffline().then(isOffline => {
      if (isOffline) {
        setForceLoaded(true);
      }
    });
    
    // Timeout máximo de 1.5s por si acaso (para no bloquear nunca la UI)
    const timer = setTimeout(() => {
      setForceLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // LÓGICA CENTRAL:
  const effectivelyLoaded = isLoaded || forceLoaded;
  const effectivelySignedIn = isLoaded ? isSignedIn : false;

  React.useEffect(() => {
    if (!effectivelyLoaded) return;

    const inAuthGroup = segments[1] === "sign-in" || segments[1] === "sign-up";
    const isGuestTab = segments[1] === "(tabs)" && (segments[2] === "registro" || segments[2] === "sync" || segments[2] === "profile");

    if (!effectivelySignedIn && !inAuthGroup && !isGuestTab) {
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
