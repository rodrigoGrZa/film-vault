import { Text, View, StyleSheet, Pressable, TextInput, Image, Button, Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { SaveIcon } from "../components/Icons";

export default function New() {
  const router = useRouter();
  const db = useSQLiteContext();

  const [image, setImage] = useState({ title: "", location: "", aperture: "f/2.8", iso: "100", time: "1/60", uri: "" });
  const [selectedAperture, setSelectedAperture] = useState("f/2.8");
  const [selectedISO, setSelectedISO] = useState("100");
  const [selectedTime, setSelectedTime] = useState("1/60");

  async function saveData() {
    try {
      if (!image.title || !image.uri) {
        Alert.alert("Error", "Por favor, completa todos los campos y selecciona una imagen.");
        return;
      }

      await db.runAsync(
        `INSERT INTO PHOTOS (title, location, aperture, iso, time, imagePath) VALUES (?, ?, ?, ?, ?, ?)`,
        [image.title, image.location, selectedAperture, selectedISO, selectedTime, image.uri]
      );

      Alert.alert("Éxito", "La foto se ha guardado correctamente.");
      router.back();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la foto.");
    }
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage({ ...image, uri: result.assets[0].uri });
    }
  }

  async function takePhoto() {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage({ ...image, uri: result.assets[0].uri });
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#171717" },
          headerTintColor: "#fff",
          headerTitle: "Nueva Foto",
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable onPress={saveData}>
              <SaveIcon />
            </Pressable>
          ),
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#888"
        value={image.title}
        onChangeText={(text) => setImage({ ...image, title: text })}
      />
      <Button title="Elegir Imagen de la Galería" onPress={pickImage} />
      <Button title="Tomar Foto" onPress={takePhoto} />
      {image.uri ? <Image source={{ uri: image.uri }} style={styles.image} /> : null}

      <TextInput
        style={styles.input}
        placeholder="Ubicación"
        placeholderTextColor="#888"
        value={image.location}
        onChangeText={(text) => setImage({ ...image, location: text })}
      />

      <Text style={styles.label}>Apertura</Text>
      <Picker selectedValue={selectedAperture} onValueChange={(value) => setSelectedAperture(value)} style={styles.picker}>
        <Picker.Item label="f/2.8" value="f/2.8" />
        <Picker.Item label="f/4" value="f/4" />
        <Picker.Item label="f/5.6" value="f/5.6" />
      </Picker>

      <Text style={styles.label}>ISO</Text>
      <Picker selectedValue={selectedISO} onValueChange={(value) => setSelectedISO(value)} style={styles.picker}>
        <Picker.Item label="100" value="100" />
        <Picker.Item label="200" value="200" />
        <Picker.Item label="400" value="400" />
      </Picker>

      <Text style={styles.label}>Tiempo de Exposición</Text>
      <Picker selectedValue={selectedTime} onValueChange={(value) => setSelectedTime(value)} style={styles.picker}>
        <Picker.Item label="1/60" value="1/60" />
        <Picker.Item label="1/125" value="1/125" />
        <Picker.Item label="1/250" value="1/250" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#101010",
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  label: {
    color: "#fff",
    marginTop: 10,
    marginBottom: 5,
  },
  picker: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 15,
  },
});
