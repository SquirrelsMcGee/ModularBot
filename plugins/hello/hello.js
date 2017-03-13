module.exports = {
    metadata: {
        description: "Says Hello!",
    },
    process: function(message) {
        message.channel.sendMessage(`Hello ${(message.author.username)}!`);
    }
};