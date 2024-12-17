import { Text, View, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ImageCard from "../components/ImageCard";
import PhotoDetails from "../components/PhotoDetails";
import FilmCard from "../components/FilmCard";

export default function Detail() {
  const { id } = useLocalSearchParams();

  const [image, setImage] = useState([]);
  const [film, setFilm] = useState([]);
  const db = useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db]);

  async function getData() {
    const photoResult = await db.getFirstAsync(`SELECT * FROM PHOTOS WHERE ID = ?`, [id]);
    setImage(photoResult);
    const filmResult = await db.getFirstAsync(`SELECT * FROM FILM WHERE ID = ?`, [photoResult.film_id]);
    setFilm(filmResult);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{image.title}</Text>
      <ImageCard photo={image} />
      <PhotoDetails
        location={image.location}
        aperture={image.aperture}
        iso={image.iso}
        shutterSpeed={image.time}
      />
      <View style={styles.divider} />
      <FilmCard film={film}/>
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
    borderBottomColor: 'white',
    marginVertical: 10,
    width: '30%',
    borderRadius: 5,
  },
});