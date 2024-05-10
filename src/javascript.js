//List of all the gifs used in the site
const gifs = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWllZ2l0anA5b3ViNWhzZ2NjdGZ3eHI0ajg4OGJldGhzdG10dzBiZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1BXa2alBjrCXC/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3pwYnlqb3Q5dDRmaGhtemY2dDBmNjM3Z2l[…]D12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9Y5BbDSkSTiY8/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExem93OWEwNXVycjJqOWh3OXNiejVsbTl2OTQ0eTY5MXRxaXJxM2ljaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LMJavgUFMwM6CICHrt/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTZxeXBjYXY3NnIwMWwydTlvcnM5eHZlMmlzcjV1bDVvZ3lrNmFmOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/T87BZ7cyOH7TwDBgwy/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2x3cDJvY2UzcDJ5NnMzdXlzMnppeHBqMXM1Y2dua2Y4bXlveHM3aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TdfyKrN7HGTIY/giphy.gif",
];
//List of all the audios used in the site
const audios = ["./assets/verysad.mp3", "./assets/sad.mp3", "./assets/neutral.mp3", "./assets/happy.mp3", "./assets/veryHappy.mp3"];
// function to set the attribute of each button click to a specific audio and video
let audio;
function setGif(num) {
  const element = document.getElementById("gif");
  element.setAttribute("src", gifs[num]);
  if (audio && !audio.paused) {
    audio.pause();
    audio.currentTime = 0;
  }
  audio = new Audio();
  audio.src = audios[num];
  audio.play().catch((e) => console.log(e));
}
