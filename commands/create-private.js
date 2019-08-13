module.exports = {
    name: "create-private",
    description: "creates a private serever just for you",
    execute(message, args){
        var channelsName = [];
        message.guild.channels.forEach((channel) => {
            //filter out category and voice channels
            if(channel.type !== 'category' && channel.type !== 'voice'){
                channelsName.push(channel.name);
            }
        });
        console.log(channelsName);
        console.log(message.author.username);
        if(channelsName.some(name => name === message.author.username.toLowerCase())){
            return message.reply(`Sorry @${message.author.tag}, you already have a channel for yourself\n**Don't be greedy**`);
        }
        

        /*
        //for every server
        client.guilds.forEach((guild) => {
            //for every channel in each server
            console.log(`${guild}`)
            guild.channels.forEach((channel) => {
                console.log(`|- ${channel.name}`);
            })
        });
        */
        
        //create private server for user
        message.guild.createChannel(message.author.username, 'text', [
            {
                id: message.guild.id,
                deny: ['VIEW_CHANNEL'],
            },
            {
                id: message.author.id,
                allow: ['VIEW_CHANNEL'],
            },
        ])
            .then(() => message.reply(`Created your very own channel`))
            .catch(console.error);
        
    }
}