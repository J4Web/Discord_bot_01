const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// import Discord from 'discord.js'
// const client = new Discord.Client();
const fetch = require('node-fetch');

const getQuote =()=>{
  return fetch("https://zenquotes.io/api/random").then(res=>{
    return res.json();
  }).then(data=>{
    return data[0]["q"]+ " -"+data[0]["a"];
  })
}
const sadWords=["I am sad bot","I am depressed bot","I am unhappy bot","I am angry bot"];

const cheerUp=["Cheer Up! You'll be okay", "Hang in there buddy we do have those days!","You're an amazing person dont ever forget that!"];

client.on("ready",()=>{
  console.log(`I am ready to Rock N Roll! ${client.user.tag}!`);
})
const commands=["Hello! my owner how are you today ?", "Hiya my owner thank you for creating me! How may I help you today?", "Hello Sir what are you up to today?", "Well Hello master how may I help you today?"];
client.on("message",(msg)=>{
  if(msg.author.bot)
  {
    return;
  }
  if(msg.content==="hello" ||  msg.content==="Hello" || msg.content=="Hello Bot" || msg=="Hello bot" || msg.content=="hello bot")
  {
   let p=Math.floor(Math.random()*commands.length);
      msg.reply(commands[p]);
  }
  if(msg.content=="$inspire")
  {
    getQuote().then(quote=>msg.channel.send(quote));
  }
  if(msg.content=="$Help" || msg.content=="$help"){
    let a=["How may I be of service sir?", "How can I help you my master?"];
    let p=Math.floor(Math.random()*a.length);
    msg.reply(a[p])
  }
  if(msg.content=="ping")
  {
    msg.reply("pong");
  }
  if(sadWords.some(word=> msg.content.includes(word))){
   let p=Math.floor(Math.random()*cheerUp.length);
  
    const cheer=cheerUp[p];
    msg.reply(cheer);
  }
})
const mySecret = process.env['TOKEN_KEY'];
client.login(mySecret);
