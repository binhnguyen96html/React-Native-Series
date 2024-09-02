import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

// const database = SQLite.openDatabaseAsync('places.db');

// export function init() {

//   const promise = new Promise((resolve, reject) => {
//     database.transaction((tx) => {
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS places(
//         id INTEGER PRIMARY KEY NOT NULL,
//         title TEXT NOT NULL,
//         imageUri TEXT NOT NULL,
//         address TEXT NOT NULL,
//         lat REAL NOT NULL,
//         lng REAL NOT NULL
//       )`,
//         [],
//         () => {
//           resolve();
//         },
//         (_, error) => {
//           reject(error);
//         }
//       );
//     });
//   });

//   return promise;
// }

const database = SQLite.openDatabaseSync('places.db');

// export function init() {
//   return database.runAsync(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY NOT NULL,
//             title TEXT NOT NULL,
//             imageUri TEXT NOT NULL,
//             address TEXT NOT NULL,
//             lat REAL NOT NULL,
//             lng REAL NOT NULL
//         )
//     `);
// }

export async function init() {
  try {
    await database.runAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )
    `);
    console.log('Table created or already exists.');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error; // Re-throw the error after logging it
  }
}

export async function insertPlace(place) {
  try {
    const result = await database.runAsync(
      `
      INSERT INTO places (title, imageUri, address, lat, lng)
      VALUES (?,?,?,?,?)
    `,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );
    console.log('result: ', result);
  } catch (error) {
    console.error('Error inserting place:', error);
    throw error; // Re-throw the error after logging it
  }
}

export async function fetchPlaces() {
  try {
    const allRows = await database.getAllAsync('SELECT * FROM places');
    const places = [];
    for (const row of allRows) {
      console.log('row: ', row);
      places.push(
        new Place(
          row.title,
          row.imageUri,
          {
            address: row.address,
            lat: row.lat,
            lng: row.lng,
          },
          row.id
        )
      );
    }
    console.log('places: ', places);

    return places;
  } catch (error) {
    console.log('Error fetching places: ', error);
    throw error;
  }
}

export async function fetchPlaceDetails(id) {
  try {
    const row = await database.getFirstAsync(
      `SELECT * FROM places WHERE id = ?`,
      id
    );

    const place = new Place(
      row.title,
      row.imageUri,
      {
        lat: row.lat,
        lng: row.lng,
        address: row.address,
      },
      row.id
    );

    console.log('place: ', place);

    return place;
  } catch (error) {
    console.log('Error in fetch place details: ', error);
    throw error;
  }
}
