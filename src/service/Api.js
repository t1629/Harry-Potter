export default async function fetchHp(url, options = {}) {
  try {
    const responsive = await fetch(url, options);
    if (!responsive.ok) throw new Error(`Error HTTP: ${responsive.status}`);
    const data = await responsive.json();
    return data;
  } catch (error) {
    console.error(
      "Surgio un error al obtener los datos de los perosnajes",
      error,
    );
    throw error;
  }
}
