import { GOOGLE_API_KEY, LOCATION_IQ, GEOAPIFY } from '@env';

// export function getMapPreview(lat, lng) {
//   const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

//   // console.log(imagePreviewUrl)
//   return imagePreviewUrl;
// }

//GEOAPIFY
export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=400&height=200&center=lonlat%3A${lng}%2C${lat}&zoom=14.3497&marker=lonlat%3A${lng}%2C${lat}%3Btype%3Aawesome%3Bcolor%3A%23bb3f73%3Bsize%3Ax-large%3Bicon%3Apaw%7Clonlat%3A${lng}%2C${lat}%3Btype%3Amaterial%3Bcolor%3A%234c905a%3Bicon%3Atree%3Bicontype%3Aawesome%7Clonlat%3A${lng}%2C${lat}%3Btype%3Amaterial%3Bcolor%3A%234c905a%3Bicon%3Atree%3Bicontype%3Aawesome&apiKey=${GEOAPIFY}`;
  // console.log(imagePreviewUrl)
  return imagePreviewUrl;
}

// export async function getAddress(lat, lng){
//   const url = (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`);

//   const response = await fetch(url);

//   if(!response.ok){
//     throw new Error('Failed to fetch address!')
//   }

//   const data = await response.json();
//   console.log('data: ', data)
//   const address = data.results[0].formatted_address;

//   return address;
// }

//use LocationIQ
export async function getAddress(lat, lng) {
  const url =
    `https://us1.locationiq.com/v1/reverse?key=` +
    LOCATION_IQ +
    `&lat=${lat}&lon=${lng}&format=json&`;

  const response = await fetch(url);

  // console.log(response)

  if (!response.ok) {
    throw new Error('Failed to fetch address!');
  }

  const data = await response.json();
  // console.log('data2: ', data.display_name)
  const address = data.display_name;

  return address;
}
