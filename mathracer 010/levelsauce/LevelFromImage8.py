from PIL import Image
   
im = Image.open("./hub.png", "r")
intro = "function loadlevel(whitetile,greytile,blacktile,darkredtile,redtile,darkgreentile,greentile,darkbluetile,bluetile,yellowtile,cyantile,purpletile){"
declaration = "var newlevel = new Mgridworld('alevel',"+str(im.width)+","+str(im.height)+",[[5,5]]);"
startfill = "newlevel.fillgrid(whitetile);"
totalcommand = intro+"\n"+declaration+"\n"+startfill;
i=0
while i < im.width:
  j=0
  while j < im.height:
    firstpixel = im.getpixel([i,j])
    fpr = firstpixel[0]
    fpg = firstpixel[1]
    fpb = firstpixel[2]
    firstj = j;
    columntile = "whitetile"
    if fpr<50 and fpg<50 and fpb<50:
      columntile = "blacktile"
    if fpr<200 and fpr>=50 and fpg<200 and fpg>=50 and fpb<200 and fpb>=50:
      columntile = "greytile"
    elif fpr >= 50 and fpr<200 and fpg<50 and fpb<50:
      columntile = "darkredtile"
    elif fpr >=200 and fpg<50 and fpb<50:
      columntile = "redtile"
    elif fpr<50 and fpg>=50 and fpg<200 and fpb<50:
      columntile = "darkgreentile"
    elif fpr<50 and fpg>=200 and fpb<50:
      columntile = "greentile"
    elif fpr<50 and fpg<50 and fpb>=50 and fpb<200:
      columntile = "darkbluetile"
    elif fpr<50 and fpg<50 and fpb>=200:
      columntile = "bluetile"
    elif fpr>=200 and fpg>=200 and fpb<50:
      columntile = "yellowtile"
    elif fpr<50 and fpg>=200 and fpb>=200:
      columntile = "cyantile"
    elif fpr>=200 and fpg<50 and fpb>=200:
      columntile = "purpletile"
      
    firsttile = columntile; 
    if firsttile != "whitetile" and j<im.height-1:
        chunklength = 1
        j += 1
        #print(str(i)+" "+str(j));
        nextpixel = im.getpixel([i,j])
        fpr = nextpixel[0]
        fpg = nextpixel[1]
        fpb = nextpixel[2]
        columntile = "whitetile"
        if fpr<50 and fpg<50 and fpb<50:
          columntile = "blacktile"
        if fpr<200 and fpr>=50 and fpg<200 and fpg>=50 and fpb<200 and fpb>=50:
          columntile = "greytile"
        elif fpr >= 50 and fpr<200 and fpg<50 and fpb<50:
          columntile = "darkredtile"
        elif fpr >=200 and fpg<50 and fpb<50:
          columntile = "redtile"
        elif fpr<50 and fpg>=50 and fpg<200 and fpb<50:
          columntile = "darkgreentile"
        elif fpr<50 and fpg>=200 and fpb<50:
          columntile = "greentile"
        elif fpr<50 and fpg<50 and fpb>=50 and fpb<200:
          columntile = "darkbluetile"
        elif fpr<50 and fpg<50 and fpb>=200:
          columntile = "bluetile"
        elif fpr>=200 and fpg>=200 and fpb<50:
          columntile = "yellowtile"
        elif fpr<50 and fpg>=200 and fpb>=200:
          columntile = "cyantile"
        elif fpr>=200 and fpg<50 and fpb>=200:
          columntile = "purpletile"
        while j<im.height-1 and columntile==firsttile:
          chunklength += 1
          j += 1
          nextpixel = im.getpixel([i,j])
          fpr = nextpixel[0]
          fpg = nextpixel[1]
          fpb = nextpixel[2]
          columntile = "whitetile"
          columntile = "whitetile"
          if fpr<50 and fpg<50 and fpb<50:
            columntile = "blacktile"
          if fpr<200 and fpr>=50 and fpg<200 and fpg>=50 and fpb<200 and fpb>=50:
            columntile = "greytile"
          elif fpr >= 50 and fpr<200 and fpg<50 and fpb<50:
            columntile = "darkredtile"
          elif fpr >=200 and fpg<50 and fpb<50:
            columntile = "redtile"
          elif fpr<50 and fpg>=50 and fpg<200 and fpb<50:
            columntile = "darkgreentile"
          elif fpr<50 and fpg>=200 and fpb<50:
            columntile = "greentile"
          elif fpr<50 and fpg<50 and fpb>=50 and fpb<200:
            columntile = "darkbluetile"
          elif fpr<50 and fpg<50 and fpb>=200:
            columntile = "bluetile"
          elif fpr>=200 and fpg>=200 and fpb<50:
            columntile = "yellowtile"
          elif fpr<50 and fpg>=200 and fpb>=200:
            columntile = "cyantile"
          elif fpr>=200 and fpg<50 and fpb>=200:
            columntile = "purpletile"
        j -= 1
        columncommand = "newlevel.vreplacetile("+firsttile+","+str(i)+","+str(firstj)+","+str(chunklength)+");"
        totalcommand = totalcommand +" \n"+columncommand
    j += 1
  i += 1
totalcommand = totalcommand+"\n"+"return newlevel; \n }"
print(totalcommand)
#aspecialpixel = im.getpixel([10,25])
