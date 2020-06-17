var robot = require("robotjs");
require('dotenv').config({ path: './resources/.env'});

var commandsToHotkeys = new Map();

// beard command
commandsToHotkeys.set("d72c04c1-0c6e-4b83-ad06-e1abf1c2d6ca", ['1', 'shift', 'control', 'alt', 'command']);
// glam command
commandsToHotkeys.set("c1b3575f-273e-4427-b999-82a587fa2c62", ['2', 'shift', 'control', 'alt', 'command']);
commandsToHotkeys.set("dc234acd-fa3d-4fd3-9a93-5990bc82f962", ['v', 'control']);
// Your command here:
// commandsToHotkeys.set("your command's Twitch ID", ['a', 'list', 'of', 'however', 'many', 'hotkeys']);
// see https://github.com/octalmage/robotjs for hotkey info
// see https://www.instafluff.tv/TwitchCustomRewardID/?channel=miscounting to find reward IDs.

var commandsToRandomOutcomeHotkeys = new Map();
// random unflattering filter
commandsToRandomOutcomeHotkeys.set("a4188288-eb26-42fb-a613-a25df345c950", [
    // spider
    ['a', 'shift', 'control', 'alt', 'command'],
    // shrinky dink
    ['s', 'shift', 'control', 'alt', 'command'],
    // // duck face
    // ['f', 'shift', 'control', 'alt', 'command'],
    // peach
    ['g', 'shift', 'control', 'alt', 'command'],
    // fat pikachu
    ['h', 'shift', 'control', 'alt', 'command'],
    //blowfish
    ['j', 'shift', 'control', 'alt', 'command'],
    // "NGL" distorted face
    ['k', 'shift', 'control', 'alt', 'command'],
    // head on fire
    ['z', 'shift', 'control', 'alt', 'command']
]);

var ComfyJS = require("comfy.js");

ComfyJS.onChat = (user, message, flags, self, extra, customCommand) => {
    console.log(user + ": " + message);
    if (commandsToHotkeys.has(extra.customRewardId)) {
        var hotkeys = commandsToHotkeys.get(extra.customRewardId);
        robot.keyTap(hotkeys[0], hotkeys.slice(1));
    } else if (commandsToRandomOutcomeHotkeys.has(extra.customRewardId)) {
        var allHotkeys = commandsToRandomOutcomeHotkeys.get(extra.customRewardId);
        var chosenHotkey = allHotkeys[Math.floor(Math.random() * allHotkeys.length)];
        robot.keyTap(chosenHotkey[0], chosenHotkey.slice(1));
        setTimeout(() => { 
            robot.keyTap(chosenHotkey[0], chosenHotkey.slice(1)); }, 60_000);
    }
    else if (extra.customRewardId === "f87b7b82-bb5e-42da-9ec8-d0d87cf2b72e") {
        ComfyJS.Whisper("!dancebreak", "countabot");
    }
}
ComfyJS.onError = (error) => {
    console.log(error)
  }
ComfyJS.Init( process.env.TWITCHUSER, process.env.OAUTH );