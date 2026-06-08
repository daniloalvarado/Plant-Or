export default {
  expo: {
    name: "PLANT-OR",
    slug: "plant-or",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/Plant-Or.png",
    scheme: "plant-or",
    userInterfaceStyle: "dark",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.plantor.app",
      adaptiveIcon: {
        backgroundColor: "#ffffff",
        foregroundImage: "./assets/images/Plant-Or.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: "server",
      favicon: "./assets/images/Plant-Or.png",
    },
    plugins: [
      "expo-router",
      "expo-secure-store",
      "expo-web-browser",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/Plant-Or.png",
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
        projectId: "fcbd8109-d7d2-4653-b034-e2235a312515"
      }
    }
  },
};