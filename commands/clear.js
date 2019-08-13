const {creator} = require('../config.json');
module.exports = {
    name: 'clear',
    description: 'clears the last 99 messages (only the creator or people with a role called \'owner\' can use this)',
    aliases: ['prune','delete'],
    usage: '<# of msg to delete (2-99)>',
    execute(message, args){
        if(message.author.id === creator || message.member.roles.some(role => role.name === 'owner')){
            const amount = parseInt(args[0])+1;
            if(isNaN(amount)) 
                return message.reply('that doesn\'t seem to be a valid number');
            else if (amount < 2 || amount > 99)
                return message.reply('you need to input a number between 2 and 99');
            message.channel.bulkDelete(amount, true)
                .then(() => message.reply('done'))
                .then(() => message.channel.bulkDelete(2, true))
                .catch(err => {
                    console.log(err);
                    message.channel.send('there was an error trying to delete messeges in this channel');
            })
        } else{
            message.reply(`${message.author.tag}, you can't use this command yet`);
        }
    }
}