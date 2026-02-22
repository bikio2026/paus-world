// ============================================================
// PAU'S WORLD OF WONDER — Data Module
// ============================================================

function getPhotoUrl(urlOrFilename, width = 480) {
  // If already a full URL, return as-is
  if (urlOrFilename.startsWith("http")) return urlOrFilename;
  // Fallback: Wikimedia Commons redirect
  return `https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/${encodeURIComponent(urlOrFilename)}&width=${width}`;
}

// ============================================================
// REGION DATA — simplified geographic regions for world map
// Keys map to SVG region IDs that get highlighted
// ============================================================
const REGION_COORDS = {
  "south-america": { cx: 82, cy: 120, regions: ["south-america"] },
  "north-america": { cx: 62, cy: 40, regions: ["north-america"] },
  "central-america": { cx: 70, cy: 76, regions: ["central-america"] },
  "americas": { cx: 75, cy: 90, regions: ["north-america", "south-america", "central-america"] },
  "europe": { cx: 186, cy: 30, regions: ["europe"] },
  "africa": { cx: 196, cy: 100, regions: ["africa"] },
  "asia": { cx: 268, cy: 36, regions: ["asia"] },
  "oceania": { cx: 310, cy: 128, regions: ["oceania"] },
  "antarctica": { cx: 180, cy: 172, regions: ["antarctica"] },
  "worldwide": { cx: 180, cy: 90, regions: ["north-america","south-america","europe","africa","asia","oceania"] },
  "eurasia": { cx: 226, cy: 32, regions: ["europe","asia"] },
  "southern-cone": { cx: 84, cy: 148, regions: ["south-america"] },
  "patagonia": { cx: 82, cy: 154, regions: ["south-america"] },
  "neotropics": { cx: 76, cy: 94, regions: ["south-america","central-america"] },
  "new-zealand": { cx: 346, cy: 150, regions: ["oceania"] },
  "mediterranean": { cx: 190, cy: 50, regions: ["europe","africa"] },
  "sub-saharan-africa": { cx: 200, cy: 110, regions: ["africa"] }
};

