var myVideo = document.getElementById("video");

function PP() {
    if (myVideo.paused) {
        myVideo.play();
    }
    else {
         myVideo.pause(); 
    }
}

function BIG() {
    myVideo.width = 400;
}

function Normal() {
    myVideo.width = 300;
} 