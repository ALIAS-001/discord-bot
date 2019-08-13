const min_role = 'owner';
module.exports = {
    name: 'ban',
    description: 'ban someone (only certant roles can use this command)',
    args: true,
    usage: '<@user> <days> [reason] or <days> <@user> [reason]',
    execute(message, args){
        if(message.member.roles.some(role => role.name === min_role)){
            // differentiate bettween days and user
            var day = parseInt(args[0]);
            var user = args[1];
            if(isNaN(day)){
                day = parseInt(args[1]);
                user = args[0];
            }
            // condense reason if avalable
            var _reason = 'no reason';
            if(args[2]){
                var _reason = '';
                for(var i=2;i<args.length;i++){
                    _reason += `${args[i]} `; 
                }
            }
            const reasonb = {days: day, reason: _reason};
            message.reply(`Are you sure you want to Ban ${user}?`)
                .then(() => {
                    //filter messages so that messege is from the author previous
                    const filter = message => message.author.id === message.author.id;
                    const res = ['Yes', 'yes', 'Y', 'y'];
                    message.channel.awaitMessages(filter, { time: 60000, maxMatches: 1, errors: ['time'] })
                        .then(message => {
                            console.log(res.some(y => y === message.content))
                            if(res.some(y => y === message.content)){
                                message.guild.ban(user,reasonb);
                                console.log(`banned ${user} for ${day} days.`)
                                message.reply(`banned ${user} for ${day} days.`);
                            }
                        })
                        .catch(() => {
                            message.reply('Ok, never mind.')
                        }
                    )
                }
            )
        }else{
            message.reply(`Sorry ${message.author.username}, only member with ${min_role} can ban`);
        }
    }
}