// ============================================================
// BIRDS — ~50 entries
// difficulty: 1 = easy, 2 = medium, 3 = hard
// ============================================================
const BIRDS = [
  // --- EASY (difficulty 1) ---
  {
    id: "b001",
    nameEs: "Flamenco",
    nameEn: "Greater Flamingo",
    scientific: "Phoenicopterus roseus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/010_Greater_flamingos_male_and_female_in_the_Camargue_during_mating_season_Photo_by_Giles_Laurent.jpg/330px-010_Greater_flamingos_male_and_female_in_the_Camargue_during_mating_season_Photo_by_Giles_Laurent.jpg",
    funFact: "Los flamencos nacen blancos; su color rosado viene de los carotenoides de las algas y crustáceos que comen.",
    difficulty: 1,
    region: "mediterranean",
    xcId: 1079050
  },
  {
    id: "b002",
    nameEs: "Tucán Toco",
    nameEn: "Toco Toucan",
    scientific: "Ramphastos toco",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/006_Toco_toucan_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/330px-006_Toco_toucan_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
    funFact: "Su enorme pico es en realidad muy liviano: está hecho de queratina con una estructura interna tipo esponja.",
    difficulty: 1,
    region: "south-america",
    xcId: 1073033
  },
  {
    id: "b003",
    nameEs: "Águila Calva",
    nameEn: "Bald Eagle",
    scientific: "Haliaeetus leucocephalus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg/330px-Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg",
    funFact: "A pesar de ser símbolo de fuerza, su llamado real es bastante débil; en las películas lo suelen doblar con el grito de un halcón.",
    difficulty: 1,
    region: "north-america",
    xcId: 535101
  },
  {
    id: "b004",
    nameEs: "Pingüino Emperador",
    nameEn: "Emperor Penguin",
    scientific: "Aptenodytes forsteri",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_juvenile-8.jpg/330px-Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_juvenile-8.jpg",
    funFact: "El macho incuba el huevo durante 65 días sin comer, soportando temperaturas de -60°C en la Antártida.",
    difficulty: 1,
    region: "antarctica",
    xcId: 877995
  },
  {
    id: "b005",
    nameEs: "Colibrí Garganta de Rubí",
    nameEn: "Ruby-throated Hummingbird",
    scientific: "Archilochus colubris",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Archilochus_colubris_-flying_-male-8.jpg/330px-Archilochus_colubris_-flying_-male-8.jpg",
    funFact: "Su corazón late hasta 1.200 veces por minuto y aletea 53 veces por segundo.",
    difficulty: 1,
    region: "north-america",
    xcId: 1013237
  },
  {
    id: "b006",
    nameEs: "Búho Real",
    nameEn: "Eurasian Eagle-Owl",
    scientific: "Bubo bubo",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bubo_bubo_3_%28Martin_Mecnarowski%29.jpg/330px-Bubo_bubo_3_%28Martin_Mecnarowski%29.jpg",
    funFact: "Puede girar la cabeza 270 grados gracias a que tiene 14 vértebras cervicales (los humanos tenemos 7).",
    difficulty: 1,
    region: "eurasia",
    xcId: 996135
  },
  {
    id: "b007",
    nameEs: "Pavo Real",
    nameEn: "Indian Peafowl",
    scientific: "Pavo cristatus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Peacock_on_tree_%2852077240794%29.jpg/330px-Peacock_on_tree_%2852077240794%29.jpg",
    funFact: "Las 'plumas' del abanico son en realidad coberteras de la cola; la cola real está debajo y es marrón.",
    difficulty: 1,
    region: "asia",
    xcId: 1077506
  },
  {
    id: "b008",
    nameEs: "Guacamayo Rojo",
    nameEn: "Scarlet Macaw",
    scientific: "Ara macao",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Scarlet_macaw_%28Ara_macao_cyanopterus%29_Copan.jpg/330px-Scarlet_macaw_%28Ara_macao_cyanopterus%29_Copan.jpg",
    funFact: "Pueden vivir hasta 75 años en cautiverio y forman parejas de por vida.",
    difficulty: 1,
    region: "neotropics",
    xcId: 1035872
  },
  {
    id: "b009",
    nameEs: "Pelícano Blanco",
    nameEn: "Great White Pelican",
    scientific: "Pelecanus onocrotalus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Great_white_pelican_%28Pelecanus_onocrotalus%29.jpg/330px-Great_white_pelican_%28Pelecanus_onocrotalus%29.jpg",
    funFact: "Su bolsa gular puede contener hasta 13 litros de agua, tres veces más que su estómago.",
    difficulty: 1,
    region: "africa",
    xcId: 343693
  },
  {
    id: "b010",
    nameEs: "Hornero",
    nameEn: "Rufous Hornero",
    scientific: "Furnarius rufus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Rufous_hornero_%28Furnarius_rufus%29_Colonia.jpg/330px-Rufous_hornero_%28Furnarius_rufus%29_Colonia.jpg",
    funFact: "Su nido de barro puede pesar hasta 5 kg y siempre orienta la entrada para que no entre el viento directo.",
    difficulty: 1,
    region: "south-america",
    xcId: 1009595
  },
  {
    id: "b011",
    nameEs: "Cisne Negro",
    nameEn: "Black Swan",
    scientific: "Cygnus atratus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Black_swan_%28Cygnus_atratus%29_Scottsdale.jpg/330px-Black_swan_%28Cygnus_atratus%29_Scottsdale.jpg",
    funFact: "Originario de Australia, fue una sorpresa total para los europeos que creían que todos los cisnes eran blancos.",
    difficulty: 1,
    region: "oceania",
    xcId: 954554
  },
  {
    id: "b012",
    nameEs: "Cóndor Andino",
    nameEn: "Andean Condor",
    scientific: "Vultur gryphus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/AndeanCondorMale.jpg/330px-AndeanCondorMale.jpg",
    funFact: "Con una envergadura de hasta 3,3 metros, es una de las aves voladoras más grandes del mundo.",
    difficulty: 1,
    region: "south-america",
    xcId: 1008961
  },
  {
    id: "b013",
    nameEs: "Loro Gris Africano",
    nameEn: "African Grey Parrot",
    scientific: "Psittacus erithacus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Perroquet_%C3%A0_Yampopo_Beach_-_Douala.jpg/330px-Perroquet_%C3%A0_Yampopo_Beach_-_Douala.jpg",
    funFact: "Se considera el ave más inteligente del mundo; puede aprender más de 1.000 palabras y usar conceptos abstractos.",
    difficulty: 1,
    region: "sub-saharan-africa",
    xcId: 1053186
  },
  {
    id: "b014",
    nameEs: "Lechuza de Campanario",
    nameEn: "Barn Owl",
    scientific: "Tyto alba",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Barn_Owl%2C_Lancashire.jpg/330px-Barn_Owl%2C_Lancashire.jpg",
    funFact: "Su disco facial funciona como una antena parabólica que dirige el sonido hacia sus oídos asimétricos, permitiéndole cazar en total oscuridad.",
    difficulty: 1,
    region: "worldwide",
    xcId: 1080667
  },
  {
    id: "b015",
    nameEs: "Kiwi Marrón",
    nameEn: "North Island Brown Kiwi",
    scientific: "Apteryx mantelli",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/TeTuatahianui.jpg/330px-TeTuatahianui.jpg",
    funFact: "Es el único ave con fosas nasales en la punta del pico, lo que le da un sentido del olfato excepcional.",
    difficulty: 1,
    region: "new-zealand",
    xcId: 955810
  },
  // --- MEDIUM (difficulty 2) ---
  {
    id: "b016",
    nameEs: "Martín Pescador",
    nameEn: "Common Kingfisher",
    scientific: "Alcedo atthis",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Alcedo_atthis_-England-8_%28cropped%29.jpg/330px-Alcedo_atthis_-England-8_%28cropped%29.jpg",
    funFact: "Se zambulle en el agua a 40 km/h. El diseño del tren bala Shinkansen de Japón está inspirado en la forma de su pico.",
    difficulty: 2,
    region: "eurasia",
    xcId: 1080666
  },
  {
    id: "b017",
    nameEs: "Quetzal Resplandeciente",
    nameEn: "Resplendent Quetzal",
    scientific: "Pharomachrus mocinno",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Resplendent_quetzal_san_gerardo_de_dota_3.31.24_DSC_3989-topaz-denoiseraw.jpg/330px-Resplendent_quetzal_san_gerardo_de_dota_3.31.24_DSC_3989-topaz-denoiseraw.jpg",
    funFact: "Era sagrado para los mayas y aztecas. Su nombre viene del náhuatl 'quetzalli', que significa 'pluma preciosa'.",
    difficulty: 2,
    region: "central-america",
    xcId: 914121
  },
  {
    id: "b018",
    nameEs: "Carancho",
    nameEn: "Southern Crested Caracara",
    scientific: "Caracara plancus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Schopfkarakara.jpg/330px-Schopfkarakara.jpg",
    funFact: "A pesar de ser un ave rapaz, es omnívoro y oportunista: come de todo, desde carroña hasta insectos y frutas.",
    difficulty: 2,
    region: "south-america",
    xcId: 1050467
  },
  {
    id: "b019",
    nameEs: "Carpintero Real",
    nameEn: "Green-barred Woodpecker",
    scientific: "Colaptes melanochloros",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Green-barred_woodpecker_%28Colaptes_melanochloros_melanochloros%29_male_Colonia.jpg/330px-Green-barred_woodpecker_%28Colaptes_melanochloros_melanochloros%29_male_Colonia.jpg",
    funFact: "Puede golpear el tronco hasta 20 veces por segundo, y su cráneo tiene una estructura esponjosa que amortigua los impactos.",
    difficulty: 2,
    region: "south-america",
    xcId: 1059681
  },
  {
    id: "b020",
    nameEs: "Tero",
    nameEn: "Southern Lapwing",
    scientific: "Vanellus chilensis",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Southern_Lapwing_-_Indaiatuba%2C_SP%2C_BR.jpg/330px-Southern_Lapwing_-_Indaiatuba%2C_SP%2C_BR.jpg",
    funFact: "Es famoso por defender su nido con ataques aéreos muy agresivos, incluso contra personas y animales mucho más grandes.",
    difficulty: 2,
    region: "south-america",
    xcId: 1078062
  },
  {
    id: "b021",
    nameEs: "Abubilla",
    nameEn: "Eurasian Hoopoe",
    scientific: "Upupa epops",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Eurasian_hoopoe_by_Gunjan_Pandey.jpg/330px-Eurasian_hoopoe_by_Gunjan_Pandey.jpg",
    funFact: "Su nombre en casi todos los idiomas imita su canto: 'hup-hup-hup'. Las crías se defienden rociando un líquido fétido.",
    difficulty: 2,
    region: "eurasia",
    xcId: 1059544
  },
  {
    id: "b022",
    nameEs: "Frailecillo Atlántico",
    nameEn: "Atlantic Puffin",
    scientific: "Fratercula arctica",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Puffin_%28Fratercula_arctica%29.jpg/330px-Puffin_%28Fratercula_arctica%29.jpg",
    funFact: "Puede llevar hasta 62 peces en el pico a la vez gracias a una bisagra especial en su mandíbula.",
    difficulty: 2,
    region: "north-america",
    xcId: 479180
  },
  {
    id: "b023",
    nameEs: "Ave del Paraíso",
    nameEn: "Greater Bird-of-Paradise",
    scientific: "Paradisaea apoda",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Paradisaea_apoda_-Bali_Bird_Park-5.jpg/330px-Paradisaea_apoda_-Bali_Bird_Park-5.jpg",
    funFact: "Los machos realizan danzas tan elaboradas que los primeros europeos pensaron que venían del paraíso y no tenían patas.",
    difficulty: 2,
    region: "oceania",
    xcId: 502248
  },
  {
    id: "b024",
    nameEs: "Benteveo",
    nameEn: "Great Kiskadee",
    scientific: "Pitangus sulphuratus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Great_kiskadee_%2870240%29.jpg/330px-Great_kiskadee_%2870240%29.jpg",
    funFact: "Su nombre en español imita su canto: '¡bien-te-veo!'. Es uno de los pájaros más ruidosos y agresivos de Sudamérica.",
    difficulty: 2,
    region: "south-america",
    xcId: 1080134
  },
  {
    id: "b025",
    nameEs: "Albatros Errante",
    nameEn: "Wandering Albatross",
    scientific: "Diomedea exulans",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Diomedea_exulans_-_SE_Tasmania.jpg/330px-Diomedea_exulans_-_SE_Tasmania.jpg",
    funFact: "Tiene la mayor envergadura de todas las aves vivientes (hasta 3,5 m) y puede planear durante horas sin aletear.",
    difficulty: 2,
    region: "antarctica",
    xcId: 796375
  },
  {
    id: "b026",
    nameEs: "Cardenal Común",
    nameEn: "Northern Cardinal",
    scientific: "Cardinalis cardinalis",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Male_northern_cardinal_in_Central_Park_%2852612%29.jpg/330px-Male_northern_cardinal_in_Central_Park_%2852612%29.jpg",
    funFact: "A diferencia de muchas aves, la hembra también canta, a menudo desde el nido para comunicar al macho que traiga comida.",
    difficulty: 2,
    region: "north-america",
    xcId: 468374
  },
  {
    id: "b027",
    nameEs: "Cacatúa de Cresta Amarilla",
    nameEn: "Sulphur-crested Cockatoo",
    scientific: "Cacatua galerita",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Cacatua_galerita_Tas_2.jpg/330px-Cacatua_galerita_Tas_2.jpg",
    funFact: "En Australia, los científicos descubrieron que estas cacatúas se enseñan unas a otras a abrir contenedores de basura.",
    difficulty: 2,
    region: "oceania",
    xcId: 1072324
  },
  {
    id: "b028",
    nameEs: "Flamenco Austral",
    nameEn: "Chilean Flamingo",
    scientific: "Phoenicopterus chilensis",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Chilean_Flamingo%2C_Poza_La_Arenilla%2C_El_Callao_imported_from_iNaturalist_photo_517735784.jpg/330px-Chilean_Flamingo%2C_Poza_La_Arenilla%2C_El_Callao_imported_from_iNaturalist_photo_517735784.jpg",
    funFact: "Filtra el alimento con la cabeza al revés, usando la lengua como una bomba que impulsa agua a través de las láminas del pico.",
    difficulty: 2,
    region: "southern-cone",
    xcId: 272817
  },
  {
    id: "b029",
    nameEs: "Grulla Coronada",
    nameEn: "Grey Crowned Crane",
    scientific: "Balearica regulorum",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Grey_crowned_crane_%28Balearica_regulorum_gibbericeps%29.jpg/330px-Grey_crowned_crane_%28Balearica_regulorum_gibbericeps%29.jpg",
    funFact: "Es la única grulla que puede posarse en árboles porque tiene un dedo prensil trasero que otras grullas perdieron.",
    difficulty: 2,
    region: "sub-saharan-africa",
    xcId: 1046984
  },
  {
    id: "b030",
    nameEs: "Calandria Grande",
    nameEn: "Chalk-browed Mockingbird",
    scientific: "Mimus saturninus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Chalk-browed_mockingbird_%28Mimus_saturninus%29_Vicente_Lopez.jpg/330px-Chalk-browed_mockingbird_%28Mimus_saturninus%29_Vicente_Lopez.jpg",
    funFact: "Puede imitar los cantos de decenas de otras aves. Darwin estudió las calandrias de las Galápagos antes que los pinzones.",
    difficulty: 2,
    region: "south-america",
    xcId: 1080160
  },
  {
    id: "b031",
    nameEs: "Garza Real",
    nameEn: "Grey Heron",
    scientific: "Ardea cinerea",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Grey_Heron_%2854990114762%29_%28cropped%29.jpg/330px-Grey_Heron_%2854990114762%29_%28cropped%29.jpg",
    funFact: "Puede quedarse inmóvil como una estatua durante minutos esperando a su presa, y luego atacar en una fracción de segundo.",
    difficulty: 2,
    region: "eurasia",
    xcId: 1080663
  },
  {
    id: "b032",
    nameEs: "Zorzal Colorado",
    nameEn: "Rufous-bellied Thrush",
    scientific: "Turdus rufiventris",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Turdus-rufiventris.jpg/330px-Turdus-rufiventris.jpg",
    funFact: "Es el ave nacional de Brasil. Su canto melodioso al amanecer es uno de los sonidos más característicos de los jardines sudamericanos.",
    difficulty: 2,
    region: "south-america",
    xcId: 1080158
  },
  // --- HARD (difficulty 3) ---
  {
    id: "b033",
    nameEs: "Churrinche",
    nameEn: "Vermilion Flycatcher",
    scientific: "Pyrocephalus rubinus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/095_Scarlet_Flycatcher_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/330px-095_Scarlet_Flycatcher_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
    funFact: "El macho hace una danza nupcial aérea espectacular, elevándose hasta 30 metros mientras canta para impresionar a la hembra.",
    difficulty: 3,
    region: "americas",
    xcId: 956063
  },
  {
    id: "b034",
    nameEs: "Boyerito",
    nameEn: "Yellow-rumped Marshbird",
    scientific: "Pseudoleistes guirahuro",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pseudoleistes_guirahuro.jpg/330px-Pseudoleistes_guirahuro.jpg",
    funFact: "Construye nidos en forma de bolsa tejida que cuelgan de juncos en los humedales, verdaderas obras de ingeniería aviar.",
    difficulty: 3,
    region: "south-america",
    xcId: 454419
  },
  {
    id: "b035",
    nameEs: "Espátula Rosada",
    nameEn: "Roseate Spoonbill",
    scientific: "Platalea ajaja",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Roseate_Spoonbill_Platalea_ajaja_JG.jpg/330px-Roseate_Spoonbill_Platalea_ajaja_JG.jpg",
    funFact: "Mueve su pico en forma de cuchara de lado a lado en el agua para filtrar pequeños animales; su color rosado viene de su dieta.",
    difficulty: 3,
    region: "americas",
    xcId: 418905
  },
  {
    id: "b036",
    nameEs: "Abejaruco Europeo",
    nameEn: "European Bee-eater",
    scientific: "Merops apiaster",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Guepier_d%27europe_au_parc_national_Ichkeul.jpg/330px-Guepier_d%27europe_au_parc_national_Ichkeul.jpg",
    funFact: "Antes de comer una abeja, la golpea repetidamente contra una rama para quitarle el aguijón. Puede comer 250 abejas al día.",
    difficulty: 3,
    region: "europe",
    xcId: 1078918
  },
  {
    id: "b037",
    nameEs: "Secretario",
    nameEn: "Secretarybird",
    scientific: "Sagittarius serpentarius",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Secretary_bird_Mara_for_WC.jpg/330px-Secretary_bird_Mara_for_WC.jpg",
    funFact: "Mata serpientes a patadas: su golpe tiene una fuerza equivalente a 5 veces su peso corporal, aplicada en 15 milisegundos.",
    difficulty: 3,
    region: "sub-saharan-africa",
    xcId: 518394
  },
  {
    id: "b038",
    nameEs: "Picaflor Zafiro",
    nameEn: "Gilded Sapphire",
    scientific: "Hylocharis chrysura",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Gilded_hummingbird_%28Hylocharis_chrysura%29_Costanera_Norte.jpg/330px-Gilded_hummingbird_%28Hylocharis_chrysura%29_Costanera_Norte.jpg",
    funFact: "Es uno de los colibríes más comunes de Argentina. Su plumaje iridiscente cambia de color según el ángulo de la luz.",
    difficulty: 3,
    region: "south-america",
    xcId: 1062260
  },
  {
    id: "b039",
    nameEs: "Cauquén Colorado",
    nameEn: "Ruddy-headed Goose",
    scientific: "Chloephaga rubidiceps",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Chloephaga_rubidiceps1.jpg/330px-Chloephaga_rubidiceps1.jpg",
    funFact: "Está en peligro de extinción en la Patagonia continental; el zorro gris introducido casi diezmó su población.",
    difficulty: 3,
    region: "patagonia",
    xcId: 90547
  },
  {
    id: "b040",
    nameEs: "Ñandú",
    nameEn: "Greater Rhea",
    scientific: "Rhea americana",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Nandu_Rhea_americana_Tierpark_Hellabrunn-1.jpg/330px-Nandu_Rhea_americana_Tierpark_Hellabrunn-1.jpg",
    funFact: "El macho construye el nido, incuba los huevos de varias hembras y cría a los pichones solo. Es un padre dedicado.",
    difficulty: 3,
    region: "south-america",
    xcId: 1016004
  },
  {
    id: "b041",
    nameEs: "Tangará del Paraíso",
    nameEn: "Paradise Tanager",
    scientific: "Tangara chilensis",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Tangara_chilensis_94893412.jpg/330px-Tangara_chilensis_94893412.jpg",
    funFact: "A pesar de su nombre, no tiene nada que ver con Chile. Se lo llamó así por un error de clasificación de Vigors en 1832.",
    difficulty: 3,
    region: "south-america",
    xcId: 525651
  },
  {
    id: "b042",
    nameEs: "Pingüino de Magallanes",
    nameEn: "Magellanic Penguin",
    scientific: "Spheniscus magellanicus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/MagellanicPenguin.jpg/330px-MagellanicPenguin.jpg",
    funFact: "Vuelve al mismo nido y con la misma pareja cada año. Pueden nadar hasta 150 km en un solo día buscando alimento.",
    difficulty: 2,
    region: "southern-cone",
    xcId: 1080529
  },
  {
    id: "b043",
    nameEs: "Carpintero de los Cardones",
    nameEn: "White-fronted Woodpecker",
    scientific: "Melanerpes cactorum",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Melanerpes_cactorum_-Argentina-8.jpg/330px-Melanerpes_cactorum_-Argentina-8.jpg",
    funFact: "Vive en los cactus del noroeste argentino, excavando cavidades en los cardones que luego usan otras aves.",
    difficulty: 3,
    region: "south-america",
    xcId: 557938
  },
  {
    id: "b044",
    nameEs: "Tucán de Pico Verde",
    nameEn: "Emerald Toucanet",
    scientific: "Aulacorhynchus prasinus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/063_Northern_Emerald-toucanet_in_Los_Quetzales_National_Park_Photo_by_Giles_Laurent.jpg/330px-063_Northern_Emerald-toucanet_in_Los_Quetzales_National_Park_Photo_by_Giles_Laurent.jpg",
    funFact: "Duerme en grupos de hasta 6 en un mismo hueco de árbol, con las colas dobladas sobre el cuerpo para caber.",
    difficulty: 3,
    region: "central-america",
    xcId: 384530
  },
  {
    id: "b045",
    nameEs: "Arrendajo Azul",
    nameEn: "Blue Jay",
    scientific: "Cyanocitta cristata",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Blue_jay_in_PP_%2830960%29.jpg/330px-Blue_jay_in_PP_%2830960%29.jpg",
    funFact: "Es capaz de imitar el grito de halcones para asustar a otras aves y robar su comida. Es primo de los cuervos.",
    difficulty: 2,
    region: "north-america",
    xcId: 555073
  },
  {
    id: "b046",
    nameEs: "Tordo Renegrido",
    nameEn: "Shiny Cowbird",
    scientific: "Molothrus bonariensis",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Shiny_cowbird_%28Molothrus_bonariensis%29_male.JPG/330px-Shiny_cowbird_%28Molothrus_bonariensis%29_male.JPG",
    funFact: "Es un parásito de cría: la hembra pone sus huevos en nidos de otras aves para que ellas los críen. Astuto y exitoso.",
    difficulty: 3,
    region: "south-america",
    xcId: 568689
  },
  {
    id: "b047",
    nameEs: "Macá Tobiano",
    nameEn: "Hooded Grebe",
    scientific: "Podiceps gallardoi",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mac%C3%A1_tobiano_sobre_vinagrilla_en_lago_de_la_patagonia_Argentina.jpg/330px-Mac%C3%A1_tobiano_sobre_vinagrilla_en_lago_de_la_patagonia_Argentina.jpg",
    funFact: "Es una de las aves más amenazadas de Argentina, con menos de 800 individuos. Fue descubierta recién en 1974.",
    difficulty: 3,
    region: "patagonia",
    xcId: 1058659
  },
  {
    id: "b048",
    nameEs: "Jabirú Americano",
    nameEn: "Jabiru",
    scientific: "Jabiru mycteria",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/002_Jabiru_feeding_its_babies_in_their_nest_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/330px-002_Jabiru_feeding_its_babies_in_their_nest_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
    funFact: "Es la cigüeña más grande del continente americano, con una altura de hasta 1,5 metros y 2,8 m de envergadura.",
    difficulty: 3,
    region: "neotropics",
    xcId: 657825
  },
  {
    id: "b049",
    nameEs: "Cotorra Argentina",
    nameEn: "Monk Parakeet",
    scientific: "Myiopsitta monachus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Monk_parakeet_%28Myiopsitta_monachus%29_Santiago.jpg/330px-Monk_parakeet_%28Myiopsitta_monachus%29_Santiago.jpg",
    funFact: "Es la única cotorra que construye nidos comunitarios de ramas, creando 'edificios' de hasta 200 kg con múltiples cámaras.",
    difficulty: 2,
    region: "south-america",
    xcId: 1072635
  },
  {
    id: "b050",
    nameEs: "Garza Mora",
    nameEn: "Cocoi Heron",
    scientific: "Ardea cocoi",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/021_Cocoi_heron_eating_a_fish_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/330px-021_Cocoi_heron_eating_a_fish_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
    funFact: "Es la garza más grande de Sudamérica. Su paciencia cazando es legendaria: puede estar inmóvil más de 30 minutos.",
    difficulty: 2,
    region: "south-america",
    xcId: 381844
  },

  // --- AVES ARGENTINAS / RIOPLATENSES ---
  // === FÁCILES (difficulty 1) ===
  {
    id: "b051",
    nameEs: "Hornero",
    nameEn: "Rufous Hornero",
    scientific: "Furnarius rufus",
    photoUrl: "Rufous hornero (Furnarius rufus) at nest Colonia.jpg",
    funFact: "Es el ave nacional de Argentina. Construye su nido de barro en forma de horno, que puede pesar hasta 5 kg.",
    difficulty: 1,
    region: "south-america",
    xcId: 1009595
  },
  {
    id: "b052",
    nameEs: "Calandria Grande",
    nameEn: "Chalk-browed Mockingbird",
    scientific: "Mimus saturninus",
    photoUrl: "Chalk-browed Mockingbird (Mimus saturninus), Pantanal, Brazil.jpg",
    funFact: "Es una de las mejores cantoras de Argentina. Puede imitar el canto de más de 20 especies diferentes.",
    difficulty: 1,
    region: "south-america",
    xcId: 1080160
  },
  {
    id: "b053",
    nameEs: "Benteveo",
    nameEn: "Great Kiskadee",
    scientific: "Pitangus sulphuratus",
    photoUrl: "Great kiskadee (70240).jpg",
    funFact: "Su nombre viene de su canto: '¡bien-te-veo!'. Es omnívoro y hasta puede pescar pequeños peces lanzándose al agua.",
    difficulty: 1,
    region: "south-america",
    xcId: 1080134
  },
  {
    id: "b054",
    nameEs: "Cardenal",
    nameEn: "Red-crested Cardinal",
    scientific: "Paroaria coronata",
    photoUrl: "Red-crested cardinal (Paroaria coronata) Costanera Sur.jpg",
    funFact: "Su copete rojo brillante lo hace inconfundible. Es tan popular que fue introducido en Hawái donde se estableció exitosamente.",
    difficulty: 1,
    region: "south-america",
    xcId: 552906
  },
  {
    id: "b055",
    nameEs: "Garza Blanca",
    nameEn: "Great Egret",
    scientific: "Ardea alba",
    photoUrl: "Ardea alba4.jpg",
    funFact: "Sus plumas nupciales casi la llevaron a la extinción: en el siglo XIX se usaban para decorar sombreros de moda.",
    difficulty: 1,
    region: "south-america",
    xcId: 1073122
  },
  {
    id: "b056",
    nameEs: "Chimango",
    nameEn: "Chimango Caracara",
    scientific: "Milvago chimango",
    photoUrl: "Chimango caracara (Daptrius chimango temucoensis) female Puerto Varas.jpg",
    funFact: "Es el rapaz más común de la pampa. Se adaptó perfectamente a las ciudades y se lo ve en plazas, rutas y basurales.",
    difficulty: 1,
    region: "south-america",
    xcId: 33369
  },
  {
    id: "b057",
    nameEs: "Carancho",
    nameEn: "Southern Crested Caracara",
    scientific: "Caracara plancus",
    photoUrl: "Southern crested caracara (Caracara plancus) head adult.JPG",
    funFact: "Más carroñero que cazador, camina por el suelo buscando alimento. En el campo se lo ve seguir al arado para atrapar lombrices.",
    difficulty: 1,
    region: "south-america",
    xcId: 1050467
  },
  {
    id: "b058",
    nameEs: "Cóndor Andino",
    nameEn: "Andean Condor",
    scientific: "Vultur gryphus",
    photoUrl: "Vultur gryphus head (Linnaeus, 1758).jpg",
    funFact: "Con 3,3 metros de envergadura, es una de las aves voladoras más grandes del mundo. Aparece en el escudo nacional argentino.",
    difficulty: 1,
    region: "southern-cone",
    xcId: 1008961
  },
  {
    id: "b059",
    nameEs: "Chingolo",
    nameEn: "Rufous-collared Sparrow",
    scientific: "Zonotrichia capensis",
    photoUrl: "Rufous-collared sparrow (Zonotrichia capensis costaricensis) 2.jpg",
    funFact: "Es probablemente el ave más común de Argentina. Su canto matutino es la banda sonora de cualquier jardín del país.",
    difficulty: 1,
    region: "south-america",
    xcId: 33355
  },
  {
    id: "b060",
    nameEs: "Zorzal Colorado",
    nameEn: "Rufous-bellied Thrush",
    scientific: "Turdus rufiventris",
    photoUrl: "Rufous-bellied thrush (Turdus rufiventris).JPG",
    funFact: "Carlos Gardel era apodado 'El Zorzal Criollo' por su hermoso canto. Es de las primeras aves en cantar al amanecer.",
    difficulty: 1,
    region: "south-america",
    xcId: 1080158
  },
  {
    id: "b061",
    nameEs: "Cotorra Argentina",
    nameEn: "Monk Parakeet",
    scientific: "Myiopsitta monachus",
    photoUrl: "Monk parakeets (Myiopsitta monachus monachus) flock in flight Colonia.jpg",
    funFact: "Es la única cotorra que construye nidos comunales enormes de ramas. Se expandió por el mundo como especie invasora.",
    difficulty: 1,
    region: "south-america",
    xcId: 1072635
  },
  {
    id: "b062",
    nameEs: "Tero",
    nameEn: "Southern Lapwing",
    scientific: "Vanellus chilensis",
    photoUrl: "Southern lapwing (Vanellus chilensis cayennensis).jpg",
    funFact: "Famoso por su grito de alarma que delata a cualquier intruso. Los gauchos decían que 'el tero avisa lejos del nido' para despistar.",
    difficulty: 1,
    region: "south-america",
    xcId: 1078062
  },
  {
    id: "b063",
    nameEs: "Ñandú",
    nameEn: "Greater Rhea",
    scientific: "Rhea americana",
    photoUrl: "Greater rhea (Rhea americana).JPG",
    funFact: "Es el ave más grande de América. El macho es quien incuba los huevos y cría a los pichones, ¡un padre dedicado!",
    difficulty: 1,
    region: "south-america",
    xcId: 1016004
  },
  // === MEDIANAS (difficulty 2) ===
  {
    id: "b064",
    nameEs: "Biguá",
    nameEn: "Neotropic Cormorant",
    scientific: "Nannopterum brasilianum",
    photoUrl: "Phalacrocorax brasilianus (Costa Rica).jpg",
    funFact: "Bucea para pescar y luego se posa con las alas abiertas al sol porque sus plumas no son impermeables.",
    difficulty: 2,
    region: "south-america",
    xcId: 492257
  },
  {
    id: "b065",
    nameEs: "Espátula Rosada",
    nameEn: "Roseate Spoonbill",
    scientific: "Platalea ajaja",
    photoUrl: "Roseate spoonbills at Smith Oaks Sanctuary, High Island, mating.jpg",
    funFact: "Su pico en forma de cuchara filtra el barro para atrapar crustáceos. Su color rosado, como el flamenco, viene de lo que come.",
    difficulty: 2,
    region: "neotropics",
    xcId: 418905
  },
  {
    id: "b066",
    nameEs: "Cauquén Común",
    nameEn: "Upland Goose",
    scientific: "Chloephaga picta",
    photoUrl: "Upland goose (Chloephaga picta picta) male Laguna Nimez.jpg",
    funFact: "El macho es blanco y la hembra marrón, ¡parecen especies diferentes! Es un símbolo de la estepa patagónica.",
    difficulty: 2,
    region: "southern-cone",
    xcId: 368846
  },
  {
    id: "b067",
    nameEs: "Churrinche",
    nameEn: "Vermilion Flycatcher",
    scientific: "Pyrocephalus rubinus",
    photoUrl: "095 Scarlet Flycatcher in Encontro das Águas State Park Photo by Giles Laurent.jpg",
    funFact: "El macho es rojo fuego, una de las aves más coloridas de Argentina. Hace un vuelo nupcial espectacular flotando en el aire.",
    difficulty: 2,
    region: "south-america",
    xcId: 956063
  },
  {
    id: "b068",
    nameEs: "Celestino",
    nameEn: "Sayaca Tanager",
    scientific: "Thraupis sayaca",
    photoUrl: "Thraupis sayaca por Luiz Alves (01).jpg",
    funFact: "Su nombre viene de su color azul celeste. Es frugívoro y ayuda a dispersar semillas de árboles nativos.",
    difficulty: 2,
    region: "south-america",
    xcId: 572248
  },
  {
    id: "b069",
    nameEs: "Loro Barranquero",
    nameEn: "Burrowing Parrot",
    scientific: "Cyanoliseus patagonus",
    photoUrl: "Cyanoliseus patagonus - Maroparque 01.jpg",
    funFact: "Anida en enormes colonias excavando túneles en barrancos. La colonia de El Cóndor, Río Negro, es la más grande del mundo.",
    difficulty: 2,
    region: "southern-cone",
    xcId: 970917
  },
  {
    id: "b070",
    nameEs: "Jilguero Dorado",
    nameEn: "Saffron Finch",
    scientific: "Sicalis flaveola",
    photoUrl: "Saffron finch (Sicalis flaveola) male.JPG",
    funFact: "Su canto melodioso lo convirtió en ave de jaula muy codiciada, lo que amenazó sus poblaciones silvestres.",
    difficulty: 2,
    region: "south-america",
    xcId: 1074505
  },
  {
    id: "b071",
    nameEs: "Tordo Renegrido",
    nameEn: "Shiny Cowbird",
    scientific: "Molothrus bonariensis",
    photoUrl: "Shiny cowbird (Molothrus bonariensis) male.JPG",
    funFact: "Es un parásito de cría: pone sus huevos en nidos ajenos para que otros pájaros críen a sus pichones. ¡Un vivo bárbaro!",
    difficulty: 2,
    region: "south-america",
    xcId: 568688
  },
  {
    id: "b072",
    nameEs: "Carpintero Campestre",
    nameEn: "Campo Flicker",
    scientific: "Colaptes campestris",
    photoUrl: "Campo flicker (Colaptes campestris) female.JPG",
    funFact: "A diferencia de otros carpinteros, busca alimento en el suelo, especialmente hormigas. Se lo ve caminando por pastizales.",
    difficulty: 2,
    region: "south-america",
    xcId: 550443
  },
  {
    id: "b073",
    nameEs: "Pirincho",
    nameEn: "Guira Cuckoo",
    scientific: "Guira guira",
    photoUrl: "Guira guira MHNT.ZOO.2010.11.2.21.jpg",
    funFact: "Siempre anda en bandadas ruidosas. Varias hembras ponen en el mismo nido y todos los adultos colaboran en la crianza.",
    difficulty: 2,
    region: "south-america",
    xcId: 294538
  },
  {
    id: "b074",
    nameEs: "Jote Cabeza Negra",
    nameEn: "Black Vulture",
    scientific: "Coragyps atratus",
    photoUrl: "Coragyps-atratus-001.jpg",
    funFact: "A diferencia de su pariente el jote cabeza colorada, localiza la carroña por la vista, no por el olfato. Vuela en grupos.",
    difficulty: 2,
    region: "south-america",
    xcId: 929989
  },
  // === DIFÍCILES (difficulty 3) ===
  {
    id: "b075",
    nameEs: "Federal",
    nameEn: "Scarlet-headed Blackbird",
    scientific: "Amblyramphus holosericeus",
    photoUrl: "Scarlet-headed blackbird (Amblyramphus holosericeus).JPG",
    funFact: "Su cabeza rojo escarlata sobre cuerpo negro es inconfundible. Vive exclusivamente en pajonales y esteros del litoral.",
    difficulty: 3,
    region: "south-america",
    xcId: 569462
  },
  {
    id: "b076",
    nameEs: "Chuña Patas Rojas",
    nameEn: "Red-legged Seriema",
    scientific: "Cariama cristata",
    photoUrl: "Red-legged seriema (Cariama cristata) head.JPG",
    funFact: "Es pariente lejana de los dinosaurios terópodos. Mata a sus presas (serpientes, lagartijas) golpeándolas contra el suelo.",
    difficulty: 3,
    region: "south-america",
    xcId: 1080149
  },
  {
    id: "b077",
    nameEs: "Cardenal Amarillo",
    nameEn: "Yellow Cardinal",
    scientific: "Gubernatrix cristata",
    photoUrl: "Gubernatrix cristata - Yellow cardinal (male); Iberá marshes, Corrientes, Argentina.jpg",
    funFact: "Está en peligro de extinción por la captura para mascotismo. Es endémico del cono sur y uno de los pájaros más buscados por observadores.",
    difficulty: 3,
    region: "south-america",
    xcId: 1032542
  },
  {
    id: "b078",
    nameEs: "Atajacaminos Tijera",
    nameEn: "Scissor-tailed Nightjar",
    scientific: "Hydropsalis torquata",
    photoUrl: "Hydropsalis torquata in Uruguay.jpg",
    funFact: "Es nocturno y casi invisible de día gracias a su camuflaje perfecto. El macho tiene plumas timoneras larguísimas en forma de tijera.",
    difficulty: 3,
    region: "south-america",
    xcId: 1053672
  },
  {
    id: "b079",
    nameEs: "Monjita Blanca",
    nameEn: "White Monjita",
    scientific: "Xolmis irupero",
    photoUrl: "White monjita (Xolmis irupero) Colonia.jpg",
    funFact: "Su plumaje blanco inmaculado la hace fácil de ver posada en alambrados y postes. Caza insectos al vuelo desde su percha.",
    difficulty: 3,
    region: "south-america",
    xcId: 461422
  },
  {
    id: "b080",
    nameEs: "Boyero Negro",
    nameEn: "Solitary Black Cacique",
    scientific: "Cacicus solitarius",
    photoUrl: "Cacicus solitarius -Argentina-8.jpg",
    funFact: "Construye nidos colgantes en forma de bolsa. A pesar de su nombre, a veces se junta en pequeñas colonias.",
    difficulty: 3,
    region: "neotropics",
    xcId: 542221
  }
];

