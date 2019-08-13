module.exports = {
    name: 'server',
    description: '',
    usage: '',
    execute(message, args) {
        if(args[0] === 'count'){
            console.log(message.guild.members);
            return message.reply(`member count: ${message.guild.memberCount}`);
        }
    },
}