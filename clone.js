let play = document.getElementById('play');
let progressBar = document.getElementById('progressBar');
let audio = new Audio('Audio/1.song.mp3');

let currentSong = 1;

play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime == 0) {
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    } else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #21a600ff ${progress}%, #333 ${progress}%)`;
})

progressBar.addEventListener('input', function () {
    let value = this.value;
    this.style.background = `linear-gradient(to right, #21a600ff ${value}%, #333 ${value}%)`;
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

let playMusic = Array.from(document.getElementsByClassName('playMusic'));

const makeAllPlay = () => {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        let index = parseInt(e.target.id);
        currentSong = index;
        audio.src = songs[index - 1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    })
});

let allMusic = Array.from(document.getElementsByClassName('music-card'));

const songs = [
    { songName: 'Saiyaara', songDes: 'It compares lovers to stars orbiting each other', songImage: 'images.clone/1.image.jpg', songPath: 'Audio/1.song.mp3' },
    { songName: 'Gehra hua', songDes: 'A heart-touching melody filled with depth and warmth.', songImage: 'images.clone/2.image.jpg', songPath: 'Audio/2.song.mp3' },
    { songName: 'Tujhko', songDes: 'A heartfelt romantic song filled with love and emotions.', songImage: 'images.clone/3.image.jpg', songPath: 'Audio/3.song.mp3' },
    { songName: 'Finding her', songDes: 'A heartfelt journey of love, longing, and finding the one.', songImage: 'images.clone/4.image.jpg', songPath: 'Audio/4.song.mp3' },
    { songName: 'Wow', songDes: 'An energetic track packed with catchy beats and feel-good vibes.', songImage: 'images.clone/wow.jpg', songPath: 'Audio/5.song.mp3' },
    { songName: 'Tera ho jaun', songDes: 'A soulful track about love, trust, and walking life path together.', songImage: 'images.clone/tera ho jau.jpg', songPath: 'Audio/6.song.mp3'},
    { songName: 'Vallah', songDes: 'An energetic and romantic track filled with passion, charm, and unforgettable vibes.', songImage: 'images.clone/7.image.jpg', songPath: 'Audio/7.song.mp3' },
    { songName: 'Phele bhi main', songDes: 'A heartfelt song about love that feels eternal.', songImage: 'images.clone/8.image.jpg', songPath: 'Audio/8.song.mp3' },
    { songName: 'Teri yaad mai', songDes: 'A soulful song that captures the pain of missing someone and the memories that never fade.', songImage: 'images.clone/9.image.jpg', songPath: 'Audio/9.song.mp3' },
    { songName: 'Deewaniyat', songDes: 'A soulful melody celebrating the intensity of true love.', songImage: 'images.clone/10.image.jpg', songPath: 'Audio/10.song.mp3' },
]

let order = [...songs];

allMusic.forEach((element, i) => {

    let index = i % songs.length;

    element.getElementsByTagName('img').src = songs[index].songImage;
element.getElementsByClassName('img-title').innerText = songs[index].songName;
element.getElementsByClassName('img-description').innerText = songs[index].songDes;
});

let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');
let nowBar = document.querySelector('.now-bar');

let songOnRepeat = false;
let songOnShuffle = false;

function shuffleSongs (originalOrder) {
    order = [...originalOrder];
    for(let i = order.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

shuffle.addEventListener('click', () => {
   songOnShuffle = !songOnShuffle;

    if(songOnShuffle){

        shuffle.classList.add("active");

        repeat.classList.remove("active");

        songOnRepeat = false;

        order = [...songs];

        order.sort(() => Math.random() - 0.5);

    }else{

        shuffle.classList.remove("active");

        order = [...songs];

    }

});
repeat.addEventListener('click', () => {
    console.log("Repeat Clicked");

    if(!songOnRepeat) {

        songOnRepeat = true;
        songOnShuffle = false;

        repeat.classList.add("active");
        shuffle.classList.remove("active");
    } else {
        songOnRepeat = false;

        repeat.classList.remove("active");
    }
});

const playNextSong = () => {

    currentSong++;

         if(currentSong > songs.length){
        currentSong = 1;
    }

    audio.src = songs[currentSong - 1].songPath;

    audio.currentTime = 0;

    audio.play();

    updateNowBar();

};

const playPrevSong = () => {
    currentSong--;

    if(currentSong < 1){
        currentSong = songs.length;
    }

    audio.src = songs[currentSong - 1].songPath;

    audio.currentTime = 0;

    audio.play();

    updateNowBar();

};

function updateNowBar () {
    nowBar.getElementsByTagName('img')[0].src = order[currentSong-1].songImage;
    nowBar.getElementsByClassName('img-title-info')[0].innerText = order[currentSong-1].songName;
    nowBar.getElementsByClassName('img-des-info')[0].innerText = order[currentSong-1].songDes;
}

const forward = document.getElementById('forward');
const backward = document.getElementById('backward');

forward.addEventListener('click', () => {
    playNextSong();
})

audio.addEventListener('ended', () => {
    playNextSong();
})

backward.addEventListener('click', () => {
    playPrevSong();
});