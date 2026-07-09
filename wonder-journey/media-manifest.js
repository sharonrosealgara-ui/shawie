/* ============================================================
   WONDER JOURNEY OS — MEDIA MANIFEST
   The registry of AUTHENTIC educational media the curriculum needs,
   covering every adventure of World 1 (July–December 2026).
   Governed by REAL_MEDIA_POLICY.md.

   THE RULE: real places, maps, animals, food, landmarks and real Bible
   geography must be REAL, licensed photos/maps — never AI-generated.
   Until a licensed file is added, mediaFigure() shows an honest placeholder.

   Each entry fields:
     subject          — title of the image
     category         — map | symbol | volcano | landmark | terrace | beach |
                        animal | ocean | food | festival | background |
                        bible-map | bible-place
     real             — true = must be an authentic photo/map (no AI)
     file             — LOCAL path under assets/ (or our licensed cloud); never a hotlink
     alt              — accessibility alt text
     caption          — shown under the image
     credit / license — FILL before shipping (see REAL_MEDIA_POLICY.md §4)
     sourceType       — suggested place to source a licensed file
     fallback         — placeholder shown when the file is missing/blocked
     teacherGuidance  — exact instruction shown in Teacher Mode
     status           — "needed" (source it) → "ready" (file + credit + license present)
   ============================================================ */
function mk(o){
  return {
    subject: o.subject,
    title: o.subject,
    category: o.category,
    kind: o.category,
    real: o.real !== false,
    file: o.file,
    alt: o.alt,
    caption: o.caption,
    credit: "",
    license: "",
    sourceType: o.sourceType,
    sourceHint: o.sourceType,
    fallback: o.fallback,
    teacherGuidance: o.teacherGuidance,
    status: "needed"
  };
}

