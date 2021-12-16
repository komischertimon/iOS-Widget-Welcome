// Version 1.0

// set Color
let backColor = new Color("55555"),
    fontColor = new Color("FFFFF"),
    smallFont = new Font("Arial Nova Light", 18),
    bigFont = new Font("Arial Nova", 34);

// init data
let phrase = "",  
    btrylvl = "",
    days = "",
    daytime = "",
    name = args.widgetParameter,
    d = new Date(),
    h = d.getHours(),
    today = d.getDay(),
    sysLang = Device.language()
    btry = Math.round(Device.batteryLevel()*100); 

        
  if (btry >= 80) {  
    btrylvl = 100  
  } else if (btry >=60) {  
    btrylvl = 75  
  } else if (btry >=40) {  
    btrylvl = 50  
  } else if (btry >=15) {  
    btrylvl = 25  
  } else if (btry <=14) {  
    btrylvl = 0
  }

  if(sysLang == "de") {
    days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
    phrase = ["Gute Nacht", "Guten Morgen", "Guten Tag", "Guten Abend"]
  } else {
    days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"]  
    phrase = ["Good night", "Good morning", "Good day", "Good evening"]
  }
    
  if(h < 3) {
    daytime = 0
  } else if(h < 10) {
    daytime = 1
  } else if (h < 17) {
    daytime = 2
  } else if (h < 22) {
    daytime = 3
  } else if (h < 24) {
    daytime = 0
  }  

  if(args.widgetParameter = null){
      name = " "
  }
     
  let btryIconIMG = SFSymbol.named("battery."+btrylvl),
      speakerIMG = SFSymbol.named("tortoise");

 
let w = new ListWidget();
// Init Widget   

    let top = w.addStack()
    textPhrase = top.addText(phrase[daytime])
    textName = top.addText(" " + name)
    top.addSpacer()
    
    w.addSpacer(3)

    let middle = w.addStack()
    textDate = middle.addText(days[today] + ", ")
    date = middle.addDate(new Date)
  
    w.addSpacer(10)

    let bottom = w.addStack()
    line = bottom.addText("| ")
    battery = bottom.addText(btry + "%")
    btryIMG = bottom.addImage(btryIconIMG.image)    
    
// Widget settings// 
w.setPadding(0, 25, 35, 0)
w.backgroundColor = backColor


//Text settings
textPhrase.font = bigFont
textName.font = bigFont


// Date settings
date.applyDateStyle()
date.font = smallFont
textDate.font = smallFont

// Battery settings
battery.font = smallFont
btryIMG.imageSize = new Size(34,21)
btryIMG.centerAlignImage()


if(btry >= 50) {
    line.textColor = Color.green()
} else if (btry <= 49){
    line.textColor = Color.yellow()
} else if (btry <= 20){
    line.textColor = Color.red()
} else if ( btry <= 10) {
    line.textColor = Color.darkred()
}

function repeat() {  
  if(Device.isCharging()){  
    battery.textColor = Color.green()
    line.textColor = Color.green()
  }
}

repeat()

Timer.schedule(900, true, repeat) 

if(!config.runsInWidget) {
    await w.presentMedium()
  } else {
    Script.setWidget(w)
    Script.complete()
  }
