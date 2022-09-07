export const numOfImage = [6,9,12,15];
export const bestTime = [0,0,0,0];

const cardImages =[
    {"src":"/images/rick.jpeg" , matched: false},
    {"src":"/images/morty.jpeg", matched: false},
    {"src":"/images/beth.jpg", matched: false},
    {"src":"/images/jerry.jpeg", matched: false},
    {"src":"/images/jessica.jpeg", matched: false},
    {"src":"/images/summer.jpeg", matched: false},
    {"src":"/images/evil morty.jpeg", matched: false},
    {"src":"/images/toxic rick.jpeg", matched: false},
    {"src":"/images/aqua morty.jpeg", matched: false},
    {"src":"/images/black rick.jpeg", matched: false},
    {"src":"/images/cool rick.jpeg", matched: false},
    {"src":"/images/birdperson.jpeg", matched: false},
    {"src":"/images/brad.jpeg", matched: false},
    {"src":"/images/glenn.jpeg", matched: false},
    {"src":"/images/jerry2.jpeg", matched: false},
    {"src":"/images/mortyGlass.jpeg", matched: false},
    {"src":"/images/pickle.jpeg", matched: false},
    {"src":"/images/summer2.jpeg", matched: false},
    {"src":"/images/beth2.jpeg", matched: false}
]
const randomImages = (numOfImage,i) =>{
    return cardImages.sort(() => Math.random() - 0.5).slice(0,numOfImage[i])

}
export const cardImagesAllLevels = [
    randomImages(numOfImage,0),
    randomImages(numOfImage,1),
    randomImages(numOfImage,2),
    randomImages(numOfImage,3)
]


