import { useAuth } from "@clerk/clerk-expo";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { useRouter, useSegments, withLayoutContext } from "expo-router";
import React from "react";
import { Spinner, View } from "tamagui";

// Create a JS-based Stack (not Native Stack) for full animation control
const { Navigator } = createStackNavigator();
const JsStack = withLayoutContext(Navigator);

export default function Layout() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  // Si Clerk no carga en 4 segundos (sin internet), desbloqueamos con la sesión en caché
  const [offlineUnblocked, setOfflineUnblocked] = React.useState(false);

  React.useEffect(() => {
    if (isLoaded) return; // Si Clerk ya cargó, no necesitamos el timeout
    const timeout = setTimeout(() => {
      setOfflineUnblocked(true);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [isLoaded]);

  const effectivelyLoaded = isLoaded || offlineUnblocked;

  React.useEffect(() => {
    if (!effectivelyLoaded) return;

    // Check if the user is in an auth screen (login/register)
    const inAuthGroup = segments[1] === "sign-in" || segments[1] === "sign-up";

    // Si no hay sesión Y tampoco estamos en auth screens, ir al login
    if (!isSignedIn && !inAuthGroup) {
      router.replace("/sign-in");
    }
    // Si hay sesión y estamos en auth screens, ir al app
    else if (isSignedIn && inAuthGroup) {
      router.replace("/");
    }
  }, [isSignedIn, effectivelyLoaded, segments]);

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
      <JsStack.Screen name="sign-in" options={{ headerShown: false, animationEnabled: false }} />
      <JsStack.Screen name="sign-up" options={{ headerShown: false }} />
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
