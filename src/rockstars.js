import wtf from 'wtf_wikipedia'

const titles = [
  // Music

    // Women

      // Alive
        "Alanis Morrissette",
        "Björk",
        "Cher",
        "Courtney Love",
        "Debbie Harry",
        "Dolly Parton",
        "Grace Slick", // Jefferson Airplanes
        "Joan Baez",
        {title:"Joan Jett", img:2},
        "Madonna (entertainer)",
        "Marianne Faithfull",
        "Nina Hagen",
        "Patti Smith",
        "Stevie Nicks", //Fleetwood Mac
        "Tina Turner",

      // Dead
        "Amy Winehouse",
        "Aretha Franklin",
        "Cass Elliot",
        "Dolores O'Riordan",
        "Donna Summer",
        "Ella Fitzgerald",
        "Karen Carpenter",
        "Janis Joplin",
        "Nina Simone",
        "Signe Toly Anderson",

    // Men

      // Alive
        "Angus Young",
        "Axl Rose",
        "Eric Clapton",
        "James Hetfield",
        "Keith Richards",
        "Mark Knopfler",
        "Mick Jagger",
        "Ozzy Osborne",
        {title: "Paul McCartney", img: 4},
        "Pete Doherty",
        "Ringo Starr",
        "Roger Daltrey",

      // Dead
        "Elvis Presley",
        "Frank Zappa",
        "Freddie Mercury",
        "George Harrison",
        "James Brown",
        "Jeff Buckley",
        "Jim Morrison",
        "Jimi Hendrix",
        "Joe Strummer",
        "Joey Ramone",
        "John Bonham",
        "John Lennon",
        "Kurt Cobain",
        "Lemmy",
        "Sid Vicious",
        "Syd Barrett",

  // IT

    // Women

      // Alive
        "Margaret Hamilton (software engineer)",
        "Elizabeth_J._Feinler", //Create the ARPANET WHOIS
        "Adele_Goldberg_(computer_scientist)", //Developping Smaltalk
        "Marissa_Mayer", //Google et Yahoo
        "Mitchell Baker", // Présidente de la Mozilla Foundation

      // Dead
        "Ada Lovelace",
        "Hedy Lamarr",
        // "Grace_Hopper", //First compiler COBOL
        "Joan_Clarke", //Work on ENIGMA
        "Jean Bartik", //ENIAC

    // Men

      // Alive
        "Bill Gates",
        "Linus_Torvalds",
        "Richard_Stallman",
        "Gordon_Moore",
        "Scott_Fahlman", //Emoticons
        "Manuel_Blum", //Crypto and CAPTCHA
        "Tim_Berners-Lee", //Word Wide Web
        "Niklaus_Wirth", //Algol, Pascal, Oberon
        "James_Gosling", //Java
        "Larry_Page",
        "Sergey_Brin",
        "Rasmus_Lerdorf", // PHP

      // Dead
        "Charles Babbage",
        "John McCarthy (computer scientist)",
        "Steve Jobs",
        "Edsger_W._Dijkstra",
        "George_Boole", //Boolean algebra
        "Alan_Turing",
        "Douglas_Engelbart", //Computer mouse
        "Dennis_Ritchie", // Language C
        "Paul_Allen", //Microsoft
        "Adam_Osborne", //First portable computer
        "Ray_Tomlinson", //E-mail
]

const prefetchImage = url => new Promise((resolve, reject) => {
  const image = new Image()
  image.onload = () => resolve(image)
  image.onerror = () => reject(Error('Error while prefetching image'))
  image.src = url
})

const fetchRockstar = async (title) => {
  const doc = await wtf.fetch(title.title || title)
  if (!doc) throw Error(`Unknown wikipedia page "${title}"`)

  const infobox = doc.infobox(0)

  const name = infobox.get('name')

  const imageObj = doc.images(title.img || 0)
  if (!imageObj) throw Error(`"${title}" wikipedia page has no image ${title.img || 0}`)

  const image = await prefetchImage(imageObj.thumb())

  return {
    name: name ? name.text() : title,
    dead: Boolean(infobox.get('death_date') || infobox.get('death_place')),
    image,
  }
}

const rockstars = Promise.all(titles.map(fetchRockstar))

export default rockstars
