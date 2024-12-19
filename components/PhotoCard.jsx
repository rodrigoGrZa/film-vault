import { Link } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

export default function PhotoCard({ photo }) {
  return (
    <Link href={`/detail/${photo.id}`} asChild>
      <Pressable>
        <View key={photo.id} style={styles.card}>
          <Image source={{ uri: photo.imagePath }} style={styles.image} />
          <View style={styles.infoContainer}>
            <View style={styles.detailsRow}>
              <Text style={styles.tag}>{photo.shot_at.slice(11, 16)}</Text>
              <Text style={styles.tag}>f/{photo.aperture}</Text>
              <Text style={styles.tag}>{photo.time}</Text>
              <Text style={styles.tag}>ISO {photo.iso}</Text>
            </View>
            <Text style={styles.title}>{photo.title}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 10,
    elevation: 3,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    width: "100%"
  },
  image: {
    width: "100%",
    height: 200,
  },
  infoContainer: {
    padding: 10,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tag: {
    backgroundColor: "#333",
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});
