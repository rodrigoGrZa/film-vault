import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";

export default function Loader() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación para el círculo
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          { transform: [{ scale: scaleAnim }] },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    width: 70, // Tamaño del círculo
    height: 70,
    borderWidth: 2,
    borderColor: "#000", // color negro del contorno
    borderRadius: 35, // radio para hacerlo circular
  },
});
