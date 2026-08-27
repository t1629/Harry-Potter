import fetchHp from "../service/Api";

export async function GetAll() {
  const data = await fetchHp("https://hp-api.onrender.com/api/characters");
  return data.map((p, index) => ({ ...p, id: index }));
}

export async function GetCharacter(id, personajes) {
  return personajes.find((p) => p.id === parseInt(id));
}

export async function EditCharacter(id, personajes) {
  return personajes.find((p) => p.id === parseInt(id));
}

export async function CreateCharacter(data, personajes) {
  const newCharacter = { ...data, id: Date.now() };
  return [...personajes, newCharacter];
}
export async function RemoveCharacter(id, personajes) {
  return personajes.find((p) => p.id !== parseInt(id));
}
