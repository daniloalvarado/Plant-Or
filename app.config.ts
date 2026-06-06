export default {
  expo: {
    name: "PLANT-OR",
    slug: "plant-or",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo_unap.png",
    scheme: "plant-or",
    userInterfaceStyle: "dark",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.plantor.app",
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: "server",
      favicon: "./assets/images/logo_unap.png",
    },
    plugins: [
      "expo-router",
      "expo-secure-store",
      "expo-web-browser",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/logo_unap.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      [
        "expo-image-picker",
        {
          "cameraPermission": "PLANT-OR necesita acceder a tu cámara para capturar las fotos obligatorias de la planta.",
          "photosPermission": "PLANT-OR necesita acceder a tu galería para subir fotos de plantas."
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "PLANT-OR necesita tu ubicación GPS para mapear exactamente dónde está la planta."
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      eas: {
        "projectId": "3ecbf864-5fec-4a82-a82d-e3a8a7bcccb5"
      }
    }
  },
};