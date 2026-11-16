import fetchHp from "../service/Api";
import personajes from "../data/Characters.json";

export async function GetAll() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return personajes.map((p, index) => ({
    ...p,
    id: index,
  }));
}

export async function GetCharacter(id, personajes) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return personajes.find((p) => p.id === parseInt(id));
}
export async function CreateCharacter(data, personajes) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newCharacter = {
    ...data,
    id: Date.now(),
  };

  return [...personajes, newCharacter];
}
export async function EditCharacter(id, data, personajes) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return personajes.map((p) => (p.id === parseInt(id) ? { ...p, ...data } : p));
}

export async function RemoveCharacter(id, personajes) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return personajes.filter((p) => p.id !== parseInt(id));
}
