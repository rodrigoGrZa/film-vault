import { openDatabaseAsync } from "expo-sqlite";

export const fetchAndSaveFilms = async () => {
  try {
    const response = await fetch("https://filmapi.vercel.app/api/films");
    if (!response.ok) {
      throw new Error(`Error en la consulta a la API: ${response.statusText}`);
    }

    const films = await response.json();
    const db = await openDatabaseAsync("coppermind.db");

    for (const film of films) {
      const { iso, brand, name, formatThirtyFive, color, staticImageUrl } = film;

      await db.runAsync(
        `INSERT INTO FILM (iso, brand, model, is_35mm, is_color, imageUrl) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [iso, brand, name, formatThirtyFive ? 1 : 0, color ? 1 : 0, staticImageUrl]
      );
    }

    console.log("Datos de la API guardados correctamente en la base de datos.");
  } catch (error) {
    console.error("Error al obtener o guardar los datos de la API:", error);
  }
};