// ============================================================
// TREES — ~80 entries
// ============================================================
const TREES = [
  // --- EASY (difficulty 1) ---
  {
    id: "t001",
    nameEs: "Ceibo",
    nameEn: "Cockspur Coral Tree",
    scientific: "Erythrina crista-galli",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Erythrina_crista-galli_flowers_7th_Brigade_Park_Chermside_P1190186.jpg/330px-Erythrina_crista-galli_flowers_7th_Brigade_Park_Chermside_P1190186.jpg",
    funFact: "Es el árbol nacional de Argentina y Uruguay. Sus flores rojas brillantes florecen de noviembre a febrero.",
    difficulty: 1,
    region: "south-america"
  },
  {
    id: "t002",
    nameEs: "Jacarandá",
    nameEn: "Jacaranda",
    scientific: "Jacaranda mimosifolia",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Jacarand%C3%A1-mimoso_%28do_tupi_%C3%AEakarand%C3%A1%29_-_54942878507_02.jpg/330px-Jacarand%C3%A1-mimoso_%28do_tupi_%C3%AEakarand%C3%A1%29_-_54942878507_02.jpg",
    funFact: "En noviembre, Buenos Aires se tiñe de violeta con la floración de sus 20.000 jacarandás. Es originario del noroeste argentino.",
    difficulty: 1,
    region: "south-america"
  },
  {
    id: "t003",
    nameEs: "Baobab",
    nameEn: "African Baobab",
    scientific: "Adansonia digitata",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Baobab_and_elephant%2C_Tanzania.jpg/330px-Baobab_and_elephant%2C_Tanzania.jpg",
    funFact: "Puede almacenar hasta 120.000 litros de agua en su tronco. Algunos ejemplares tienen más de 2.000 años.",
    difficulty: 1,
    region: "africa"
  },
  {
    id: "t004",
    nameEs: "Cerezo Japonés",
    nameEn: "Cherry Blossom",
    scientific: "Prunus serrulata",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Cerisier_du_Japon_Prunus_serrulata.jpg/330px-Cerisier_du_Japon_Prunus_serrulata.jpg",
    funFact: "El 'hanami' (contemplar las flores) es una tradición de más de 1.000 años en Japón. Las flores duran apenas una semana.",
    difficulty: 1,
    region: "asia"
  },
  {
    id: "t005",
    nameEs: "Secuoya Gigante",
    nameEn: "Giant Sequoia",
    scientific: "Sequoiadendron giganteum",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Grizzly_Giant_Mariposa_Grove.jpg/330px-Grizzly_Giant_Mariposa_Grove.jpg",
    funFact: "El 'General Sherman' es el árbol con mayor volumen del planeta: 1.487 m³ de madera. Tiene unos 2.200 años.",
    difficulty: 1,
    region: "north-america"
  },
  {
    id: "t006",
    nameEs: "Olivo",
    nameEn: "Olive Tree",
    scientific: "Olea europaea",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Olivesfromjordan.jpg/330px-Olivesfromjordan.jpg",
    funFact: "Puede vivir miles de años. En Creta existe un olivo que aún produce aceitunas y tiene entre 2.000 y 3.000 años.",
    difficulty: 1,
    region: "mediterranean"
  },
  {
    id: "t007",
    nameEs: "Palmera Cocotero",
    nameEn: "Coconut Palm",
    scientific: "Cocos nucifera",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Cocos_nucifera_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-187.jpg/330px-Cocos_nucifera_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-187.jpg",
    funFact: "Los cocos pueden flotar durante meses en el océano y germinar en playas lejanas. Así colonizó islas de todo el Pacífico.",
    difficulty: 1,
    region: "worldwide"
  },
  {
    id: "t008",
    nameEs: "Araucaria",
    nameEn: "Monkey Puzzle Tree",
    scientific: "Araucaria araucana",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Araucaria_en_Parque_Nacional_Conguillio.jpg/330px-Araucaria_en_Parque_Nacional_Conguillio.jpg",
    funFact: "Es un 'fósil viviente': existe desde la época de los dinosaurios, hace 200 millones de años. Es sagrada para los mapuches.",
    difficulty: 1,
    region: "southern-cone"
  },
  {
    id: "t009",
    nameEs: "Sauce Llorón",
    nameEn: "Weeping Willow",
    scientific: "Salix babylonica",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ch%C3%A2teau_de_Chenonceau_-_jardin_Russell-Page_%2801%29.jpg/330px-Ch%C3%A2teau_de_Chenonceau_-_jardin_Russell-Page_%2801%29.jpg",
    funFact: "Su corteza contiene salicina, el precursor de la aspirina. Los antiguos griegos ya la usaban para aliviar el dolor.",
    difficulty: 1,
    region: "asia"
  },
  {
    id: "t010",
    nameEs: "Eucalipto Arcoíris",
    nameEn: "Rainbow Eucalyptus",
    scientific: "Eucalyptus deglupta",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/EucalyptusDeglupta_TallTree.jpg/330px-EucalyptusDeglupta_TallTree.jpg",
    funFact: "Su corteza se desprende en tiras revelando colores verde, azul, naranja y púrpura. Es el único eucalipto tropical.",
    difficulty: 1,
    region: "oceania"
  },
  {
    id: "t011",
    nameEs: "Roble",
    nameEn: "English Oak",
    scientific: "Quercus robur",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Quercus_robur.jpg/330px-Quercus_robur.jpg",
    funFact: "Un roble maduro puede producir 70.000 bellotas por año, pero solo 1 de cada 10.000 se convertirá en árbol.",
    difficulty: 1,
    region: "europe"
  },
  {
    id: "t012",
    nameEs: "Palo Borracho",
    nameEn: "Silk Floss Tree",
    scientific: "Ceiba speciosa",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Paina_em_uma_paineira_no_Rio_Grande_do_Sul_%28outubro%29_03.jpg/330px-Paina_em_uma_paineira_no_Rio_Grande_do_Sul_%28outubro%29_03.jpg",
    funFact: "Su tronco abultado almacena agua para la sequía. Las espinas protegen esa reserva de los animales.",
    difficulty: 1,
    region: "south-america"
  },
  {
    id: "t013",
    nameEs: "Ombú",
    nameEn: "Ombú",
    scientific: "Phytolacca dioica",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Museo_Larreta_omb%C3%BA.jpg/330px-Museo_Larreta_omb%C3%BA.jpg",
    funFact: "Técnicamente no es un árbol sino una hierba gigante: su tronco es blando y no tiene anillos de crecimiento. Símbolo de la pampa.",
    difficulty: 1,
    region: "south-america"
  },
  // --- MEDIUM (difficulty 2) ---
  {
    id: "t014",
    nameEs: "Lapacho Rosado",
    nameEn: "Pink Trumpet Tree",
    scientific: "Handroanthus impetiginosus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/055_Pink_Ip%C3%AA_tree_in_Mato_Grosso_Photo_by_Giles_Laurent.jpg/330px-055_Pink_Ip%C3%AA_tree_in_Mato_Grosso_Photo_by_Giles_Laurent.jpg",
    funFact: "Florece de manera explosiva: pierde todas sus hojas y se cubre de flores rosadas durante apenas 5-7 días.",
    difficulty: 2,
    region: "south-america"
  },
  {
    id: "t015",
    nameEs: "Ginkgo",
    nameEn: "Ginkgo",
    scientific: "Ginkgo biloba",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/GINKGOBAUM-2.jpg/330px-GINKGOBAUM-2.jpg",
    funFact: "Es la única especie sobreviviente de una familia de 270 millones de años. Varios ejemplares sobrevivieron a la bomba de Hiroshima.",
    difficulty: 2,
    region: "asia"
  },
  {
    id: "t016",
    nameEs: "Ciprés de la Patagonia",
    nameEn: "Patagonian Cypress",
    scientific: "Austrocedrus chilensis",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Austrocedrus_chilensis_1.jpg/330px-Austrocedrus_chilensis_1.jpg",
    funFact: "Es el árbol emblemático de los bosques de la Patagonia andina. Algunos ejemplares superan los 1.000 años de edad.",
    difficulty: 2,
    region: "patagonia"
  },
  {
    id: "t017",
    nameEs: "Algarrobo Blanco",
    nameEn: "White Carob",
    scientific: "Prosopis alba",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Prosopis_alba.jpg/330px-Prosopis_alba.jpg",
    funFact: "Los pueblos originarios hacían 'patay' (pan) y 'aloja' (bebida) con sus vainas. Un solo árbol puede producir 40 kg de frutos al año.",
    difficulty: 2,
    region: "south-america"
  },
  {
    id: "t018",
    nameEs: "Abedul",
    nameEn: "Silver Birch",
    scientific: "Betula pendula",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Betula_pendula_Finland.jpg/330px-Betula_pendula_Finland.jpg",
    funFact: "Su corteza blanca refleja la luz solar para proteger el tronco del frío extremo. Los vikingos la usaban para escribir.",
    difficulty: 2,
    region: "eurasia"
  },
  {
    id: "t019",
    nameEs: "Higuera Estranguladora",
    nameEn: "Strangler Fig",
    scientific: "Ficus aurea",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Ficus_aurea03.jpg/330px-Ficus_aurea03.jpg",
    funFact: "Germina en las ramas de otro árbol y crece hacia abajo hasta el suelo, envolviendo al huésped hasta matarlo. ¡El abrazo mortal!",
    difficulty: 2,
    region: "north-america"
  },
  {
    id: "t020",
    nameEs: "Quebracho Colorado",
    nameEn: "Red Quebracho",
    scientific: "Schinopsis balansae",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Schinopsis_balansae.jpg/330px-Schinopsis_balansae.jpg",
    funFact: "Su nombre significa 'quiebra-hacha' por la dureza de su madera. La deforestación masiva casi lo elimina del Chaco.",
    difficulty: 2,
    region: "south-america"
  },
  {
    id: "t021",
    nameEs: "Drago de Canarias",
    nameEn: "Canary Islands Dragon Tree",
    scientific: "Dracaena draco",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Dracaena_draco.jpg/330px-Dracaena_draco.jpg",
    funFact: "Produce una resina roja llamada 'sangre de drago', usada en medicina y pintura desde la antigüedad.",
    difficulty: 2,
    region: "europe"
  },
  {
    id: "t022",
    nameEs: "Árbol de Jade",
    nameEn: "Banyan Tree",
    scientific: "Ficus benghalensis",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Great_banyan_tree_kol.jpg/330px-Great_banyan_tree_kol.jpg",
    funFact: "Un solo banyan puede cubrir más de 2 hectáreas con sus raíces aéreas. El más grande de la India tiene 250 años y parece un bosque.",
    difficulty: 2,
    region: "asia"
  },
  {
    id: "t023",
    nameEs: "Acacia Paraguas",
    nameEn: "Umbrella Thorn Acacia",
    scientific: "Vachellia tortilis",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Vachellia_%28ex_Acacia%29_tortilis.jpg/330px-Vachellia_%28ex_Acacia%29_tortilis.jpg",
    funFact: "Define el paisaje de la sabana africana. Sus espinas tienen bacterias fijadoras de nitrógeno que fertilizan el suelo desértico.",
    difficulty: 2,
    region: "africa"
  },
  {
    id: "t024",
    nameEs: "Ciprés Calvo",
    nameEn: "Bald Cypress",
    scientific: "Taxodium distichum",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Taxodium_distichum_NRCSMS01010.jpg/330px-Taxodium_distichum_NRCSMS01010.jpg",
    funFact: "Es una conífera que pierde las hojas en otoño (de ahí 'calvo'). Crece en pantanos y sus 'rodillas' sobresalen del agua.",
    difficulty: 2,
    region: "north-america"
  },
  {
    id: "t025",
    nameEs: "Tilo",
    nameEn: "Small-leaved Lime",
    scientific: "Tilia cordata",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Tilia-cordata2.JPG/330px-Tilia-cordata2.JPG",
    funFact: "Su flor se usa para infusiones relajantes desde la Edad Media. En muchos pueblos europeos, el tilo de la plaza era el centro de la vida social.",
    difficulty: 2,
    region: "europe"
  },
  {
    id: "t026",
    nameEs: "Magnolia",
    nameEn: "Southern Magnolia",
    scientific: "Magnolia grandiflora",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Magn%C3%B2lia_a_Verbania.JPG/330px-Magn%C3%B2lia_a_Verbania.JPG",
    funFact: "Es una de las plantas con flor más antiguas del planeta: evolucionó antes que las abejas, así que la polinizan los escarabajos.",
    difficulty: 2,
    region: "north-america"
  },
  {
    id: "t027",
    nameEs: "Arce Rojo",
    nameEn: "Red Maple",
    scientific: "Acer rubrum",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Acer_rubrum_15-p.bot-a.rubrum-114.jpg/330px-Acer_rubrum_15-p.bot-a.rubrum-114.jpg",
    funFact: "En otoño sus hojas se vuelven de un rojo intenso. La hoja de arce es el símbolo de Canadá.",
    difficulty: 2,
    region: "north-america"
  },
  {
    id: "t028",
    nameEs: "Timbó",
    nameEn: "Pink Ear-pod Tree",
    scientific: "Enterolobium contortisiliquum",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Muda_de_timbo%C3%BAva_%28do_tupi_%2Atimbo%27yba%29%2C_Enterolobium_contortisiliquum_01.jpg/330px-Muda_de_timbo%C3%BAva_%28do_tupi_%2Atimbo%27yba%29%2C_Enterolobium_contortisiliquum_01.jpg",
    funFact: "Sus frutos tienen forma de oreja humana (se le llama 'oreja de negro'). Los pueblos originarios usaban la corteza como jabón.",
    difficulty: 2,
    region: "south-america"
  },
  // --- HARD (difficulty 3) ---
  {
    id: "t029",
    nameEs: "Wollemia",
    nameEn: "Wollemi Pine",
    scientific: "Wollemia nobilis",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Wakehurst_Place_woodland_Wollemi_pine.jpg/330px-Wakehurst_Place_woodland_Wollemi_pine.jpg",
    funFact: "Descubierto en 1994 en un cañón de Australia, se creía extinto hace 2 millones de años. Hay menos de 100 en estado silvestre.",
    difficulty: 3,
    region: "oceania"
  },
  {
    id: "t030",
    nameEs: "Tejo",
    nameEn: "European Yew",
    scientific: "Taxus baccata",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Taxus_baccata_MHNT.jpg/330px-Taxus_baccata_MHNT.jpg",
    funFact: "Casi todas sus partes son venenosas, pero de su corteza se extrae el taxol, usado en quimioterapia contra el cáncer.",
    difficulty: 3,
    region: "europe"
  },
  {
    id: "t031",
    nameEs: "Palo Santo",
    nameEn: "Palo Santo",
    scientific: "Bulnesia sarmientoi",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Bulnesia_sarmientoi_%28_Palo_Santo%29.jpg/330px-Bulnesia_sarmientoi_%28_Palo_Santo%29.jpg",
    funFact: "Su madera aromática se quema en sahumerios desde tiempos precolombinos. Su nombre se debe a que florece cerca de Navidad.",
    difficulty: 3,
    region: "south-america"
  },
  {
    id: "t032",
    nameEs: "Alerce Patagónico",
    nameEn: "Patagonian Cypress",
    scientific: "Fitzroya cupressoides",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/89/Fitzroya_cupressoides.JPG",
    funFact: "Puede superar los 3.600 años de edad, siendo la segunda especie de árbol más longeva del planeta, después del pino Bristlecone.",
    difficulty: 3,
    region: "patagonia"
  },
  {
    id: "t033",
    nameEs: "Acacia de Constantinopla",
    nameEn: "Persian Silk Tree",
    scientific: "Albizia julibrissin",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/2018-07-08_11_10_27_Rosea_Mimosa_blossoms_along_the_ramp_from_southbound_Interstate_95_%28New_Jersey_Turnpike_Eastern_Spur%29_to_westbound_Interstate_280_%28Essex_Freeway%29_in_the_New_Jersey_Meadowlands%2C_within_Kearny%2C_Hudson_County%2C_New_Jersey.jpg/330px-thumbnail.jpg",
    funFact: "Sus hojas se pliegan al anochecer y ante el contacto, como si 'durmieran'. En Irán se le llama 'el árbol de la seda'.",
    difficulty: 3,
    region: "asia"
  },
  {
    id: "t034",
    nameEs: "Coihue",
    nameEn: "Coihue",
    scientific: "Nothofagus dombeyi",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Nothofagus_dombeyi.jpg/330px-Nothofagus_dombeyi.jpg",
    funFact: "Es el gigante de los bosques andino-patagónicos, alcanzando 45 metros. Siempreverde, no pierde sus hojas en invierno.",
    difficulty: 3,
    region: "patagonia"
  },
  {
    id: "t035",
    nameEs: "Lenga",
    nameEn: "Lenga Beech",
    scientific: "Nothofagus pumilio",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Nothofagus_pumilio.jpg/330px-Nothofagus_pumilio.jpg",
    funFact: "Es el último árbol que crece antes de la línea de nieve en los Andes. En otoño se vuelve rojo fuego, tiñendo las montañas.",
    difficulty: 3,
    region: "patagonia"
  },
  {
    id: "t036",
    nameEs: "Caldén",
    nameEn: "Caldén",
    scientific: "Prosopis caldenia",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Prosopis_caldenia.jpg/330px-Prosopis_caldenia.jpg",
    funFact: "Exclusivo de la pampa argentina, forma bosques que se extienden por La Pampa, San Luis y Buenos Aires. Está en retroceso.",
    difficulty: 3,
    region: "south-america"
  },
  {
    id: "t037",
    nameEs: "Arrayán",
    nameEn: "Chilean Myrtle",
    scientific: "Luma apiculata",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Parque_Nacional_Los_Arrayanes.jpg/330px-Parque_Nacional_Los_Arrayanes.jpg",
    funFact: "Su corteza color canela se despega en láminas suaves como piel. El bosque de arrayanes de Bariloche inspiró a Walt Disney.",
    difficulty: 3,
    region: "patagonia"
  },
  {
    id: "t038",
    nameEs: "Molle",
    nameEn: "Peruvian Pepper Tree",
    scientific: "Schinus molle",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Schinus_Molle.jpg/330px-Schinus_Molle.jpg",
    funFact: "Sus frutos rosados se usan como pimienta rosa. Los incas hacían chicha de molle, una bebida alcohólica ceremonial.",
    difficulty: 3,
    region: "south-america"
  },
  {
    id: "t039",
    nameEs: "Kauri",
    nameEn: "Kauri",
    scientific: "Agathis australis",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/00_29_0496_Waipoua_Forest_NZ_-_Kauri_Baum_Tane_Mahuta.jpg/330px-00_29_0496_Waipoua_Forest_NZ_-_Kauri_Baum_Tane_Mahuta.jpg",
    funFact: "El kauri gigante de Nueva Zelanda puede tener 2.000 años. Para los maoríes, talar un kauri sin ritual era un acto de guerra.",
    difficulty: 3,
    region: "new-zealand"
  },
  {
    id: "t040",
    nameEs: "Samán",
    nameEn: "Rain Tree",
    scientific: "Samanea saman",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Hitachi%27s_tree_%28cropped%29.jpg/330px-Hitachi%27s_tree_%28cropped%29.jpg",
    funFact: "Sus hojas se pliegan antes de la lluvia y al atardecer, dejando pasar el agua a las plantas de abajo. De ahí 'árbol de la lluvia'.",
    difficulty: 3,
    region: "neotropics"
  },
  {
    id: "t041",
    nameEs: "Espinillo",
    nameEn: "Sweet Acacia",
    scientific: "Vachellia caven",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Acaciacaven29b.jpg/330px-Acaciacaven29b.jpg",
    funFact: "Sus flores amarillas y perfumadas son características del campo argentino. Se usa en medicina popular para curar heridas.",
    difficulty: 3,
    region: "south-america"
  },
  {
    id: "t042",
    nameEs: "Ciprés de Monterrey",
    nameEn: "Monterey Cypress",
    scientific: "Hesperocyparis macrocarpa",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Lone_cypress_in_17-mile-drive.jpg/330px-Lone_cypress_in_17-mile-drive.jpg",
    funFact: "El 'Ciprés Solitario' en Pebble Beach, California, es uno de los árboles más fotografiados del mundo.",
    difficulty: 2,
    region: "north-america"
  },
  {
    id: "t043",
    nameEs: "Pehuén",
    nameEn: "Chilean Pine",
    scientific: "Araucaria araucana",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Araucaria_en_Parque_Nacional_Conguillio.jpg/330px-Araucaria_en_Parque_Nacional_Conguillio.jpg",
    funFact: "Sus piñones (nguilliu) fueron alimento fundamental del pueblo mapuche-pehuenche, cuyo nombre deriva de este árbol.",
    difficulty: 2,
    region: "southern-cone"
  },
  {
    id: "t044",
    nameEs: "Flamboyán",
    nameEn: "Royal Poinciana",
    scientific: "Delonix regia",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Royal_Poinciana.jpg/330px-Royal_Poinciana.jpg",
    funFact: "Sus flores rojo-anaranjadas lo hacen uno de los árboles más vistosos del trópico. En Madagascar, su hábitat original, está casi extinto.",
    difficulty: 2,
    region: "neotropics"
  },
  {
    id: "t045",
    nameEs: "Aguaribay",
    nameEn: "Brazilian Pepper Tree",
    scientific: "Schinus areira",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Schinus_Molle.jpg/330px-Schinus_Molle.jpg",
    funFact: "Sus ramas caen como cascadas verdes. Los incas lo consideraban sagrado y lo plantaban en plazas y cementerios.",
    difficulty: 2,
    region: "south-america"
  },
  {
    id: "t046",
    nameEs: "Cedro",
    nameEn: "Cedar of Lebanon",
    scientific: "Cedrus libani",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/C%C3%A8dre_du_Liban_Barouk_2005.jpg/330px-C%C3%A8dre_du_Liban_Barouk_2005.jpg",
    funFact: "Los fenicios construyeron sus barcos con este cedro. Está en la bandera del Líbano y se considera símbolo de eternidad.",
    difficulty: 1,
    region: "mediterranean"
  },
  {
    id: "t047",
    nameEs: "Manzano Silvestre",
    nameEn: "Apple Tree",
    scientific: "Malus domestica",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pink_lady_and_cross_section.jpg/330px-Pink_lady_and_cross_section.jpg",
    funFact: "Cada semilla de manzana produce un árbol genéticamente único. Por eso se usan injertos: cada variedad es un clon.",
    difficulty: 1,
    region: "eurasia"
  },
  {
    id: "t048",
    nameEs: "Notro",
    nameEn: "Chilean Firetree",
    scientific: "Embothrium coccineum",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Embothrium_coccineum_001.jpg/330px-Embothrium_coccineum_001.jpg",
    funFact: "Sus flores rojas intensas son las primeras en aparecer en los bosques patagónicos después de un incendio.",
    difficulty: 3,
    region: "patagonia"
  },
  {
    id: "t049",
    nameEs: "Fresno Americano",
    nameEn: "White Ash",
    scientific: "Fraxinus americana",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fraxinus_americana_002.jpg/330px-Fraxinus_americana_002.jpg",
    funFact: "Su madera elástica y resistente se usa para hacer bates de béisbol y mangos de herramientas.",
    difficulty: 2,
    region: "north-america"
  },
  {
    id: "t050",
    nameEs: "Palmera Pindó",
    nameEn: "Queen Palm",
    scientific: "Syagrus romanzoffiana",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Jeriv%C3%A1_%28do_tupi_iara%27yb%C3%A1%29_com_frutos_ainda_verdes_06.jpg/330px-Jeriv%C3%A1_%28do_tupi_iara%27yb%C3%A1%29_com_frutos_ainda_verdes_06.jpg",
    funFact: "Sus frutos dulces alimentan a tucanes y monos. Los guaraníes fermentaban su savia para hacer una bebida alcohólica.",
    difficulty: 2,
    region: "south-america"
  },

  // --- ÁRBOLES ARGENTINOS / RIOPLATENSES ---
  // === PAMPA / BUENOS AIRES ===
  {
    id: "t051",
    nameEs: "Ombú",
    nameEn: "Ombu",
    scientific: "Phytolacca dioica",
    photoUrl: "Phytolacca_dioica.jpg",
    funFact: "Técnicamente no es un árbol sino una hierba gigante. Su tronco esponjoso almacena agua y no tiene anillos de crecimiento.",
    difficulty: 1,
    region: "south-america"
  },
  {
    id: "t052",
    nameEs: "Tala",
    nameEn: "Tala Tree",
    scientific: "Celtis ehrenbergiana",
    photoUrl: "Celtis_ehrenbergiana_arbol.jpg",
    funFact: "Es el árbol emblemático del espinal pampeano. Sus frutos dulces son alimento clave para aves silvestres.",
    difficulty: 2,
    region: "south-america"
  },
  {
    id: "t053",
    nameEs: "Coronillo",
    nameEn: "Coronillo",
    scientific: "Scutia buxifolia",
    photoUrl: "Scutia_buxifolia_337092285.jpg",
    funFact: "Su madera es tan dura y pesada que se hunde en el agua. Los gauchos la usaban para postes de alambrado por su durabilidad extrema.",
    difficulty: 3,
    region: "south-america"
  },
  {
    id: "t054",
    nameEs: "Caldén",
    nameEn: "Calden",
    scientific: "Prosopis caldenia",
    photoUrl: "Prosopis_caldenia.jpg",
    funFact: "Es endémico de Argentina, solo crece en La Pampa y alrededores. Los bosques de caldén son uno de los ecosistemas más amenazados del país.",
    difficulty: 2,
    region: "south-america"
  },
  {
    id: "t055",
    nameEs: "Sauce criollo",
    nameEn: "Humboldt's Willow",
    scientific: "Salix humboldtiana",
    photoUrl: "Salix_humboldtiana_form.jpg",
    funFact: "Es el único sauce nativo de Sudamérica. Crece a orillas de ríos y arroyos desde México hasta la Patagonia.",
    difficulty: 1,
    region: "south-america"
  },
  // === NOA / NEA SUBTROPICAL ===
  {
    id: "t056",
    nameEs: "Lapacho rosado",
    nameEn: "Pink Trumpet Tree",
    scientific: "Handroanthus impetiginosus",
    photoUrl: "Handroanthus_impetiginosus_(lapacho_rosado)_florecido.jpg",
    funFact: "Florece espectacularmente en invierno cuando no tiene hojas. Es la flor provincial de Jujuy y Tucumán.",
    difficulty: 1,
    region: "neotropics"
  },
  {
    id: "t057",
    nameEs: "Lapacho amarillo",
    nameEn: "Yellow Trumpet Tree",
    scientific: "Handroanthus albus",
    photoUrl: "Handroanthus_albus_(Cham.)_Mattos.jpg",
    funFact: "Florece unas semanas después que el lapacho rosado, creando oleadas de color en las selvas del norte argentino.",
    difficulty: 2,
    region: "neotropics"
  },
  {
    id: "t058",
    nameEs: "Guayacán",
    nameEn: "Guayacan",
    scientific: "Libidibia paraguariensis",
    photoUrl: "Libidibia_paraguariensis_in_Chaco_National_Park.jpg",
    funFact: "Su madera es una de las más duras del mundo, tanto que las herramientas se desgastan al cortarla. Se la llama 'madera de hierro'.",
    difficulty: 3,
    region: "neotropics"
  },
  {
    id: "t059",
    nameEs: "Urunday",
    nameEn: "Urunday",
    scientific: "Astronium balansae",
    photoUrl: "Astronium_balansae.jpg",
    funFact: "Su madera es prácticamente imputrescible y resiste al agua. Se usa para durmientes de ferrocarril y postes que duran décadas.",
    difficulty: 3,
    region: "neotropics"
  },
  {
    id: "t060",
    nameEs: "Timbó",
    nameEn: "Ear Pod Tree",
    scientific: "Enterolobium contortisiliquum",
    photoUrl: "Enterolobiumcontortisiliquum.jpg",
    funFact: "Sus frutos tienen forma de oreja humana (de ahí su nombre en inglés). Los pueblos originarios los usaban como jabón natural.",
    difficulty: 2,
    region: "neotropics"
  },
  {
    id: "t061",
    nameEs: "Palo borracho rosado",
    nameEn: "Silk Floss Tree",
    scientific: "Ceiba speciosa",
    photoUrl: "Ceiba_speciosa_1.jpg",
    funFact: "Su tronco tiene forma de botella (por eso 'borracho') y está cubierto de aguijones. Produce una fibra sedosa similar al algodón.",
    difficulty: 1,
    region: "neotropics"
  },
  {
    id: "t062",
    nameEs: "Ibirá pitá",
    nameEn: "Yellow Poinciana",
    scientific: "Peltophorum dubium",
    photoUrl: "Peltophorum_dubium_%C3%A1rvore.jpg",
    funFact: "Es el árbol provincial de Misiones. Su nombre guaraní significa 'árbol colorado' por el color rojizo de su madera.",
    difficulty: 3,
    region: "neotropics"
  },
  {
    id: "t063",
    nameEs: "Guatambú",
    nameEn: "Pau Marfim",
    scientific: "Balfourodendron riedelianum",
    photoUrl: "Balfourodendron-riedelianum.jpg",
    funFact: "Su madera color marfil es tan fina que se usa para fabricar instrumentos musicales y tacos de billar profesionales.",
    difficulty: 3,
    region: "neotropics"
  },
  // === PATAGONIA ===
  {
    id: "t064",
    nameEs: "Araucaria",
    nameEn: "Monkey Puzzle Tree",
    scientific: "Araucaria araucana",
    photoUrl: "Araucaria_araucana-detail.jpg",
    funFact: "Es un fósil viviente que ya existía en la época de los dinosaurios. Sus semillas (piñones) eran alimento básico del pueblo mapuche.",
    difficulty: 1,
    region: "southern-cone"
  },
  {
    id: "t065",
    nameEs: "Lenga",
    nameEn: "Lenga Beech",
    scientific: "Nothofagus pumilio",
    photoUrl: "Nothofagus_pumilio.jpg",
    funFact: "En otoño sus hojas se tiñen de rojo fuego, creando los paisajes más fotografiados de la Patagonia. Crece hasta el límite de la vegetación.",
    difficulty: 2,
    region: "southern-cone"
  },
  {
    id: "t066",
    nameEs: "Coihue",
    nameEn: "Coigue",
    scientific: "Nothofagus dombeyi",
    photoUrl: "Nothofagus_dombeyi.jpg",
    funFact: "Es el árbol más grande de los bosques patagónicos, puede superar los 40 metros. Es perennifolio, a diferencia de la lenga.",
    difficulty: 2,
    region: "southern-cone"
  },
  {
    id: "t067",
    nameEs: "Ciprés de la cordillera",
    nameEn: "Chilean Cedar",
    scientific: "Austrocedrus chilensis",
    photoUrl: "Austrocedrus_chilensis.jpg",
    funFact: "Es la conífera más abundante de los bosques andino-patagónicos. El famoso 'Camino de los Siete Lagos' atraviesa sus bosques.",
    difficulty: 2,
    region: "southern-cone"
  },
  {
    id: "t068",
    nameEs: "Alerce",
    nameEn: "Patagonian Cypress",
    scientific: "Fitzroya cupressoides",
    photoUrl: "Fitzroya_cupressoides_(da_Silvio_Rossi).jpg",
    funFact: "Puede vivir más de 3.600 años, siendo uno de los organismos más longevos del planeta. Está en peligro de extinción.",
    difficulty: 2,
    region: "southern-cone"
  },
  {
    id: "t069",
    nameEs: "Ñire",
    nameEn: "Antarctic Beech",
    scientific: "Nothofagus antarctica",
    photoUrl: "Nothofagus_antarctica_2.jpg",
    funFact: "Es el árbol que crece más al sur del mundo, llegando hasta Tierra del Fuego. Se adapta a suelos pobres y encharcados.",
    difficulty: 3,
    region: "southern-cone"
  },
  {
    id: "t070",
    nameEs: "Maitén",
    nameEn: "Maiten",
    scientific: "Maytenus boaria",
    photoUrl: "Maytenus_boaria_-_San_Francisco_Botanical_Garden.jpg",
    funFact: "Sus ramas colgantes le dan un aspecto de sauce llorón. El ganado y los ciervos lo adoran tanto que puede desaparecer de zonas sobrepastoreadas.",
    difficulty: 3,
    region: "southern-cone"
  },
  // === GENERAL ARGENTINA ===
  {
    id: "t071",
    nameEs: "Algarrobo blanco",
    nameEn: "White Carob Tree",
    scientific: "Prosopis alba",
    photoUrl: "Prosopis_alba.jpg",
    funFact: "Los pueblos originarios lo llamaban 'el árbol que todo lo da': alimento (patay, aloja), sombra, madera y medicina.",
    difficulty: 1,
    region: "south-america"
  },
  {
    id: "t072",
    nameEs: "Quebracho colorado chaqueño",
    nameEn: "Red Quebracho",
    scientific: "Schinopsis balansae",
    photoUrl: "Schinopsis_balansae.jpg",
    funFact: "Su nombre viene de 'quiebra-hacha' por la dureza de su madera. Fue explotado masivamente para extraer tanino en el siglo XX.",
    difficulty: 2,
    region: "south-america"
  },
  {
    id: "t073",
    nameEs: "Quebracho blanco",
    nameEn: "White Quebracho",
    scientific: "Aspidosperma quebracho-blanco",
    photoUrl: "Aspidosperma_quebracho-blanco.jpg",
    funFact: "A diferencia del quebracho colorado, es perennifolio. Su corteza contiene alcaloides que se usaron en medicina contra el asma.",
    difficulty: 2,
    region: "south-america"
  },
  {
    id: "t074",
    nameEs: "Espinillo",
    nameEn: "Roman Cassie",
    scientific: "Vachellia caven",
    photoUrl: "Espinillo_Vachellia_caven.jpg",
    funFact: "Sus flores amarillas perfumadas aparecen al final del invierno, anunciando la primavera. Es uno de los primeros árboles en florecer.",
    difficulty: 2,
    region: "south-america"
  },
  {
    id: "t075",
    nameEs: "Aguaribay",
    nameEn: "Peruvian Pepper Tree",
    scientific: "Schinus areira",
    photoUrl: "Schinus_molle.jpg",
    funFact: "Sus frutos rosados se usan como 'pimienta rosa' en gastronomía. Los incas hacían una bebida fermentada llamada 'chicha de molle'.",
    difficulty: 1,
    region: "south-america"
  },
  {
    id: "t076",
    nameEs: "Chañar",
    nameEn: "Chanar",
    scientific: "Geoffroea decorticans",
    photoUrl: "Geoffroea_decorticans0.jpg",
    funFact: "Su corteza se descáscara naturalmente revelando un tronco liso verde. Su fruto dulce se usa para hacer arrope, un dulce tradicional del NOA.",
    difficulty: 2,
    region: "south-america"
  },
  {
    id: "t077",
    nameEs: "Mistol",
    nameEn: "Mistol",
    scientific: "Sarcomphalus mistol",
    photoUrl: "Sarcomphalus_mistol.jpg",
    funFact: "Con sus frutos se prepara el 'bolanchao', un dulce tradicional del norte argentino hecho con harina de algarroba y mistol.",
    difficulty: 3,
    region: "south-america"
  },
  {
    id: "t078",
    nameEs: "Molle de beber",
    nameEn: "Brazilian Pepper Tree",
    scientific: "Lithraea molleoides",
    photoUrl: "Lithraea_molleoides_-_whole.jpg",
    funFact: "Ojo: puede causar dermatitis de contacto similar a la hiedra venenosa. A pesar de esto, en Córdoba se usaba para hacer una bebida fermentada.",
    difficulty: 3,
    region: "south-america"
  },
  {
    id: "t079",
    nameEs: "Tipa",
    nameEn: "Tipuana",
    scientific: "Tipuana tipu",
    photoUrl: "Tipuana_tipu.jpg",
    funFact: "Es el árbol más plantado en las veredas de Buenos Aires y Tucumán. Sus semillas aladas giran como helicópteros al caer.",
    difficulty: 1,
    region: "south-america"
  },
  {
    id: "t080",
    nameEs: "Cebil colorado",
    nameEn: "Vilca Tree",
    scientific: "Anadenanthera colubrina",
    photoUrl: "Anadenanthera_colubrina_tree.jpg",
    funFact: "Sus semillas contienen sustancias psicoactivas que los pueblos originarios usaban en ceremonias rituales desde hace miles de años.",
    difficulty: 3,
    region: "neotropics"
  }
];