const MEDIA = {
  "map-philippines": mk({ subject:"Map of the Philippines", category:"map", real:true, file:"assets/philippines/maps/map-philippines.jpg", alt:"Political map of the Philippines showing Luzon, Visayas and Mindanao", caption:"The Philippines — 7,641 islands in Southeast Asia.", sourceType:"OpenStreetMap export (ODbL) or government open data", fallback:"🗺️ Map of the Philippines", teacherGuidance:"Add a licensed photo of Map of the Philippines to assets/philippines/maps/map-philippines.jpg. Source: OpenStreetMap export (ODbL) or government open data. Fill credit + license, then set status:\"ready\"." }),
  "map-luzon": mk({ subject:"Map of Luzon", category:"map", real:true, file:"assets/philippines/maps/map-luzon.jpg", alt:"Map of the Luzon island group in the north", caption:"Luzon — the largest island group, in the north.", sourceType:"OpenStreetMap / Wikimedia Commons", fallback:"🗺️ Map of Luzon", teacherGuidance:"Add a licensed photo of Map of Luzon to assets/philippines/maps/map-luzon.jpg. Source: OpenStreetMap / Wikimedia Commons. Fill credit + license, then set status:\"ready\"." }),
  "map-visayas": mk({ subject:"Map of the Visayas", category:"map", real:true, file:"assets/philippines/maps/map-visayas.jpg", alt:"Map of the central Visayas islands", caption:"The Visayas — the central islands.", sourceType:"OpenStreetMap / Wikimedia Commons", fallback:"🗺️ Map of the Visayas", teacherGuidance:"Add a licensed photo of Map of the Visayas to assets/philippines/maps/map-visayas.jpg. Source: OpenStreetMap / Wikimedia Commons. Fill credit + license, then set status:\"ready\"." }),
  "map-mindanao": mk({ subject:"Map of Mindanao", category:"map", real:true, file:"assets/philippines/maps/map-mindanao.jpg", alt:"Map of the Mindanao island group in the south", caption:"Mindanao — the southern island group.", sourceType:"OpenStreetMap / Wikimedia Commons", fallback:"🗺️ Map of Mindanao", teacherGuidance:"Add a licensed photo of Map of Mindanao to assets/philippines/maps/map-mindanao.jpg. Source: OpenStreetMap / Wikimedia Commons. Fill credit + license, then set status:\"ready\"." }),
  "map-world-asia": mk({ subject:"World → Asia → Philippines", category:"map", real:true, file:"assets/philippines/maps/map-world-asia.jpg", alt:"World map zooming from the globe to Asia to the Philippines", caption:"Finding the Philippines: world → Asia → our islands.", sourceType:"OpenStreetMap / Natural Earth (public domain)", fallback:"🗺️ World → Asia → Philippines", teacherGuidance:"Add a licensed photo of World → Asia → Philippines to assets/philippines/maps/map-world-asia.jpg. Source: OpenStreetMap / Natural Earth (public domain). Fill credit + license, then set status:\"ready\"." }),
  "ring-of-fire": mk({ subject:"The Pacific Ring of Fire", category:"map", real:true, file:"assets/philippines/maps/ring-of-fire.jpg", alt:"Map of the Pacific Ring of Fire showing volcano belt around the Pacific", caption:"The Ring of Fire — where the Philippines' volcanoes belong.", sourceType:"USGS (public domain) / Wikimedia Commons", fallback:"🗺️ The Pacific Ring of Fire", teacherGuidance:"Add a licensed photo of The Pacific Ring of Fire to assets/philippines/maps/ring-of-fire.jpg. Source: USGS (public domain) / Wikimedia Commons. Fill credit + license, then set status:\"ready\"." }),
  "ph-flag": mk({ subject:"The Philippine Flag", category:"symbol", real:true, file:"assets/philippines/landmarks/ph-flag.jpg", alt:"The flag of the Philippines with blue, red, white, sun and three stars", caption:"The Philippine flag — sun, three stars, blue and red.", sourceType:"Public domain (national flag)", fallback:"🇵🇭 The Philippine Flag", teacherGuidance:"Add a licensed photo of The Philippine Flag to assets/philippines/landmarks/ph-flag.jpg. Source: Public domain (national flag). Fill credit + license, then set status:\"ready\"." }),
  "sampaguita": mk({ subject:"Sampaguita (national flower)", category:"symbol", real:true, file:"assets/philippines/landmarks/sampaguita.jpg", alt:"White sampaguita jasmine flowers", caption:"Sampaguita — the national flower.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🇵🇭 Sampaguita (national flower)", teacherGuidance:"Add a licensed photo of Sampaguita (national flower) to assets/philippines/landmarks/sampaguita.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "narra": mk({ subject:"Narra tree (national tree)", category:"symbol", real:true, file:"assets/philippines/landmarks/narra.jpg", alt:"A large narra tree, the national tree of the Philippines", caption:"Narra — the strong national tree.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🇵🇭 Narra tree (national tree)", teacherGuidance:"Add a licensed photo of Narra tree (national tree) to assets/philippines/landmarks/narra.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "mayon": mk({ subject:"Mayon Volcano", category:"volcano", real:true, file:"assets/philippines/volcanoes/mayon.jpg", alt:"Mayon Volcano's near-perfect cone in Albay", caption:"Mayon Volcano, Albay — famous for its almost-perfect cone.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🌋 Mayon Volcano", teacherGuidance:"Add a licensed photo of Mayon Volcano to assets/philippines/volcanoes/mayon.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "taal": mk({ subject:"Taal Volcano", category:"volcano", real:true, file:"assets/philippines/volcanoes/taal.jpg", alt:"Taal Volcano and its lake in Batangas", caption:"Taal — a volcano on an island, in a lake, on an island.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🌋 Taal Volcano", teacherGuidance:"Add a licensed photo of Taal Volcano to assets/philippines/volcanoes/taal.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "pinatubo": mk({ subject:"Mount Pinatubo", category:"volcano", real:true, file:"assets/philippines/volcanoes/pinatubo.jpg", alt:"The crater lake of Mount Pinatubo", caption:"Mount Pinatubo — its 1991 eruption reshaped the land.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🌋 Mount Pinatubo", teacherGuidance:"Add a licensed photo of Mount Pinatubo to assets/philippines/volcanoes/pinatubo.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "mountains": mk({ subject:"Cordillera Highlands", category:"landmark", real:true, file:"assets/philippines/landmarks/mountains.jpg", alt:"Green mountain highlands of the Cordillera", caption:"The highlands — cool mountains of northern Luzon.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ Cordillera Highlands", teacherGuidance:"Add a licensed photo of Cordillera Highlands to assets/philippines/landmarks/mountains.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "banaue-terraces": mk({ subject:"Banaue Rice Terraces", category:"terrace", real:true, file:"assets/philippines/rice-terraces/banaue-terraces.jpg", alt:"The Banaue Rice Terraces carved into the mountains of Ifugao", caption:"Banaue Rice Terraces, Ifugao — carved by hand ~2,000 years ago.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🌾 Banaue Rice Terraces", teacherGuidance:"Add a licensed photo of Banaue Rice Terraces to assets/philippines/rice-terraces/banaue-terraces.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "chocolate-hills": mk({ subject:"Chocolate Hills", category:"landmark", real:true, file:"assets/philippines/landmarks/chocolate-hills.jpg", alt:"The rounded Chocolate Hills of Bohol", caption:"The Chocolate Hills, Bohol — over 1,200 grassy hills.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ Chocolate Hills", teacherGuidance:"Add a licensed photo of Chocolate Hills to assets/philippines/landmarks/chocolate-hills.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "boracay": mk({ subject:"Boracay White Beach", category:"beach", real:true, file:"assets/philippines/beaches/boracay.jpg", alt:"White sand and clear water at Boracay's White Beach", caption:"Boracay — famous white-sand beaches.", sourceType:"Wikimedia Commons / tourism open data", fallback:"🏝️ Boracay White Beach", teacherGuidance:"Add a licensed photo of Boracay White Beach to assets/philippines/beaches/boracay.jpg. Source: Wikimedia Commons / tourism open data. Fill credit + license, then set status:\"ready\"." }),
  "palawan": mk({ subject:"Palawan Underground River", category:"beach", real:true, file:"assets/philippines/beaches/palawan.jpg", alt:"Limestone cliffs and the underground river of Palawan", caption:"Palawan — 'the last frontier'.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏝️ Palawan Underground River", teacherGuidance:"Add a licensed photo of Palawan Underground River to assets/philippines/beaches/palawan.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "ph-eagle": mk({ subject:"Philippine Eagle", category:"animal", real:true, file:"assets/animals/ph-eagle.jpg", alt:"A Philippine eagle, the national bird, with its crown of feathers", caption:"The Philippine eagle — one of the world's largest eagles.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🦅 Philippine Eagle", teacherGuidance:"Add a licensed photo of Philippine Eagle to assets/animals/ph-eagle.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "tarsier": mk({ subject:"Philippine Tarsier", category:"animal", real:true, file:"assets/animals/tarsier.jpg", alt:"A Philippine tarsier with huge round eyes clinging to a branch", caption:"The tarsier — a tiny primate of Bohol.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🦅 Philippine Tarsier", teacherGuidance:"Add a licensed photo of Philippine Tarsier to assets/animals/tarsier.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "carabao": mk({ subject:"Carabao (water buffalo)", category:"animal", real:true, file:"assets/animals/carabao.jpg", alt:"A carabao, the Filipino farmer's water buffalo, in a field", caption:"The carabao — the farmer's faithful friend.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🦅 Carabao (water buffalo)", teacherGuidance:"Add a licensed photo of Carabao (water buffalo) to assets/animals/carabao.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "rainforest": mk({ subject:"Philippine Rainforest", category:"animal", real:true, file:"assets/animals/rainforest.jpg", alt:"Dense green Philippine rainforest canopy", caption:"The rainforest — home to night creatures and rare life.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🦅 Philippine Rainforest", teacherGuidance:"Add a licensed photo of Philippine Rainforest to assets/animals/rainforest.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "coral-reef": mk({ subject:"Philippine Coral Reef", category:"ocean", real:true, file:"assets/animals/coral-reef.jpg", alt:"A colourful coral reef with fish in Philippine waters", caption:"Coral reefs — bright cities under the sea.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🐠 Philippine Coral Reef", teacherGuidance:"Add a licensed photo of Philippine Coral Reef to assets/animals/coral-reef.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "tubbataha": mk({ subject:"Tubbataha Reefs", category:"ocean", real:true, file:"assets/animals/tubbataha.jpg", alt:"The Tubbataha Reefs Natural Park in the Sulu Sea", caption:"Tubbataha — a protected reef in the Coral Triangle.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🐠 Tubbataha Reefs", teacherGuidance:"Add a licensed photo of Tubbataha Reefs to assets/animals/tubbataha.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "sea-turtle": mk({ subject:"Sea Turtle (Pawikan)", category:"ocean", real:true, file:"assets/animals/sea-turtle.jpg", alt:"A green sea turtle swimming over a reef", caption:"The pawikan (sea turtle) — a gentle traveller of the seas.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🐠 Sea Turtle (Pawikan)", teacherGuidance:"Add a licensed photo of Sea Turtle (Pawikan) to assets/animals/sea-turtle.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "clownfish": mk({ subject:"Clownfish & Anemone", category:"ocean", real:true, file:"assets/animals/clownfish.jpg", alt:"An orange clownfish among sea anemone tentacles", caption:"Clownfish — they live safely among anemones.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🐠 Clownfish & Anemone", teacherGuidance:"Add a licensed photo of Clownfish & Anemone to assets/animals/clownfish.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "giant-clam": mk({ subject:"Giant Clam (Taklobo)", category:"ocean", real:true, file:"assets/animals/giant-clam.jpg", alt:"A large colourful giant clam on the reef floor", caption:"The taklobo (giant clam) — a giant of the reef.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🐠 Giant Clam (Taklobo)", teacherGuidance:"Add a licensed photo of Giant Clam (Taklobo) to assets/animals/giant-clam.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "fishing-village": mk({ subject:"Filipino Fishing Village", category:"landmark", real:true, file:"assets/philippines/landmarks/fishing-village.jpg", alt:"Bangka fishing boats at a Filipino coastal village", caption:"A fishing village — the sea provides for many families.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ Filipino Fishing Village", teacherGuidance:"Add a licensed photo of Filipino Fishing Village to assets/philippines/landmarks/fishing-village.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "champorado": mk({ subject:"Champorado", category:"food", real:true, file:"assets/food/champorado.jpg", alt:"A bowl of champorado, chocolate rice porridge", caption:"Champorado — sweet chocolate rice porridge.", sourceType:"Wikimedia Commons / licensed stock", fallback:"🍚 Champorado", teacherGuidance:"Add a licensed photo of Champorado to assets/food/champorado.jpg. Source: Wikimedia Commons / licensed stock. Fill credit + license, then set status:\"ready\"." }),
  "rice": mk({ subject:"Steamed Rice (Kanin)", category:"food", real:true, file:"assets/food/rice.jpg", alt:"A bowl of freshly steamed white rice", caption:"Rice — the heart of every Filipino meal.", sourceType:"Wikimedia Commons / licensed stock", fallback:"🍚 Steamed Rice (Kanin)", teacherGuidance:"Add a licensed photo of Steamed Rice (Kanin) to assets/food/rice.jpg. Source: Wikimedia Commons / licensed stock. Fill credit + license, then set status:\"ready\"." }),
  "fruits": mk({ subject:"Philippine Fruits", category:"food", real:true, file:"assets/food/fruits.jpg", alt:"A market spread of tropical Philippine fruits", caption:"Tropical fruits — mango, banana, papaya and more.", sourceType:"Wikimedia Commons / licensed stock", fallback:"🍚 Philippine Fruits", teacherGuidance:"Add a licensed photo of Philippine Fruits to assets/food/fruits.jpg. Source: Wikimedia Commons / licensed stock. Fill credit + license, then set status:\"ready\"." }),
  "mango": mk({ subject:"Philippine Mango", category:"food", real:true, file:"assets/food/mango.jpg", alt:"Sliced ripe golden Philippine mango", caption:"Sweet Philippine mangoes.", sourceType:"Wikimedia Commons / licensed stock", fallback:"🍚 Philippine Mango", teacherGuidance:"Add a licensed photo of Philippine Mango to assets/food/mango.jpg. Source: Wikimedia Commons / licensed stock. Fill credit + license, then set status:\"ready\"." }),
  "merienda": mk({ subject:"Merienda Snacks", category:"food", real:true, file:"assets/food/merienda.jpg", alt:"Filipino merienda snacks such as puto and bibingka", caption:"Merienda — the afternoon snack.", sourceType:"Wikimedia Commons / licensed stock", fallback:"🍚 Merienda Snacks", teacherGuidance:"Add a licensed photo of Merienda Snacks to assets/food/merienda.jpg. Source: Wikimedia Commons / licensed stock. Fill credit + license, then set status:\"ready\"." }),
  "coconut": mk({ subject:"Coconut Tree", category:"food", real:true, file:"assets/food/coconut.jpg", alt:"A tall coconut palm heavy with coconuts", caption:"The coconut — 'the tree of life'.", sourceType:"Wikimedia Commons / licensed stock", fallback:"🍚 Coconut Tree", teacherGuidance:"Add a licensed photo of Coconut Tree to assets/food/coconut.jpg. Source: Wikimedia Commons / licensed stock. Fill credit + license, then set status:\"ready\"." }),
  "market": mk({ subject:"Filipino Wet Market", category:"landmark", real:true, file:"assets/philippines/landmarks/market.jpg", alt:"A busy Filipino public market with stalls of produce", caption:"Market day — where families shop and count.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ Filipino Wet Market", teacherGuidance:"Add a licensed photo of Filipino Wet Market to assets/philippines/landmarks/market.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "seedling": mk({ subject:"Rice Seedlings", category:"food", real:true, file:"assets/food/seedling.jpg", alt:"Bright green rice seedlings growing in a paddy", caption:"From seed to harvest — new life in the field.", sourceType:"Wikimedia Commons / licensed stock", fallback:"🍚 Rice Seedlings", teacherGuidance:"Add a licensed photo of Rice Seedlings to assets/food/seedling.jpg. Source: Wikimedia Commons / licensed stock. Fill credit + license, then set status:\"ready\"." }),
  "farm": mk({ subject:"Filipino Farm", category:"landmark", real:true, file:"assets/philippines/landmarks/farm.jpg", alt:"A Filipino farm with fields and a nipa hut", caption:"Life on a Filipino farm.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ Filipino Farm", teacherGuidance:"Add a licensed photo of Filipino Farm to assets/philippines/landmarks/farm.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "fiesta": mk({ subject:"Filipino Fiesta", category:"festival", real:true, file:"assets/festivals/fiesta.jpg", alt:"A colourful Filipino town fiesta with banners and crowds", caption:"Fiesta! — the Philippines loves to celebrate.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🎉 Filipino Fiesta", teacherGuidance:"Add a licensed photo of Filipino Fiesta to assets/festivals/fiesta.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "sinulog": mk({ subject:"Sinulog Festival", category:"festival", real:true, file:"assets/festivals/sinulog.jpg", alt:"Dancers in bright costumes at the Sinulog Festival in Cebu", caption:"Sinulog Festival, Cebu.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🎉 Sinulog Festival", teacherGuidance:"Add a licensed photo of Sinulog Festival to assets/festivals/sinulog.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "ati-atihan": mk({ subject:"Ati-Atihan Festival", category:"festival", real:true, file:"assets/festivals/ati-atihan.jpg", alt:"Drummers and dancers at the Ati-Atihan Festival in Aklan", caption:"Ati-Atihan, Aklan — drums and dancing in the streets.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🎉 Ati-Atihan Festival", teacherGuidance:"Add a licensed photo of Ati-Atihan Festival to assets/festivals/ati-atihan.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "panagbenga": mk({ subject:"Panagbenga Flower Festival", category:"festival", real:true, file:"assets/festivals/panagbenga.jpg", alt:"Floral floats at the Panagbenga Flower Festival in Baguio", caption:"Panagbenga, Baguio — the flower festival.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🎉 Panagbenga Flower Festival", teacherGuidance:"Add a licensed photo of Panagbenga Flower Festival to assets/festivals/panagbenga.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "kulintang": mk({ subject:"Kulintang", category:"festival", real:true, file:"assets/festivals/kulintang.jpg", alt:"A kulintang set of small tuned gongs in a row", caption:"The kulintang — a row of small gongs.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🎉 Kulintang", teacherGuidance:"Add a licensed photo of Kulintang to assets/festivals/kulintang.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "music-instruments": mk({ subject:"Filipino Instruments", category:"festival", real:true, file:"assets/festivals/music-instruments.jpg", alt:"Traditional Filipino instruments including guitar and bamboo instruments", caption:"Filipino music — strings, bamboo and gongs.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🎉 Filipino Instruments", teacherGuidance:"Add a licensed photo of Filipino Instruments to assets/festivals/music-instruments.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "parol": mk({ subject:"Parol (Star Lantern)", category:"festival", real:true, file:"assets/festivals/parol.jpg", alt:"A bright star-shaped Filipino parol lantern glowing", caption:"The parol — a star-shaped lantern of light.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🎉 Parol (Star Lantern)", teacherGuidance:"Add a licensed photo of Parol (Star Lantern) to assets/festivals/parol.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "bayanihan": mk({ subject:"Bayanihan", category:"festival", real:true, file:"assets/festivals/bayanihan.jpg", alt:"Neighbours carrying a nipa hut together in the bayanihan tradition", caption:"Bayanihan — neighbours helping, carrying a home together.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🎉 Bayanihan", teacherGuidance:"Add a licensed photo of Bayanihan to assets/festivals/bayanihan.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "mano-po": mk({ subject:"Mano Po (Respect for Elders)", category:"festival", real:true, file:"assets/festivals/mano-po.jpg", alt:"A child taking an elder's hand to the forehead in the mano po gesture", caption:"Mano po — honouring elders with a gentle blessing.", sourceType:"Wikimedia Commons / licensed stock", fallback:"🎉 Mano Po (Respect for Elders)", teacherGuidance:"Add a licensed photo of Mano Po (Respect for Elders) to assets/festivals/mano-po.jpg. Source: Wikimedia Commons / licensed stock. Fill credit + license, then set status:\"ready\"." }),
  "family": mk({ subject:"Filipino Family", category:"festival", real:true, file:"assets/festivals/family.jpg", alt:"A happy Filipino family of several generations together", caption:"Family — the heart of Filipino life.", sourceType:"Licensed stock (model release required)", fallback:"🎉 Filipino Family", teacherGuidance:"Add a licensed photo of Filipino Family to assets/festivals/family.jpg. Source: Licensed stock (model release required). Fill credit + license, then set status:\"ready\"." }),
  "rizal": mk({ subject:"Dr. José Rizal Monument", category:"landmark", real:true, file:"assets/philippines/landmarks/rizal.jpg", alt:"The José Rizal monument in Rizal Park, Manila", caption:"Dr. José Rizal — the hero who wrote for freedom.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ Dr. José Rizal Monument", teacherGuidance:"Add a licensed photo of Dr. José Rizal Monument to assets/philippines/landmarks/rizal.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "bonifacio": mk({ subject:"Andrés Bonifacio Monument", category:"landmark", real:true, file:"assets/philippines/landmarks/bonifacio.jpg", alt:"A monument to Andrés Bonifacio", caption:"Andrés Bonifacio — a hero of the people.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ Andrés Bonifacio Monument", teacherGuidance:"Add a licensed photo of Andrés Bonifacio Monument to assets/philippines/landmarks/bonifacio.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "manila": mk({ subject:"Manila", category:"landmark", real:true, file:"assets/philippines/landmarks/manila.jpg", alt:"The skyline and old walls of Manila, the capital", caption:"Manila — the capital city.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ Manila", teacherGuidance:"Add a licensed photo of Manila to assets/philippines/landmarks/manila.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "cebu": mk({ subject:"Cebu", category:"landmark", real:true, file:"assets/philippines/landmarks/cebu.jpg", alt:"Magellan's Cross and the city of Cebu", caption:"Cebu — the heart of the Visayas.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ Cebu", teacherGuidance:"Add a licensed photo of Cebu to assets/philippines/landmarks/cebu.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "baguio": mk({ subject:"Baguio, City of Pines", category:"landmark", real:true, file:"assets/philippines/landmarks/baguio.jpg", alt:"Pine trees and cool hills of Baguio", caption:"Baguio — the cool City of Pines.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ Baguio, City of Pines", teacherGuidance:"Add a licensed photo of Baguio, City of Pines to assets/philippines/landmarks/baguio.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "vigan": mk({ subject:"Vigan Historic Town", category:"landmark", real:true, file:"assets/philippines/landmarks/vigan.jpg", alt:"The cobbled Calle Crisologo with old houses in Vigan", caption:"Vigan — old cobbled streets and history.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ Vigan Historic Town", teacherGuidance:"Add a licensed photo of Vigan Historic Town to assets/philippines/landmarks/vigan.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "davao": mk({ subject:"Davao & Mindanao", category:"landmark", real:true, file:"assets/philippines/landmarks/davao.jpg", alt:"Mount Apo rising above Davao in Mindanao", caption:"Davao — Mindanao's bountiful city, near Mount Apo.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ Davao & Mindanao", teacherGuidance:"Add a licensed photo of Davao & Mindanao to assets/philippines/landmarks/davao.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "iloilo": mk({ subject:"Iloilo", category:"landmark", real:true, file:"assets/philippines/landmarks/iloilo.jpg", alt:"A historic church and river in Iloilo", caption:"Iloilo — heart of Hiligaynon country.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ Iloilo", teacherGuidance:"Add a licensed photo of Iloilo to assets/philippines/landmarks/iloilo.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "jeepney": mk({ subject:"The Jeepney", category:"landmark", real:true, file:"assets/philippines/landmarks/jeepney.jpg", alt:"A brightly painted Filipino jeepney on the street", caption:"The jeepney — the colourful king of the road.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ The Jeepney", teacherGuidance:"Add a licensed photo of The Jeepney to assets/philippines/landmarks/jeepney.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "jobs": mk({ subject:"Filipino Workers", category:"landmark", real:true, file:"assets/philippines/landmarks/jobs.jpg", alt:"Filipinos at work in different everyday jobs", caption:"Livelihood — the many jobs that serve a community.", sourceType:"Wikimedia Commons / licensed stock", fallback:"🏛️ Filipino Workers", teacherGuidance:"Add a licensed photo of Filipino Workers to assets/philippines/landmarks/jobs.jpg. Source: Wikimedia Commons / licensed stock. Fill credit + license, then set status:\"ready\"." }),
  "sari-sari": mk({ subject:"Sari-Sari Store", category:"landmark", real:true, file:"assets/philippines/landmarks/sari-sari.jpg", alt:"A small neighbourhood sari-sari store with hanging goods", caption:"The sari-sari store — the corner shop of every barangay.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🏛️ Sari-Sari Store", teacherGuidance:"Add a licensed photo of Sari-Sari Store to assets/philippines/landmarks/sari-sari.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "tropical-weather": mk({ subject:"Tropical Weather", category:"background", real:true, file:"assets/backgrounds/tropical-weather.jpg", alt:"Monsoon rain clouds over a tropical Philippine landscape", caption:"Wet and dry seasons — the rhythm of the tropics.", sourceType:"Wikimedia Commons (verify CC)", fallback:"🌦️ Tropical Weather", teacherGuidance:"Add a licensed photo of Tropical Weather to assets/backgrounds/tropical-weather.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "bible-holyland": mk({ subject:"Map of the Holy Land", category:"bible-map", real:true, file:"assets/bible/maps/bible-holyland.jpg", alt:"A map of the Holy Land / ancient Israel", caption:"The Holy Land — where many Bible events took place.", sourceType:"Public-domain Bible atlas / Wikimedia Commons", fallback:"📜 Map of the Holy Land", teacherGuidance:"Add a licensed map/photo of Map of the Holy Land to assets/bible/maps/bible-holyland.jpg. Source: Public-domain Bible atlas / Wikimedia Commons. Fill credit + license, then set status:\"ready\"." }),
  "bible-canaan": mk({ subject:"Map: Abraham's Journey", category:"bible-map", real:true, file:"assets/bible/maps/bible-canaan.jpg", alt:"A map tracing Abraham's journey from Ur to Canaan", caption:"Abraham's journey — from Ur toward Canaan.", sourceType:"Public-domain Bible atlas / Wikimedia Commons", fallback:"📜 Map: Abraham's Journey", teacherGuidance:"Add a licensed map/photo of Map: Abraham's Journey to assets/bible/maps/bible-canaan.jpg. Source: Public-domain Bible atlas / Wikimedia Commons. Fill credit + license, then set status:\"ready\"." }),
  "bible-egypt": mk({ subject:"Map of Ancient Egypt", category:"bible-map", real:true, file:"assets/bible/maps/bible-egypt.jpg", alt:"A map of ancient Egypt and the Nile", caption:"Egypt — where Joseph stored grain for the famine.", sourceType:"Public-domain Bible atlas / Wikimedia Commons", fallback:"📜 Map of Ancient Egypt", teacherGuidance:"Add a licensed map/photo of Map of Ancient Egypt to assets/bible/maps/bible-egypt.jpg. Source: Public-domain Bible atlas / Wikimedia Commons. Fill credit + license, then set status:\"ready\"." }),
  "bible-ararat": mk({ subject:"Mount Ararat", category:"bible-place", real:true, file:"assets/bible/locations/bible-ararat.jpg", alt:"The snow-capped peak of Mount Ararat", caption:"Mount Ararat — the region where the Ark came to rest.", sourceType:"Wikimedia Commons (verify CC)", fallback:"✝️ Mount Ararat", teacherGuidance:"Add a licensed map/photo of Mount Ararat to assets/bible/locations/bible-ararat.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "bible-sinai": mk({ subject:"Mount Sinai Region", category:"bible-place", real:true, file:"assets/bible/locations/bible-sinai.jpg", alt:"The rugged mountains of the Sinai Peninsula", caption:"Mount Sinai — where God gave the commandments.", sourceType:"Wikimedia Commons (verify CC)", fallback:"✝️ Mount Sinai Region", teacherGuidance:"Add a licensed map/photo of Mount Sinai Region to assets/bible/locations/bible-sinai.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "bible-galilee": mk({ subject:"Sea of Galilee", category:"bible-place", real:true, file:"assets/bible/locations/bible-galilee.jpg", alt:"The calm shore of the Sea of Galilee", caption:"The Sea of Galilee — where Jesus called fishermen.", sourceType:"Wikimedia Commons (verify CC)", fallback:"✝️ Sea of Galilee", teacherGuidance:"Add a licensed map/photo of Sea of Galilee to assets/bible/locations/bible-galilee.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "bible-nineveh": mk({ subject:"Nineveh Region", category:"bible-place", real:true, file:"assets/bible/locations/bible-nineveh.jpg", alt:"Ruins and gates of ancient Nineveh", caption:"Nineveh — the great city Jonah was sent to.", sourceType:"Wikimedia Commons (verify CC)", fallback:"✝️ Nineveh Region", teacherGuidance:"Add a licensed map/photo of Nineveh Region to assets/bible/locations/bible-nineveh.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
  "bible-jerusalem": mk({ subject:"Jerusalem", category:"bible-place", real:true, file:"assets/bible/locations/bible-jerusalem.jpg", alt:"The old city walls of Jerusalem", caption:"Jerusalem — its walls that Nehemiah helped rebuild.", sourceType:"Wikimedia Commons (verify CC)", fallback:"✝️ Jerusalem", teacherGuidance:"Add a licensed map/photo of Jerusalem to assets/bible/locations/bible-jerusalem.jpg. Source: Wikimedia Commons (verify CC). Fill credit + license, then set status:\"ready\"." }),
};

// Which media each adventure shows in its "Real Photos" gallery scene.
// (Activated automatically as licensed files arrive; placeholders until then.)
const ADVENTURE_MEDIA = {
  a1: ["map-philippines"],
  a2: ["map-luzon", "map-visayas", "map-mindanao", "bible-ararat"],
  a3: ["ph-flag", "sampaguita", "narra"],
  a4: ["mano-po"],
  a5: ["map-world-asia", "map-philippines", "bible-canaan"],
  a6: [],
  a7: ["champorado"],
  a8: ["rice", "bible-egypt"],
  a9: ["market"],
  a10: ["fruits", "mango"],
  a11: ["merienda"],
  a12: ["rice"],
  a13: ["bayanihan"],
  a14: ["mano-po"],
  a15: ["family"],
  a16: ["family"],
  a17: ["bayanihan"],
  a18: ["family"],
  a19: ["fiesta"],
  a20: ["sinulog", "ati-atihan"],
  a21: ["panagbenga"],
  a22: ["kulintang", "music-instruments"],
  a23: ["fiesta"],
  a24: ["family"],
  a25: ["mayon", "taal", "pinatubo", "bible-sinai"],
  a26: ["mayon", "taal", "pinatubo"],
  a27: ["ring-of-fire", "mayon"],
  a28: ["mountains"],
  a29: ["tropical-weather"],
  a30: ["mayon"],
  a31: ["ph-eagle", "tarsier", "carabao"],
  a32: ["ph-eagle"],
  a33: ["tarsier"],
  a34: ["carabao"],
  a35: ["rainforest"],
  a36: ["ph-eagle", "rainforest"],
  a37: ["banaue-terraces"],
  a38: ["farm"],
  a39: ["seedling"],
  a40: ["coconut"],
  a41: ["fruits"],
  a42: ["seedling"],
  a43: ["coral-reef", "bible-nineveh"],
  a44: ["tubbataha", "coral-reef"],
  a45: ["sea-turtle", "clownfish", "giant-clam"],
  a46: ["coral-reef"],
  a47: ["fishing-village", "bible-galilee"],
  a48: ["coral-reef", "sea-turtle"],
  a49: ["rizal", "bonifacio"],
  a50: ["rizal"],
  a51: ["bonifacio"],
  a52: ["ph-flag"],
  a53: ["sampaguita", "narra", "ph-eagle"],
  a54: [],
  a55: ["manila", "bible-jerusalem"],
  a56: ["cebu"],
  a57: ["chocolate-hills", "tarsier"],
  a58: ["palawan"],
  a59: ["baguio"],
  a60: ["vigan", "bible-jerusalem"],
  a61: ["davao"],
  a62: ["iloilo"],
  a63: ["map-philippines"],
  a64: ["jeepney"],
  a65: ["jobs"],
  a66: ["sari-sari"],
  a67: ["family", "bible-holyland"],
  a68: ["parol"],
  a69: ["family"],
  a70: ["family"],
  a71: ["map-philippines"],
  a72: ["fiesta"],
};

if (typeof module !== "undefined") module.exports = { MEDIA, ADVENTURE_MEDIA };
