import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SQLiteProvider } from "expo-sqlite";
import Loader from "../components/Loader";
import { loadDatabase } from "../services/databaseService";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const prepareApp = async () => {
            try {
                await loadDatabase();
                setIsReady(true);
            } catch (error) {
                console.error("Error inicializando la base de datos:", error);
            }
        };

        prepareApp();
    }, []);

    if (!isReady) {
        return <Loader />;
    }
    return (
        <View style={styles.container}>
            <SQLiteProvider databaseName="coppermind.db" useSuspense>
                <Stack
                    screenOptions={{
                        headerStyle: { backgroundColor: "#171717" },
                        headerTintColor: "#fff",
                        headerTitle: "Film Vault",
                    }}
                />
            </SQLiteProvider>
            <StatusBar style="light" backgroundColor="transparent" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101010",
    },
});
