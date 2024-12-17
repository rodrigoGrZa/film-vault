import { View, Text, Image, StyleSheet } from "react-native";

export default function FilmCard({ film }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: film.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.filmName}>
          {film.brand} {film.model}
        </Text>
        <View style={styles.tagsContainer}>
          {film.is_35mm ? <Text style={styles.tag}>35mm</Text> : null}
          <Text style={styles.tag}>{film.is_color ? "color" : "b&w"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: "70%",
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 20,
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  filmName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: 'black',
    color: 'white',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
