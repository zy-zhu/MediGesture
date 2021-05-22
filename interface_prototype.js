// Main background
let Interface = {
    main: {
        Mode: "main",
        BackgroundColor: "#95B8C4",
        TextColor: "#FFFFFF"
    },
    meditation: {
        Mode: "meditation",
        Mood: ["focus", "happy", "zen", "relax"],
        BackgroundColor: ["#9DADB7", "#9FD8D5", "#F0EFEF", "#2B3133"],
        CircleColor: ["#E1B324", "#D21E8C", "#71C383", "#2E3868"],
        CircleHover: ["#E0A603", "#B9F9F4", "#34C14F", "#2E3868"],
        Sound: ["sound_focus", "sound_happy", "sound_zen", 'sound_relax']
    }
};

let mode = "loading";
let mood = false;
let moodNum = false;
let bgd = Interface.main.BackgroundColor;
let diam;

// Buttons / Sliders
let instr_button;
let back_button;
let volume_slider;
let slider_val;



// Particle system
let system;
let rad;
let angle;

//Images
let namaste;

//Sound
let sound_focus, sound_happy, sound_zen, sound_relax, sound_bell;
let sound = false;
let sound_prev = true;

//Speech
let myRec;
let speech;
let first_time = true;
let first_time_out = true;

// Mudra img
let one;
let two;
let three;
let four;
let five;

//Med screen visuals

let yellow
let pink1
let pink2
let pink3
let pink4
let pink5
let sleep1
let sleep2
let yellow1
let yellow2
let zen1
let zen2


let cyan;
let green;

let mudras_all;

let count = true
let per;
let turn = false;

let font;

