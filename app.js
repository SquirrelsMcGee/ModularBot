//console.log('Hello world');

//const pluginLoader = require("./pluginLoader.js");
const options = require("./options.json");
const fs = require("fs");
const path = require("path");

var plugins;
console.log(options);

try {
    const Discord = require("discord.js");
    var bot = new Discord.Client();
    bot.login(options.token).catch(error => { console.log("Error logging in"); return; });

    plugins = getPlugins();

} catch (error) {
    console.log(error);
}

function reloadPlugins() {
    plugins = null;
    plugins = getPlugins();
    console.log(plugins);
}

bot.on("ready", function () {
    return;
});

bot.on("message", function (message) {
    messageHandler(message);
});

bot.on("guildCreate", function (guild) {
    return;
});

bot.on("messageReactionAdd", function (messageReaction) {
    return;
});


/* New message */

function messageHandler(message) {
    if (message.author.id == bot.user.id) return false;
    if (message.author.bot == true) return false;
    if (message.content.startsWith(options.prefix == false)) return false;
    
    let command = (message.content.split(" ")[0].substring(options.prefix.length, message.content.split(" ")[0].length)).toLowerCase();
    let suffix = message.content.split(" ")[1];
    if (command == "") return;
    console.log(command);
    if (command == "reloadplugins") {
        reloadPlugins();
    }

    if (plugins.hasOwnProperty(command)) plugins[command].process(message);
}

/* Plugin Loader */

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath)
        .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}

function getPlugins() {
    let pluginNames = getDirectories(`${__dirname}/plugins/`);
    console.log(pluginNames);
    let pluginsObj = {};
    if (pluginNames.length != 0) {
        console.log(`Installed Plugins: ${pluginNames}`);
        for (i = 0; i < pluginNames.length; i++) {
            require("fs").readdirSync(`${__dirname}/plugins/${pluginNames[i]}`).forEach(function (file) {
                let name = pluginNames[i];
                pluginsObj[name] = require(`${__dirname}/plugins/${pluginNames[i]}/${file}`);
            });
        }
        return pluginsObj;
    } else {
        console.log("Error: No plugins installed!");
        return false;
    }
}
