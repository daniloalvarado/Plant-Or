import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, H1, H2, Text, XStack, YStack } from "tamagui";

export default function AboutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "#08130D", paddingBottom: insets.bottom }}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { paddingTop: insets.top + 12 },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={22} color="#ffffff" />
        </Pressable>
        <Text style={styles.headerTitle}>Acerca del Proyecto</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap="$5">
          {/* Logo / Hero Card */}
          <Card borderWidth={0} bg="rgba(31,196,81,0.12)" padding="$6">
            <YStack gap="$3" style={{ alignItems: "center" }}>
              <View style={styles.iconContainer}>
                <Feather name="feather" size={36} color="#1FC451" />
              </View>
              <H1 color="#ffffff" style={{ textAlign: "center" }} fontSize={21} lineHeight={28}>
                Catálogo Virtual de Flora Ornamental de Iquitos
              </H1>
              <Text
                color="rgba(255,255,255,0.7)"
                style={{ textAlign: "center" }}
                fontSize={14}
                lineHeight={22}
              >
                Con identificación morfológica asistida
              </Text>
              <View style={styles.badge}>
                <Text color="#1FC451" fontSize={13} fontWeight="700" style={{ textAlign: "center" }}>
                  Actividad de Responsabilidad Social Universitaria
                </Text>
              </View>
            </YStack>
          </Card>

          {/* Presentación */}
          <InfoCard
            icon="info"
            title="Presentación"
            text="Este catálogo organiza el desarrollo de un proyecto de Responsabilidad Social Universitaria en el curso de Botánica Sistemática. Busca articular formación académica, servicio a la comunidad y un producto digital útil para estudiantes, municipalidades, viveristas e instituciones educativas interesadas en la flora ornamental de Iquitos."
          />

          {/* Justificación */}
          <InfoCard
            icon="book-open"
            title="¿Por qué existe esta app?"
            text="Iquitos carece de información sistematizada, accesible y visualmente comparativa sobre sus especies ornamentales desde una perspectiva botánica rigurosa. Este catálogo permite reconocer especies, orientar plantaciones, apoyar procesos educativos y fortalecer la cultura botánica local."
          />

          {/* Objetivo */}
          <InfoCard
            icon="target"
            title="Objetivo"
            text="Desarrollar un catálogo virtual de flora ornamental de Iquitos, basado en caracteres morfológicos y comparación visual, como herramienta formativa y de servicio a la comunidad."
          />

          {/* Qué puedes hacer */}
    <Card borderWidth={0} bg="rgba(255,255,255,0.05)" padding="$5">
            <YStack gap="$4">
              <XStack gap="$3" style={{ alignItems: "center" }}>
                <Feather name="search" size={20} color="#1FC451" />
                <H2 fontSize={17} fontWeight="700" color="#ffffff">
                  ¿Qué puedes hacer aquí?
                </H2>
              </XStack>
              <YStack gap="$3">
                <FeatureItem
                  icon="filter"
                  text="Buscar especies filtrando por hábito y caracteres morfológicos: flor, fruto, semilla, exudado, inflorescencia."
                />
                <FeatureItem
                  icon="image"
                  text="Comparar imágenes de la app con plantas reales y acceder a la ficha técnica completa."
                />
                <FeatureItem
                  icon="file-text"
                  text="Consultar fichas técnicas con nombre científico, familia, descripción morfológica, valor ornamental y galería fotográfica."
                />
                <FeatureItem
                  icon="map-pin"
                  text="Explorar especies de parques, plazas, calles y jardines institucionales de Iquitos."
                />
              </YStack>
            </YStack>
          </Card>

          {/* RSU */}
          <InfoCard
            icon="heart"
            title="Responsabilidad Social"
            text="El proyecto responde al principio de que la universidad debe producir bienes públicos útiles para su entorno. El curso de Botánica Sistemática contribuye con un recurso práctico para la ciudad, fortaleciendo la educación ambiental, la valoración de la flora ornamental y la apropiación social del conocimiento botánico."
          />

          {/* Curso */}
    <Card borderWidth={0} bg="rgba(255,255,255,0.05)" padding="$5">
            <YStack gap="$2">
              <XStack gap="$3" style={{ alignItems: "center" }}>
                <Feather name="award" size={20} color="#1FC451" />
                <H2 fontSize={17} fontWeight="700" color="#ffffff">
                  Información académica
                </H2>
              </XStack>
              <YStack gap="$2" style={{ paddingTop: 8 }}>
                <InfoRow label="Curso" value="Botánica Sistemática" />
                <InfoRow label="Naturaleza" value="Académico, social y tecnológico" />
                <InfoRow label="Ámbito" value="Espacios urbanos y ornamentales de Iquitos" />
                <InfoRow label="Institución" value="Universidad Nacional de la Amazonía Peruana (UNAP)" />
              </YStack>
            </YStack>
          </Card>

          <Pressable onPress={() => Linking.openURL('https://daniloalvarado.com')}>
            <Text
              color="rgba(255,255,255,0.3)"
              fontSize={12}
              style={{ textAlign: "center", textDecorationLine: "underline" }}
            >
              daniloalvarado.com © {new Date().getFullYear()}
            </Text>
          </Pressable>
        </YStack>
      </ScrollView>
    </View>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <Card borderWidth={0} bg="rgba(255,255,255,0.05)" padding="$5">
      <YStack gap="$3">
        <XStack gap="$3" style={{ alignItems: "center" }}>
          <Feather name={icon as any} size={20} color="#1FC451" />
          <H2 fontSize={17} fontWeight="700" color="#ffffff">
            {title}
          </H2>
        </XStack>
        <Text color="rgba(255,255,255,0.7)" fontSize={14} lineHeight={22}>
          {text}
        </Text>
      </YStack>
    </Card>
  );
}

function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <XStack gap="$3" style={{ alignItems: "flex-start" }}>
      <View style={styles.featureIcon}>
        <Feather name={icon as any} size={14} color="#1FC451" />
      </View>
      <Text
        color="rgba(255,255,255,0.7)"
        fontSize={14}
        lineHeight={20}
        flex={1}
      >
        {text}
      </Text>
    </XStack>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <XStack gap="$2" style={{ alignItems: "flex-start" }}>
      <Text color="rgba(255,255,255,0.5)" fontSize={13} width={80}>
        {label}:
      </Text>
      <Text color="rgba(255,255,255,0.85)" fontSize={13} fontWeight="600" flex={1}>
        {value}
      </Text>
    </XStack>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#08130D",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(31,196,81,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(31,196,81,0.4)",
    backgroundColor: "transparent",
  },
  featureIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
});
