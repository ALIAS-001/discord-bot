const { prefix } = require('../config.json');
const Discord = require('discord.js');
module.exports = {
    name: 'help',
    description: 'List of all avalable commands',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const data = new Discord.RichEmbed()
            .setColor('#42aac3');
        const {commands} = message.client;

        if (!args.length){
            data.setTitle('Bot commands');
            const commandName = commands.map(command => command.name);
            const commandAlias = commands.map(command => command.aliases || 'no aliases');
            const commandDesc = commands.map(command => command.description);
            const commandUsage = commands.map(command => command.usage || 'no arguments needed');
            for(var i=0;i<commandName.length;i++){
                data.addField(`${prefix}${commandName[i]}\n Aliases: ${commandAlias[i]}`,`${commandDesc[i]}\nUsage: ${commandUsage[i]}`);
            }
            return message.reply({ embed: data });
        }
        data.setTitle('Bot Help');
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        data.addField(`**${command.name}**\naliases: ${command.aliases || 'no aliases'}`, `${command.description || 'no description given'}\nUsage: ${command.usage}`);
        return message.reply({ embed: data });
    }
}