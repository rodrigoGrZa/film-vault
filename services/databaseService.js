import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { openDatabaseAsync } from "expo-sqlite";
import { fetchAndSaveFilms } from "./filmService";

export const loadDatabase = async () => {
  const dbName = "coppermind.db";
  const dbAsset = require("../assets/coppermind.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);

  if (!fileInfo.exists) {
    await createDatabaseDirectory();
    await FileSystem.downloadAsync(dbUri, dbFilePath);
    const db = await initializeDatabase();
    await insertInitialData(db);
  }
};

const createDatabaseDirectory = async () => {
  await FileSystem.makeDirectoryAsync(
    `${FileSystem.documentDirectory}SQLite`,
    { intermediates: true }
  );
};

const initializeDatabase = async () => {
  const db = await openDatabaseAsync("coppermind.db");

  await db.runAsync(`CREATE TABLE IF NOT EXISTS PHOTOS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    imagePath TEXT NOT NULL,
    location TEXT NOT NULL,
    aperture REAL NOT NULL,
    iso INTEGER NOT NULL,
    time TEXT NOT NULL,
    film_id INTEGER,
    shot_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (film_id) REFERENCES FILM(id)
  );`);

  await db.runAsync(`CREATE TABLE IF NOT EXISTS FILM (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    iso INTEGER NOT NULL,
    brand TEXT NOT NULL,
    model TEXT,
    is_35mm BOOLEAN NOT NULL,
    is_color BOOLEAN NOT NULL,
    process TEXT NOT NULL,
    imageUrl TEXT
  );`);

  return db;
};

const insertInitialData = async (db) => {
  const images = [
    {
      title: "Edificios Azules",
      assetPath: require("../assets/image.jpeg"),
      location: "Avenida monelos 91, 15009",
      aperture: 2.0,
      iso: 200,
      time: "1/125",
      film_id: 1,
    },
    {
      title: "Edificios Azules",
      assetPath: require("../assets/image.jpeg"),
      location: "Avenida monelos 91, 15009",
      aperture: 2.0,
      iso: 200,
      time: "1/125",
      film_id: 1,
    },
    {
      title: "Edificios Azules",
      assetPath: require("../assets/image.jpeg"),
      location: "Avenida monelos 91, 15009",
      aperture: 2.0,
      iso: 200,
      time: "1/125",
      film_id: 1,
    },
    {
      title: "Edificios Azules",
      assetPath: require("../assets/image.jpeg"),
      location: "Avenida monelos 91, 15009",
      aperture: 2.0,
      iso: 200,
      time: "1/125",
      film_id: 1,
    },
    {
      title: "Edificios Azules",
      assetPath: require("../assets/image.jpeg"),
      location: "Avenida monelos 91, 15009",
      aperture: 2.0,
      iso: 200,
      time: "1/125",
      film_id: 1,
    },
  ];

  await fetchAndSaveFilms();

  for (const image of images) {
    await saveImageAndInsertData(db, image);
  }
};

const saveImageAndInsertData = async (db, image) => {
  const imageDirectory = `${FileSystem.documentDirectory}images`;
  const localImagePath = `${imageDirectory}/${image.title}.jpeg`;

  const dirInfo = await FileSystem.getInfoAsync(imageDirectory);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imageDirectory, { intermediates: true });
  }

  const asset = Asset.fromModule(image.assetPath);
  await asset.downloadAsync();
  const assetUri = asset.localUri || asset.uri;

  await FileSystem.copyAsync({ from: assetUri, to: localImagePath });

  await db.runAsync(
    `INSERT INTO PHOTOS (title, imagePath, location, aperture, iso, time, film_id) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [image.title, localImagePath, image.location, image.aperture, image.iso, image.time, image.film_id]
  );
};
