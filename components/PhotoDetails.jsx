import { View, Text, StyleSheet } from "react-native";
import { LocationIcon, ApertureIcon, FilmIcon, TimerIcon } from "./Icons";

export default function PhotoDetails({ location, aperture, iso, shutterSpeed }) {
    return (
        <View style={styles.detailsContainer}>
            <View style={styles.row}>
                <View style={styles.detailItem}>
                    <LocationIcon style={styles.iconStyle} />
                    <Text style={styles.detailText}>{location}</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.detailItem}>
                    <ApertureIcon style={styles.iconStyle} />
                    <Text style={styles.detailText}>F/{aperture}</Text>
                </View>

                <View style={styles.detailItem}>
                    <FilmIcon style={styles.iconStyle} />
                    <Text style={styles.detailText}>ISO {iso}</Text>
                </View>

                <View style={styles.detailItem}>
                    <TimerIcon style={styles.iconStyle} />
                    <Text style={styles.detailText}>{shutterSpeed}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        marginTop: 5,
        width: "85%",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
    detailItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconStyle: {
        marginRight: 5,
        color: "#F4962A",
    },
    detailText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "left"
    },
});
