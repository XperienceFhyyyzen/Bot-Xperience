 const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
const bot = new Discord.Client();

var prefix = "/";
const ytdl = require('ytdl-core') ;

const queue = new Map();

var servers = {};

const client = new Discord.Client();

client.login("NTE4NzgwMTAyMDMzNTM5MDcy.DuwbJA.wdVB8N-dRuJ11ndCIaPQKzwjYy4");

client.on("ready", () => {

    console.log("Je suis prÃªt !");
    client.user.setGame(" /help...");
})

bot.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "ð¡-bienvenue-aurevoir").send('Bienvenue ${member}');
});

bot.on("guildMemberRemove", member => {
  member.guild.channeles.find("name", "ð¡-bienvenue-aurevoir").send('${member} viens de quitter le serveur ');
});

bot.on('guildMemberAdd', member => {
  var role = member.guild.roles.find('name', 'ð®| Joueur(s)');
  member.addRole(role);
});

client.on('message', message => { 

    if(message.content === prefix + "help") {
      var aide_embed = new Discord.RichEmbed()
      .setColor('RED')
      .setTitle(`:robot: Voici mes catÃ©gories d'aide !`)
      .setDescription(`Voici mes commandes disponible :`)
      .setThumbnail(message.author.avatarURL)
      .addField(":tools: ModÃ©ration", "Fais `/mod` pour voir mes commandes de modÃ©ration !")
      .addField(":tada: Fun", "Fais `/fun` pour voir mes commandes d'animation !")
      .setFooter("Menu d'aide - Bot Xperience")
      .setTimestamp();
      message.channel.send(aide_embed);
}
    if(message.content === prefix + "mod") {
      var mod_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(`:tools: Voici mes commandes modÃ©rations !`)
      .setThumbnail(message.author.avatarURL)
      .addField("/kick <@user>", "Kick l'utilisateur !")
      .addField("/ban <@user>", "Ban l'utilisateur !")
      .addField("/warn <@user> <reason>", "Warn l'utilisateur !")
      .addField("/clear nombre", "Supprime le nombre de messages indiquÃ©")
      .addField("/mute <@user>", "Mute l'utilisateur mentionnÃ©")
      .addField("/unmute <@user>", "Unmute l'utilisateur mentionnÃ©")
      .setFooter("Commande modÃ©ration")
      .setTimestamp();
      message.channel.send(mod_embed);
}

    if(message.content === prefix + "fun") {
      var fun_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(`:tools: Voici mes commandes amusantes !`)
      .setThumbnail(message.author.avatarURL)
      .addField("Bonjour", "Le bot rÃ©pond !")
      .addField("/8ball", "Le bot rÃ©pond Ã  votre question !")
      .addField("/stats", "Le bot vous envoie des informations sur votre profil !")
      .addField("/info", "Donne des indormations sur le bot et le serveur !")
      .setFooter("Commande modÃ©ration - Tuto YouTube")
      .setTimestamp();
      message.channel.send(fun_embed);
}
    if(message.content === prefix + "info") {
        var info_embed = new Discord.RichEmbed()
        .setColor("#40A497")
        .setTitle("Voici les informations sur moi et le serveur !")
        .addField(" :robot: Nom :", `${client.user.tag}`, true)
        .addField("Descriminateur du bot :hash:", `#${client.user.discriminator}`)
        .addField("ID :id: ", `${client.user.id}`)
        .addField("Nombre de membres", message.guild.members.size)
        .addField("Nombre de catÃ©gories et de salons", message.guild.channels.size)
        .setFooter("Info - ");
        message.channel.sendMessage(info_embed);
        console.log("Un utilisateur a effectuÃ© la commande d'info !");
}

    if(message.content.startsWith(prefix + "kick")){
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission!");
    
        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez metionner un utilisaeur");
}
        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Je ne sais pas si l'utilisateur existe :/");
}
    
        if(message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission pour kick");
}
    
        kick.kick().then(member => {
            message.channel.send(`${member.user.username} est kick par ${message.author.username}`);
        });
}

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la perission");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Je ne sais pas si l'utilisateur existe");
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission pour ban");
        }
        ban.ban().then(member => {
            message.channel.send(`${member.user.username} est ban par ${message.author.username} !`);
        });

        if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("Vous n'avez pas la permission !");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Tu dois prÃ©ciser un nombre de messages Ã  supprimer !");
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} messages ont Ã©tÃ© supprimÃ©s !`);
        });
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvÃ© l'utilisateur ou il l'existe pas !");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute !`);
        });
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvÃ© l'utilisateur ou il l'existe pas !");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute !`);
        });
    }
}});
