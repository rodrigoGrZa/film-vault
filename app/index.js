import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Pressable } from "react-native";
import PhotoCard from "../components/PhotoCard";
import { PlusIcon } from "../components/Icons";
import { Stack, Link } from "expo-router";

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 6, paddingVertical: 10 }}>
      <Stack.Screen
              options={{
                headerStyle: { backgroundColor: "#171717" },
                headerTintColor: "#fff",
                headerTitle: "Film Vault",
                headerTitleAlign: "left",
                headerRight: () => <Link href={`/new`} asChild><Pressable><PlusIcon /></Pressable></Link>
              }}
            />
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