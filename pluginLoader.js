/* pluginLoader.js */

var fs = require("fs"),
    path = require("path");

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


module.exports = {
    getPlugins: getPlugins
};