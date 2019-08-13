module.exports = {
    name: 'server',
    description: '',
    usage: '',
    execute(message, args) {
        if(args === 'count'){
            return message.reply(`member count: ${message.guild.memberCount}`);
        }
    },
}