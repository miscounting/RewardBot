# RewardBot

A simple bot designed to integrate with Twitch custom channel point rewards.  RewardBot snoops on your twitch chat using **ComfyJS**, identifies rewards with configured actions, and performs those actions automatically.

# To use
### Install
RewardBot is written in NodeJs.  You'll need to install NodeJs and Python (2 or 3). 

Then edit the a ./resources/.env file so that it contains your channel name and an oauth token.  To create the OAUTH token you can use https://twitchapps.com/tmi/

## Configure

This repository includes an example config.json file that should help you get started.  You will need to define a list of commands for the bot to perform.  Commands must have a twitch_reward_id and an action.  Actions currently include:

* Press hotkeys (easy way to integrate with OBS or other programs)
* Whisper at bot (good for invoking commands on Streamlabs chatbot!)
* Perform one of a list of actions at random!

### Find your custom reward IDs
Create a custom reward on your Twitch channel.

Open InstaFluff's reward ID finder tool:

[https://www.instafluff.tv/TwitchCustomRewardID/?channel=yourchannel](https://www.instafluff.tv/TwitchCustomRewardID/?channel=yourchannel)

(edit the URL to include your twitch channel name.)

Redeem your custom reward in your twitch chat, and the tool should display your command's reward ID.
### Create your config.json
Edit the included config.json file to contain _your_ custom commands and actions!


## Run

The included scripts (run.cmd for Windows, run.sh for Mac/linux) will get you going!
