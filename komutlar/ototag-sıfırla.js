const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "g!";
  let sa = (await db.fetch(`dil_${message.guild.id}`)) || "EN_us";
  if (sa == "TR_tr") {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
        .setColor("BLACK");

      message.channel.send(embed);
      return;
    }
    let tag = await db.fetch(`ototag_${message.guild.id}`);
    if (!tag) {
      const embed = new Discord.MessageEmbed()
        .setTitle(
          '<:no:824337786073120771> HATA!'
        )
        .addField(
          "\nOtoTag'ın Ek Komutları",
          `<:nokta:828877940778467338> **${prefix}ototag <#Kanal> <Tag>**\nOtomatik OtoTag Ayarlamanız için!\n\n<:nokta:828877940778467338> **${prefix}ototag-sıfırla**\nOtoTag'ı sıfırlama komutu!\n\n<:nokta:828877940778467338> **${prefix}ototag-isim <İsim Düzeni>**\nOtoİsim sistemini ayarlamak için!\n\n<:nokta:828877940778467338> **${prefix}ototag-isim-sıfırla**\nOtoİsim'ı sıfırlama komutu!`
        )
      .addField("OtoTag & İsim Ek Değişkenler",
`<:nokta:828877940778467338> **a!ototag-değişken** yazarak değişken isimlerini görebilirisiniz!`
               )
        .setColor("BLACK");
      message.channel.send(embed);
      return;
    }

    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(`Ototag başarıyla sıfırlandı!`);
    message.channel.send(embed);

    db.delete(`ototagk_${message.guild.id}`);
    db.delete(`ototag_${message.guild.id}`);
    db.delete(`ototagmsj_${message.guild.id}`);
  } else {
    let tag = await db.fetch(`ototag_${message.guild.id}`);
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `Unfortunately, you are not authorized to use this command.`
        )
        .setColor("BLACK");

      message.channel.send(embed);
      return;
    }
    if (!tag) {
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `There is something missing! Auto tag is not already set!\n--------------------------------------------------------`
        )
        .addField(
          "Additional `AUTOTAG` commands!",
          `${prefix}autotag <#Channel> <Tag>\n${prefix}autotag-reset\n${prefix}autotag-name <Name Order>\n${prefix}autotag-name-reset`
        )
        .addField(
          `autotag-name command variables;`,
          `-member- = Write the member name.\n-tag- = Writes tag.\n-server- = Write server name.\n-membertag- = Write the full name of the member.`
        )
        .setColor("BLACK");
      message.channel.send(embed);
      return;
    }
    const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(`Auto tag has been successfully reset!`);
    message.channel.send(embed);

    db.delete(`ototagk_${message.guild.id}`);
    db.delete(`ototag_${message.guild.id}`);
    db.delete(`ototagmsj_${message.guild.id}`);
  }
};

module.exports.conf = {
  aliases: ["autotag-reset"],
  permLevel: 3,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "ototag-sıfırla",
  description: "SS",
  usage: "ototag-sıfırla"
};
