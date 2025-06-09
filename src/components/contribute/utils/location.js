export async function geocodePlace(placeName) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=Rosas+56335&format=jsonv2`
  );
  const results = await response.json();

  if (results.length > 0) {
    const { lat, lon } = results[0];
    return [parseFloat(lat), parseFloat(lon)];
  } else {
    throw new Error('No location found');
  }
}
