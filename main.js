music_file1 = "";
music_file2 = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song_leftWrist = "";
music_file1Status="";
music_file2Status ="";

function preload(){
    music_file1 = loadSound("music.mp3");
    music_file2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(500,400);
    canvas.position(450, 220);

    video = createCapture(VIDEO);
    video.hide();
    video.size(500,400);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 500, 400);

    fill("red");
    stroke("red");

    music_file1Status = music_file1.isPlaying();

    if(scoreLeftWrist > 0.2){
        Circle(leftWristX,leftWristY,20);
        music_file2.stop();

        if(music_file1Status == "false"){
        music_file1.play();
    }
}
}
function modelLoaded(){
    console.log("Model is Initialised");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }

}