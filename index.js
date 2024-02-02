//CONSTANTS
const SONGS = [
    
    {
        id: crypto.randomUUID(),
        urlImg: './public/cover-2.png',
        urlAudio:'./public/lost-in-city-lights-145038.mp3',
        author:'Lost in the City Lights',
        title:'Cosmo Sheldrake'
    },
    {
        id: crypto.randomUUID(),
        urlImg: './public/cover-1.png',
        urlAudio:'./public/forest-lullaby-110624.mp3',
        author:'Forest Lullaby',
        title:'Lesfm'
    },

    /*{
        id: crypto.randomUUID(),
        urlImg: './public/(TJOCSM)[Bedroom].jpg',
        urlAudio:'./public/(TJOCSM)[All_Themes].mp3',
        author:'Nathan Hanover',
        title:'TJOCSM: Story Mode[ALL THEMES]'
    }*/

]
let currentIndex = 0
let currentSong = SONGS[currentIndex]
let music = new Audio(currentSong.urlAudio)
const playerBtnToggle = document.getElementById("player-btn-toggle")
const imgPlayerBtnToggle = playerBtnToggle.firstChild
const playerLabelCurrent = document.getElementById("player-label-current")
const playerLabelEnd = document.getElementById("player-label-end")
const playerProgressBarCurrent = document.getElementById('player-progress-bar-current')
const playerProgressBar = document.getElementById('player-progress-bar')
const playerBtnNext = document.getElementById('player-btn-next')
const playerBtnPrev = document.getElementById('player-btn-prev')
const imgAudio = document.getElementById('img-audio');
const titleAudio = document.getElementById('title-audio')
const authorAudio = document.getElementById('author-audio')


let dragging = false;
window.addEventListener('load', function() {
    imgAudio.setAttribute('src',currentSong.urlImg)
    titleAudio.innerHTML=currentSong.title
    authorAudio.innerHTML=currentSong.author
});



//Events
music.addEventListener('loadedmetadata', function () {
    const totalTime = formatTime(music.duration);
    playerLabelEnd.innerHTML = totalTime
});
music.addEventListener('timeupdate', function () {
    const currentTime = formatTime(music.currentTime);
    playerLabelCurrent.innerHTML = currentTime;
    playerProgressBarCurrent.setAttribute('style', 'width:' + (music.currentTime / music.duration) * 100 + "%")
});

playerBtnToggle.addEventListener("click", function () {
    if (music.paused) {
        music.play();
        imgPlayerBtnToggle.setAttribute('src', './public/Stop_fill.svg')
    } else {
        music.pause();
        imgPlayerBtnToggle.setAttribute('src', './public/Play_fill.svg')
    }
})

playerProgressBar.addEventListener('click', e => clickBar(e))
playerProgressBar.addEventListener('mousedown', e => startDrag(e))
playerBtnPrev.addEventListener('click',playPrevious)
playerBtnNext.addEventListener('click',playNext)

//Functions
function formatTime(seconds) {
    const formatMinutes = Math.floor(seconds / 60);
    const formatSeconds = Math.floor(seconds % 60);
    return `${formatMinutes.toString().padStart(2, '0')}:${formatSeconds.toString().padStart(2, '0')}`;
}
function clickBar(event) {
    const barraRect = playerProgressBar.getBoundingClientRect();
    const clicX = event.clientX - barraRect.left;
    const porcent = clicX / barraRect.width;
    const newTime = porcent * music.duration;
    music.currentTime = newTime;
}

function startDrag(event) {
    dragging = true;
    updateBar(event);
    document.addEventListener('mousemove', updateBar);
    document.addEventListener('mouseup', stopDrag);
}

function stopDrag() {
    dragging = false;
    document.removeEventListener('mousemove', updateBar);
    document.removeEventListener('mouseup', stopDrag);
}

function updateBar(event) {
    if (dragging) {
        const barraRect = playerProgressBar.getBoundingClientRect();
        const mouseX = event.clientX - barraRect.left;
        const porcent = mouseX / barraRect.width;
        playerProgressBarCurrent.style.width = `${porcent * 100}%`;
        music.currentTime = porcent * music.duration;
    }
}

function changeMusic (){
    currentSong = SONGS[currentIndex]
    music.src = currentSong.urlAudio
    imgAudio.setAttribute('src',currentSong.urlImg)
    titleAudio.innerHTML=currentSong.title
    authorAudio.innerHTML=currentSong.author
    music.load()
    music.play()
}

function playPrevious() {
    currentIndex = (currentIndex - 1 + SONGS.length) % SONGS.length;
    changeMusic();
}

function playNext() {
    currentIndex = (currentIndex + 1) % SONGS.length;
    changeMusic();
}





