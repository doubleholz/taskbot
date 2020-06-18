const dotenv = require("dotenv").config() //NAME=VALUE in .env
const Telegraf = require("telegraf")
const token = process.env.botToken //@tasks_mybot
const bot = new Telegraf(token)
const Airtable = require('airtable')
const airTasks = new Airtable({apiKey: process.env.airKey}).base(process.env.airTasksId) //Task Calendar
const moment = require("moment")
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello dev.to!\n');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

recordId = ["rec0cCuhE8Ce26T4q", "recAwfW3CYpfuZDpm", "recp8x9OMaklAM8zx", "recCC4HlRCP3qW38Z", "recwtpnFyX7T1il20", "recOQzzD3npJL734d", "recLAQVEqh1KiHmRP"]
dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

//Catch Error
bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

//Start
bot.start((ctx) => {
  ctx.deleteMessage()
  ctx.reply("Hello I'm Your Airtable Bot!")
  // console.log(ctx.message)
})

//Update Daily Tasks
bot.command("Update", (ctx) => {
  ctx.deleteMessage()
  msg = ctx.message.text.split("\n")
  dayItem = msg[1].charAt(0).toUpperCase() + msg[1].slice(1)
  dayIndex = dayArray.indexOf(dayItem)
  newTasks = msg.slice(2).toString().replace(/,/g, "\n") //global replace
  console.log(newTasks)
  airTasks("Weekly").update([
    {
    "id": recordId[dayIndex],
    "fields": {
      "Tasks": newTasks
      }
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      ctx.reply("Please try again!")
      return;
    }
    return ctx.reply(dayItem + " record is Updated!")
  })
})

//Goto Task Calendar
bot.command("Calendar", (ctx) => {
  ctx.deleteMessage()
  url = "https://airtable.com/tbl1Khu5icd5iBz1o/viwH0IQ3l19Pi4Ssy?blocks=hide&date=undefined&mode=undefined"
  ctx.reply(url)
})

//Get Goals in coming 30 days.
bot.command("Goals", (ctx) => {
  ctx.deleteMessage()
  nameArr = []
  descArr = []
  dateArr = []
  goalArr = []
  utc = moment().format().split("T")
  utcPlusMonth = moment().add(1, "months").format().split("T")
  airTasks('Monthly')
    .select({
        view: "Calendar",
        sort: [{ field: "Milestone/Deadline", direction: "asc" }]
      })
    .firstPage(function(err, records) {
      if (err) { console.error(err); return; }
      records.forEach(function(record) {
        name = record.get("Name")
        desc = record.get("Description")
        date = record.get("Milestone/Deadline")  
        diff = moment(date).diff(utc[0], "days")
        if ((diff < 30) && (moment(date).isBefore(utc[0], "days") == false)) {
          nameArr.push(name)
          descArr.push(desc)
          dateArr.push(date)
          diffArr.push(diff)
          }
        })
        l = nameArr.length
        for (i = 0; i < l; i++) {
          goalArr.push(`${dateArr[i]} (in ${diffArr[i]} days)\n${nameArr[i]}\n${descArr[i]}`)
        }
        post = goalArr.toString().replace(/undefined/g, "\n").replace(/,/g, "\n\n")
        ctx.reply(`Today is: ${utc[0]}\nGoals in the next 30 days are:\n\n ${post}`)
      })
    })

//today's tasks
bot.command("Today", (ctx) => {
  ctx.deleteMessage()
  utcDay = moment().format("dddd")
  console.log("Today is", utcDay)
  airTasks('Weekly')
    .select()
    .firstPage(function(err, records) {
      if (err) { console.error(err); return; }
      records.forEach(function(record) {
        day = record.get("Day")
        tasks = record.get("Tasks")
        if (day == utcDay) {
          console.log(tasks)
          ctx.reply("Tasks for today: \n\n" + tasks)
        }
      })
    })
})

//monday
bot.command("Monday", (ctx) => {
  ctx.deleteMessage()
  airTasks('Weekly')
    .select()
    .firstPage(function(err, records) {
      if (err) { console.error(err); return; }
      records.forEach(function(record) {
        day = record.get("Day")
        tasks = record.get("Tasks")
        if (day == "Monday") {
          console.log(tasks)
          ctx.reply("Tasks for Monday: \n\n" + tasks)
        }
      })
    })
})

//tuesday
bot.command("Tuesday", (ctx) => {
  ctx.deleteMessage()
  airTasks('Weekly')
    .select()
    .firstPage(function(err, records) {
      if (err) { console.error(err); return; }
      records.forEach(function(record) {
        day = record.get("Day")
        tasks = record.get("Tasks")
        if (day == "Tuesday") {
          console.log(tasks)
          ctx.reply("Tasks for Tuesday: \n\n" + tasks)
        }
      })
    })
})

//wednesday
bot.command("Wednesday", (ctx) => {
  ctx.deleteMessage()
  airTasks('Weekly')
    .select()
    .firstPage(function(err, records) {
      if (err) { console.error(err); return; }
      records.forEach(function(record) {
        day = record.get("Day")
        tasks = record.get("Tasks")
        if (day == "Wednesday") {
          console.log(tasks)
          ctx.reply("Tasks for Wednesday: \n\n" + tasks)
        }
      })
    })
})

//thursday
bot.command("Thursday", (ctx) => {
  ctx.deleteMessage()
  airTasks('Weekly')
    .select()
    .firstPage(function(err, records) {
      if (err) { console.error(err); return; }
      records.forEach(function(record) {
        day = record.get("Day")
        tasks = record.get("Tasks")
        if (day == "Thursday") {
          console.log(tasks)
          ctx.reply("Tasks for Thursday: \n\n" + tasks)
        }
      })
    })
})

//friday
bot.command("Friday", (ctx) => {
  ctx.deleteMessage()
  airTasks('Weekly')
    .select()
    .firstPage(function(err, records) {
      if (err) { console.error(err); return; }
      records.forEach(function(record) {
        day = record.get("Day")
        tasks = record.get("Tasks")
        if (day == "Friday") {
          console.log(tasks)
          ctx.reply("Tasks for Friday: \n\n" + tasks)
        }
      })
    })
})

//saturday
bot.command("Saturday", (ctx) => {
  ctx.deleteMessage()
  airTasks('Weekly')
    .select()
    .firstPage(function(err, records) {
      if (err) { console.error(err); return; }
      records.forEach(function(record) {
        day = record.get("Day")
        tasks = record.get("Tasks")
        if (day == "Saturday") {
          console.log(tasks)
          ctx.reply("Tasks for Saturday: \n\n" + tasks)
        }
      })
    })
})

//sunday
bot.command("Sunday", (ctx) => {
  ctx.deleteMessage()
  airTasks('Weekly')
    .select()
    .firstPage(function(err, records) {
      if (err) { console.error(err); return; }
      records.forEach(function(record) {
        day = record.get("Day")
        tasks = record.get("Tasks")
        if (day == "Sunday") {
          console.log(tasks)
          ctx.reply("Tasks for Sunday: \n\n" + tasks)
        }
      })
    })
})

bot.launch()

// *For Getting Record Data*
// airTasks("Weekly")
// .select({
//   view: "Grid view",
//   sort: [{ field: "Index", direction: "asc" }]
// })
// .firstPage(function (err, records) {
//   if (err) { console.error(err); return; }
//   records.forEach(function (record) {
//       console.log(record.id)
//       console.log(record.get("Day"))
//     })
//   })
