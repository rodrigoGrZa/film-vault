import { Text, View, StyleSheet, Pressable } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useState, useCallback } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import ImageCard from "../../components/ImageCard";
import PhotoDetails from "../../components/PhotoDetails";
import FilmCard from "../../components/FilmCard";
import { PencilIcon } from "../../components/Icons";

export default function Detail() {
  const { id } = useLocalSearchParams();

  const [image, setImage] = useState({});
  const [film, setFilm] = useState({});
  const db = useSQLiteContext();

  useFocusEffect(
    useCallback(() => {
      db.withTransactionAsync(async () => {
        await getData();
      });
    }, [db, id])
  );

  async function getData() {
    try {
      const photoResult = await db.getFirstAsync(`SELECT * FROM PHOTOS WHERE ID = ?`, [id]);
      setImage(photoResult || {});
      
      if (photoResult) {
        const filmResult = await db.getFirstAsync(`SELECT * FROM FILM WHERE ID = ?`, [photoResult.film_id]);
        setFilm(filmResult || {});
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#171717" },
          headerTintColor: "#fff",
          headerTitle: "Film Vault",
          headerTitleAlign: "center",
          headerRight: () => (
            <Link href={`/edit/${image.id}`} asChild>
              <Pressable>
                <PencilIcon />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Text style={styles.text}>{image.title}</Text>
      <ImageCard photo={image} />
      <PhotoDetails
        location={image.location}
        aperture={image.aperture}
        iso={image.iso}
        shutterSpeed={image.time}
      />
      <View style={styles.divider} />
      <FilmCard film={film} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#101010",
  },
  text: {
    color: "#fff",
    fontSize: 35,
    marginTop: 25,
    marginBottom: 30,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginVertical: 10,
    width: "30%",
    borderRadius: 5,
  },
});
