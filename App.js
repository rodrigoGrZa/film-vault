import { useEffect, useState, Suspense } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Loader from "./components/Loader";
import { loadDatabase } from "./services/databaseService";

const Stack = createNativeStackNavigator();

export default function App() {
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
    <NavigationContainer>
      <Suspense fallback={<Loader />}>
        <SQLiteProvider databaseName="coppermind.db" useSuspense>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: "Film Vault",
                headerLargeTitle: true,
                headerStyle: {
                  backgroundColor: '#171717',
                },
                headerTintColor: '#fff'
              }}
            />
          </Stack.Navigator>
        </SQLiteProvider>
      </Suspense>
    </NavigationContainer>
  );
}
