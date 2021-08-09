song1 = "";
song2 = "";

song1Status = "";
song2Status = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
function preload() {
    song1 = loadSound("cold.mp3");
    song2 = loadSound("gratefull.mp3");
}



function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(500, 200);

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 650, 500);
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
    fill("red");
    stroke("red");
    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Playing Grateful song";
        }
    }
    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Playing Cold song";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}


function modelLoaded() {
    console.log("poseNet is Initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
    }
}   