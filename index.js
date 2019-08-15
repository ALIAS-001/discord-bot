const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

//dynamic command loader
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.once('ready', () =>{
    // what username this bot is registered as
    console.log(`Connected as ${client.user.username}`)
    //all servers connected to
    console.log('Connected to:');
    client.guilds.forEach((guild) => {
        console.log(`${guild}`);
    })
})

client.on('message', message=> {
	if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    //console.log('prefix command');
    console.log(commandName);
    //console.log(command);
    if(!command) return;
    if(command.guildOnly && message.channel.type !== 'text') 
        return message.reply('I can\'t execute that command in here');
    
    if (command.args && !args.length){
        let reply = `You didn't provide any arguments, ${message.author}`
        if (command.usage) {
            reply += `\nThe proper usage is, \`${prefix}${commandName} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }
    //cooldown here

    try{
        command.execute(message, args);
    } catch(error) /* in the event something goes wrong */ {
        console.log(error);
        message.reply('Something\'s wrong. Either try again in a while, or contact the creator.');
    }
});

client.login(token);