var robot = require("robotjs");
require('dotenv').config({ path: './resources/.env' });
var ComfyJS = require("comfy.js");

const fs = require('fs');
var configString = fs.readFileSync('./resources/config.json', 'utf8');
var config = JSON.parse(configString) as Config;


interface Action {
    name?: string
    press_hotkeys?: string[]
    perform_one_action_at_random?: Action[]
    whisper_to_bot?: string
}

interface Command {
    name: string
    twitch_reward_id: string
    action: Action
}

interface Config {
    twitch_bot_id?: string
    commands: Command[]
}

interface Action {
    name?: string
    press_hotkeys?: string[]
    perform_one_action_at_random?: Action[]
    whisper_to_bot?: string
}

interface Command {
    name: string
    twitch_reward_id: string
    action: Action
}

// validate
const errors = config.commands.reduce(function (errs, command) {
    const commandName = "Command: " + 
    (typeof command.name !== 'undefined' ? command.name : command.twitch_reward_id);
    if (!command.twitch_reward_id) {
        errs.push(commandName + " is missing required field [twitch_reward_id]");
    }
    if (!command.action) {
        errs.push(commandName + " is missing required field [action]");
    }
    return errs;
}, []);

if (errors.length > 0) {
    console.log("Error importing config:");
    errors.forEach(error => console.log(error));
    process.exit(-1);
}

// populate program state from config
var botId = "";
if (typeof config.twitch_bot_id !== 'undefined') {
    botId = config.twitch_bot_id;
}

var commandsToAction = new Map();
config.commands.forEach(element => {
    console.log(`Setting up action ${element.name} for command ID ${element.twitch_reward_id}`);
    commandsToAction.set(element.twitch_reward_id, element.action);
});

var performAction = (action: Action) => {
    if (typeof action.name !== 'undefined') {
        console.log("Performing action " + action.name);
    }
    if (action.press_hotkeys) {
        pressHotkeys(action);
    }
    if (action.perform_one_action_at_random) {
        performRandomAction(action);
    }
    if (action.whisper_to_bot) {
        whisperToBot(action);
    }
}

var pressHotkeys = (action: Action) => {
    console.debug(`Pressing hotkeys: ${action.press_hotkeys.join(", ")}`);
    robot.keyTap(action.press_hotkeys[0], action.press_hotkeys.slice(1));
}

var performRandomAction = (action: Action) => {
    var allActions = action.perform_one_action_at_random;
    var chosenAction = allActions[Math.floor(Math.random() * allActions.length)];
    performAction(chosenAction);
}

var whisperToBot = (action: Action) => {
    ComfyJS.Whisper(action.whisper_to_bot, botId);
}

ComfyJS.onChat = (user, message, flags, self, extra, customCommand) => {
    console.debug(user + ": " + message);
    if (commandsToAction.has(extra.customRewardId)) {
        console.debug("yes, I found this");
        performAction(commandsToAction.get(extra.customRewardId));
    } else if (typeof extra.customRewardId !== 'undefined') {
        console.debug("custom reward ID not found in config: " + extra.customRewardId);
    }
}
ComfyJS.onError = (error) => {
    console.log(error)
}
ComfyJS.Init(process.env.TWITCHUSER);