function preload() {
    sound_focus = loadSound('sounds/focus.mp3');
    sound_happy = loadSound('sounds/joy.mp3');
    sound_zen = loadSound('sounds/zen.mp3');
    sound_relax = loadSound('sounds/sleep.mp3');
    namaste = loadImage('assets/namaste.png');

    // Load mudra img
    one = loadImage('assets/1.png');
    two = loadImage('assets/2.png');
    three = loadImage('assets/3.png');
    four = loadImage('assets/4.png');
    five = loadImage('assets/5.png');
    mudras_all = loadImage('assets/mudras_all.png')

    yellow = loadImage('assets/yellow.png')
    pink1 = loadImage('assets/pink1.png')
    pink2 = loadImage('assets/pink2.png')
    pink3 = loadImage('assets/pink3.png')
    pink4 = loadImage('assets/pink4.png')
    pink5 = loadImage('assets/pink5.png')
    sleep1 = loadImage('assets/sleep1.png')
    sleep2 = loadImage('assets/sleep2.png')
    yellow1 = loadImage('assets/yellow1.png')
    yellow2 = loadImage('assets/yellow2.png')
    zen1 = loadImage('assets/zen1.png')
    zen2 = loadImage('assets/zen2.png')

    font = loadFont('fonts/Merienda-Regular.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(bgd);
    fill(Interface.main.TextColor);
    noStroke();
    textAlign(CENTER, CENTER);

    //Particle system
    system = new ParticleSystem(createVector(windowWidth / 2, windowHeight / 2));

    //Speech
    myRec = new p5.SpeechRec('en-US', parseResult); // new P5.SpeechRec object
    myRec.continuous = true; // do continuous recognition
    myRec.interimResults = true; // allow partial recognition (faster, less accurate)
    myRec.start();

    sound = sound_focus;

    speech = new p5.Speech()
    speech.continuous = false;
    speech.onError = restart;
    speech.onEnd = restart;

    instr_button = createButton('Instructions');
    back_button = createButton('Back');

    slider_val = 0.3;
    volume_slider = createSlider(0, 1, slider_val, 0.05);   //(min, max, [value], [step])

    //// BUTTONS
    displayButton(back_button);
    displayButton(instr_button);
    displaySlider(volume_slider);

    instr_button.show()
    instr_button.mousePressed(changeModeInstr);
    volume_slider.hide()
    back_button.hide()
    instr_button.hide()

    per = 0
    textFont(font)
}


function draw() {
    background(bgd);
    diam = windowWidth / 6;
    rad = diam / 2;

    speech.onEnd = restart;


    if (frameCount < 100) {
        fill(Interface.main.TextColor);
        textSize(24);
        text('Loading…', windowWidth / 2, windowHeight / 2);

        // Erase Instructions
        //textSize(12);
        //text('This page is used until connection with sensor is established. Hit SPACEBAR to go to first page', windowWidth/2, windowHeight/8);


    } else if (frameCount === 200) {
        mode = "main"
        moodNum = "0"
    }

    if (mode === "instructions") {
        drawInstructions()

    } else if (mode === "main") {
        //// MAIN
        bgd = Interface.main.BackgroundColor;
        fill(Interface.main.TextColor);
        textSize(20);

        speech.started(startSpeaking)
        speech.ended(endSpeaking)

        function startSpeaking() {
            console.log("VOICE STARTED")
            imageMode(CENTER)

        }

        function endSpeaking() {

        }

        // BUTTONS
        instr_button.show()
        instr_button.mousePressed(changeModeInstr);
        volume_slider.hide()
        back_button.hide()

        //Title
        textSize(30);
        textAlign(LEFT);
        stroke(255);
        text('Welcome!', windowWidth / 7, windowHeight / 5 - 40);
        noStroke();
        textSize(25);
        text('How are you feeling today?', windowWidth / 7, windowHeight / 5);

        //// Date
        // Date
        let dayDict = { "Mon": "Monday", "Tue": "Tuesday", "Wed": "Wednesday", "Thu": "Thursday", "Fri": "Friday", "Sat": "Saturday", "Sun": "Sunday"}
        textAlign(RIGHT);
        let date = Date();
        let day = dayDict[date.slice(0, 3)]
        text(day+ ", " + getDate(), 6*windowWidth / 7, windowHeight / 5 - 40);
        noStroke();
        // Time
        let sec
        let min
        if (second() <10) {
            sec = '0'+ second()
        } else {
            sec = second()
        }
        if (minute() <10) {
            min = '0'+ minute()
        } else {
            min = minute()
        }
        text(hour()+':'+ min + ":" + sec , 6*windowWidth / 7, windowHeight / 5);


        //Voice
        if ((first_time)) {
            speech.setVolume(0.2)
            speech.speak('Welcome to Mind and Hand. How are you feeling today! Select a mood for your journey.')
            first_time = false;
        }

        // Sound
        if (sound != false) {
            sound.pause();
        }


        // Draw three ellipses
        ellipseMode(CENTER);
        noStroke();

        drawEllipses(turn);

        if (dist(windowWidth / 5, windowHeight / 2, mouseX, mouseY) < diam / 2) {
            //focus
            imageMode(CENTER)
            yellow1.resize(diam, 0)
            yellow2.resize(diam, 0)
            push()
            translate(windowWidth / 5, windowHeight / 2)
            rotate(sin(PI / 6) * frameCount / 60)
            image(yellow1, 0, 0)
            image(yellow2, 0, 0)
            pop()

        }

        if (dist(2 * windowWidth / 5, windowHeight / 2, mouseX, mouseY) < diam / 2) {
            //fill(Interface.meditation.CircleHover[1]);
            turn = true
            imageMode(CENTER)
            pink1.resize(diam, 0)
            pink2.resize(diam, 0)
            pink3.resize(diam, 0)
            if (count) {
                pink5.resize(diam + frameCount % 60, diam + frameCount % 60)
                per++
                if (per === 80) {
                    count = !count
                    per = 0
                }
            } else {
                pink5.resize(diam - frameCount % 60, diam - frameCount % 60)
                per++
                if (per === 80) {
                    count = !count
                    per = 0
                }
            }
            pink4.resize(diam, 0)
            push()
            translate(2 * windowWidth / 5, windowHeight / 2)
            rotate(sin(PI / 6) * frameCount / 12)
            image(pink1, 0, 0)
            image(pink2, 0, 0)
            image(pink3, 0, 0)
            image(pink4, 0, 0)
            image(pink5, 0, 0)
            pop()
            //ellipse(2 * windowWidth / 5, windowHeight / 2, diam, diam);
        } else {
            turn = false
        }

        if (dist(3 * windowWidth / 5, windowHeight / 2, mouseX, mouseY) < diam / 2) {
            //fill(Interface.meditation.CircleHover[2]);
            zen1.resize(diam, 0)
            zen2.resize(diam, 0)
            push()
            translate(3 * windowWidth / 5, windowHeight / 2)
            //rotate(sin(PI/6)*frameCount/24)
            image(zen1, 0, 0)
            image(zen2, 0, 0)
            pop()
            //ellipse(3 * windowWidth / 5, windowHeight / 2, diam, diam);
        } else if (dist(4 * windowWidth / 5, windowHeight / 2, mouseX, mouseY) < diam / 2) {
            // fill(Interface.meditation.CircleHover[3]);
            // ellipse(4 * windowWidth / 5, windowHeight / 2, diam, diam);
            sleep1.resize(diam, 0)
            sleep2.resize(diam, 0)
            push()
            translate(4 * windowWidth / 5, windowHeight / 2)
            rotate(sin(PI / 6) * frameCount / 36)
            image(sleep1, 0, 0)
            image(sleep2, 0, 0)
            pop()
        }

        // Mood text
        textAlign(CENTER);
        textSize(17);
        fill(255)
        text('Focus', windowWidth / 5, windowHeight / 2);
        text('Joy', 2 * windowWidth / 5, windowHeight / 2);
        text('Zen', 3 * windowWidth / 5, windowHeight / 2);
        text('Sleep', 4 * windowWidth / 5, windowHeight / 2);

        turn = false;

        ////// MEDITATION
    } else if (mode === "meditation") {

        ///Volume control with swipe up gesture
        // Could be implemented here

        textAlign(CENTER)
        //Check mood selection to set mood/colors
        background(Interface.meditation.BackgroundColor[moodNum]);

        //tint(255, 120);

        fill(Interface.meditation.CircleColor[moodNum]);
        //ellipseMode(CENTER);
        //ellipse(windowWidth / 2, windowHeight / 2, diam, diam);

        drawMoods()

        //Erase Instructions
        fill(255);
        textSize(12);
        //text('Return to previous page with SPACEBAR', windowWidth / 2, 7 * windowHeight / 8);

        //Buttons and sliders
        back_button.show()
        back_button.mousePressed(changeModeMain);
        volume_slider.show()
        slider_val = volume_slider.value();

        if (moodNum === 0) {
            sound_prev = sound;
            sound = sound_focus;
        } else if (moodNum === 1) {
            sound_prev = sound;
            sound = sound_happy;
        } else if (moodNum === 2) {
            sound_prev = sound;
            sound = sound_zen;
        } else if (moodNum === 3) {
            sound_prev = sound;
            sound = sound_relax;
        }

        if (sound_prev === false) {
            sound.setVolume(slider_val);
            sound.play();
        }

        sound.setVolume(slider_val);

        if (sound_prev != sound) {
            if (sound_prev) {
                sound_prev.pause();
            }
            sound.setVolume(slider_val);
            sound.play();
        }

        ////END SCREEN
    } else if (mode === "end_screen") {

        //Voice
        if ((first_time_out)) {
            speech.setVolume(0.2)
            speech.speak('Namaste.')
            first_time_out = false;
        }

        fill(Interface.main.TextColor);
        textSize(30);
        textAlign(CENTER)
        text('Namaste', windowWidth / 2, 2 * windowHeight / 3);
        textSize(20);
        text('Until next time...', windowWidth / 2, windowHeight / 3);
        imageMode(CENTER);
        image(namaste, windowWidth / 2, windowHeight / 2, windowHeight / 3, windowHeight / 4);
        sound.fade(0, 1)

        back_button.show()
        back_button.mousePressed(changeModeMain);
        volume_slider.hide();
    }

}

//Upon mouse click, it checks is it happens within mood-circles and sets the mood accordingly
function mouseReleased() {
    //Main screen ellipses used as buttons
    if (dist(windowWidth / 5, windowHeight / 2, mouseX, mouseY) < diam / 2) {
        //focused
        changeModeMeditation();
        moodNum = 0;
    } else if (dist(2 * windowWidth / 5, windowHeight / 2, mouseX, mouseY) < diam / 2) {
        changeModeMeditation();
        moodNum = 1;
    } else if (dist(3 * windowWidth / 5, windowHeight / 2, mouseX, mouseY) < diam / 2) {
        changeModeMeditation();
        moodNum = 2;
    } else if (dist(4 * windowWidth / 5, windowHeight / 2, mouseX, mouseY) < diam / 2) {
        changeModeMeditation();
        moodNum = 3;
    }
}

function keyPressed() {
    //Switch to fullscreen with F
    if (keyCode === 70) {
        let scr = fullscreen();
        fullscreen(!scr);
    }

    if ((keyCode === 32) && (mode === "meditation")) {
        changeModeMain();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    system = new ParticleSystem(createVector(windowWidth / 2, windowHeight / 2));

    displayButton(back_button);
    displayButton(instr_button);
    displaySlider(volume_slider);
}


function drawEllipses() {
    // for (let i = 0; i < 4; ++i) {
    //     fill(Interface.meditation.BackgroundColor[i]);
    //     ellipse((i + 1) * windowWidth / 5, windowHeight / 2, diam, diam);
    // }

    //focus
    fill(Interface.meditation.CircleHover[0]);
    ellipse(windowWidth / 5, windowHeight / 2, diam - 60, diam - 60);
    imageMode(CENTER)
    yellow1.resize(diam, 0)
    yellow2.resize(diam, 0)
    push()
    translate(windowWidth / 5, windowHeight / 2)
    //rotate(sin(PI/6)*frameCount/60)
    image(yellow1, 0, 0)
    image(yellow2, 0, 0)
    pop()

    if (!turn) {
        //fill(Interface.meditation.CircleHover[1]);
        imageMode(CENTER)
        pink1.resize(diam, 0)
        pink2.resize(diam, 0)
        pink3.resize(diam, 0)
        push()
        translate(2 * windowWidth / 5, windowHeight / 2)
        //rotate(sin(PI/6)*frameCount/72)
        image(pink1, 0, 0)
        image(pink2, 0, 0)
        image(pink3, 0, 0)
        pop()
    }

    zen1.resize(diam, 0)
    zen2.resize(diam, 0)
    push()
    translate(3 * windowWidth / 5, windowHeight / 2)
    image(zen1, 0, 0)
    image(zen2, 0, 0)
    pop()

    sleep1.resize(diam, 0)
    sleep2.resize(diam, 0)
    push()
    translate(4 * windowWidth / 5, windowHeight / 2)
    image(sleep1, 0, 0)
    image(sleep2, 0, 0)
    pop()
}

function drawInstructions() {
    rectMode(CENTER)
    fill(255)
    rect(windowWidth / 2, windowHeight / 2, windowWidth / 2 + 10, windowHeight)
    fill("#758a92")
    rect(windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight)

    let x_pos = 2 * windowWidth / 7 + 20
    let y_pos = windowHeight / 3 - windowHeight / 5
    let gap = 40
    let ts_b = 16;
    let ts_s = 13;

    let num = 1;
    let leading = 20;

    textAlign(LEFT)
    fill(Interface.main.TextColor);
    textSize(24);
    strokeWeight(1)

    text('Instructions', x_pos, windowHeight / 12 + gap);
    rectMode(CORNER)
    fill(255)
    rect(x_pos, windowHeight / 12 + leading / 3 + gap + 15, 300, 2)
    noStroke()

    /// Position
    textSize(ts_b)
    stroke(255)
    strokeWeight(1)
    text("Setup", x_pos, y_pos + leading + gap - 3)
    noStroke()
    let sentences1 = ["You can stay seated on a floor or a chair to meditate.", "Place the computer screen at a distance that feels comfortable to the eye.", "Place your hand in front of the camera and notice the red sign as soon as the hand is recognized."]
    textSize(ts_s);
    for (let i = 0; i < sentences1.length; i++) {
        textAlign(LEFT)
        text(sentences1[i], x_pos, y_pos + leading * (i + 1) + leading + gap);
        num++
    }

    let step1 = num

    ///Navigation / Selection
    textSize(ts_b)
    stroke(255)
    strokeWeight(1)
    text("Interface Navigation", x_pos, y_pos + step1 * leading + 2 * gap - 3)
    noStroke()
    let sentences2 = ['You can navigate the different screens with your voice. Select between the different meditation modes by name',
        'You can say: “focus”, “happy” or “joy”, “Zen”, “sleep” or “relax”', 'to select a meditation mode.', 'During meditation you can press SPACE to return to the main page', 'Press F to enter of exit fullscreen mode']
    textSize(ts_s);
    for (let i = 0; i < sentences2.length; i++) {
        text(sentences2[i], x_pos, y_pos + leading * (i + 1) + step1 * leading + 2 * gap);
        num++
    }

    let step2 = num

    ///// Gestures
    textSize(ts_b)
    stroke(255)
    strokeWeight(1)
    text("Mudras", x_pos, y_pos + step2 * leading + 3 * gap - 3)
    noStroke()
    let sentences3 = ["Time for the mudras! You can use the mudras in the pictures during meditation.", "Make sure the gestures can be seen be the camera, and let the sounds guide you into a deeper meditation.", "When in silence, you can end your journey by holding your fist in front of the camera.", "Just follow the example of the last picture.", "Use the Mudras Reminder window to help you learn!"]
    textSize(ts_s);
    for (let i = 0; i < sentences3.length; i++) {
        text(sentences3[i], x_pos, y_pos + leading * (i + 1) + step2 * leading + 3 * gap);
        num++
    }

    let step3 = num
    let d = 80
    let dim = 100;
    //// Images
    stroke(255)
    rectMode(CENTER)
    fill(255)
    rect(windowWidth / 2, y_pos + leading * step3 + 3 * gap + 80, windowWidth / 2, 120)
    imageMode(CENTER)
    image(mudras_all, windowWidth / 2, y_pos + leading * step3 + 3 * gap + 80, 5 * 120, 120)

    //// Goodbye
    textSize(ts_b)
    strokeWeight(1)
    text("Namaste", x_pos, y_pos + step3 * leading + 3 * gap + dim + d / 2 + leading)
    noStroke()
    textSize(ts_s);
    let sentences4 = ['You can say “Go Back” to return to the main menu', "Say “Nice”, “I am done”, or “Namaste” to go to the end screen and exit the application"]
    for (let i = 0; i < sentences4.length; i++) {
        text(sentences4[i], x_pos, y_pos + leading * (i + 1) + step3 * leading + 3 * gap + dim + d / 2 + leading + 3);
        num++
    }

    let step4 = num
    textSize(ts_b);
    text('Enjoy your Journey!', x_pos, y_pos + step4 * leading + 4 * gap + dim + d / 2 + 2 * leading);
}



function drawMoods() {
    let diam = windowWidth / 5;
    if (moodNum === 0) {
        //focus
        fill(Interface.meditation.CircleHover[0]);
        //ellipse( windowWidth / 5, windowHeight / 2, diam-70, diam-70);
        imageMode(CENTER)
        yellow1.resize(diam, 0)
        yellow2.resize(diam, 0)
        push()
        translate(windowWidth / 2, windowHeight / 2)
        rotate(sin(PI / 6) * frameCount / 60)
        image(yellow1, 0, 0)
        image(yellow2, 0, 0)
        pop()

    } else if (moodNum === 1) {
        //fill(Interface.meditation.CircleHover[1]);
        fill(Interface.meditation.CircleHover[moodNum]);
        stroke("#E2DCA5")
        ellipse(windowWidth / 2, windowHeight / 2, diam, diam);

        turn = true
        imageMode(CENTER)
        pink1.resize(diam, 0)
        pink2.resize(diam, 0)
        pink3.resize(diam, 0)
        pink4.resize(diam, 0)
        pink5.resize(diam, 0)
        push()
        translate(windowWidth / 2, windowHeight / 2)
        rotate(sin(PI / 6) * frameCount / 12)
        image(pink1, 0, 0)
        image(pink2, 0, 0)
        image(pink3, 0, 0)
        image(pink4, 0, 0)
        image(pink5, 0, 0)
        pop()
    } else if (moodNum === 2) {
        //fill(Interface.meditation.CircleHover[2]);
        zen1.resize(diam, 0)
        zen2.resize(diam, 0)
        push()
        translate(windowWidth / 2, windowHeight / 2)
        rotate(sin(PI / 6) * frameCount / 60)
        image(zen1, 0, 0)
        image(zen2, 0, 0)
        pop()

    } else if (moodNum === 3) {
        // fill(Interface.meditation.CircleHover[3]);
        // ellipse(4 * windowWidth / 5, windowHeight / 2, diam, diam);
        sleep1.resize(diam, 0)
        sleep2.resize(diam, 0)
        push()
        translate(windowWidth / 2, windowHeight / 2)
        rotate(sin(PI / 6) * frameCount / 36)
        image(sleep1, 0, 0)
        image(sleep2, 0, 0)
        pop()
    }

}


//////// Instructions Button
function displayButton(button) {
    let b = button;
    if (b === instr_button) {
        b.position(windowWidth - 160, windowHeight / 20);
        b.style('background-color', "#6E878E");
        b.style('color', "#FFFFFF");
        b.style('font-size', "11px");

    } else if (b === back_button) {
        b.position(60, windowHeight / 20);
        b.style('background-color', "#6E878E");
        b.style('color', "#FFFFFF");
        b.style('font-size', "11px");
        b.mousePressed(changeModeMain);
    }
}

////////// Change between Meditation Modes
function changeModeInstr() {
    instr_button.hide();
    back_button.show();
    //displaySlider(volume_slider, sound)
    mode = "instructions";
}

function changeModeMain() {
    back_button.hide();
    mode = "main";
}

function changeModeMeditation() {
    instr_button.hide();
    back_button.show();
    volume_slider.show();
    mode = "meditation";
}

function changeModeEnd() {
    back_button.show();
    mode = "end_screen";
}

function displaySlider(slider) {
    let s = slider;
    s.position(windowWidth - 200, windowHeight / 20);
    s.style('background-color', "#6E878E");
    s.style('color', "#FFFFFF");
    s.style('width', "100px");
}


//Particle Effect Classes
let Particle = function () {
    this.position = createVector(system.center.x, system.center.y);
    this.pcolor = color(255, 255, 255, random(180));
    this.radius = random(windowWidth / 9, windowWidth / 5);
    this.a = 0;
};

Particle.prototype.run = function () {
    this.update();
    this.display();
};

Particle.prototype.update = function () {
    if (frameCount % 60 === 0) {
        this.a = Math.cos(2 * Math.PI * frameCount / 60);
    }
    this.radius += this.a;
    this.pcolor = color(255, 255, 255, random(50, 100));
};

Particle.prototype.display = function () {
    noStroke();
    //pg.fill(255, 220);
    fill(this.pcolor, random(110));
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
};

let ParticleSystem = function (center) {
    this.center = center.copy();
    this.particles = [];
};

// Particle.prototype.connect = function () {
//     system.particles.forEach(particle => {
//         let d = dist(this.position.x, this.position.y, particle.position.x, particle.position.y);
//         if (d < windowWidth / 10) {
//             fill(255, 20);
//             strokeWeight(30);
//             stroke(255, 10);
//             line(this.position.x, this.position.y, particle.position.x, particle.position.y);
//         }
//     });
//
// };


ParticleSystem.prototype.run = function () {
    for (let i = 0; i < this.particles.length; i++) {
        let p = this.particles[i];
        //p.connect();
        p.run();
    }
};


///////////// Speech  functions

function restart(){
    speech.start();
    console.log("Restarted Speech")
}

function parseResult() {
    // recognition system will often append words into phrases.
    // so hack here is to only use the last word:
    var mostrecentword = myRec.resultString.split(' ').pop();
    console.log(mostrecentword);

    if (mode === 'meditation' || mode === 'instructions') {
        var go_back_commands = ['namaste', 'nice', 'finish', 'end', 'done'];
        go_back_commands.forEach(word => {
            if (mostrecentword.indexOf(word) !== -1) {
                changeModeEnd();
            }
        })
        if (mostrecentword.indexOf('back') !== -1 || (mostrecentword.indexOf('return') !== -1)){
            changeModeMain();
        }
    } else if (mode === 'main') {

        if (mostrecentword.indexOf('focus') !== -1 || (mostrecentword.indexOf('Focus') !== -1)) {
            changeModeMeditation();
            mode = "meditation";
            moodNum = 0;
        } else if (mostrecentword.indexOf('happy') !== -1 || (mostrecentword.indexOf('joy') !== -1) || (mostrecentword.indexOf('Joy') !== -1)) {
            changeModeMeditation();
            mode = "meditation";
            moodNum = 1;
        } else if (mostrecentword.indexOf('zen') !== -1 || (mostrecentword.indexOf('Zen') !== -1)) {
            changeModeMeditation();
            mode = "meditation";
            moodNum = 2;
        } else if (mostrecentword.indexOf('relax') !== -1 || (mostrecentword.indexOf('sleep') !== -1)) {
            changeModeMeditation();
            mode = "meditation";
            moodNum = 3;
        } else if (mostrecentword.indexOf('instructions') !== -1) {
            mode = "instructions";
            changeModeInstr()
        }
    } else if (mode === "end_screen") {
        if (mostrecentword.indexOf("back") !== -1 || mostrecentword.indexOf("return") !== -1  ) {
            changeModeMain();
        }
    }
}


/////////// (DATE/TIME)
function getDate()
{
    let date = new Date();
    function formatDate(){
        return date.toDateString().slice(4);
    }
    return formatDate();
}


