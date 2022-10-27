

export default function getRandomArt(count: number) {
    const array = titles;
    const randomArray = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        randomArray.push(array[randomIndex]);
        array.splice(randomIndex, 1);
    }
    return randomArray;
}

export const titles:string[] = [
    "Art 1",
    "Art 1",
    "Art 1",
    "Art 1",
    "Art 1",
    "Art 1",
    "Art 1",
    "Art 1",
  ]
