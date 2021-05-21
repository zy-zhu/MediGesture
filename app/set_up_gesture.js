// Our input frames will come from here.
const videoElement =
    document.getElementsByClassName('input_video')[0];
const canvasElement =
    document.getElementsByClassName('output_canvas')[0];
const controlsElement =
    document.getElementsByClassName('control-panel')[0];
const canvasCtx = canvasElement.getContext('2d');

var t = document.getElementById('signal');
t.style.visibility = 'hidden';


//Chime

const chime_1 = document.querySelector("#chime_1")
const chime_2 = document.querySelector("#chime_2")
const chime_3 = document.querySelector("#chime_3")
const chime_4 = document.querySelector("#chime_4")

chime = [chime_1, chime_2, chime_3, chime_4];


//Mudras Image

// const mudras_1 = document.querySelector("#mudras_1")
// const mudras_2 = document.querySelector("#mudras_2")
// const mudras_3 = document.querySelector("#mudras_3")
// const mudras_4 = document.querySelector("#mudras_4")


// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
// const fpsControl = new FPS();

// Optimization: Turn off animated spinner after its hiding animation is done.
const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
    spinner.style.display = 'none';
};

function onResults(results) {
    // Hide the spinner.
    document.body.classList.add('loaded');

    // Update the frame rate.
    // fpsControl.tick();


    // Draw the overlays, Right and Left Hand.
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);


    if (results.multiHandLandmarks && results.multiHandedness) {

        //show hand is detected 
        // console.log("hand is detected");



        for (let index = 0; index < results.multiHandLandmarks.length; index++) {
            const classification = results.multiHandedness[index];
            const isLeftHand = classification.label === 'Right';
            const isRightHand = classification.label === 'Left';
            const landmarks = results.multiHandLandmarks[index];

            //detect left and right hand(mirror)
            // if (isRightHand) {

            //   console.log("is right hand");

            // } else if (isLeftHand) {
            //   console.log("is left hand");
            // }


            //music play function


            // function playmusic(num) {
            //     var arr = [1, 2, 3, 4]
            //     for (var i = 0; i < arr.length; i++) {
            //         if (arr[i] === num) {
            //             arr.splice(i, 1);
            //         }
            //     }
            //     for (i in arr[i]) {
            //         chime[i].pause();
            //         chime[i].load();
            //     }
            //     chime[num].play();

            // }

            //Right figure states, 0 close, 1 open
            var RthubIsOpen = 1;
            var RfirstFigureIsOpen = 1;
            var RsecondFigureIsOpen = 1;
            var RthirdFingerIsOpen = 1;
            var RforthFingerisOpen = 1;

            if (isRightHand) {
                // console.log(landmarks[8].x - landmarks[7].x);s


                if (landmarks[4].x - landmarks[3].x > 0 && landmarks[3].x - landmarks[2].x > 0) {
                    RthubIsOpen = 0;

                    // console.log("thubIsOpen");
                }

                if (landmarks[8].y - landmarks[7].y < 0 && landmarks[8].y - landmarks[6].y < 0) {
                    RfirstFigureIsOpen = 0;
                    // console.log("firstFigureIsOpen");
                }

                if (landmarks[12].y - landmarks[10].y < 0 && landmarks[12].y - landmarks[11].y < 0) {
                    RsecondFigureIsOpen = 0;
                    // console.log("secondFigureIsOpen");
                }

                if (landmarks[16].y - landmarks[15].y < 0 && landmarks[16].y - landmarks[14].y < 0) {
                    RthirdFingerIsOpen = 0;
                    // console.log("thirdFingerIsOpen");
                }

                if (landmarks[20].y - landmarks[18].y < 0 && landmarks[20].y - landmarks[19].y < 0) {
                    RforthFingerisOpen = 0;
                    // console.log("forthFingerisOpen");
                }

                //Right Mudras Detection
                //Copy Paste to create new Mudras, 0 is open figure, 1 is close figure
                //Create Double Hand Mudras, copy paste after Left Hand Session

                //KAPITHAKA mudras
                if (RthubIsOpen == 1 && RfirstFigureIsOpen == 0 && RsecondFigureIsOpen == 0 && RthirdFingerIsOpen == 1 && RforthFingerisOpen == 1) {

                    console.log("Kapithaka Mudras");
                    // playmusic(0);
                    chime[0].play();
                    chime[1].pause();
                    chime[2].pause();
                    chime[3].pause();
                    document.getElementById("mudras_1").style.opacity = "1";
                    document.getElementById("mudras_2").style.opacity = "0";
                    document.getElementById("mudras_3").style.opacity = "0";
                    document.getElementById("mudras_4").style.opacity = "0";

                }
                else if (RthubIsOpen == 1 && RfirstFigureIsOpen == 0 && RsecondFigureIsOpen == 1 && RthirdFingerIsOpen == 1 && RforthFingerisOpen == 1) {
                    console.log("Suchi Mukha");
                    chime[0].pause();
                    chime[1].play();
                    chime[2].pause();
                    chime[3].pause();
                    document.getElementById("mudras_4").style.opacity = "1";
                    document.getElementById("mudras_1").style.opacity = "0";
                    document.getElementById("mudras_2").style.opacity = "0";
                    document.getElementById("mudras_3").style.opacity = "0";
                }

                //MudraKhya
                else if (RthubIsOpen == 1 && RfirstFigureIsOpen == 1 && RsecondFigureIsOpen == 0 && RthirdFingerIsOpen == 0 && RforthFingerisOpen == 0) {
                    console.log("MudraKhya");
                    chime[0].pause();
                    chime[1].pause();
                    chime[2].play();
                    chime[3].pause();
                    document.getElementById("mudras_2").style.opacity = "1";
                    document.getElementById("mudras_3").style.opacity = "0";
                    document.getElementById("mudras_1").style.opacity = "0";
                    document.getElementById("mudras_4").style.opacity = "0";
                }

                //Mukura
                else if (RthubIsOpen == 1 && RfirstFigureIsOpen == 0 && RsecondFigureIsOpen == 1 && RthirdFingerIsOpen == 1 && RforthFingerisOpen == 0) {
                    console.log("Mukura");
                    chime[0].pause();
                    chime[1].pause();
                    chime[2].pause();
                    chime[3].play();
                    document.getElementById("mudras_3").style.opacity = "1";
                    document.getElementById("mudras_2").style.opacity = "0";
                    document.getElementById("mudras_1").style.opacity = "0";
                    document.getElementById("mudras_4").style.opacity = "0";
                }

                //Stop
                else if (RthubIsOpen == 1 && RfirstFigureIsOpen == 1 && RsecondFigureIsOpen == 1 && RthirdFingerIsOpen == 1 && RforthFingerisOpen == 1) {
                    console.log("Stop");
                    chime[0].pause();
                    chime[1].pause();
                    chime[2].pause();
                    chime[3].pause();
                    // document.getElementById("video_container").style.opacity = "0";
                    document.getElementById("mudras_4").style.opacity = "0";
                    document.getElementById("mudras_2").style.opacity = "0";
                    document.getElementById("mudras_1").style.opacity = "0";
                    document.getElementById("mudras_3").style.opacity = "0";
                }

                //Open Hand and trigger the volume adjustment
                else if (RthubIsOpen == 0 && RfirstFigureIsOpen == 0 && RsecondFigureIsOpen == 0 && RthirdFingerIsOpen == 0 && RforthFingerisOpen == 0) {
                    // document.getElementById("video_container").style.opacity = "1";

                    // console.log(landmarks[0].y)

                    // console.log("Open Your Hand");
                    //Volume Adjusting based on the hand position
                    //limited to the mid half of the position 
                    var musicvolume = 0.2;//default

                    musicvolume = landmarks[9].y;
                    // if (0.25 < landmarks[9].y < 0.75) {
                    //     console.log("Adjust Music");
                    //     musicvolume = myscale(landmarks[9].y, 0.25, 0.75, 0, 1, 0.01);
                    // }
                }
            }


            //Left Hand
            var LthubIsOpen = 1;
            var LfirstFigureIsOpen = 1;
            var LsecondFigureIsOpen = 1;
            var LthirdFingerIsOpen = 1;
            var LforthFingerisOpen = 1;

            if (isLeftHand) {

                if (landmarks[4].x - landmarks[3].x < 0 && landmarks[3].x - landmarks[2].x < 0) {
                    LthubIsOpen = 0;

                    // console.log("LthubIsOpen");
                }

                if (landmarks[8].y - landmarks[7].y < 0 && landmarks[8].y - landmarks[6].y < 0) {
                    LfirstFigureIsOpen = 0;
                    // console.log("firstFigureIsOpen");
                }

                if (landmarks[12].y - landmarks[10].y < 0 && landmarks[12].y - landmarks[11].y < 0) {
                    LsecondFigureIsOpen = 0;
                    // console.log("secondFigureIsOpen");
                }

                if (landmarks[16].y - landmarks[15].y < 0 && landmarks[16].y - landmarks[14].y < 0) {
                    LthirdFingerIsOpen = 0;
                    // console.log("thirdFingerIsOpen");
                }

                if (landmarks[20].y - landmarks[18].y < 0 && landmarks[20].y - landmarks[19].y < 0) {
                    LforthFingerisOpen = 0;
                    // console.log("forthFingerisOpen");
                }



                if (LthubIsOpen == 1 && LfirstFigureIsOpen == 1 && LsecondFigureIsOpen == 1 && LthirdFingerIsOpen == 1 && LforthFingerisOpen == 1) {


                    document.getElementById("video_container").style.opacity = "0";
                }

                //Open Hand and trigger the volume adjustment
                else if (LthubIsOpen == 0 && LfirstFigureIsOpen == 0 && LsecondFigureIsOpen == 0 && LthirdFingerIsOpen == 0 && LforthFingerisOpen == 0) {
                    document.getElementById("video_container").style.opacity = "1";




                }

            }


            //scale volume 
            function myscale(num, in_min, in_max, out_min, out_max, factor) {
                var scale = Math.max(0.0, num - in_min) / (in_max - in_min);
                var r = out_min + (Math.pow(scale, factor) * (out_max - out_min));
                r = parseFloat(r.toFixed(10));
                return r;
            }



            // drawConnectors(
            //     canvasCtx, landmarks, HAND_CONNECTIONS,
            //     { color: isLeftHand ? '#000000' : '#FFFFFF' }),
            //     drawLandmarks(canvasCtx, landmarks, {
            //         color: isLeftHand ? '#FFFFFF' : '#FFFFFF',
            //         fillColor: isLeftHand ? '#FF0000' : '#00FF00',
            //         radius: (x) => {
            //             return lerp(x.from.z, -0.15, .1, 10, 1);
            //         }
            //     });
        }
    }
    canvasCtx.restore();
}


//show the hand

const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
    }
});
hands.onResults(onResults);


/**
 * Instantiate a camera. We'll feed each frame we receive into the solution.
 */
const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 500,
    height: 300
});
camera.start();


// Present a control panel 
// options.
new ControlPanel(controlsElement, {
    selfieMode: true,
    maxNumHands: 2,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
})
    .add([
        // new StaticText({ title: 'MediaPipe Hands' }),
        // fpsControl,
        // new Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
        // new Slider(
        //   { title: 'Max Number of Hands', field: 'maxNumHands', range: [1, 4], step: 1 }),
        // new Slider({
        //   title: 'Min Detection Confidence',
        //   field: 'minDetectionConfidence',
        //   range: [0, 1],
        //   step: 0.01
        // }),
        // new Slider({
        //   title: 'Min Tracking Confidence',
        //   field: 'minTrackingConfidence',
        //   range: [0, 1],
        //   step: 0.01
        // }), 
        //Hind all the Control Panel Function
    ])
  // .on(options => {
  //   videoElement.classList.toggle('selfie', options.selfieMode);
  //   hands.setOptions(options);
  // }
  // );