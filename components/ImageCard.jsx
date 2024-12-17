import { View, StyleSheet, ImageBackground, Text } from "react-native";

export default function ImageCard({ photo }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: photo.imagePath }} style={styles.image}>
        <View style={styles.textContainer}>
          <Text style={styles.date}>{photo.shot_at}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 360,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  textContainer: {
    backgroundColor: 'black',
    padding: 2,
    width: '100%',
    paddingRight: 10,
  },
  date: {
    color: '#F4962A',
    textAlign: 'right',
    fontSize: 14,
  },
});
