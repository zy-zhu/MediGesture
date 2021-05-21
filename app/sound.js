var DEBUGSPEECH = true;
var VOICEINDEX = 17;
var voicesReady = false;
// var Surface = famous.core.Surface;
var otherFeedback;

window.speechSynthesis.onvoiceschanged = function() {
    voicesReady = true;
    // Uncomment to see a list of voices
    //console.log("Choose a voice:\n" + window.speechSynthesis.getVoices().map(function(v,i) { return i + ": " + v.name; }).join("\n"));
};

var generateSpeech = function(message, callback) {
    if (voicesReady) {
        var msg = new SpeechSynthesisUtterance();
        msg.voice = window.speechSynthesis.getVoices()[VOICEINDEX];
        msg.text = message;
        msg.rate = 0.2;
        if (typeof callback !== "undefined")
            msg.onend = callback;
        speechSynthesis.speak(msg);
    }
};