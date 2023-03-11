// const reverb = new Tone.Reverb({
//   decay: 1000,
// }).toDestination();
// const player = new Tone.Player("output/output.mid").connect(reverb);

// Interface.Loader();

// Interface.Button({
//   text: "Start",
//   activeText: "Stop",
//   start: function () {
//     player.start();
//   },
//   end: function () {
//     player.stop();
//   },
// });

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease("C4", "8n");