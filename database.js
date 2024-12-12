// database.js
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { openDatabaseAsync } from "expo-sqlite";

const DB_NAME = "coppermind.db";
const DB_FILE_PATH = `${FileSystem.documentDirectory}SQLite/${DB_NAME}`;
const DB_ASSET = require("./assets/coppermind.db");

const ensureDatabaseDirectory = async () => {
  await FileSystem.makeDirectoryAsync(
    `${FileSystem.documentDirectory}SQLite`,
    { intermediates: true }
  );
};

const copyDatabaseAsset = async () => {
  const dbUri = Asset.fromModule(DB_ASSET).uri;
  await FileSystem.downloadAsync(dbUri, DB_FILE_PATH);
};

const createInitialTables = async (db) => {
  await db.runAsync(`CREATE TABLE IF NOT EXISTS FOTOS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    imagePath TEXT NOT NULL
  );`);
};

const insertInitialImages = async (db) => {
  const images = [
    {
      title: "Edificios Azules",
      description: "Magníficos edificios azules",
      assetPath: require("./assets/image.jpeg"),
    },
  ];

  const imagesDir = `${FileSystem.documentDirectory}images`;
  const dirInfo = await FileSystem.getInfoAsync(imagesDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imagesDir, { intermediates: true });
  }

  for (const image of images) {
    const localImagePath = `${imagesDir}/${image.title}.jpeg`;
    const asset = Asset.fromModule(image.assetPath);
    await asset.downloadAsync();
    const assetUri = asset.localUri || asset.uri;

    await FileSystem.copyAsync({
      from: assetUri,
      to: localImagePath,
    });

    await db.runAsync(
      "INSERT INTO FOTOS (title, description, imagePath) VALUES (?, ?, ?)",
      [image.title, image.description, localImagePath]
    );
  }
};

export const loadDatabase = async () => {
  const fileInfo = await FileSystem.getInfoAsync(DB_FILE_PATH);

  if (!fileInfo.exists) {
    await ensureDatabaseDirectory();
    await copyDatabaseAsset();
    const db = await openDatabaseAsync(DB_NAME);
    await createInitialTables(db);
    await insertInitialImages(db);
  }
};
