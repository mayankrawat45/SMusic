console.log("hey this is working")

// intializing variables
let index = 0;
let audioElement = new Audio('audio/0.mp3')
let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("myProgressBar")
let gif = document.getElementById("gif")
let songItem = Array.from(document.getElementsByClassName("songItem"))
let song_name = document.getElementById('bottom_song_name')
let softindex=document.getElementById(index)


let songs = [
    { songName: "Let me love you", filePath: "audio/Letme.mp3", coverPath: "img/cover.webp" },
    { songName: "Bas Ek Dhadak", filePath: "audio/Letme.mp3", coverPath: "img/5cover.webp" },
    { songName: "Azul", filePath: "audio/Letme.mp3", coverPath: "img/2cover.jpg" },
    { songName: "Tum ho to", filePath: "audio/Letme.mp3", coverPath: "img/4cover.jpg" },
    { songName: "Akeli laila", filePath: "audio/Letme.mp3", coverPath: "img/3cover.jpg" }
]

songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath
    element.getElementsByTagName("span")[0].innerText = songs[i].songName
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('sm_iconplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}

Array.from(document.getElementsByClassName("sm_iconplay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);

        if (index !== clickedIndex) {
            // new song clicked
            index = clickedIndex;
            audioElement.src = `audio/${index}.mp3`;
            song_name.innerText = songs[index].songName;
            audioElement.currentTime = 0; // reset to start
            audioElement.play();
            gif.style.opacity = 1
            makeAllPlays();
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        } else {
            // same song clicked → just toggle play/pause
            if (audioElement.paused) {
                audioElement.play();
                gif.style.opacity = 1
                e.target.classList.remove("fa-play-circle");
                e.target.classList.add("fa-pause-circle");
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            } else {
                audioElement.pause();
                gif.style.opacity = 0
                e.target.classList.remove("fa-pause-circle");
                e.target.classList.add("fa-play-circle");
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
            }
        }
    });
});



//handle play and pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        
        softindex.classList.remove('fa-play-circle')
        softindex.classList.add('fa-pause-circle')
        gif.style.opacity = 1

    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        softindex.classList.remove('fa-pause-circle')
        softindex.classList.add('fa-play-circle')
        gif.style.opacity = 0
    }
})

// handle previous and next

document.getElementById('previous').addEventListener('click', () => {
    makeAllPlays()
    if (index <= 0) {
        index = 4
    } else {
        index -= 1
    }
    audioElement.src = `audio/${index}.mp3`
    audioElement.currentTime = 0
    song_name.innerText = songs[index].songName
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    makeAllPlays()
    softindex=document.getElementById(index)
    softindex.classList.remove('fa-play-circle')
    softindex.classList.add('fa-pause-circle')
    audioElement.play()
    gif.style.opacity = 1
})
document.getElementById('next').addEventListener('click', () => {
    makeAllPlays()
    if (index >= 4) {
        index = 0
    } else {
        index += 1
    }
    audioElement.src = `audio/${index}.mp3`
    audioElement.currentTime = 0
    song_name.innerText = songs[index].songName
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    makeAllPlays()
    softindex=document.getElementById(index)
    softindex.classList.remove('fa-play-circle')
    softindex.classList.add('fa-pause-circle')
    audioElement.play()
    gif.style.opacity = 1
})




audioElement.addEventListener("timeupdate", () => {
    // console.log('timeupdate',audioElement.currentTime,audioElement.duration)

    //UPdate seekbar
    progess = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    // console.log(progess)
    myProgressBar.value = progess
})


myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
})