// ============================================================
// QUOTES — ~75 entries
// Frases atractivas de escritores, músicos y políticos
// ============================================================
const QUOTES = [
  // --- ESCRITORES ---
  { id: "q001", text: "Uno no es lo que es por lo que escribe, sino por lo que ha leído.", author: "Jorge Luis Borges", category: "writer" },
  { id: "q002", text: "He cometido el peor de los pecados que un hombre puede cometer: no he sido feliz.", author: "Jorge Luis Borges", category: "writer" },
  { id: "q003", text: "No se puede mirar dentro de una persona como se mira dentro de una casa vacía.", author: "Julio Cortázar", category: "writer" },
  { id: "q004", text: "Andábamos sin buscarnos pero sabiendo que andábamos para encontrarnos.", author: "Julio Cortázar", category: "writer" },
  { id: "q005", text: "Voy a dormir, nodriza mía, acuéstame. Ponme una lámpara a la cabecera, una constelación, la que te guste; todas son buenas.", author: "Alfonsina Storni", category: "writer" },
  { id: "q006", text: "Tú me quieres blanca, tú me quieres nívea, tú me quieres alba.", author: "Alfonsina Storni", category: "writer" },
  { id: "q007", text: "El futuro es de los que saben que la belleza es más fuerte que la maldad.", author: "Roberto Arlt", category: "writer" },
  { id: "q008", text: "Cada cual tiene su infierno, que no es un lugar sino un estado del alma.", author: "Alejandra Pizarnik", category: "writer" },
  { id: "q009", text: "La vida perdida para la literatura por culpa de la literatura. Quiero decir, por culpa de querer hacer de la vida una novela.", author: "Alejandra Pizarnik", category: "writer" },
  { id: "q010", text: "Siempre que te pregunten si puedes hacer un trabajo, contesta que sí y ponte enseguida a aprender cómo se hace.", author: "Roberto Fontanarrosa", category: "writer" },
  { id: "q011", text: "No es la vergüenza de ser feliz lo que nos frena, sino la cobardía de pelearnos por la felicidad.", author: "Roberto Fontanarrosa", category: "writer" },
  { id: "q012", text: "¿No será que esta vida moderna está teniendo más de moderna que de vida?", author: "Mafalda (Quino)", category: "writer" },
  { id: "q013", text: "Paren el mundo que me quiero bajar.", author: "Mafalda (Quino)", category: "writer" },
  { id: "q014", text: "El peor analfabeto es el analfabeto político.", author: "Osvaldo Soriano", category: "writer" },
  { id: "q015", text: "Lo que no se puede nombrar, no existe.", author: "Alejandro Dolina", category: "writer" },
  { id: "q016", text: "A los hombres y mujeres que piensan con su propia cabeza les espera la hoguera o el ridículo, y a veces las dos cosas.", author: "Alejandro Dolina", category: "writer" },
  { id: "q017", text: "La utopía está en el horizonte. Me acerco dos pasos, ella se aleja dos pasos. Camino diez pasos y el horizonte se corre diez pasos más allá. ¿Para qué sirve la utopía? Para eso sirve: para caminar.", author: "Eduardo Galeano", category: "writer" },
  { id: "q018", text: "Mucha gente pequeña, en lugares pequeños, haciendo cosas pequeñas, puede cambiar el mundo.", author: "Eduardo Galeano", category: "writer" },
  { id: "q019", text: "El poder no tiene más remedio que ofertar olvido a quienes piensan.", author: "Abelardo Castillo", category: "writer" },
  { id: "q020", text: "La literatura es siempre una expedición a la verdad.", author: "Abelardo Castillo", category: "writer" },
  { id: "q021", text: "Lo que la gente piense de mí es problema de la gente.", author: "Adolfo Bioy Casares", category: "writer" },
  { id: "q022", text: "La muerte es una vida vivida. La vida es una muerte que viene.", author: "Jorge Luis Borges", category: "writer" },
  { id: "q023", text: "Un hombre muerto no es un hombre peligroso, pero sus ideas pueden serlo.", author: "Horacio Quiroga", category: "writer" },
  { id: "q024", text: "No escribas dominado por la emoción. Déjala morir, y evócala después.", author: "Horacio Quiroga", category: "writer" },
  { id: "q025", text: "Me gustas cuando callas porque estás como ausente.", author: "Pablo Neruda", category: "writer" },
  { id: "q026", text: "Podrán cortar todas las flores, pero no podrán detener la primavera.", author: "Pablo Neruda", category: "writer" },
  { id: "q027", text: "La vida no es la que uno vivió, sino la que uno recuerda y cómo la recuerda para contarla.", author: "Gabriel García Márquez", category: "writer" },
  { id: "q028", text: "Ningún lugar en la vida es más triste que una cama vacía.", author: "Gabriel García Márquez", category: "writer" },
  { id: "q029", text: "Cuando creíamos que teníamos todas las respuestas, de pronto, cambiaron todas las preguntas.", author: "Mario Benedetti", category: "writer" },
  { id: "q030", text: "De vez en cuando hay que hacer una pausa, contemplarse a sí mismo sin la complacencia cotidiana.", author: "Mario Benedetti", category: "writer" },
  { id: "q031", text: "El mejor modo de decir es hacer.", author: "José Martí", category: "writer" },
  { id: "q032", text: "La única manera de ser seguido es correr más deprisa que los demás.", author: "Héctor Aguilar Camín", category: "writer" },

  // --- MÚSICOS ---
  { id: "q033", text: "Mañana es mejor, seguro que mañana sí que va a estar bueno.", author: "Luis Alberto Spinetta", category: "musician" },
  { id: "q034", text: "Hoy todo el hielo en la ciudad respira por vos.", author: "Luis Alberto Spinetta", category: "musician" },
  { id: "q035", text: "Yo que nací con Videla, yo que crecí sin poder, digo lo que otros no dicen y me hago cargo también.", author: "Charly García", category: "musician" },
  { id: "q036", text: "No bombardeen Buenos Aires, no nos tiren napalm. Yo no les hice nada, les juro que fui solamente a comprar.", author: "Charly García", category: "musician" },
  { id: "q037", text: "Me verás volver, a buscar la risa de tus labios de cristal.", author: "Gustavo Cerati", category: "musician" },
  { id: "q038", text: "Gracias totales.", author: "Gustavo Cerati", category: "musician" },
  { id: "q039", text: "Uno busca lleno de esperanzas el camino que los sueños prometieron a sus ansias.", author: "Mercedes Sosa", category: "musician" },
  { id: "q040", text: "Cambia, todo cambia.", author: "Mercedes Sosa", category: "musician" },
  { id: "q041", text: "El que vive para acumular riqueza, no vive. Apenas dura.", author: "Atahualpa Yupanqui", category: "musician" },
  { id: "q042", text: "Un río de silencios me habita. A veces canta.", author: "Atahualpa Yupanqui", category: "musician" },
  { id: "q043", text: "Dando siempre, dando amor, y al final la soledad será, solo será, para aquel que la cultivó.", author: "Fito Páez", category: "musician" },
  { id: "q044", text: "Y dale alegría, alegría a mi corazón.", author: "Fito Páez", category: "musician" },
  { id: "q045", text: "El futuro llegó hace rato, todo un palo ya lo ves.", author: "Patricio Rey y sus Redonditos de Ricota (Indio Solari)", category: "musician" },
  { id: "q046", text: "La bestia humana busca un tipo de verdad que no hay en la razón.", author: "Patricio Rey y sus Redonditos de Ricota (Indio Solari)", category: "musician" },
  { id: "q047", text: "No sé lo que quiero, pero lo quiero ya.", author: "Luca Prodan (Sumo)", category: "musician" },
  { id: "q048", text: "Mejor no hablar de ciertas cosas.", author: "Luca Prodan (Sumo)", category: "musician" },
  { id: "q049", text: "En mi hospital de sueños, en mi isla de fantasía.", author: "Federico Moura (Virus)", category: "musician" },
  { id: "q050", text: "Luna de miel en la mano, tengo la piel gastada de soñar.", author: "Federico Moura (Virus)", category: "musician" },
  { id: "q051", text: "Sin gamulán, mil horas quedándose, ella se va.", author: "Miguel Abuelo (Los Abuelos de la Nada)", category: "musician" },
  { id: "q052", text: "Loco, tu forma de ser hace que todo cambie.", author: "Los Abuelos de la Nada", category: "musician" },
  { id: "q053", text: "Lo que hoy destruye al mundo no es la maldad de los malos, sino el silencio de los buenos.", author: "Wos", category: "musician" },
  { id: "q054", text: "Salir primero de la cabeza para poder salir primero de la cuadra.", author: "Wos", category: "musician" },
  { id: "q055", text: "No tengo miedo ni al odio ni al fracaso. Lo que no me mata me hace más cómodo.", author: "Trueno", category: "musician" },
  { id: "q056", text: "Nos criamos en el barro, pero ahora estamos aquí, parados frente al sol.", author: "Trueno", category: "musician" },
  { id: "q057", text: "Yo no sé qué va a pasar mañana, pero sé que hoy estoy vivo y eso es un montón.", author: "Milo J", category: "musician" },
  { id: "q058", text: "Cada vez que te veo me pregunto cómo hice para sobrevivir antes de conocerte.", author: "Silvio Rodríguez", category: "musician" },
  { id: "q059", text: "Prefiero morir de pie a vivir siempre arrodillado.", author: "Silvio Rodríguez", category: "musician" },
  { id: "q060", text: "Rasguña las piedras y verás.", author: "Sui Generis (Charly García)", category: "musician" },

  // --- POLÍTICOS / HISTÓRICOS ---
  { id: "q061", text: "Serás lo que debas ser, o no serás nada.", author: "José de San Martín", category: "political" },
  { id: "q062", text: "La biblioteca destinada a la educación universal es más poderosa que nuestros ejércitos.", author: "José de San Martín", category: "political" },
  { id: "q063", text: "La única verdad es la realidad.", author: "Juan Domingo Perón", category: "political" },
  { id: "q064", text: "Mejor que decir es hacer, y mejor que prometer es realizar.", author: "Juan Domingo Perón", category: "political" },
  { id: "q065", text: "Donde hay una necesidad, nace un derecho.", author: "Eva Perón", category: "political" },
  { id: "q066", text: "Volveré y seré millones.", author: "Eva Perón", category: "political" },
  { id: "q067", text: "Prefiero una Argentina imperfecta a la perfección de los que quieren un país para pocos.", author: "Néstor Kirchner", category: "political" },
  { id: "q068", text: "No les pido que me aplaudan, les pido que me acompañen.", author: "Néstor Kirchner", category: "political" },
  { id: "q069", text: "La Patria es el otro.", author: "Cristina Fernández de Kirchner", category: "political" },
  { id: "q070", text: "Mucho se puede esperar del pueblo que en su himno canta: 'Libertad, libertad, libertad'.", author: "Manuel Belgrano", category: "political" },
  { id: "q071", text: "Los pueblos que olvidan sus tradiciones pierden la conciencia de sus destinos.", author: "Arturo Jauretche", category: "political" },
  { id: "q072", text: "El arte de nuestros enemigos es desmoralizar, entristecer a los pueblos. Los pueblos deprimidos no vencen.", author: "Arturo Jauretche", category: "political" },
  { id: "q073", text: "Gobernar es poblar.", author: "Juan Bautista Alberdi", category: "political" },
  { id: "q074", text: "Las ideas no se matan.", author: "Domingo Faustino Sarmiento", category: "political" },
  { id: "q075", text: "Hay que estudiar para no ser esclavo.", author: "Domingo Faustino Sarmiento", category: "political" }
];
