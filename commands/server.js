module.exports = {
    name: 'server',
    description: '',
    usage: '',
    execute(message, args) {
        if(args[0] === 'count'){
            var bots = 0;
            var users = 0;
            message.guild.members.forEach(member => {
                if(member.bot)
                    bots++;
                else
                    users++;
            });


            return message.reply(`member count:\n${users} users\n${bots} bots`);
        }
    },
}