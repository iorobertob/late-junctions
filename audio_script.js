console.clear();


// instigate our audio context
// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioCtx  = new AudioContext();

var   tuna      = new Tuna(audioCtx);

reverbjs.extend(audioCtx);

// load some sound
// const audioElement = document.querySelector('audio');
var audioElement  = document.getElementById('track1');

var track  = audioCtx.createMediaElementSource(audioElement);

// volume. ===== 1 ======
const gainNode = audioCtx.createGain();
// const volumeControl = document.getElementById("volume");
// volumeControl.addEventListener('input', function() {
//   gainNode.gain.value = this.value;
// }, false);
gainNode.gain.value = 0;


// volume. ===== MASTER ======
const gainNodeMaster = audioCtx.createGain();
// const volumeControl2 = document.querySelector('[data-action="panner"]');
const volumeControlMaster = document.getElementById('volumeMASTER');
volumeControlMaster.addEventListener('input', function() {
  gainNodeMaster.gain.value = this.value/1.1;
}, false);
gainNodeMaster.gain.value = 1;


// Create all the knobs' gain nodes. 
var knob_id;
var gains_aux_array = [];
var knobs_aux_array = [];
for (i=1; i <= 1; i++){

  for(j=1; j <= 1; j++){

    gains_aux_array.push(audioCtx.createGain());

    knob_id = "knob_aux" + i + "_" + j;
    knobs_aux_array.push(document.getElementById(knob_id));
  }
}

// for(i=0;i<knobs_aux_array.length;i++){
//   var index = i;
//   knobs_aux_array[i].addEventListener('input', function() 
//   {
//       var index = this.getAttribute("data-array-index");
//       gains_aux_array[index].gain.value = this.value/200;
//   }, false);
//   gains_aux_array[index].gain.value = 0;
// }
// Handle reverb knob value changes
function handleReverb(new_value)
{
  let value = document.getElementById("reverb_value");
  value.value = new_value / 360;
  // console.log("new value: " + value.value);
  gains_aux_array[0].gain.value = value.value;
  gainNode.gain.value = 1 - value.value;

}


// filter to sound 1 
var filter = audioCtx.createBiquadFilter();


// REVERB NODE 
// 2) Load the impulse response; upon load, connect it to the audio output.
var reverbUrl = "https://misc.lmta.lt/junctions/files/impulse-respones/AbernyteGrainSilo_MP3.mp3";
var reverbNode = audioCtx.createReverbFromUrl(reverbUrl, function() {
  // reverbNode.connect(audioCtx.destination);
  reverbNode.connect(gainNodeMaster);
});

// TRACK VOLUMES
track.connect(gainNode).connect(gainNodeMaster); // 1

// REVERB PATCHING
track.connect(gains_aux_array[0]).connect(reverbNode); //1

gainNodeMaster.connect(audioCtx.destination);

filter.type = 'lowpass';
filter.frequency.value = 300;


function stopAudio(){
  playButton.dataset.playing='false';
  
  audioElement.pause();
  audioElement.currentTime = 0;
}

// STOP BUTTON 
const powerButton = document.querySelector('.control-power');
powerButton.addEventListener('click', function() {

  stopAudio();
    
}, false);


function playAudio()
{
  audioCtx.resume().then(() => {
    console.log('Playback resumed successfully');
    audioElement.play();
    playButton.dataset.playing = 'true';
  });
  
}
// PLAY BUTTON 
const playButton = document.querySelector('.tape-controls-play');
playButton.addEventListener('click', function() {
  // check if context is in suspended state (autoplay policy)


  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  if (this.dataset.playing === 'false') {
    // playAudio();
    audioElement.play();
    this.dataset.playing = 'true';

  // if track is playing pause it
  } else if (this.dataset.playing === 'true') {
    audioElement.pause();
    this.dataset.playing = 'false';


  }
  let state = this.getAttribute('aria-checked') === "true" ? true : false;
  this.setAttribute( 'aria-checked', state ? "false" : "true" );
}, false);



window.onload = loadKnob;

function loadKnob(){
  /////// handle knob
  // var knob_element = document.getElementsByClassName("top")[0];
  // console.log(knob_element);
  // var style = window.getComputedStyle(knob_element, null);
  // var trans = style.getPropertyValue("transform");
  // console.log(trans);
  handleReverb(180);
}



