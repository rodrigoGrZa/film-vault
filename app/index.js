import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import PhotoCard from "../components/PhotoCard";

export default function Index() {
  const [images, setImages] = useState([]);
  const db = useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db]);

  async function getData() {
    const result = await db.getAllAsync(`SELECT * FROM PHOTOS`);
    setImages(result);
  }

  async function deleteImage(id) {
    db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM PHOTOS WHERE id = ?;`, [id]);
      await getData();
    });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 6, paddingVertical: 10 }}>
      {images.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </ScrollView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#101010', 
    color: 'white', 
  },
});