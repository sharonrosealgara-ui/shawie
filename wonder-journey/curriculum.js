/* ============================================================
   WONDER JOURNEY OS — World 1: The Philippines
   Curriculum data. Every Adventure weaves together the family's
   priority subjects. Faith content lives in `faith` blocks so it
   can be hidden with one toggle for future families.
   ============================================================ */

const LEVELS = [
  { name: "Explorer", at: 0, emoji: "🧭" },
  { name: "Adventurer", at: 250, emoji: "🎒" },
  { name: "Voyager", at: 550, emoji: "⛵" },
  { name: "Pathfinder", at: 900, emoji: "🗺️" },
  { name: "Trailblazer", at: 1300, emoji: "🔥" },
  { name: "Wonder Master", at: 1750, emoji: "👑" },
];

const BADGES = [
  { id: "first-steps", emoji: "👣", name: "First Steps", desc: "Finish your very first Adventure" },
  { id: "tagalog-buds", emoji: "🗣️", name: "Tagalog Buds", desc: "Learn your first Tagalog greetings" },
  { id: "island-hopper", emoji: "🏝️", name: "Island Hopper", desc: "Explore Luzon, Visayas & Mindanao" },
  { id: "kitchen-helper", emoji: "🍳", name: "Kitchen Helper", desc: "Cook a Filipino dish together" },
  { id: "kind-heart", emoji: "💛", name: "Kind Heart", desc: "Practice the value of Bayanihan" },
  { id: "festival-fan", emoji: "🎉", name: "Festival Friend", desc: "Discover a Philippine festival" },
  { id: "bible-explorer", emoji: "📖", name: "Bible Explorer", desc: "Complete 3 Bible story lessons" },
  { id: "quiz-star", emoji: "🌟", name: "Quiz Star", desc: "Get a perfect score on any quiz" },
  { id: "streak-3", emoji: "⚡", name: "On a Roll", desc: "Finish 3 Adventures" },
  { id: "volcano-explorer", emoji: "🌋", name: "Volcano Explorer", desc: "Discover the Ring of Fire" },
  { id: "animal-friend", emoji: "🦅", name: "Animal Friend", desc: "Meet the Philippines' amazing wildlife" },
  { id: "rice-farmer", emoji: "🌾", name: "Rice Farmer", desc: "Climb the ancient rice terraces" },
  { id: "ocean-explorer", emoji: "🐠", name: "Ocean Explorer", desc: "Dive into the Coral Triangle" },
  { id: "history-hero", emoji: "🏛️", name: "History Hero", desc: "Learn about Filipino heroes" },
  { id: "streak-7", emoji: "🚀", name: "Blast Off", desc: "Finish 7 Adventures" },
  { id: "world1-champ", emoji: "🏆", name: "Philippines Champion", desc: "Complete all of World 1" },
];

/* Each adventure:
   id, emoji, title, region, subtitle, value (character), badge (id awarded),
   stamp {emoji,name}, xp, sections[], quiz[], reflect[] */
const ADVENTURES = [
  {
    id: "a1",
    emoji: "🇵🇭",
    title: "Mabuhay! Welcome to the Philippines",
    region: "Overview",
    subtitle: "Say hello, meet the islands, and start our journey with grateful hearts.",
    value: "Gratitude",
    badge: "tagalog-buds",
    stamp: { emoji: "🇵🇭", name: "Manila" },
    xp: 120,
    sections: [
      { icon: "🌍", subject: "Geography", html:
        `<p>The <span class="hl-blue">Philippines</span> is a country made of <span class="hl-red">7,641 islands</span> in Southeast Asia, surrounded by the sparkling <span class="hl-blue">Pacific Ocean</span> and the <span class="hl-blue">South China Sea</span>!</p>
         <ul class="stars">
           <li><span class="bstar" style="color:#2f7fd6">★</span> The three big island groups are <span class="hl-green">Luzon</span> (north), <span class="hl-purple">Visayas</span> (middle), and <span class="hl-orange">Mindanao</span> (south).</li>
           <li><span class="bstar" style="color:#3f9d54">★</span> The capital city is <span class="hl-pink">Manila</span>, on the island of Luzon.</li>
           <li><span class="bstar" style="color:#d6559a">★</span> People here are called <span class="hl-teal">Filipinos</span>. 🇵🇭</li>
         </ul>
         <div class="tryit">🔎 <b style="color:#e5486a">Try it!</b> Find the Philippines on a world map or globe. Is it above or below the equator?</div>` },
      { icon: "🗣️", subject: "Tagalog", html:
        `<p>Tagalog is one of the main languages of the Philippines. Let's learn our first greetings!</p>
         <div class="wordbank">
           <div class="word"><b>Kumusta?</b> — How are you?</div>
           <div class="word"><b>Mabuhay!</b> — Welcome! / Long live!</div>
           <div class="word"><b>Salamat</b> — Thank you</div>
           <div class="word"><b>Oo / Hindi</b> — Yes / No</div>
           <div class="word"><b>Paalam</b> — Goodbye</div>
         </div>
         <div class="tryit">🎭 <b>Role play:</b> Greet each family member with "Kumusta?" and answer "Mabuhay!"</div>` },
      { icon: "🗣️", subject: "Hiligaynon", html:
        `<p>In the Visayas, many families speak <b>Hiligaynon</b> (also called Ilonggo). Compare it with Tagalog!</p>
         <div class="wordbank">
           <div class="word"><b>Kamusta?</b> — How are you?</div>
           <div class="word"><b>Salamat</b> — Thank you</div>
           <div class="word"><b>Huo / Indi</b> — Yes / No</div>
           <div class="word"><b>Palangga ko ikaw</b> — I love you</div>
         </div>` },
      { icon: "📖", subject: "English", html:
        `<p><b>Vocabulary:</b> <i>archipelago</i> — a group of many islands. The Philippines is an archipelago!</p>
         <div class="tryit">✍️ <b>Writing:</b> Finish this sentence together: "If I visited an island, I would ______ because ______."</div>` },
      { icon: "➕", subject: "Mathematics", html:
        `<p>Let's count with islands!</p>
         <ul><li>The Philippines has about <b>7,641</b> islands. What is the digit in the <b>hundreds</b> place? (Answer: 6)</li>
         <li><b>Word problem:</b> If a family visits 2 islands each day, how many islands in 5 days? <b>(2 × 5 = 10)</b></li></ul>
         <div class="tryit">🧮 <b>Mental math:</b> Round 7,641 to the nearest thousand. (8,000!)</div>` },
      { icon: "🔬", subject: "Science", html:
        `<p>The Philippines is <b>tropical</b> — warm all year with two seasons: <b>dry</b> and <b>wet (rainy)</b>.</p>
         <p>It sits on the "<b>Ring of Fire</b>," so it has many volcanoes and sometimes earthquakes. We'll explore those soon! 🌋</p>` },
      { icon: "🎨", subject: "Arts", html:
        `<p>The Philippine flag has a <b>blue</b> stripe (peace & justice), a <b>red</b> stripe (courage), a white triangle, a golden <b>sun</b> with 8 rays, and <b>3 stars</b> for Luzon, Visayas, and Mindanao.</p>
         <div class="tryit">🖍️ <b>Create:</b> Draw and color the Philippine flag. Count the sun's rays as you draw them!</div>` },
      { icon: "🎵", subject: "Music", html:
        `<p>Filipinos love to sing! A famous children's song is "<b>Leron Leron Sinta</b>," a playful folk song about a papaya tree.</p>
         <div class="tryit">👏 <b>Rhythm:</b> Clap a steady beat while you hum any tune together.</div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Creation (Genesis 1)</b> — In the beginning, God created the heavens and the earth: the seas, the land, the sun, and every living thing. When God made the islands and oceans, He said it was <b>good</b>.</p>
         <div class="callout faith">💜 <b>Memory verse (optional):</b> "In the beginning God created the heavens and the earth." — Genesis 1:1</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>What is one thing you are <b>grateful</b> for today?</li>
         <li>If our family could visit any island, where would we go?</li></ul>` },
      { icon: "🤝", subject: "Character: Gratitude", value: true, html:
        `<div class="callout char">🌟 <b>Today's value — Gratitude:</b> A thankful heart makes every adventure brighter. Tonight, each person shares <b>one thing</b> they're thankful for.</div>` },
    ],
    quiz: [
      { q: "How many island groups does the Philippines have?", a: ["3", "7", "50"], correct: 0 },
      { q: "What does “Salamat” mean?", a: ["Hello", "Thank you", "Goodbye"], correct: 1 },
      { q: "What is the capital of the Philippines?", a: ["Cebu", "Davao", "Manila"], correct: 2 },
      { q: "The Philippines is an archipelago. That means…", a: ["one big island", "a group of many islands", "a mountain"], correct: 1 },
    ],
    reflect: ["What was your favorite part of today's adventure?", "Which new word do you want to remember?"],
  },
  {
    id: "a2",
    emoji: "🗺️",
    title: "Island Explorers: Luzon, Visayas & Mindanao",
    region: "The Three Island Groups",
    subtitle: "Hop across the three island groups and learn directions along the way.",
    value: "Curiosity",
    badge: "island-hopper",
    stamp: { emoji: "🏝️", name: "Cebu" },
    xp: 130,
    sections: [
      { icon: "🌍", subject: "Geography", html:
        `<ul><li><b>Luzon</b> (north) — biggest island, home to Manila, rice terraces, and Taal Volcano.</li>
         <li><b>Visayas</b> (center) — beautiful beaches; islands like Cebu, Bohol (Chocolate Hills!), and Boracay.</li>
         <li><b>Mindanao</b> (south) — home to Mount Apo, the tallest mountain, and lots of fruit farms 🍍.</li></ul>
         <div class="tryit">🧭 <b>Try it:</b> Point north, south, east, west in your room. Luzon is north, Mindanao is south!</div>` },
      { icon: "🗣️", subject: "Tagalog", html:
        `<p>Directions in Tagalog:</p>
         <div class="wordbank">
           <div class="word"><b>Hilaga</b> — North</div>
           <div class="word"><b>Timog</b> — South</div>
           <div class="word"><b>Silangan</b> — East</div>
           <div class="word"><b>Kanluran</b> — West</div>
           <div class="word"><b>Isla</b> — Island</div>
         </div>` },
      { icon: "🗣️", subject: "Hiligaynon", html:
        `<div class="wordbank">
           <div class="word"><b>Isla / Pulo</b> — Island</div>
           <div class="word"><b>Bukid</b> — Mountain / farm</div>
           <div class="word"><b>Baybayon</b> — Beach / shore</div>
           <div class="word"><b>Diin ka?</b> — Where are you?</div>
         </div>` },
      { icon: "➕", subject: "Mathematics", html:
        `<p><b>Measurement & maps.</b> On a map, 1 cm might equal 100 km.</p>
         <ul><li>If Manila to Cebu is about <b>6 cm</b> on the map, how many km is that? <b>(6 × 100 = 600 km)</b></li>
         <li><b>Pattern:</b> 3 islands, 6 islands, 9 islands, ___ ? (12 — counting by 3s!)</li></ul>` },
      { icon: "📖", subject: "English", html:
        `<p><b>Sentence building.</b> Use a direction word in a full sentence.</p>
         <div class="tryit">✍️ Example: "Mindanao is in the <b>south</b> of the Philippines." Now make your own about Luzon.</div>` },
      { icon: "🔬", subject: "Science", html:
        `<p>The Chocolate Hills in Bohol are over <b>1,200 grassy hills</b> that turn brown in the dry season — that's why they look like chocolate! They are made of <b>limestone</b> shaped by rain over a very long time.</p>` },
      { icon: "🍳", subject: "Cooking", html:
        `<p>Different islands, different treats! Visayas is famous for <b>mangoes</b> 🥭 (some of the sweetest in the world).</p>
         <div class="tryit">🥭 <b>Snack time:</b> Slice a mango together. Count the slices and share them equally among the family (division!).</div>` },
      { icon: "🎨", subject: "Arts", html:
        `<div class="tryit">🗺️ <b>Create:</b> Draw a simple map of the 3 island groups. Label Hilaga (N) and Timog (S). Add a compass rose!</div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Noah's Ark (Genesis 6–9)</b> — God asked Noah to build a big boat to keep his family and the animals safe through a great flood. Afterward, God sent a <b>rainbow</b> as a promise.</p>
         <div class="callout faith">🌈 Just like Noah traveled across the water, our family is traveling across the islands together!</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>Which island group would you most like to explore and why?</li>
         <li>What helps our family find our way when we feel lost?</li></ul>` },
      { icon: "🤝", subject: "Character: Curiosity", value: true, html:
        `<div class="callout char">🌟 <b>Curiosity</b> means loving to learn new things. Ask <b>one "I wonder…" question</b> about the Philippines today.</div>` },
    ],
    quiz: [
      { q: "Which island group is farthest NORTH?", a: ["Mindanao", "Luzon", "Visayas"], correct: 1 },
      { q: "“Timog” means which direction?", a: ["North", "East", "South"], correct: 2 },
      { q: "If 1 cm = 100 km, then 4 cm = ?", a: ["104 km", "400 km", "40 km"], correct: 1 },
      { q: "The Chocolate Hills are found in…", a: ["Bohol", "Manila", "Davao"], correct: 0 },
    ],
    reflect: ["Which island would you visit first?", "What new direction word did you learn?"],
  },
  {
    id: "a3",
    emoji: "🇵🇭",
    title: "The Filipino Flag & National Symbols",
    region: "National Identity",
    subtitle: "Discover the colors of the flag, the eight-rayed sun, and the plants and animals that stand for the Philippines.",
    value: "Respect",
    badge: "island-hopper",
    stamp: { emoji: "🇵🇭", name: "Flag Day" },
    xp: 150,
    sections: [
      { icon: "🌅", subject: "Story: A Flag Wakes Up", html:
        `<p>Early one morning, a family raises a folded cloth up a tall pole. As the wind catches it, <b>blue, red, white, gold</b> unfold against the sky — the <b>flag of the Philippines</b>! 🇵🇭</p>
         <p>Every color and shape has a <b>meaning</b>. Let's discover them together, like reading a secret code of the country. 🔍</p>` },
      { icon: "🎨", subject: "The Flag's Colors", html:
        `<div class="wordbank">
           <div class="word">🔵 <b>Blue</b> — peace, truth & justice</div>
           <div class="word">🔴 <b>Red</b> — courage & bravery</div>
           <div class="word">⚪ <b>White triangle</b> — equality & freedom for all</div>
           <div class="word">🌟 <b>Gold sun</b> — freedom, with <b>8 rays</b> for the first 8 provinces</div>
           <div class="word">⭐ <b>3 stars</b> — Luzon, Visayas & Mindanao</div>
         </div>
         <div class="tryit">🖐️ Wave your hand like a flag. Can you count to <b>8</b> for the sun's rays?</div>` },
      { icon: "🌸", subject: "National Symbols", html:
        `<div class="wordbank">
           <div class="word">🌸 <b>Sampaguita</b> — national flower (sweet & white)</div>
           <div class="word">🌳 <b>Narra</b> — national tree (strong & tall)</div>
           <div class="word">🦅 <b>Philippine Eagle</b> — national bird</div>
           <div class="word">🐃 <b>Carabao</b> — national animal (the farmer's friend)</div>
         </div>` },
      { icon: "➕", subject: "Math: Count & Group", html:
        `<p><b>The sun has 8 rays.</b> Let's play with 8!</p>
         <ul><li>8 rays shared by 2 kids to color = <b>4 each</b> (8 ÷ 2).</li>
         <li>The flag has <b>3 stars</b>. If each star had 5 points, that's <b>3 × 5 = 15</b> points!</li></ul>` },
      { icon: "🗣️", subject: "Tagalog", html:
        `<div class="wordbank">
           <div class="word"><b>Watawat</b> — Flag</div>
           <div class="word"><b>Araw</b> — Sun</div>
           <div class="word"><b>Bituin</b> — Star</div>
           <div class="word"><b>Bulaklak</b> — Flower</div>
         </div>
         <div class="tryit">🗨️ Try a sentence: "Ang <b>watawat</b> ay may <b>araw</b> at tatlong <b>bituin</b>." (The flag has a sun and three stars.)</div>` },
      { icon: "🗣️", subject: "Hiligaynon", html:
        `<div class="wordbank">
           <div class="word"><b>Hayahay / Bandera</b> — Flag</div>
           <div class="word"><b>Adlaw</b> — Sun</div>
           <div class="word"><b>Bituon</b> — Star</div>
           <div class="word"><b>Bulak</b> — Flower</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>God keeps His promises (Genesis 9).</b> After the great flood, God set a <b>rainbow</b> in the sky as a sign of His promise to Noah and to all the earth. A sign can carry a big, hopeful meaning — just like the colors of a flag.</p>
         <div class="callout faith">💜 Just as the rainbow reminds us of God's faithful promise, symbols remind us of what we love and hope for.</div>` },
      { icon: "📖", subject: "English — Describing Words", html:
        `<div class="tryit">✏️ <b>Adjectives!</b> Fill the blank out loud: "The flag is ______ and ______." (Try: bright, brave, beautiful, proud.)</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>If our family made a little flag, what colors and symbols would we choose, and why?</li>
         <li>What is one thing about our family we would be proud to put on it?</li></ul>` },
      { icon: "🤝", subject: "Character: Respect", value: true, html:
        `<div class="callout char">🌟 <b>Respect</b> means honoring what is important to others. When the flag is raised, Filipinos stand still and quiet to show respect. Let's show respect to people, too — by listening well today. 🙌</div>` },
    ],
    quiz: [
      { q: "How many rays does the sun on the flag have?", a: ["6", "8", "10"], correct: 1 },
      { q: "The 3 stars stand for Luzon, Visayas, and…", a: ["Manila", "Mindanao", "Cebu"], correct: 1 },
      { q: "The national FLOWER of the Philippines is the…", a: ["sampaguita", "rose", "gumamela"], correct: 0 },
      { q: "When the flag is raised, showing respect means we…", a: ["run around", "stand still & quiet", "keep talking"], correct: 1 },
    ],
    reflect: ["Which national symbol is your favorite, and why?", "How did you show respect today?"],
  },
  {
    id: "a4",
    emoji: "🗣️",
    title: "First Words: Tagalog & Hiligaynon Greetings",
    region: "Language & Friendship",
    subtitle: "Learn warm Filipino greetings and count 1–10 — the first words of our journey!",
    value: "Friendliness",
    badge: "tagalog-buds",
    stamp: { emoji: "🗣️", name: "First Words" },
    xp: 150,
    sections: [
      { icon: "👋", subject: "Story: A Friendly Hello", html:
        `<p>When you meet someone new in the Philippines, the very first gift you can give is a <b>warm hello</b> and a smile. 😊</p>
         <p>Filipinos love to greet guests like family. Let's learn the words that open every door — in <b>Tagalog</b> and <b>Hiligaynon</b>!</p>` },
      { icon: "🗣️", subject: "Greetings in Tagalog", html:
        `<div class="wordbank">
           <div class="word"><b>Kumusta?</b> — How are you?</div>
           <div class="word"><b>Magandang umaga</b> — Good morning</div>
           <div class="word"><b>Salamat</b> — Thank you</div>
           <div class="word"><b>Paalam</b> — Goodbye</div>
         </div>
         <div class="tryit">🗨️ Turn to someone and say "<b>Kumusta?</b>" with a big smile!</div>` },
      { icon: "🗣️", subject: "Greetings in Hiligaynon", html:
        `<div class="wordbank">
           <div class="word"><b>Kamusta?</b> — How are you?</div>
           <div class="word"><b>Maayong aga</b> — Good morning</div>
           <div class="word"><b>Salamat</b> — Thank you</div>
           <div class="word"><b>Babay / Halong</b> — Goodbye / Take care</div>
         </div>` },
      { icon: "🔢", subject: "Math: Count 1–10 in Filipino", html:
        `<div class="wordbank">
           <div class="word">1 <b>isa</b> · 2 <b>dalawa</b> · 3 <b>tatlo</b></div>
           <div class="word">4 <b>apat</b> · 5 <b>lima</b> · 6 <b>anim</b></div>
           <div class="word">7 <b>pito</b> · 8 <b>walo</b> · 9 <b>siyam</b> · 10 <b>sampu</b></div>
         </div>
         <div class="tryit">✋ Count your fingers out loud in Filipino: isa, dalawa, tatlo…!</div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Many languages, one God (Genesis 11 — the Tower of Babel).</b> Long ago everyone spoke one language. When people grew proud, God gave many languages. Today the world speaks thousands of languages — and God understands every one!</p>
         <div class="callout faith">💜 No matter the language, we can all say "thank you" to God. He hears every heart.</div>` },
      { icon: "📖", subject: "English — Speaking & Listening", html:
        `<div class="tryit">🎭 <b>Role play:</b> One person says "Kumusta?" — the other answers "Mabuti, salamat!" (I'm good, thank you!). Then switch. Listen carefully!</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>Who could we greet warmly this week — a neighbor, or someone at church?</li>
         <li>How does a friendly hello make someone feel?</li></ul>` },
      { icon: "🤝", subject: "Character: Friendliness", value: true, html:
        `<div class="callout char">🌟 <b>Friendliness</b> means being warm and welcoming. Try greeting three people today with a smile and a kind word. 😊</div>` },
    ],
    quiz: [
      { q: "“Salamat” means…", a: ["Hello", "Thank you", "Goodbye"], correct: 1 },
      { q: "In Filipino, the number 3 is…", a: ["tatlo", "lima", "sampu"], correct: 0 },
      { q: "“Magandang umaga” is a greeting for the…", a: ["morning", "night", "afternoon"], correct: 0 },
      { q: "The Tower of Babel story is about God giving people many…", a: ["languages", "coins", "boats"], correct: 0 },
    ],
    reflect: ["Which greeting was your favorite to say?", "Who will you greet warmly tomorrow?"],
  },
  {
    id: "a5",
    emoji: "🗺️",
    title: "Reading a Map: World → Asia → Philippines",
    region: "Geography & Wonder",
    subtitle: "Zoom in from the whole world all the way to our islands, and learn to read a map like an explorer.",
    value: "Wonder",
    badge: "island-hopper",
    stamp: { emoji: "🗺️", name: "Map Reader" },
    xp: 155,
    sections: [
      { icon: "🔭", subject: "Story: The Explorer's Zoom", html:
        `<p>Imagine flying like a bird, higher and higher, until you can see the whole round <b>Earth</b>. 🌍 Now let's zoom back in, step by step, to find <b>home</b>.</p>
         <p><b>World → Asia → Philippines → our island → our town.</b> Every explorer learns to read a map!</p>` },
      { icon: "🌏", subject: "Zooming In", html:
        `<div class="wordbank">
           <div class="word">🌍 <b>World</b> — all the lands & seas</div>
           <div class="word">🗺️ <b>Asia</b> — our big continent</div>
           <div class="word">🇵🇭 <b>Philippines</b> — 7,641 islands</div>
           <div class="word">🏝️ <b>Our island → our town</b></div>
         </div>` },
      { icon: "🧭", subject: "The Compass Rose", html:
        `<p>A <b>compass rose</b> shows directions: <b>N</b>orth, <b>E</b>ast, <b>S</b>outh, <b>W</b>est.</p>
         <div class="tryit">🧭 Stand up! Point up = North, right = East, down = South, left = West. "Never Eat Soggy Waffles" helps us remember the order!</div>` },
      { icon: "🔑", subject: "The Map Key", html:
        `<p>A <b>map key</b> (legend) explains the little pictures: 🏔️ a mountain, 🌊 the sea, ⭐ a capital city, ▲ a volcano. Reading the key is like learning a map's secret language.</p>` },
      { icon: "➕", subject: "Math: Map Grids", html:
        `<p>Maps use a <b>grid</b> of rows and columns to find places, like <b>B-3</b>. It's just like a treasure map!</p>
         <div class="tryit">🎯 If Manila is in box <b>C-2</b>, point across to column C, then down to row 2. X marks the spot!</div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Abraham's journey of faith (Genesis 12).</b> God told Abraham to travel to a new land He would show him. Abraham trusted God and set out — even without a map — because he believed God's promise.</p>
         <div class="callout faith">💜 We can be brave explorers because God guides us, just like He guided Abraham.</div>` },
      { icon: "📖", subject: "English — Reading a Map Key", html:
        `<div class="tryit">📝 Say it out loud: "On this map, the star means the <b>capital city</b>." Can you find a symbol and read what it means?</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>If we could zoom the map to anywhere in the Philippines, where would our family visit first?</li>
         <li>What do you wonder about that place?</li></ul>` },
      { icon: "🤝", subject: "Character: Wonder", value: true, html:
        `<div class="callout char">🌟 <b>Wonder</b> means being amazed and curious about the world God made. Ask one big "I wonder…" question today! 🤔</div>` },
    ],
    quiz: [
      { q: "Which is the correct zoom order?", a: ["World → Asia → Philippines", "Philippines → World → Asia", "Asia → World → Philippines"], correct: 0 },
      { q: "On a compass, the opposite of North is…", a: ["East", "South", "West"], correct: 1 },
      { q: "A map KEY (legend) tells us what the map's…", a: ["symbols mean", "weather is", "songs are"], correct: 0 },
      { q: "Abraham traveled to a new land because he…", a: ["trusted God", "was lost", "wanted gold"], correct: 0 },
    ],
    reflect: ["What place do you most wonder about?", "What new direction word did you learn?"],
  },
  {
    id: "a6",
    emoji: "🛂",
    title: "Our Wonder Journey Passport & Backpack",
    region: "Getting Ready",
    subtitle: "Set up your passport for stamps and pack a backpack full of curiosity, kindness, and courage.",
    value: "Readiness",
    badge: "first-steps",
    stamp: { emoji: "🛂", name: "Ready to Explore" },
    xp: 145,
    sections: [
      { icon: "🎒", subject: "Story: Packing for Adventure", html:
        `<p>Every great explorer packs a <b>backpack</b> and carries a <b>passport</b>. Today we get ours ready for the whole Wonder Journey! 🌏</p>
         <p>But our backpack isn't only for snacks — it holds special things you can't see…</p>` },
      { icon: "🛂", subject: "Our Passport", html:
        `<p>A <b>passport</b> is a little book that collects a <b>stamp</b> for every place you visit. On our journey, you earn a stamp for <b>every adventure you finish</b>! 🛂✨</p>
         <div class="tryit">👀 Open the <b>Passport</b> page later and see your stamps grow, one adventure at a time.</div>` },
      { icon: "🎒", subject: "What's in Our Backpack?", html:
        `<div class="wordbank">
           <div class="word">🔍 <b>Curiosity</b> — to ask questions</div>
           <div class="word">💛 <b>Kindness</b> — to help others</div>
           <div class="word">🦁 <b>Courage</b> — to try new things</div>
           <div class="word">🙏 <b>Gratitude</b> — to say thank you</div>
         </div>` },
      { icon: "✅", subject: "Math: Sorting & Checklists", html:
        `<p>Getting ready means <b>sorting</b> and <b>checking</b>! Let's make a checklist.</p>
         <ul><li>Sort real items: which go in a backpack — a <b>water bottle</b>, a <b>notebook</b>, a <b>pillow</b>? (Two yes, one no!)</li>
         <li>Count your items and check each box: ✅ ✅ ✅</li></ul>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>The wise builder (Matthew 7).</b> Jesus told of a wise man who built his house on the <b>rock</b>, so it stood strong through the storm. Being <b>ready</b> and building on what is true keeps us strong.</p>
         <div class="callout faith">💜 We get ready for our journey by building on God's truth — a strong and steady foundation.</div>` },
      { icon: "📖", subject: "English — Our Names & Goals", html:
        `<div class="tryit">✏️ Write your <b>name</b> on your passport, then finish this goal: "On this journey I want to learn ______." Say it out loud!</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>What is one thing each of us hopes to discover this year?</li>
         <li>How can we help each other be ready and excited for each adventure?</li></ul>` },
      { icon: "🤝", subject: "Character: Readiness", value: true, html:
        `<div class="callout char">🌟 <b>Readiness</b> means preparing with a happy heart. Pack your invisible backpack each morning — curiosity, kindness, courage — and you're ready for anything! 🎒</div>` },
    ],
    quiz: [
      { q: "In our journey, you earn a passport stamp when you…", a: ["finish an adventure", "eat a snack", "take a nap"], correct: 0 },
      { q: "Which of these belongs in an explorer's ‘invisible backpack’?", a: ["Kindness", "A television", "Homework stress"], correct: 0 },
      { q: "The wise builder built his house on the…", a: ["sand", "rock", "water"], correct: 1 },
      { q: "‘Readiness’ means preparing with a…", a: ["happy heart", "grumpy face", "big yawn"], correct: 0 },
    ],
    reflect: ["What do you hope to discover this year?", "What did you pack in your invisible backpack today?"],
  },
  {
    id: "a7",
    emoji: "🍫",
    title: "Kitchen Adventure: Let's Make Champorado",
    region: "Filipino Cooking",
    subtitle: "Cook a warm chocolate rice porridge while we practice fractions and kitchen safety.",
    value: "Responsibility",
    badge: "kitchen-helper",
    stamp: { emoji: "🍚", name: "Kusina (Kitchen)" },
    xp: 140,
    sections: [
      { icon: "🍳", subject: "Cooking — Champorado", html:
        `<p><b>Champorado</b> is a beloved Filipino breakfast: sweet chocolate rice porridge, often eaten on rainy mornings. ☕</p>
         <p><b>You need:</b> 1 cup sticky rice, 4 cups water, 3 tablespoons cocoa (or tablea chocolate), ¼ cup sugar, a pinch of salt, and milk to drizzle.</p>
         <ol><li>An adult boils the water. 👩‍🍳</li>
         <li>Add the rice, stir gently, and let it cook until soft.</li>
         <li>Mix in the cocoa and sugar. Stir, stir, stir!</li>
         <li>Serve warm with a drizzle of milk. Enjoy together! 🥰</li></ol>` },
      { icon: "🔥", subject: "Kitchen Safety", html:
        `<ul><li>Always cook with an <b>adult</b> near the stove.</li>
         <li>Stir carefully — the pot is <b>hot</b>! 🔥</li>
         <li>Wash your hands before you start. 🧼</li></ul>` },
      { icon: "➕", subject: "Math — Fractions", html:
        `<p>Cooking is full of fractions!</p>
         <ul><li>The recipe uses <b>¼ cup</b> of sugar. How many ¼ cups make a whole cup? <b>(4!)</b></li>
         <li>If we double the recipe, ¼ + ¼ = <b>½ cup</b> of sugar.</li>
         <li>4 cups water − 1 cup rice = how much more water than rice? <b>(3 cups)</b></li></ul>` },
      { icon: "🗣️", subject: "Tagalog", html:
        `<div class="wordbank">
           <div class="word"><b>Kanin</b> — Rice (cooked)</div>
           <div class="word"><b>Tsokolate</b> — Chocolate</div>
           <div class="word"><b>Kutsara</b> — Spoon</div>
           <div class="word"><b>Masarap!</b> — Delicious!</div>
         </div>` },
      { icon: "🗣️", subject: "Hiligaynon", html:
        `<div class="wordbank">
           <div class="word"><b>Kan-on</b> — Rice</div>
           <div class="word"><b>Namit!</b> — Delicious!</div>
           <div class="word"><b>Tubig</b> — Water</div>
         </div>` },
      { icon: "🔬", subject: "Kitchen Science", html:
        `<p>Why does rice get soft and sticky? The heat and water make the rice <b>absorb</b> liquid and swell. This is called <b>gelatinization</b> — a big word for "the starch soaks up water and thickens." 🔬</p>` },
      { icon: "📖", subject: "English", html:
        `<div class="tryit">✍️ <b>Sequencing:</b> Retell the recipe using the words <b>First, Next, Then, Finally.</b> Say it out loud like a chef on TV! 🎤</div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Feeding the 5,000 (John 6)</b> — A boy shared his 5 loaves and 2 fish, and Jesus multiplied it to feed a huge crowd. Sharing food is a way to love others.</p>
         <div class="callout faith">💜 When we cook and share a meal, we practice generosity — just like that little boy.</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>Who could we cook or bake something for this week?</li>
         <li>What is your favorite food our family makes together?</li></ul>` },
      { icon: "🤝", subject: "Character: Responsibility", value: true, html:
        `<div class="callout char">🌟 <b>Responsibility:</b> Each person picks one kitchen job — measuring, stirring, or cleaning up. We finish what we start!</div>` },
    ],
    quiz: [
      { q: "How many ¼ cups make one whole cup?", a: ["2", "4", "8"], correct: 1 },
      { q: "“Masarap!” means…", a: ["Too hot", "Delicious!", "All done"], correct: 1 },
      { q: "What should you ALWAYS have nearby when cooking on the stove?", a: ["An adult", "A toy", "A phone"], correct: 0 },
      { q: "Champorado is made with rice and…", a: ["cheese", "chocolate", "chicken"], correct: 1 },
    ],
    reflect: ["What job did you do in the kitchen?", "How did the champorado taste? Draw a face! 😋"],
  },
  {
    id: "a8",
    emoji: "🍚",
    title: "Rice: The Heart of Every Meal",
    region: "Food & Kitchen",
    subtitle: "Discover why rice is on every Filipino table, and measure it like a real cook using simple ratios.",
    value: "Gratitude",
    badge: "kitchen-helper",
    stamp: { emoji: "🍚", name: "Rice Bowl" },
    xp: 150,
    sections: [
      { icon: "🌾", subject: "Story: A Bowl of Rice", html:
        `<p>At almost every Filipino meal, there is one faithful friend on the plate — <b>kanin</b> (rice)! 🍚 Breakfast, lunch, dinner… rice is the heart of the table.</p>
         <p>Let's learn where it comes from and how to <b>measure</b> it just right.</p>` },
      { icon: "🌱", subject: "From Field to Bowl", html:
        `<div class="wordbank">
           <div class="word">🌱 A tiny <b>seed</b> is planted in a wet field (a paddy)</div>
           <div class="word">🌾 It grows into golden <b>rice stalks</b></div>
           <div class="word">👐 Farmers <b>harvest</b> and dry the grains</div>
           <div class="word">🍚 We cook it into warm, fluffy rice</div>
         </div>` },
      { icon: "➗", subject: "Math: The 1:2 Ratio", html:
        `<p>Cooks use a <b>ratio</b> to cook rice: <b>1 cup rice : 2 cups water</b>.</p>
         <ul><li>2 cups rice needs how much water? <b>(2 × 2 = 4 cups!)</b></li>
         <li>3 cups rice? <b>(3 × 2 = 6 cups!)</b></li></ul>
         <div class="tryit">🥣 Measure 1 cup of rice, then 2 cups of water. Feel the ratio!</div>` },
      { icon: "🗣️", subject: "Tagalog & Hiligaynon", html:
        `<div class="wordbank">
           <div class="word"><b>Kanin</b> (Tag.) / <b>Kan-on</b> (Hil.) — cooked rice</div>
           <div class="word"><b>Bigas</b> (Tag.) / <b>Bugas</b> (Hil.) — uncooked rice</div>
           <div class="word"><b>Palay</b> — rice still in the field</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Joseph stores grain in Egypt (Genesis 41).</b> God warned Joseph that 7 hungry years were coming. Wisely, Joseph saved grain during the good years, so many people had food when the famine came.</p>
         <div class="callout faith">💜 Joseph's wisdom saved lives. Being thankful and wise with our food honors God.</div>` },
      { icon: "📖", subject: "English — Reading a Recipe", html:
        `<div class="tryit">📋 Recipes use order words. Read aloud: "<b>First</b> rinse the rice. <b>Next</b> add water. <b>Then</b> cook. <b>Finally</b> serve!"</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>What is your favorite meal to eat with rice?</li>
         <li>Who grows and cooks our food? How can we thank them?</li></ul>` },
      { icon: "🤝", subject: "Character: Gratitude", value: true, html:
        `<div class="callout char">🌟 <b>Gratitude</b> means a thankful heart. Before your next meal, say one thing you're thankful for. 🙏</div>` },
    ],
    quiz: [
      { q: "The rice-cooking ratio is 1 cup rice to how many cups water?", a: ["1", "2", "5"], correct: 1 },
      { q: "If you cook 3 cups of rice, how much water do you need?", a: ["6 cups", "3 cups", "9 cups"], correct: 0 },
      { q: "Joseph was wise to ______ grain before the famine.", a: ["throw away", "store", "burn"], correct: 1 },
      { q: "“Kanin” means…", a: ["cooked rice", "water", "fish"], correct: 0 },
    ],
    reflect: ["What are you thankful for at mealtime?", "What new rice word did you learn?"],
  },
  {
    id: "a9",
    emoji: "🛒",
    title: "Market Day: Shopping & Money Math",
    region: "Food & Kitchen",
    subtitle: "Visit a busy Filipino market, make a shopping list, and practice money and making change.",
    value: "Stewardship",
    badge: "kitchen-helper",
    stamp: { emoji: "🛒", name: "Market Day" },
    xp: 150,
    sections: [
      { icon: "🏪", subject: "Story: The Palengke", html:
        `<p>Welcome to the <b>palengke</b> (wet market)! 🛒 Stalls overflow with fish, fruit, and vegetables. Vendors call out, "<b>Bili na kayo!</b>" (Come buy!). The money here is the Philippine <b>peso</b> (₱).</p>` },
      { icon: "📝", subject: "Our Shopping List", html:
        `<p>Smart shoppers bring a <b>list</b>. Here's ours:</p>
         <div class="wordbank">
           <div class="word">🐟 Isda (fish) — ₱50</div>
           <div class="word">🍅 Kamatis (tomato) — ₱20</div>
           <div class="word">🧅 Sibuyas (onion) — ₱30</div>
         </div>` },
      { icon: "💰", subject: "Math: Money & Change", html:
        `<p>Add it up: ₱50 + ₱20 + ₱30 = <b>₱100</b>.</p>
         <ul><li>You pay with a ₱100 bill — your change is <b>₱0</b> (exact!).</li>
         <li>If it cost ₱80 and you pay ₱100, your change is <b>₱20</b> (100 − 80).</li></ul>
         <div class="tryit">🪙 Play store at home! Use paper coins to make change.</div>` },
      { icon: "🗣️", subject: "Market Words", html:
        `<div class="wordbank">
           <div class="word"><b>Magkano?</b> — How much?</div>
           <div class="word"><b>Mura</b> — Cheap · <b>Mahal</b> — Expensive</div>
           <div class="word"><b>Salamat po</b> — Thank you (polite)</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Honesty in our dealings (Proverbs 11:1).</b> The Bible says honest scales please God. At the market, honest buying and selling — giving the right amount and the right change — is a way to do what is right.</p>
         <div class="callout faith">💜 God cares about honesty, even in small things like counting change.</div>` },
      { icon: "📖", subject: "English — Writing a List", html:
        `<div class="tryit">✏️ Write a 3-item shopping list for a meal you love. Neat handwriting, one item per line!</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>How can we be wise with the money God gives our family?</li>
         <li>What's the difference between something we <b>need</b> and something we <b>want</b>?</li></ul>` },
      { icon: "🤝", subject: "Character: Stewardship", value: true, html:
        `<div class="callout char">🌟 <b>Stewardship</b> means taking good care of what we're given. Help put away groceries or save a coin in a jar today. 🫙</div>` },
    ],
    quiz: [
      { q: "The Filipino money is called the…", a: ["peso", "dollar", "yen"], correct: 0 },
      { q: "Items cost ₱80 and you pay ₱100. Your change is…", a: ["₱20", "₱80", "₱10"], correct: 0 },
      { q: "“Magkano?” means…", a: ["How much?", "Goodbye", "Where?"], correct: 0 },
      { q: "The Bible says honest ______ please God.", a: ["scales", "boats", "songs"], correct: 0 },
    ],
    reflect: ["What is one thing we NEED vs one thing we WANT?", "How were you honest today?"],
  },
  {
    id: "a10",
    emoji: "🥭",
    title: "Fruits of the Philippines",
    region: "Food & Kitchen",
    subtitle: "Taste sweet mango, banana, and buko — and practice sharing them equally with division.",
    value: "Sharing",
    badge: "kitchen-helper",
    stamp: { emoji: "🥭", name: "Fruit Basket" },
    xp: 150,
    sections: [
      { icon: "🧺", subject: "Story: A Basket of Sunshine", html:
        `<p>The Philippines is warm and sunny — perfect for <b>tropical fruit</b>! 🥭🍌🥥 A basket might hold golden mangoes, sweet bananas, and cool <b>buko</b> (young coconut).</p>` },
      { icon: "🍎", subject: "Fruit Friends", html:
        `<div class="wordbank">
           <div class="word">🥭 <b>Mangga</b> — mango (sweet & golden)</div>
           <div class="word">🍌 <b>Saging</b> — banana</div>
           <div class="word">🥥 <b>Buko</b> — young coconut (with juice!)</div>
           <div class="word">🍍 <b>Pinya</b> — pineapple</div>
         </div>` },
      { icon: "➗", subject: "Math: Sharing Equally (Division)", html:
        `<p><b>Sharing is dividing!</b></p>
         <ul><li>1 mango cut into 8 slices, shared by 4 kids = <b>2 slices each</b> (8 ÷ 4).</li>
         <li>6 bananas shared by 3 people = <b>2 each</b> (6 ÷ 3).</li></ul>
         <div class="tryit">🍌 Share a real snack equally at home — count each person's fair share!</div>` },
      { icon: "🗣️", subject: "Describe the Taste", html:
        `<div class="wordbank">
           <div class="word"><b>Matamis</b> — sweet</div>
           <div class="word"><b>Maasim</b> — sour</div>
           <div class="word"><b>Malutong / Malambot</b> — crunchy / soft</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>The Fruit of the Spirit (Galatians 5).</b> Just as a mango tree grows sweet fruit, God's Spirit grows good "fruit" in us: <b>love, joy, peace, patience, kindness</b>, and more.</p>
         <div class="callout faith">💜 What good fruit can grow in your heart today? Maybe kindness or patience!</div>` },
      { icon: "📖", subject: "English — Describing Words", html:
        `<div class="tryit">✏️ Finish the sentence out loud: "The mango tastes ______ and feels ______." (sweet, juicy, soft…)</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>What's your favorite fruit, and who would you share it with?</li>
         <li>Which "fruit of the Spirit" does our family want to grow more of?</li></ul>` },
      { icon: "🤝", subject: "Character: Sharing", value: true, html:
        `<div class="callout char">🌟 <b>Sharing</b> means giving others a fair and happy portion. Share a snack or a toy with someone today. 🤗</div>` },
    ],
    quiz: [
      { q: "8 mango slices shared equally by 4 kids = ?", a: ["2 each", "4 each", "8 each"], correct: 0 },
      { q: "“Matamis” means…", a: ["sweet", "sour", "spicy"], correct: 0 },
      { q: "“Buko” is a young…", a: ["coconut", "banana", "mango"], correct: 0 },
      { q: "Which is a Fruit of the Spirit?", a: ["Kindness", "Grumpiness", "Selfishness"], correct: 0 },
    ],
    reflect: ["Who did you share with today?", "Which fruit of the Spirit will you grow?"],
  },
  {
    id: "a11",
    emoji: "🍢",
    title: "Merienda Time: Filipino Snacks",
    region: "Food & Kitchen",
    subtitle: "Make a simple afternoon snack together and double the recipe with kitchen math.",
    value: "Joy",
    badge: "kitchen-helper",
    stamp: { emoji: "🍢", name: "Merienda" },
    xp: 150,
    sections: [
      { icon: "🕒", subject: "Story: Afternoon Treat", html:
        `<p>Between lunch and dinner comes a happy little tradition — <b>merienda</b>! 🍢 It's a light snack shared with family and friends, often with a warm drink.</p>` },
      { icon: "🍡", subject: "Merienda Favorites", html:
        `<div class="wordbank">
           <div class="word">🍌 <b>Banana cue</b> — fried caramelized banana on a stick</div>
           <div class="word">🍮 <b>Puto</b> — soft steamed rice cake</div>
           <div class="word">🥪 Simple: banana + peanut butter!</div>
         </div>
         <div class="tryit">🍴 With a grown-up, prepare one easy snack together.</div>` },
      { icon: "✖️", subject: "Math: Double the Recipe", html:
        `<p><b>Doubling</b> means ×2. If a snack needs 2 bananas and 1 spoon of sugar…</p>
         <ul><li>For double: <b>4 bananas</b> (2 × 2) and <b>2 spoons</b> of sugar!</li>
         <li>3 sticks doubled = <b>6 sticks</b>.</li></ul>` },
      { icon: "🗣️", subject: "Snack Words", html:
        `<div class="wordbank">
           <div class="word"><b>Masarap!</b> — Delicious!</div>
           <div class="word"><b>Gutom</b> — Hungry · <b>Busog</b> — Full</div>
           <div class="word"><b>Kain tayo!</b> — Let's eat!</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Sharing generously (Acts 2:46).</b> The early believers shared meals "with glad and generous hearts." Food tastes even better when it's shared with joy!</p>
         <div class="callout faith">💜 A shared snack with a happy heart is a little picture of God's family.</div>` },
      { icon: "📖", subject: "English — Describe Your Snack", html:
        `<div class="tryit">🎤 Tell someone about your snack: "I made ______. It tastes ______ and I shared it with ______."</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>Who could we invite to share merienda this week?</li>
         <li>What makes eating together joyful?</li></ul>` },
      { icon: "🤝", subject: "Character: Joy", value: true, html:
        `<div class="callout char">🌟 <b>Joy</b> is happiness that comes from the heart. Share your snack with a big smile and a "Kain tayo!" 😄</div>` },
    ],
    quiz: [
      { q: "Merienda is a Filipino…", a: ["afternoon snack", "bedtime", "chore"], correct: 0 },
      { q: "To DOUBLE 3 sticks of banana cue, you make…", a: ["6", "3", "9"], correct: 0 },
      { q: "“Masarap!” means…", a: ["Delicious!", "I'm sleepy", "Goodbye"], correct: 0 },
      { q: "The early believers shared meals with glad and generous…", a: ["hearts", "boats", "coins"], correct: 0 },
    ],
    reflect: ["Who did you share merienda with?", "What made today joyful?"],
  },
  {
    id: "a12",
    emoji: "📖",
    title: "Our Family Cookbook Begins",
    region: "Food & Kitchen",
    subtitle: "Write your very first recipe into the Family Cookbook — clear steps a friend could follow.",
    value: "Creativity",
    badge: "kitchen-helper",
    stamp: { emoji: "📖", name: "Our Cookbook" },
    xp: 155,
    sections: [
      { icon: "📖", subject: "Story: A Book of Family Flavors", html:
        `<p>Every family has special foods. Today we start our very own <b>Family Cookbook</b> — a treasure book of recipes we can keep forever! 📖✨</p>` },
      { icon: "🧾", subject: "Parts of a Recipe", html:
        `<div class="wordbank">
           <div class="word">📛 <b>Name</b> — what the dish is called</div>
           <div class="word">🧺 <b>Ingredients</b> — what you need (with amounts)</div>
           <div class="word">🔢 <b>Steps</b> — what to do, in order</div>
           <div class="word">🍽️ <b>Serve</b> — how to enjoy it</div>
         </div>` },
      { icon: "📏", subject: "Math: Measurement Review", html:
        `<p>Recipes use amounts! Match them up:</p>
         <ul><li>A big spoon = a <b>tablespoon</b> (tbsp). A little spoon = a <b>teaspoon</b> (tsp).</li>
         <li>Remember our ratio? Rice is <b>1 : 2</b> with water!</li></ul>
         <div class="tryit">📐 Line up ¼, ½, and 1 cup. Which is biggest?</div>` },
      { icon: "✍️", subject: "English — Writing Clear Steps", html:
        `<p>Good steps use <b>order words</b>: First, Next, Then, Finally.</p>
         <div class="tryit">✏️ Write a recipe for something easy (like a sandwich) using First / Next / Then / Finally.</div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Gratitude for daily bread (Matthew 6:11).</b> Jesus taught us to pray, "Give us this day our daily bread." Every meal — and every recipe — is a gift to be thankful for.</p>
         <div class="callout faith">💜 As we write our cookbook, we remember to thank God for our daily food.</div>` },
      { icon: "🎨", subject: "Make It Yours", html:
        `<div class="tryit">🖍️ Decorate your recipe page! Draw the finished dish and add a family star-rating: ⭐⭐⭐⭐⭐</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>Which family recipe should go in our cookbook first?</li>
         <li>Who taught us this recipe? Let's honor them on the page.</li></ul>` },
      { icon: "🤝", subject: "Character: Creativity", value: true, html:
        `<div class="callout char">🌟 <b>Creativity</b> means making something new and wonderful. Invent a fun name for your family's first recipe! 🎨</div>` },
    ],
    quiz: [
      { q: "Which part of a recipe lists what you need?", a: ["Ingredients", "The name", "The rating"], correct: 0 },
      { q: "Good recipe steps use order words like…", a: ["First, Next, Then", "maybe, sort of", "the, a, an"], correct: 0 },
      { q: "A big spoon measure is a…", a: ["tablespoon", "teaspoon", "cup"], correct: 0 },
      { q: "“Give us this day our daily ______.”", a: ["bread", "gold", "boat"], correct: 0 },
    ],
    reflect: ["What recipe will you add first?", "Who will you thank for teaching it?"],
  },
  {
    id: "a13",
    emoji: "🤝",
    title: "Bayanihan: The Spirit of Helping Together",
    region: "Filipino Values",
    subtitle: "Discover the beautiful Filipino value of neighbors helping neighbors.",
    value: "Helping Others",
    badge: "kind-heart",
    stamp: { emoji: "🏠", name: "Barangay" },
    xp: 130,
    sections: [
      { icon: "🇵🇭", subject: "Filipino Culture", html:
        `<p><b>Bayanihan</b> (bah-yah-NEE-han) is a famous Filipino tradition. Long ago, when a family moved, neighbors would literally <b>lift the whole bamboo house</b> and carry it to a new spot — all together! 🏠</p>
         <p>Today, Bayanihan means <b>the whole community helping one another</b> with a joyful heart. A neighborhood is called a <b>barangay</b>.</p>` },
      { icon: "🇵🇭", subject: "Filipino Family Values", html:
        `<ul><li><b>Respect for elders</b> — children do "<b>po</b>" and "<b>opo</b>" (polite words) and do "<b>mano</b>" (gently touching an elder's hand to their forehead).</li>
         <li><b>Hospitality</b> — guests are always welcomed and fed.</li>
         <li><b>Close family</b> — grandparents, aunts, uncles, and cousins are all very important.</li></ul>` },
      { icon: "🗣️", subject: "Tagalog", html:
        `<div class="wordbank">
           <div class="word"><b>Po / Opo</b> — polite "yes/respect"</div>
           <div class="word"><b>Salamat po</b> — Thank you (polite)</div>
           <div class="word"><b>Tulong</b> — Help</div>
           <div class="word"><b>Kaibigan</b> — Friend</div>
         </div>` },
      { icon: "➕", subject: "Mathematics", html:
        `<p><b>Teamwork word problem:</b> It takes 1 person 12 minutes to carry all the chairs. If <b>4 people</b> help equally, how long does it take? <b>(12 ÷ 4 = 3 minutes!)</b> Bayanihan makes work faster!</p>` },
      { icon: "📖", subject: "English", html:
        `<div class="tryit">✍️ <b>Creative writing:</b> Write 2 sentences about a time someone helped you, or you helped someone.</div>` },
      { icon: "🎵", subject: "Music", html:
        `<p><b>"Bahay Kubo"</b> is a classic Filipino folk song about a little bamboo house and all the vegetables growing around it. It names many veggies in Tagalog!</p>
         <div class="tryit">🎶 Try humming it and sway together — movement helps us remember songs.</div>` },
      { icon: "🔬", subject: "Science", html:
        `<p>A traditional <b>bahay kubo</b> is built from <b>bamboo</b> and <b>nipa palm leaves</b>. These natural materials are light, strong, and keep the house cool in hot weather. That's smart design from nature! 🌿</p>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>The Good Samaritan (Luke 10)</b> — Jesus told about a traveler who was hurt on the road. A kind stranger stopped to help him, bandaged him, and cared for him. Jesus said: "<b>Go and do likewise.</b>"</p>
         <div class="callout faith">💜 Bayanihan and the Good Samaritan teach the same thing: love your neighbor by helping.</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>Who is a "neighbor" we could help this week?</li>
         <li>How does it feel when someone helps you?</li></ul>` },
      { icon: "🤝", subject: "Character: Helping Others", value: true, html:
        `<div class="callout char">🌟 <b>Family Bayanihan Challenge:</b> Pick ONE chore and do it <b>all together</b> as a team today. Notice how much faster and more fun it is!</div>` },
    ],
    quiz: [
      { q: "What does “Bayanihan” mean?", a: ["A kind of food", "Community helping together", "A mountain"], correct: 1 },
      { q: "If 4 people share a 12-minute job equally, each part takes…", a: ["3 minutes", "4 minutes", "8 minutes"], correct: 0 },
      { q: "Which polite words show respect to elders?", a: ["Po and Opo", "Oo and Hindi", "Isa and Dalawa"], correct: 0 },
      { q: "The Good Samaritan story teaches us to…", a: ["walk away", "help our neighbor", "stay quiet"], correct: 1 },
    ],
    reflect: ["Who will you help this week?", "What did Bayanihan teach you about our family?"],
  },
  {
    id: "a14",
    emoji: "🙏",
    title: "Respect for Elders: Po, Opo & Mano",
    region: "Family & Values",
    subtitle: "Learn the gentle Filipino ways of honoring elders — “po,” “opo,” and the mano blessing.",
    value: "Respect",
    badge: "kind-heart",
    stamp: { emoji: "🙏", name: "Mano Po" },
    xp: 150,
    sections: [
      { icon: "👵", subject: "Story: A Gentle Greeting", html:
        `<p>In Filipino homes, children have beautiful ways to honor <b>lolo</b> (grandpa) and <b>lola</b> (grandma). One is the <b>mano</b> — gently taking an elder's hand and touching it to your forehead to receive a blessing. 🙏</p>` },
      { icon: "🗣️", subject: "Polite Words: Po & Opo", html:
        `<div class="wordbank">
           <div class="word"><b>Po</b> — a polite word added to show respect</div>
           <div class="word"><b>Opo</b> — a respectful "yes"</div>
           <div class="word"><b>Salamat po</b> — thank you (politely)</div>
           <div class="word"><b>Mano po</b> — asking for an elder's blessing</div>
         </div>
         <div class="tryit">🙌 Practice: answer a grown-up with a warm "<b>Opo!</b>"</div>` },
      { icon: "👨‍👩‍👧", subject: "Words for Elders", html:
        `<div class="wordbank">
           <div class="word"><b>Lolo</b> — grandfather · <b>Lola</b> — grandmother</div>
           <div class="word"><b>Tito</b> — uncle · <b>Tita</b> — aunt</div>
           <div class="word"><b>Ate</b> — older sister · <b>Kuya</b> — older brother</div>
         </div>` },
      { icon: "🔢", subject: "Math: Older & Younger", html:
        `<p><b>Age & time!</b> If Lola is 60 and you are 8…</p>
         <ul><li>How many years older is Lola? <b>(60 − 8 = 52 years!)</b></li>
         <li>Put the family in order from youngest to oldest.</li></ul>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Honor your father and mother (Exodus 20:12).</b> One of God's Ten Commandments tells us to honor our parents — and it comes with a promise of blessing! Respecting our elders pleases God.</p>
         <div class="callout faith">💜 Honoring the people who care for us is one of the kindest things we can do.</div>` },
      { icon: "📖", subject: "English — Polite Manners", html:
        `<div class="tryit">✏️ Say it kindly: "May I ______, po?" and "Thank you, po." Manners are magic words!</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>How does our family show respect to Grandma and elders?</li>
         <li>What is one polite word we can use more this week?</li></ul>` },
      { icon: "🤝", subject: "Character: Respect", value: true, html:
        `<div class="callout char">🌟 <b>Respect</b> means honoring others with our words and actions. Do the <b>mano</b> or say "po/opo" to an elder today. 🙏</div>` },
    ],
    quiz: [
      { q: "The “mano” is a way to receive an elder's…", a: ["blessing", "homework", "snack"], correct: 0 },
      { q: "A polite, respectful “yes” is…", a: ["opo", "sige", "hindi"], correct: 0 },
      { q: "If Lola is 60 and you are 8, she is how many years older?", a: ["52", "68", "8"], correct: 0 },
      { q: "God's commandment says to ______ your father and mother.", a: ["honor", "ignore", "race"], correct: 0 },
    ],
    reflect: ["How did you show respect to an elder today?", "Which polite word will you use more?"],
  },
  {
    id: "a15",
    emoji: "🏡",
    title: "Filipino Hospitality: Welcoming Guests",
    region: "Family & Values",
    subtitle: "Discover the warm Filipino heart for guests — where visitors are welcomed like family.",
    value: "Hospitality",
    badge: "kind-heart",
    stamp: { emoji: "🏡", name: "Welcome Home" },
    xp: 150,
    sections: [
      { icon: "🚪", subject: "Story: Tuloy Po Kayo!", html:
        `<p>Knock, knock! When a guest arrives at a Filipino home, they hear the warmest words: "<b>Tuloy po kayo!</b>" (Please come in!). Guests are treated like family — offered a seat, a drink, and always food. 🍽️</p>` },
      { icon: "🤗", subject: "The Filipino Welcome", html:
        `<div class="wordbank">
           <div class="word">😊 A warm smile & "Tuloy po kayo!"</div>
           <div class="word">🪑 The best seat for the guest</div>
           <div class="word">🍚 Food is always shared — "Kain tayo!"</div>
           <div class="word">💛 "Pakumbaba" — humble, giving hearts</div>
         </div>` },
      { icon: "🔢", subject: "Math: Setting the Table (Arrays)", html:
        `<p>Setting places is an <b>array</b> — rows and columns!</p>
         <ul><li>4 guests each need 1 plate + 1 spoon + 1 fork = <b>4 × 3 = 12 items</b>.</li>
         <li>2 rows of 3 chairs = <b>6 chairs</b>.</li></ul>
         <div class="tryit">🍽️ Help set the table tonight — count each person's set!</div>` },
      { icon: "🗣️", subject: "Welcoming Phrases", html:
        `<div class="wordbank">
           <div class="word"><b>Tuloy po kayo</b> — Please come in</div>
           <div class="word"><b>Kumain na po kayo</b> — Please eat</div>
           <div class="word"><b>Salamat sa pagbisita</b> — Thanks for visiting</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Abraham welcomes three visitors (Genesis 18).</b> Abraham saw three travelers and hurried to welcome them — offering water, rest, and a good meal. His kindness to strangers became a blessing to his whole family.</p>
         <div class="callout faith">💜 The Bible says to welcome others warmly — sometimes we welcome angels without knowing it!</div>` },
      { icon: "📖", subject: "English — Inviting Words", html:
        `<div class="tryit">🎤 Practice a friendly invitation: "Welcome! Please come in and sit down. Would you like something to eat?"</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>How can our family make a guest feel welcome this week?</li>
         <li>Who could we invite over or reach out to?</li></ul>` },
      { icon: "🤝", subject: "Character: Hospitality", value: true, html:
        `<div class="callout char">🌟 <b>Hospitality</b> means welcoming others with an open, generous heart. Help prepare a warm welcome for a guest today. 🏡</div>` },
    ],
    quiz: [
      { q: "“Tuloy po kayo!” means…", a: ["Please come in!", "Goodbye!", "Be quiet!"], correct: 0 },
      { q: "4 guests each needing 3 items is how many items?", a: ["12", "7", "4"], correct: 0 },
      { q: "Abraham welcomed three ______ with food and rest.", a: ["visitors", "sheep", "boats"], correct: 0 },
      { q: "Hospitality means welcoming others with a ______ heart.", a: ["generous", "grumpy", "closed"], correct: 0 },
    ],
    reflect: ["How will you welcome a guest this week?", "When did someone make you feel welcome?"],
  },
  {
    id: "a16",
    emoji: "🌳",
    title: "Our Family Tree & Kinship Words",
    region: "Family & Values",
    subtitle: "Build your family tree and learn the Filipino words that connect every generation.",
    value: "Family",
    badge: "kind-heart",
    stamp: { emoji: "🌳", name: "Family Tree" },
    xp: 150,
    sections: [
      { icon: "🌳", subject: "Story: Roots and Branches", html:
        `<p>A family is like a strong tree. 🌳 <b>Grandparents</b> are the deep roots, <b>parents</b> are the trunk, and <b>children</b> are the growing branches. Every person has a special place!</p>` },
      { icon: "👨‍👩‍👧‍👦", subject: "Family Words (Filipino)", html:
        `<div class="wordbank">
           <div class="word"><b>Pamilya</b> — family</div>
           <div class="word"><b>Nanay / Inay</b> — mother · <b>Tatay / Itay</b> — father</div>
           <div class="word"><b>Kapatid</b> — sibling · <b>Pinsan</b> — cousin</div>
           <div class="word"><b>Lolo / Lola</b> — grandparents</div>
         </div>` },
      { icon: "🔢", subject: "Math: Generations & Diagrams", html:
        `<p>A family tree is a <b>diagram</b> with levels called <b>generations</b>.</p>
         <ul><li>Grandparents = generation 1. Parents = generation 2. You = generation 3!</li>
         <li>If 2 grandparents had 3 children, draw the branches — how many in generation 2?</li></ul>
         <div class="tryit">✏️ Draw your own family tree with names and little pictures.</div>` },
      { icon: "🗣️", subject: "Ate, Kuya & More", html:
        `<div class="wordbank">
           <div class="word"><b>Ate</b> — older sister · <b>Kuya</b> — older brother</div>
           <div class="word"><b>Bunso</b> — youngest child</div>
           <div class="word"><b>Angkan</b> — clan / whole family line</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Ruth's loyalty to family (Ruth 1).</b> When hard times came, Ruth stayed lovingly by her mother-in-law Naomi, saying, "Where you go, I will go." Her faithful love blessed her whole family for generations.</p>
         <div class="callout faith">💜 Loving loyalty holds a family together, just like Ruth's did.</div>` },
      { icon: "📖", subject: "English — Family Vocabulary", html:
        `<div class="tryit">✏️ Finish the sentences: "My mother is my ______. My grandfather is my ______." Use the Filipino words too!</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>Who is in our family tree, and what do we love about each one?</li>
         <li>What family story should we remember and pass on?</li></ul>` },
      { icon: "🤝", subject: "Character: Family Love", value: true, html:
        `<div class="callout char">🌟 <b>Family</b> is a gift from God. Tell one family member today, "I'm thankful you're in our family!" 💛</div>` },
    ],
    quiz: [
      { q: "“Kapatid” means…", a: ["sibling", "cousin", "grandma"], correct: 0 },
      { q: "In a family tree, grandparents are which generation?", a: ["the first", "the last", "none"], correct: 0 },
      { q: "Ruth showed loyal love by staying with…", a: ["Naomi", "a king", "a merchant"], correct: 0 },
      { q: "“Ate” means older…", a: ["sister", "brother", "cousin"], correct: 0 },
    ],
    reflect: ["Who is someone special in your family tree?", "What family story do you want to remember?"],
  },
  {
    id: "a17",
    emoji: "💛",
    title: "Kindness in Our Community",
    region: "Family & Values",
    subtitle: "Open your eyes to the needs around you and plan a small act of kindness for a neighbor.",
    value: "Kindness",
    badge: "kind-heart",
    stamp: { emoji: "💛", name: "Kind Heart" },
    xp: 150,
    sections: [
      { icon: "🏘️", subject: "Story: A Kind Neighborhood", html:
        `<p>A <b>barangay</b> (neighborhood) is stronger when neighbors are kind. 💛 A smile, a helping hand, or sharing what we have can brighten someone's whole day!</p>` },
      { icon: "👀", subject: "Noticing Needs", html:
        `<div class="wordbank">
           <div class="word">🧹 Someone who needs help carrying or cleaning</div>
           <div class="word">🍚 Someone who could use a shared meal</div>
           <div class="word">😊 Someone who just needs a friendly hello</div>
         </div>
         <div class="tryit">👀 Look around today — who might need a little kindness?</div>` },
      { icon: "📊", subject: "Math: Tally & Graph Kindness", html:
        `<p>Let's count our kind acts with <b>tally marks</b>!</p>
         <ul><li>Each kind act = one mark: I I I I. Five marks = a bundle!</li>
         <li>At the end of the day, count them and color a little bar graph. 📊</li></ul>` },
      { icon: "🗣️", subject: "Kind Words", html:
        `<div class="wordbank">
           <div class="word"><b>Mabait</b> — kind</div>
           <div class="word"><b>Tulong</b> — help · <b>Tutulong ako</b> — I will help</div>
           <div class="word"><b>Pasensya na po</b> — I'm sorry (politely)</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Love your neighbor (Mark 12:31).</b> Jesus said the second greatest commandment is to "love your neighbor as yourself." Kindness to the people around us is a way we live out God's love.</p>
         <div class="callout faith">💜 Every kind act, no matter how small, shows God's love to our neighbors.</div>` },
      { icon: "📖", subject: "English — Writing a Sentence", html:
        `<div class="tryit">✏️ Write one full sentence: "Today I will be kind by ______." Then do it!</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>Who in our community could use some kindness right now?</li>
         <li>What is one kind act our whole family could do together?</li></ul>` },
      { icon: "🤝", subject: "Character: Kindness", value: true, html:
        `<div class="callout char">🌟 <b>Kindness</b> is love in action. Do one kind thing for a neighbor or family member today, and add a tally mark! 💛</div>` },
    ],
    quiz: [
      { q: "A “barangay” is a Filipino…", a: ["neighborhood", "boat", "fruit"], correct: 0 },
      { q: "We can count kind acts using…", a: ["tally marks", "raindrops", "songs"], correct: 0 },
      { q: "Jesus said to love your neighbor as…", a: ["yourself", "a stranger", "a king"], correct: 0 },
      { q: "“Mabait” means…", a: ["kind", "tall", "fast"], correct: 0 },
    ],
    reflect: ["What kind act did you do today?", "Who will you be kind to tomorrow?"],
  },
  {
    id: "a18",
    emoji: "🤝",
    title: "Family Act-of-Service Project",
    region: "Family & Values",
    subtitle: "Put love into action — plan and complete a hands-on service project together as a family.",
    value: "Service",
    badge: "kind-heart",
    stamp: { emoji: "🤝", name: "Helping Hands" },
    xp: 160,
    sections: [
      { icon: "🛠️", subject: "Story: Love with Our Hands", html:
        `<p>We've learned about respect, hospitality, family, and kindness. Now let's put them together into a <b>family service project</b> — love you can see and touch! 🤝</p>` },
      { icon: "💡", subject: "Choose Your Project", html:
        `<div class="wordbank">
           <div class="word">🍞 Prepare & share a meal or snack for someone</div>
           <div class="word">🧹 Clean or fix something for a neighbor or lolo/lola</div>
           <div class="word">🎁 Make cards or a care package to give away</div>
           <div class="word">🌱 Plant something or tidy a shared space</div>
         </div>
         <div class="tryit">👨‍👩‍👧‍👦 As a family, pick ONE project everyone can help with.</div>` },
      { icon: "📋", subject: "Math: Plan the Supplies", html:
        `<p>Good helpers <b>plan</b>! Make a supply list and count what you need.</p>
         <ul><li>If we make 6 cards, we need 6 sheets of paper. Do we have enough?</li>
         <li>Measure or count each supply and check it off. ✅</li></ul>` },
      { icon: "🗣️", subject: "Words for Serving", html:
        `<div class="wordbank">
           <div class="word"><b>Paglilingkod</b> — service</div>
           <div class="word"><b>Tutulong ang pamilya</b> — the family will help</div>
           <div class="word"><b>Para sa iba</b> — for others</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Jesus serves others (John 13).</b> Jesus, the greatest leader, gently washed His friends' feet to show that loving others means <b>serving</b> them. He said, "I have given you an example."</p>
         <div class="callout faith">💜 We follow Jesus' example when we serve our family and neighbors with love.</div>` },
      { icon: "📖", subject: "English — Reflection Writing", html:
        `<div class="tryit">✏️ After your project, write 2 sentences: "We served by ______. It made me feel ______."</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>How did it feel to serve someone together?</li>
         <li>What service project should we do again next month?</li></ul>` },
      { icon: "🤝", subject: "Character: Service", value: true, html:
        `<div class="callout char">🌟 <b>Service</b> is love with our hands and feet. Finish your family project with joyful hearts — you followed Jesus' example! 🤝</div>` },
    ],
    quiz: [
      { q: "A service project means doing something helpful for…", a: ["others", "only ourselves", "no one"], correct: 0 },
      { q: "Good helpers first make a ______ of supplies.", a: ["plan / list", "mess", "nap"], correct: 0 },
      { q: "Jesus washed His friends' feet to show that leaders should…", a: ["serve", "rest", "hide"], correct: 0 },
      { q: "“Paglilingkod” means…", a: ["service", "sleeping", "shopping"], correct: 0 },
    ],
    reflect: ["How did serving together feel?", "What service project should we do next?"],
  },
  {
    id: "a19",
    emoji: "🎉",
    title: "Fiesta! Festivals of the Philippines",
    region: "Culture & Celebration",
    subtitle: "Dance, drums, and color — explore joyful Philippine festivals with respect.",
    value: "Joy",
    badge: "festival-fan",
    stamp: { emoji: "🎭", name: "Kalibo" },
    xp: 140,
    sections: [
      { icon: "🎉", subject: "Filipino Culture", html:
        `<p>A <b>fiesta</b> is a festival! The Philippines is famous for colorful celebrations with dancing, drums, and costumes. We learn about them <b>respectfully</b>, as a window into Filipino history and community joy.</p>
         <ul><li><b>Ati-Atihan</b> (Kalibo, Aklan) — drums and street dancing.</li>
         <li><b>Sinulog</b> (Cebu) — a grand dance parade.</li>
         <li><b>Panagbenga</b> (Baguio) — a flower festival in the cool mountains 🌸.</li></ul>` },
      { icon: "🌍", subject: "Geography", html:
        `<p>Festivals happen all over the islands! <b>Baguio</b> (Panagbenga) is high in the mountains of Luzon, so it's cool and flowers grow well there. <b>Cebu</b> (Sinulog) is in the Visayas.</p>` },
      { icon: "➕", subject: "Mathematics", html:
        `<p><b>Graphs & counting.</b> Imagine dancers in rows: 5 rows of 4 dancers.</p>
         <ul><li>How many dancers in all? <b>(5 × 4 = 20)</b></li>
         <li>If 3 dancers rest, how many keep dancing? <b>(20 − 3 = 17)</b></li></ul>` },
      { icon: "🗣️", subject: "Tagalog", html:
        `<div class="wordbank">
           <div class="word"><b>Sayaw</b> — Dance</div>
           <div class="word"><b>Tugtog</b> — Music</div>
           <div class="word"><b>Bulaklak</b> — Flower</div>
           <div class="word"><b>Masaya</b> — Happy</div>
         </div>` },
      { icon: "🗣️", subject: "Hiligaynon", html:
        `<div class="wordbank">
           <div class="word"><b>Saut</b> — Dance</div>
           <div class="word"><b>Malipayon</b> — Happy / joyful</div>
           <div class="word"><b>Bulak</b> — Flower</div>
         </div>` },
      { icon: "🎵", subject: "Music", html:
        `<p>Festival music uses <b>drums</b> and a steady, exciting beat. In the south, the <b>kulintang</b> is a row of small gongs that make bright melodies.</p>
         <div class="tryit">🥁 <b>Rhythm:</b> Drum a beat on the table — BOOM-boom-boom, BOOM-boom-boom — and march around the room!</div>` },
      { icon: "🎨", subject: "Arts", html:
        `<div class="tryit">🎭 <b>Create:</b> Make a colorful festival mask or paper flower. Wear it for a family fiesta parade around the house!</div>` },
      { icon: "🔬", subject: "Science", html:
        `<p><b>Panagbenga</b> means "season of blooming." Flowers <b>bloom</b> when they get the right sunlight, water, and cool air. Baguio's cool mountain weather is perfect for growing them! 🌼</p>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>David Dances for Joy (2 Samuel 6)</b> — King David was so full of joy and thankfulness that he <b>danced before the Lord</b> with all his might. Celebrating with a joyful heart is a beautiful thing.</p>
         <div class="callout faith">💜 <b>Value:</b> "This is the day the Lord has made; let us rejoice and be glad in it." — Psalm 118:24</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>What is a special celebration our family loves?</li>
         <li>What makes you feel joyful?</li></ul>` },
      { icon: "🤝", subject: "Character: Joy", value: true, html:
        `<div class="callout char">🌟 <b>Joy</b> is a happiness that comes from the heart. Have a 2-minute family dance party right now! 💃🕺</div>` },
    ],
    quiz: [
      { q: "A “fiesta” is a…", a: ["festival", "food", "fish"], correct: 0 },
      { q: "5 rows of 4 dancers = how many dancers?", a: ["9", "20", "15"], correct: 1 },
      { q: "The Panagbenga festival celebrates…", a: ["boats", "flowers", "snow"], correct: 1 },
      { q: "“Masaya” means…", a: ["Happy", "Tired", "Hungry"], correct: 0 },
    ],
    reflect: ["Which festival would you love to see?", "How did our family fiesta feel?"],
  },
  {
    id: "a20",
    emoji: "🥁",
    title: "Sinulog & Ati-Atihan: Dance & Drums",
    region: "Festivals & Culture",
    subtitle: "Feel the beat of two of the Philippines' most famous festivals — dancing streets and thundering drums!",
    value: "Enthusiasm",
    badge: "festival-fan",
    stamp: { emoji: "🥁", name: "Drumbeat" },
    xp: 150,
    sections: [
      { icon: "🎶", subject: "Story: The Streets Start to Dance", html:
        `<p>BOOM… boom-boom… BOOM! In January, whole cities turn into rivers of color. In <b>Cebu</b>, it's <b>Sinulog</b>. In <b>Aklan</b>, it's <b>Ati-Atihan</b> — often called the "mother of Philippine festivals." 🥁</p>
         <p>Dancers step <i>two steps forward, one step back</i> — like the flowing of a river!</p>` },
      { icon: "🥁", subject: "Two Famous Festivals", html:
        `<div class="wordbank">
           <div class="word">🌊 <b>Sinulog (Cebu)</b> — its name comes from <i>sulog</i>, the river current; dancers move like flowing water</div>
           <div class="word">🥁 <b>Ati-Atihan (Kalibo, Aklan)</b> — street dancing and drums honoring the Ati people</div>
           <div class="word">🗓️ Both happen in <b>January</b>, in the Visayas</div>
         </div>` },
      { icon: "🔢", subject: "Math: Counting the Beat", html:
        `<p>Drummers count in <b>patterns</b>! A Sinulog step is often counted <b>1-2, 1-2-3</b>.</p>
         <ul><li>Clap this pattern 4 times. How many claps total? (5 × 4 = <b>20</b>!)</li>
         <li>If a drum plays 2 beats per second, how many beats in 10 seconds? <b>(20!)</b></li></ul>
         <div class="tryit">👏 Make your own repeating clap pattern and teach it to the family.</div>` },
      { icon: "🗣️", subject: "Festival Words", html:
        `<div class="wordbank">
           <div class="word"><b>Sayaw</b> (Tag.) / <b>Saot</b> (Hil.) — dance</div>
           <div class="word"><b>Tambol</b> — drum</div>
           <div class="word"><b>Saya</b> — joy · <b>Masaya</b> — happy</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Miriam's song of celebration (Exodus 15).</b> After God brought His people safely through the sea, Miriam took a tambourine and led the women in dancing and singing praise to God. Celebration can be a way of saying <b>thank You</b>!</p>
         <div class="callout faith">💜 Like Miriam, we can celebrate with joy and thank God with music and dance.</div>` },
      { icon: "📖", subject: "English — Reading About Festivals", html:
        `<div class="tryit">📖 Read aloud: "The dancers move to the beat of the drums." Now find the two nouns and the verb in that sentence!</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>What does our family love to celebrate together?</li>
         <li>How does music change the way a celebration feels?</li></ul>` },
      { icon: "🤝", subject: "Character: Enthusiasm", value: true, html:
        `<div class="callout char">🌟 <b>Enthusiasm</b> means joining in with your whole heart. Try today's clap pattern with your biggest smile and energy! 🥁</div>` },
    ],
    quiz: [
      { q: "Sinulog is celebrated in which city?", a: ["Cebu", "Baguio", "Davao"], correct: 0 },
      { q: "The word ‘Sinulog’ comes from ‘sulog,’ meaning…", a: ["river current", "big drum", "long dress"], correct: 0 },
      { q: "“Sayaw” means…", a: ["dance", "drum", "dinner"], correct: 0 },
      { q: "Miriam celebrated God's rescue with a…", a: ["tambourine & dancing", "nap", "race"], correct: 0 },
    ],
    reflect: ["Which beat pattern was your favorite?", "What would you thank God for with a song?"],
  },
  {
    id: "a21",
    emoji: "🌸",
    title: "Panagbenga: The Flower Festival",
    region: "Festivals & Nature",
    subtitle: "Visit cool Baguio when the whole city blooms — giant flower floats, dancing, and gardens everywhere!",
    value: "Appreciation",
    badge: "festival-fan",
    stamp: { emoji: "🌸", name: "Panagbenga" },
    xp: 150,
    sections: [
      { icon: "⛰️", subject: "Story: A City in Bloom", html:
        `<p>High in the cool mountains of <b>Baguio</b>, February brings <b>Panagbenga</b> — the Flower Festival! Its name means "<b>season of blooming</b>." Giant floats covered in thousands of real flowers parade through town. 🌸</p>` },
      { icon: "🌼", subject: "Why Baguio?", html:
        `<div class="wordbank">
           <div class="word">🌡️ Baguio is <b>cool</b> (high in the mountains) — perfect for flowers</div>
           <div class="word">🌸 Roses, sunflowers, everlastings & more grow there</div>
           <div class="word">🎉 Panagbenga also celebrates Baguio's <b>strength</b> after a hard earthquake in 1990</div>
         </div>` },
      { icon: "🔢", subject: "Math: Symmetry in Flowers", html:
        `<p>Many flowers are <b>symmetrical</b> — one half mirrors the other!</p>
         <ul><li>A flower with 8 petals folded in half shows <b>4</b> petals per side.</li>
         <li>Draw a flower, fold your paper down the middle — do the halves match?</li></ul>
         <div class="tryit">✂️ Fold paper, cut half a flower shape on the fold, open it — instant symmetry!</div>` },
      { icon: "🗣️", subject: "Flower Words", html:
        `<div class="wordbank">
           <div class="word"><b>Bulaklak</b> (Tag.) / <b>Bulak</b> (Hil.) — flower</div>
           <div class="word"><b>Halaman</b> — plant</div>
           <div class="word"><b>Maganda</b> (Tag.) / <b>Matahum</b> (Hil.) — beautiful</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Consider the lilies (Matthew 6:28–29).</b> Jesus said to look at the flowers of the field — they don't worry or work, yet God dresses them more beautifully than a king. If God cares for flowers, how much more does He care for you!</p>
         <div class="callout faith">💜 Every bloom in Panagbenga is a little reminder: God cares for His creation — and for us.</div>` },
      { icon: "📖", subject: "English — Descriptive Writing", html:
        `<div class="tryit">✏️ Describe a flower with THREE describing words: "The ______ , ______ , ______ flower." (soft, bright, tiny…)</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>What beautiful things has God put around our home?</li>
         <li>How can we show appreciation for them (and for each other)?</li></ul>` },
      { icon: "🤝", subject: "Character: Appreciation", value: true, html:
        `<div class="callout char">🌟 <b>Appreciation</b> means noticing beauty and saying thank you. Point out three beautiful things today — and one kind thing about each family member! 🌸</div>` },
    ],
    quiz: [
      { q: "Panagbenga means the season of…", a: ["blooming", "raining", "sleeping"], correct: 0 },
      { q: "Panagbenga happens in which cool mountain city?", a: ["Baguio", "Cebu", "Iloilo"], correct: 0 },
      { q: "A shape whose halves mirror each other has…", a: ["symmetry", "gravity", "electricity"], correct: 0 },
      { q: "Jesus said God dresses the ______ more beautifully than a king.", a: ["lilies (flowers)", "rocks", "clouds"], correct: 0 },
    ],
    reflect: ["What is the most beautiful flower you've seen?", "Who did you appreciate today?"],
  },
  {
    id: "a22",
    emoji: "🎵",
    title: "Filipino Music & Instruments",
    region: "Music & Culture",
    subtitle: "Meet the kulintang gongs, the rondalla strings, and the bamboo instruments that make the islands sing.",
    value: "Creativity",
    badge: "festival-fan",
    stamp: { emoji: "🎵", name: "Kulintang" },
    xp: 150,
    sections: [
      { icon: "🎶", subject: "Story: The Islands Sing", html:
        `<p>Close your eyes and listen… <b>ting-ting-TONG!</b> That's the <b>kulintang</b> — a row of small golden gongs from Mindanao, played like a melody of bells. The Philippines is full of music, from bamboo to brass! 🎵</p>` },
      { icon: "🎸", subject: "Meet the Instruments", html:
        `<div class="wordbank">
           <div class="word">🔔 <b>Kulintang</b> — a row of 8 small gongs (Mindanao)</div>
           <div class="word">🎸 <b>Rondalla</b> — a string band: bandurria, octavina, guitar</div>
           <div class="word">🎋 <b>Angklung & bamboo</b> — instruments made from bamboo</div>
           <div class="word">🥁 <b>Tambol</b> — the festival drum</div>
         </div>` },
      { icon: "🔢", subject: "Math: Rhythm is Fractions!", html:
        `<p>Music counts time in parts — just like <b>fractions</b>.</p>
         <ul><li>A whole note = 4 beats. A half note = 2 beats. A quarter note = <b>1 beat</b>.</li>
         <li>Clap this: 1 whole + 2 halves = how many beats? (4 + 2 + 2 = <b>8</b>!)</li></ul>
         <div class="tryit">👏 Clap quarter notes while someone taps half notes — you just made a rhythm pattern!</div>` },
      { icon: "🗣️", subject: "Music Words", html:
        `<div class="wordbank">
           <div class="word"><b>Musika</b> — music · <b>Awit / Kanta</b> — song</div>
           <div class="word"><b>Tugtog</b> — to play (music)</div>
           <div class="word"><b>Kanta kita!</b> (Hil.) — let's sing!</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>The Psalms — songs of praise (Psalm 150).</b> The Bible's songbook says: "Praise Him with trumpet… harp… tambourine… cymbals!" God loves when His people make music with everything they have.</p>
         <div class="callout faith">💜 Every instrument — even clapping hands — can praise God. Let everything that has breath praise the Lord!</div>` },
      { icon: "📖", subject: "English — Listening Words", html:
        `<div class="tryit">👂 Listen to any song. Is it <b>loud</b> or <b>soft</b>? <b>Fast</b> or <b>slow</b>? <b>Happy</b> or <b>gentle</b>? Use two new words to describe it.</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>What song does our family love to sing together?</li>
         <li>If we formed a family band, who would play what?</li></ul>` },
      { icon: "🤝", subject: "Character: Creativity", value: true, html:
        `<div class="callout char">🌟 <b>Creativity</b> means making something wonderful from what you have. Turn cups, spoons, and boxes into instruments and play one song together! 🎵</div>` },
    ],
    quiz: [
      { q: "The kulintang is a row of small…", a: ["gongs", "guitars", "flutes"], correct: 0 },
      { q: "A rondalla is a band of ______ instruments.", a: ["string", "electric", "invisible"], correct: 0 },
      { q: "If a whole note = 4 beats, a half note = ?", a: ["2 beats", "10 beats", "0 beats"], correct: 0 },
      { q: "Psalm 150 says to praise God with…", a: ["instruments & everything that has breath", "silence only", "grumbling"], correct: 0 },
    ],
    reflect: ["Which instrument would you love to play?", "What song will our family sing this week?"],
  },
  {
    id: "a23",
    emoji: "🎭",
    title: "Make & Move: Festival Crafts & Dance",
    region: "Crafts & Movement",
    subtitle: "Craft your own festival mask and banderitas, then learn a simple festival step — it's fiesta time at home!",
    value: "Expression",
    badge: "festival-fan",
    stamp: { emoji: "🎭", name: "Festival Maker" },
    xp: 155,
    sections: [
      { icon: "✂️", subject: "Story: Our Home Fiesta Workshop", html:
        `<p>Today OUR home becomes the festival workshop! We'll make <b>masks</b> like Ati-Atihan, string up <b>banderitas</b> (little flags), and learn a dance step. Ready, festival makers? 🎭</p>` },
      { icon: "🎨", subject: "Craft 1: Festival Mask", html:
        `<div class="wordbank">
           <div class="word">1️⃣ Cut a mask shape from cardboard</div>
           <div class="word">2️⃣ Decorate with colors, feathers, beans, or paper</div>
           <div class="word">3️⃣ Add a craft-stick handle or string</div>
         </div>` },
      { icon: "🚩", subject: "Craft 2: Banderitas", html:
        `<p>Cut small paper <b>triangles</b> and glue them along a string — instant fiesta! 🚩</p>` },
      { icon: "🔢", subject: "Math: Shapes & Measuring", html:
        `<ul><li>Banderitas are <b>triangles</b> — count the sides (3) and corners (3)!</li>
         <li>Measure your face before cutting the mask: about how many centimeters wide?</li>
         <li>If each flag is 10 cm wide and the string is 1 meter (100 cm), how many flags fit? <b>(10!)</b></li></ul>` },
      { icon: "💃", subject: "Move: A Simple Festival Step", html:
        `<div class="tryit">🥁 The Sinulog step: <b>two steps forward, one step back</b> — count "1-2, back!" Repeat with music. Now dance it as a family train! 🚂</div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Using the talents God gave us (Matthew 25).</b> Jesus told of servants trusted with talents. The faithful ones USED their gifts — and heard "Well done!" Making, building, dancing, painting — our gifts grow when we use them.</p>
         <div class="callout faith">💜 Your creativity is a gift from God. Use it with joy today!</div>` },
      { icon: "📖", subject: "English — How-To Instructions", html:
        `<div class="tryit">✏️ Teach your craft! Say the steps in order: "First cut… Next decorate… Then attach… Finally wear it!"</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>What did each of us make, and what makes it special?</li>
         <li>How does it feel to create something with your own hands?</li></ul>` },
      { icon: "🤝", subject: "Character: Expression", value: true, html:
        `<div class="callout char">🌟 <b>Expression</b> means showing your heart through what you make and how you move. Wear your mask, wave your flags, and dance YOUR way! 🎭</div>` },
    ],
    quiz: [
      { q: "Banderitas are little paper…", a: ["flags", "boats", "hats"], correct: 0 },
      { q: "A triangle has how many sides?", a: ["3", "4", "8"], correct: 0 },
      { q: "The Sinulog step is two steps forward and…", a: ["one step back", "a big jump", "a spin"], correct: 0 },
      { q: "In Jesus' story, the faithful servants ______ their talents.", a: ["used", "buried", "lost"], correct: 0 },
    ],
    reflect: ["What did you create today?", "Which talent will you use for others this week?"],
  },
  {
    id: "a24",
    emoji: "🎊",
    title: "Our Family Celebration Project",
    region: "Family & Celebration",
    subtitle: "Put it all together — plan a small family celebration with music, crafts, food, and thankful hearts.",
    value: "Togetherness",
    badge: "festival-fan",
    stamp: { emoji: "🎊", name: "Family Fiesta" },
    xp: 160,
    sections: [
      { icon: "📋", subject: "Story: Our Very Own Celebration", html:
        `<p>We've drummed like Sinulog, bloomed like Panagbenga, played like a rondalla, and crafted like festival makers. Now for the grand finale — <b>our own family celebration!</b> 🎊</p>` },
      { icon: "🗓️", subject: "Plan It Together", html:
        `<div class="wordbank">
           <div class="word">🎯 <b>What</b> are we celebrating? (Pick something thankful!)</div>
           <div class="word">🕕 <b>When?</b> Set the time</div>
           <div class="word">🎵 <b>Music</b> — who picks the songs?</div>
           <div class="word">🎨 <b>Decor</b> — hang your banderitas & wear your masks</div>
           <div class="word">🍽️ <b>Food</b> — a Cooking Academy snack, maybe?</div>
         </div>` },
      { icon: "🔢", subject: "Math: Make a Schedule", html:
        `<p>Celebrations run on <b>time</b>!</p>
         <ul><li>Snack at 4:00, dance at 4:30, story at 5:00 — how long from start to story? <b>(1 hour!)</b></li>
         <li>If each activity is 20 minutes and there are 3, that's <b>60 minutes</b> total.</li></ul>
         <div class="tryit">🕕 Write your celebration schedule with a time for each part.</div>` },
      { icon: "🗣️", subject: "Celebration Words", html:
        `<div class="wordbank">
           <div class="word"><b>Pagdiriwang</b> — celebration</div>
           <div class="word"><b>Salu-salo</b> — a shared meal / gathering</div>
           <div class="word"><b>Magsaya kita!</b> (Hil.) — let's be joyful!</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Joyful gatherings (Nehemiah 8:10, Acts 2:46).</b> God's people gathered to eat, sing, and give thanks — "the joy of the LORD is your strength." Celebrating together with grateful hearts is a gift from God.</p>
         <div class="callout faith">💜 A family that celebrates with thankfulness grows strong in joy.</div>` },
      { icon: "📖", subject: "English — Speaking & Presenting", html:
        `<div class="tryit">🎤 At the celebration, each person shares ONE sentence: "I'm thankful for ______." Speak clearly, look at your audience, and smile!</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>What was everyone's favorite moment of our celebration?</li>
         <li>What should we celebrate next — and who could we invite?</li></ul>` },
      { icon: "🤝", subject: "Character: Togetherness", value: true, html:
        `<div class="callout char">🌟 <b>Togetherness</b> means everyone belongs and everyone joins in. Make sure every family member has a part in today's celebration — no one left out! 🎊</div>` },
    ],
    quiz: [
      { q: "A good celebration plan includes what, when, music, decor, and…", a: ["food", "homework", "naps"], correct: 0 },
      { q: "Snack 4:00 → story 5:00. How much time passed?", a: ["1 hour", "5 minutes", "3 hours"], correct: 0 },
      { q: "“Salu-salo” means a…", a: ["shared meal/gathering", "loud drum", "flower float"], correct: 0 },
      { q: "Nehemiah said the ______ of the LORD is your strength.", a: ["joy", "money", "speed"], correct: 0 },
    ],
    reflect: ["What was your favorite part of our celebration?", "What are you most thankful for this month?"],
  },
  {
    id: "a25",
    emoji: "🌋",
    title: "Fire Mountains: Volcanoes of the Philippines",
    region: "Science & Earth",
    subtitle: "Explore mighty volcanoes and learn why the islands sit on the Ring of Fire.",
    value: "Wonder",
    badge: "volcano-explorer",
    stamp: { emoji: "🌋", name: "Mayon" },
    xp: 140,
    sections: [
      { icon: "🔬", subject: "Science", html:
        `<p>The Philippines sits on the "<b>Ring of Fire</b>" — a huge circle around the Pacific Ocean with many <b>volcanoes</b> and earthquakes. 🌏</p>
         <p>A volcano is a mountain with an opening where hot melted rock comes out. Melted rock <b>inside</b> is called <b>magma</b>; when it pours out it's called <b>lava</b>. 🔥</p>
         <ul><li><b>Mayon</b> (Albay) — famous for its almost <b>perfect cone</b> shape.</li>
         <li><b>Taal</b> (Batangas) — a small volcano on an island, inside a lake, on another island!</li>
         <li><b>Mount Pinatubo</b> — had a giant eruption in 1991.</li></ul>` },
      { icon: "🌍", subject: "Geography", html:
        `<p>All three of these volcanoes are on <b>Luzon</b>, the northern island group. Mayon is near the city of <b>Legazpi</b>, where people can see its beautiful cone on a clear day.</p>` },
      { icon: "➕", subject: "Mathematics", html:
        `<p>Mayon Volcano is about <b>2,462 meters</b> tall!</p>
         <ul><li>Round 2,462 to the nearest <b>hundred</b>. (2,500)</li>
         <li><b>Word problem:</b> If you climb 400 m each day, about how many days to reach 2,400 m? <b>(2,400 ÷ 400 = 6 days)</b></li></ul>` },
      { icon: "🗣️", subject: "Tagalog", html:
        `<div class="wordbank">
           <div class="word"><b>Bulkan</b> — Volcano</div>
           <div class="word"><b>Bundok</b> — Mountain</div>
           <div class="word"><b>Apoy</b> — Fire</div>
           <div class="word"><b>Bato</b> — Rock / stone</div>
         </div>` },
      { icon: "🗣️", subject: "Hiligaynon", html:
        `<div class="wordbank">
           <div class="word"><b>Bukid</b> — Mountain</div>
           <div class="word"><b>Kalayo</b> — Fire</div>
           <div class="word"><b>Bato</b> — Rock</div>
         </div>` },
      { icon: "📖", subject: "English", html:
        `<p><b>Vocabulary:</b> <i>erupt</i> — when a volcano bursts and lava comes out.</p>
         <div class="tryit">✍️ Use it in a sentence: "The volcano began to ______."</div>` },
      { icon: "🎨", subject: "Arts", html:
        `<div class="tryit">🖍️ <b>Create:</b> Draw Mayon's perfect triangle cone with a little smoke on top. Bonus: make a baking-soda-and-vinegar "eruption" with an adult! 🌋</div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Moses and the Mountain of Fire (Exodus 19)</b> — When God met His people at <b>Mount Sinai</b>, the mountain was covered in smoke and fire because God is powerful and holy. Moses listened carefully to God there.</p>
         <div class="callout faith">💜 Volcanoes remind us the earth is powerful — and its Maker is even more powerful and worthy of awe.</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>What is something in nature that fills you with <b>wonder</b>?</li>
         <li>Why is it important to stay safe and listen to warnings?</li></ul>` },
      { icon: "🤝", subject: "Character: Wonder", value: true, html:
        `<div class="callout char">🌟 <b>Wonder</b> means being amazed by the world around us. Go outside and find <b>one amazing thing</b> in nature to talk about together.</div>` },
    ],
    quiz: [
      { q: "The “Ring of Fire” is a place with many…", a: ["volcanoes & earthquakes", "rings", "campfires"], correct: 0 },
      { q: "Which volcano is famous for its perfect cone shape?", a: ["Taal", "Mayon", "Pinatubo"], correct: 1 },
      { q: "Hot melted rock that pours OUT of a volcano is called…", a: ["lava", "water", "sand"], correct: 0 },
      { q: "“Bulkan” means…", a: ["Mountain", "Fire", "Volcano"], correct: 2 },
    ],
    reflect: ["What amazed you most about volcanoes?", "Which volcano would you like to see safely from far away?"],
  },
  {
    id: "a31",
    emoji: "🦅",
    title: "Amazing Animals of the Philippines",
    region: "Science & Nature",
    subtitle: "Meet creatures found nowhere else on Earth — and learn to care for them.",
    value: "Stewardship",
    badge: "animal-friend",
    stamp: { emoji: "🦅", name: "Davao" },
    xp: 140,
    sections: [
      { icon: "🔬", subject: "Science", html:
        `<p>The Philippines has animals that are <b>endemic</b> — a fancy word meaning they live <b>only here</b> and nowhere else!</p>
         <ul><li><b>Philippine Eagle</b> 🦅 — one of the biggest eagles in the world; the <b>national bird</b>.</li>
         <li><b>Tarsier</b> 🐒 — a tiny primate with <b>huge round eyes</b>, found in Bohol.</li>
         <li><b>Carabao</b> 🐃 — a water buffalo that helps farmers; the <b>national animal</b>.</li>
         <li><b>Butanding (Whale Shark)</b> 🦈 — a gentle giant fish seen in Donsol.</li></ul>` },
      { icon: "🌿", subject: "Conservation", html:
        `<p>Some of these animals are <b>endangered</b> — that means very few are left. We can help by protecting their <b>homes (habitats)</b> and keeping nature clean.</p>` },
      { icon: "➕", subject: "Mathematics", html:
        `<p>The Philippine Eagle's wings can spread about <b>2 meters</b> wide!</p>
         <ul><li><b>Word problem:</b> If a mother eagle catches 3 meals a day, how many in 4 days? <b>(3 × 4 = 12)</b></li>
         <li><b>Graph it:</b> Count the animals in this lesson (eagle, tarsier, carabao, whale shark). How many? <b>(4)</b></li></ul>` },
      { icon: "🗣️", subject: "Tagalog", html:
        `<div class="wordbank">
           <div class="word"><b>Agila</b> — Eagle</div>
           <div class="word"><b>Kalabaw</b> — Carabao</div>
           <div class="word"><b>Ibon</b> — Bird</div>
           <div class="word"><b>Isda</b> — Fish</div>
         </div>` },
      { icon: "🗣️", subject: "Hiligaynon", html:
        `<div class="wordbank">
           <div class="word"><b>Pispis</b> — Bird</div>
           <div class="word"><b>Sapat</b> — Animal / insect</div>
           <div class="word"><b>Isda</b> — Fish</div>
         </div>` },
      { icon: "📖", subject: "English", html:
        `<p><b>Vocabulary:</b> <i>endangered</i> — when very few of an animal are left in the world.</p>
         <div class="tryit">🎤 <b>Speaking:</b> Describe your favorite animal in 3 words.</div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>God Made the Animals (Genesis 1–2)</b> — God created every bird, fish, and creature and called them good. Then He gave people the special job to <b>take care of</b> the earth and its animals (Genesis 2:15).</p>
         <div class="callout faith">💜 Caring for animals is one way we obey God and love His creation.</div>` },
      { icon: "🎨", subject: "Arts", html:
        `<div class="tryit">🖍️ <b>Create:</b> Draw the tarsier with its big round eyes, or fold a simple origami bird. 🐦</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>Which Philippine animal is your favorite and why?</li>
         <li>What is one way our family can care for animals and nature?</li></ul>` },
      { icon: "🤝", subject: "Character: Stewardship", value: true, html:
        `<div class="callout char">🌟 <b>Stewardship</b> means taking good care of what we've been given. Pick one way to care for nature this week — feed the birds, save water, or pick up litter. 🌱</div>` },
    ],
    quiz: [
      { q: "The national BIRD of the Philippines is the…", a: ["Tarsier", "Philippine Eagle", "Carabao"], correct: 1 },
      { q: "A tarsier is famous for its big round…", a: ["eyes", "ears", "feet"], correct: 0 },
      { q: "“Endemic” means an animal lives…", a: ["everywhere", "only in one place", "in the zoo"], correct: 1 },
      { q: "“Kalabaw” is the…", a: ["carabao (water buffalo)", "eagle", "fish"], correct: 0 },
    ],
    reflect: ["Which amazing animal will you remember?", "How can we be good stewards of nature?"],
  },
  {
    id: "a37",
    emoji: "🌾",
    title: "The Rice Terraces: Stairways to the Sky",
    region: "Culture & History",
    subtitle: "Climb the ancient Banaue Rice Terraces and honor the farmers who built them.",
    value: "Perseverance",
    badge: "rice-farmer",
    stamp: { emoji: "🌾", name: "Banaue" },
    xp: 140,
    sections: [
      { icon: "🌍", subject: "Geography & History", html:
        `<p>High in the mountains of <b>Ifugao</b> (Luzon) are the <b>Banaue Rice Terraces</b> — giant green steps carved into the mountainsides. 🏞️</p>
         <p>The <b>Ifugao people</b> built them <b>over 2,000 years ago</b>, by hand, and passed the knowledge from grandparents to children. Some call them the "<b>Eighth Wonder of the World</b>."</p>` },
      { icon: "🔬", subject: "Science", html:
        `<p>Terraces are like flat steps that <b>hold water and soil</b> so it doesn't wash down the mountain. This stops <b>erosion</b> (soil washing away) and lets rice grow with just the right amount of water. 💧</p>` },
      { icon: "➕", subject: "Mathematics", html:
        `<p><b>Patterns & rows.</b> A farmer plants rice in neat rows.</p>
         <ul><li>If each terrace has 8 rows and there are 5 terraces, how many rows? <b>(8 × 5 = 40)</b></li>
         <li><b>Skip count</b> the steps by 10s: 10, 20, 30, ___ ? (40!)</li></ul>` },
      { icon: "🍳", subject: "Cooking", html:
        `<p>Rice is the heart of almost every Filipino meal! To cook rice, a common ratio is <b>1 cup rice : 2 cups water</b>.</p>
         <div class="tryit">🍚 <b>Measure it:</b> If you use 2 cups of rice, how much water? <b>(4 cups — double the rice, double the water!)</b></div>` },
      { icon: "🗣️", subject: "Tagalog", html:
        `<div class="wordbank">
           <div class="word"><b>Palay</b> — Rice plant</div>
           <div class="word"><b>Bigas</b> — Uncooked rice</div>
           <div class="word"><b>Kanin</b> — Cooked rice</div>
           <div class="word"><b>Bukid</b> — Farm / field</div>
         </div>` },
      { icon: "🗣️", subject: "Hiligaynon", html:
        `<div class="wordbank">
           <div class="word"><b>Humay</b> — Rice plant</div>
           <div class="word"><b>Kan-on</b> — Cooked rice</div>
           <div class="word"><b>Uma</b> — Farm</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Ruth in the Fields (Ruth 2)</b> — Ruth worked hard gathering grain left in the fields to feed herself and Naomi. A kind farmer named Boaz noticed her hard work and was generous to her.</p>
         <div class="callout faith">💜 Like the Ifugao farmers and Ruth, hard work and kindness bring a good harvest.</div>` },
      { icon: "📖", subject: "English", html:
        `<div class="tryit">✍️ <b>Writing:</b> Finish the sentence: "Building the rice terraces took a long time because ______."</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>What is something hard our family worked on and finished together?</li>
         <li>Who grows or makes the food we eat? How can we thank them?</li></ul>` },
      { icon: "🤝", subject: "Character: Perseverance", value: true, html:
        `<div class="callout char">🌟 <b>Perseverance</b> means to keep going even when it's hard. Pick one tricky task today and finish it — one step at a time, like building a terrace. 🪜</div>` },
    ],
    quiz: [
      { q: "The Banaue Rice Terraces were built by the…", a: ["Ifugao people", "Spanish", "Americans"], correct: 0 },
      { q: "Terraces help stop…", a: ["rain", "erosion (soil washing away)", "sunshine"], correct: 1 },
      { q: "To cook rice, a common ratio is 1 cup rice to ___ cups water.", a: ["1", "2", "5"], correct: 1 },
      { q: "“Palay” means…", a: ["cooked rice", "rice plant", "water"], correct: 1 },
    ],
    reflect: ["What did the rice terraces teach you about hard work?", "What tricky task will you persevere in this week?"],
  },
  {
    id: "a43",
    emoji: "🐠",
    title: "Under the Sea: Coral Reefs & Ocean Wonders",
    region: "Science & Conservation",
    subtitle: "Dive into the Coral Triangle and help protect the ocean's rainbow of life.",
    value: "Courage",
    badge: "ocean-explorer",
    stamp: { emoji: "🐠", name: "Tubbataha" },
    xp: 140,
    sections: [
      { icon: "🔬", subject: "Science", html:
        `<p>The Philippines sits in the "<b>Coral Triangle</b>" — the part of the ocean with the <b>most kinds of sea life on Earth</b>! 🐠🐢</p>
         <p>Surprise: <b>coral reefs are actually living animals</b>, not rocks! They build colorful homes for fish. <b>Tubbataha Reef</b> is a special protected ocean park.</p>
         <p>You might meet clownfish, giant clams, and sea turtles (<b>pawikan</b>). 🐢</p>` },
      { icon: "🌿", subject: "Conservation", html:
        `<p>Our oceans need our help! <b>Plastic and trash</b> hurt sea animals — turtles can mistake plastic bags for jellyfish. We keep the sea healthy by never littering and by picking up trash. 🌊</p>` },
      { icon: "➕", subject: "Mathematics", html:
        `<ul><li><b>Word problem:</b> A school of fish has 6 rows of 5 fish. How many fish? <b>(6 × 5 = 30)</b></li>
         <li>If 4 sea turtles swim away, and 9 remain, how many were there at first? <b>(4 + 9 = 13)</b></li></ul>` },
      { icon: "🗣️", subject: "Tagalog", html:
        `<div class="wordbank">
           <div class="word"><b>Dagat</b> — Sea</div>
           <div class="word"><b>Isda</b> — Fish</div>
           <div class="word"><b>Pagong</b> — Turtle</div>
           <div class="word"><b>Tubig</b> — Water</div>
         </div>` },
      { icon: "🗣️", subject: "Hiligaynon", html:
        `<div class="wordbank">
           <div class="word"><b>Dagat</b> — Sea</div>
           <div class="word"><b>Isda</b> — Fish</div>
           <div class="word"><b>Baybayon</b> — Seashore</div>
         </div>` },
      { icon: "📖", subject: "English", html:
        `<p><b>Vocabulary:</b> <i>coral reef</i> — a colorful underwater home built by tiny sea animals.</p>
         <div class="tryit">🎤 Name 3 things you might see under the sea.</div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Jonah and the Big Fish (Jonah 1–3)</b> — Jonah tried to run away from what God asked, but a great fish swallowed him. Inside, Jonah prayed, and God gave him a <b>second chance</b>. Jonah then bravely obeyed.</p>
         <div class="callout faith">💜 God cares about the sea, the creatures, and about giving us fresh starts.</div>` },
      { icon: "🎨", subject: "Arts", html:
        `<div class="tryit">🖍️ <b>Create:</b> Draw a colorful coral reef full of fish. Use lots of bright colors! 🌈🐟</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>What sea creature would you love to meet?</li>
         <li>What is one way our family can help keep the ocean clean?</li></ul>` },
      { icon: "🤝", subject: "Character: Courage", value: true, html:
        `<div class="callout char">🌟 <b>Courage</b> means being brave to try new things and do what's right. What is one brave, kind thing you can do today? 💪</div>` },
    ],
    quiz: [
      { q: "Coral reefs are actually…", a: ["rocks", "living animals", "plants only"], correct: 1 },
      { q: "The Philippines is part of the “Coral ___”.", a: ["Triangle", "Square", "Circle"], correct: 0 },
      { q: "What hurts sea animals if it's thrown in the ocean?", a: ["plastic & trash", "sunlight", "sand"], correct: 0 },
      { q: "“Dagat” means…", a: ["Fish", "Sea", "Turtle"], correct: 1 },
    ],
    reflect: ["What ocean wonder amazed you?", "How will you help protect the sea?"],
  },
  {
    id: "a49",
    emoji: "🏛️",
    title: "Filipino Heroes & Our Story",
    region: "History & Character",
    subtitle: "Meet brave Filipino heroes and celebrate freedom, flag, and national symbols.",
    value: "Leadership",
    badge: "history-hero",
    stamp: { emoji: "🏛️", name: "Rizal Park" },
    xp: 160,
    sections: [
      { icon: "🇵🇭", subject: "History (age-appropriate)", html:
        `<p>A <b>bayani</b> (hero) is someone brave who helps others. Two famous Filipino heroes:</p>
         <ul><li><b>Dr. José Rizal</b> — a very smart and kind man who used his <b>writing and words</b> (not fighting) to help Filipinos hope for freedom. There's a big park honoring him in Manila: <b>Rizal Park (Luneta)</b>.</li>
         <li><b>Andrés Bonifacio</b> — a brave leader who worked for the country's freedom.</li></ul>
         <p><b>Independence Day</b> is celebrated every <b>June 12</b>. 🎉</p>` },
      { icon: "🎵", subject: "Music", html:
        `<p>The Philippine national anthem is "<b>Lupang Hinirang</b>" ("Chosen Land"). Filipinos stand tall, place a <b>hand over the heart</b>, and sing it with respect.</p>
         <div class="tryit">🎶 Stand up straight, hand on heart, and hum a proud, steady tune together.</div>` },
      { icon: "🇵🇭", subject: "National Symbols", html:
        `<div class="wordbank">
           <div class="word">🌸 <b>Sampaguita</b> — national flower</div>
           <div class="word">🌳 <b>Narra</b> — national tree</div>
           <div class="word">🦅 <b>Eagle</b> — national bird</div>
           <div class="word">🐃 <b>Carabao</b> — national animal</div>
         </div>` },
      { icon: "➕", subject: "Mathematics", html:
        `<p><b>Timelines & subtraction.</b> The Philippines declared independence in <b>1898</b>.</p>
         <ul><li>How many years from 1898 to 1998? <b>(1998 − 1898 = 100 years!)</b></li>
         <li>June 12 is Independence Day. If today were June 5, how many days until June 12? <b>(7 days)</b></li></ul>` },
      { icon: "🗣️", subject: "Tagalog", html:
        `<div class="wordbank">
           <div class="word"><b>Bayani</b> — Hero</div>
           <div class="word"><b>Kalayaan</b> — Freedom</div>
           <div class="word"><b>Bansa</b> — Country</div>
           <div class="word"><b>Watawat</b> — Flag</div>
         </div>` },
      { icon: "🗣️", subject: "Hiligaynon", html:
        `<div class="wordbank">
           <div class="word"><b>Bayani</b> — Hero</div>
           <div class="word"><b>Banwa</b> — Town / country</div>
           <div class="word"><b>Kahilwayan</b> — Freedom</div>
         </div>` },
      { icon: "🙏", subject: "Bible Story", faith: true, html:
        `<p><b>Brave Queen Esther (Esther)</b> — Esther was a young woman who became queen. When her people were in danger, she bravely spoke up to save them — "for such a time as this." God used her courage to help many.</p>
         <div class="callout faith">💜 Heroes like Esther show us that God can use brave, kind people to do great good.</div>` },
      { icon: "📖", subject: "English — Public Speaking", html:
        `<div class="tryit">🎤 <b>Speak up:</b> Say one full sentence out loud: "A hero I admire is ______ because ______."</div>` },
      { icon: "❤️", subject: "Family Discussion", html:
        `<ul><li>Who is a hero in our own family, and why?</li>
         <li>How can we use our words and gifts to help others, like Rizal did?</li></ul>` },
      { icon: "🤝", subject: "Character: Leadership", value: true, html:
        `<div class="callout char">🌟 <b>Leadership</b> means using your gifts to help and guide others kindly. Be a leader today by helping someone <b>before</b> they ask. 👑</div>` },
    ],
    quiz: [
      { q: "José Rizal mainly helped the Philippines by using his…", a: ["writing & words", "sword", "boat"], correct: 0 },
      { q: "Philippine Independence Day is in the month of…", a: ["January", "June", "December"], correct: 1 },
      { q: "The national FLOWER of the Philippines is the…", a: ["rose", "sampaguita", "sunflower"], correct: 1 },
      { q: "“Bayani” means…", a: ["Flag", "Freedom", "Hero"], correct: 2 },
    ],
    reflect: ["Which hero inspired you most?", "How will you be a kind leader this week?"],
  },
];

/* Simple starter recipes for the Family Cookbook view */
const COOKBOOK = [
  { emoji: "🍫", name: "Champorado", tag: "Breakfast", note: "Sweet chocolate rice porridge (Adventure 3!)" },
  { emoji: "🥭", name: "Fresh Mango Slices", tag: "Snack", note: "Sweet Visayan mangoes — great for practicing division." },
  { emoji: "🍢", name: "Banana Cue", tag: "Merienda", note: "Fried caramelized bananas on a stick (with an adult)." },
  { emoji: "🥥", name: "Buko Juice", tag: "Drink", note: "Refreshing young coconut water." },
];

/* ============================================================
   AGE-APPROPRIATE DIFFERENTIATION (see AGE_FRAMEWORK.md)
   One shared adventure, three levels. Each child does the tasks
   that fit them — big kids help the little ones. 🤝
   ============================================================ */
const LEVEL_TIERS = [
  { key: "explorer", name: "Explorer", age: "ages 7–8", emoji: "🌱", color: "#3f9d54" },
  { key: "adventurer", name: "Adventurer", age: "ages 9–10", emoji: "🌿", color: "#0e7c86" },
  { key: "trailblazer", name: "Trailblazer", age: "ages 11–12", emoji: "🔥", color: "#e5674f" },
];

const LEVEL_MISSIONS = {
  a1: {
    explorer: ["Point to the Philippines on a globe or map.", "Color the flag and count the sun's 8 rays.", "Say “Mabuhay!” and “Salamat” out loud with a smile."],
    adventurer: ["Write 2 sentences explaining what an archipelago is.", "Practice a short Tagalog greeting with a sibling.", "Find and name the 3 island groups on a map."],
    trailblazer: ["Research one fact about Manila and share it with the family.", "Write a paragraph: why is a country of 7,641 islands special?", "Teach a younger sibling the greetings you learned."],
  },
  a2: {
    explorer: ["Point north, south, east, west in the room.", "Match each island group to top / middle / bottom.", "Trace the 3 island groups on a map."],
    adventurer: ["Use the map scale to estimate the Manila–Cebu distance.", "Write the Tagalog direction words; use one in a sentence.", "List one island in each group."],
    trailblazer: ["Plan a pretend island-hopping trip across all 3 groups in order.", "Explain how the Chocolate Hills formed, in your own words.", "Compare two islands — how are they different?"],
  },
  a3: {
    explorer: ["Color a flag and count the sun's 8 rays out loud.", "Match each symbol to its name (flower, tree, bird, animal).", "Stand tall and quiet, like showing respect to the flag."],
    adventurer: ["Draw the flag and label each color's meaning.", "Solve: share the 8 rays between 2 people (8 ÷ 2).", "Write one sentence using the Tagalog word ‘watawat’."],
    trailblazer: ["Design a family flag and explain what every symbol means.", "Research why the sun has 8 rays; share it with the family.", "Explain how a rainbow (Genesis 9) is like a flag — a sign with meaning."],
  },
  a4: {
    explorer: ["Say “Kumusta?” and “Salamat” to three people.", "Count to 5 in Filipino on your fingers.", "Wave and practice a happy “Magandang umaga!”"],
    adventurer: ["Count 1–10 in Filipino out loud without peeking.", "Role-play a greeting: ask and answer “Kumusta?”", "Write the Tagalog and Hiligaynon words for ‘thank you’."],
    trailblazer: ["Teach a younger sibling to count to 10 in Filipino.", "Have a 4-line greeting conversation in Tagalog or Hiligaynon.", "Explain the Tower of Babel story and why many languages exist."],
  },
  a5: {
    explorer: ["Point North, East, South, West in the room.", "Find the star (capital) on a simple map.", "Zoom with your hands: world… Asia… Philippines!"],
    adventurer: ["Use a compass rose to name all four directions.", "Find a place using a grid box like C-2.", "Read two symbols from a map key and say what they mean."],
    trailblazer: ["Draw a map of your home with a key and a compass rose.", "Plan a route between two Philippine cities using directions.", "Retell Abraham's journey and what it means to trust God's guidance."],
  },
  a6: {
    explorer: ["Write your name on your passport.", "Sort 3 items: which go in a backpack?", "Name one thing in your ‘invisible backpack’ (kindness, courage…)."],
    adventurer: ["Make a 4-item checklist and check each box.", "Write your learning goal for the journey.", "Explain what a passport stamp means in our app."],
    trailblazer: ["Design a family ‘readiness checklist’ for adventure days.", "Write 3 goals for the whole Wonder Journey.", "Explain the wise-builder parable and how being ready helps us."],
  },
  a7: {
    explorer: ["Help pour and stir (with an adult).", "Count the ingredients out loud.", "Serve your bowl and say “Masarap!”"],
    adventurer: ["Read the recipe steps aloud in order.", "Measure the ¼ cup sugar, then double it (¼ + ¼).", "Write the recipe using First / Next / Then / Finally."],
    trailblazer: ["Lead one part of the recipe and explain each measurement.", "Double the whole recipe and list the new amounts.", "Explain “gelatinization” simply to a younger sibling."],
  },
  a8: {
    explorer: ["Measure 1 cup rice and 2 cups water.", "Say the rice words: kanin, bigas, palay.", "Help rinse the rice (with an adult)."],
    adventurer: ["Solve the water for 2 and 3 cups of rice (×2).", "Put the ‘field to bowl’ steps in order.", "Write one sentence you're thankful for at meals."],
    trailblazer: ["Cook rice using the 1:2 ratio and explain it.", "Retell how Joseph's wisdom saved many from famine.", "Plan a thankful family grace to say before dinner."],
  },
  a9: {
    explorer: ["Set up a pretend market and ‘buy’ 3 items.", "Ask “Magkano?” for each item.", "Count coins to make ₱10."],
    adventurer: ["Add a 3-item list and find the total.", "Make change from ₱100 for an ₱80 total.", "Write a neat shopping list for one meal."],
    trailblazer: ["Plan a small meal within a ₱200 budget.", "Explain need vs. want with two real examples.", "Connect honest scales (Proverbs) to fair buying and selling."],
  },
  a10: {
    explorer: ["Share 8 slices between 4 people (2 each).", "Name 3 fruits in Filipino.", "Taste a fruit and say ‘matamis’ or ‘maasim’."],
    adventurer: ["Solve two sharing (division) problems.", "Describe a fruit with 2 adjectives.", "List the Fruit of the Spirit you remember."],
    trailblazer: ["Make a division word-problem for the family.", "Explain the Fruit of the Spirit with an example.", "Plan a fair way to share a treat among everyone."],
  },
  a11: {
    explorer: ["Help make one simple snack (with an adult).", "Say ‘Kain tayo!’ and share it.", "Double 3 sticks — how many now?"],
    adventurer: ["Double a 2-ingredient snack and list amounts.", "Describe your snack in 2 sentences.", "Set the table for a joyful merienda."],
    trailblazer: ["Plan a merienda for guests and double the recipe.", "Explain how sharing meals built the early church family.", "Lead a joyful ‘thank you’ before the snack."],
  },
  a12: {
    explorer: ["Draw the finished dish for your recipe page.", "Name the 4 parts of a recipe.", "Give the recipe a fun family name."],
    adventurer: ["Write a simple recipe with First/Next/Then/Finally.", "List ingredients with their amounts.", "Add a family star-rating and one sentence."],
    trailblazer: ["Write a full family recipe others could follow.", "Interview a family member for their special dish.", "Explain ‘give us our daily bread’ in your own words."],
  },
  a13: {
    explorer: ["Act out neighbors carrying a house together.", "Practice saying “Po” and “Opo” politely.", "Draw a bahay kubo."],
    adventurer: ["Write 2 sentences about a time someone helped you.", "Solve: a 12-minute job shared by 4 people = ? minutes.", "Learn part of the song “Bahay Kubo.”"],
    trailblazer: ["Plan a family Bayanihan chore and lead the team.", "Compare Bayanihan with the Good Samaritan — what's the shared lesson?", "Write a thank-you note to someone who helps our family."],
  },
  a14: {
    explorer: ["Do the ‘mano po’ with an elder.", "Answer a grown-up with a warm ‘Opo!’", "Match: lolo, lola, tito, tita to their meanings."],
    adventurer: ["Solve an age difference (e.g., 60 − 8).", "Order the family from youngest to oldest.", "Use ‘po’ politely in three sentences."],
    trailblazer: ["Explain why the 5th commandment matters, with an example.", "Teach a younger sibling three respectful words.", "Write a short thank-you to an elder you honor."],
  },
  a15: {
    explorer: ["Help set the table for a guest.", "Practice saying ‘Tuloy po kayo!’", "Offer someone the best seat kindly."],
    adventurer: ["Use an array to count place settings (4 × 3).", "Write a friendly welcome invitation.", "Plan a snack to share with a visitor."],
    trailblazer: ["Host a mini welcome for a family member and lead it.", "Retell how Abraham welcomed his three visitors.", "Explain how hospitality blesses both guest and host."],
  },
  a16: {
    explorer: ["Draw a simple family tree with names.", "Name three Filipino family words.", "Point to yourself on the tree — which generation?"],
    adventurer: ["Label three generations on your tree.", "Write two sentences using Filipino family words.", "Ask a parent for one family story."],
    trailblazer: ["Build a 3-generation family tree with pictures.", "Interview a relative and record their story.", "Explain Ruth's loyalty and why it blessed her family."],
  },
  a17: {
    explorer: ["Do one kind act and add a tally mark.", "Say a kind word to someone.", "Draw a picture of helping a neighbor."],
    adventurer: ["Tally your kind acts and make a small bar graph.", "Write a sentence: ‘Today I will be kind by…’.", "Learn the words ‘mabait’ and ‘tutulong ako’."],
    trailblazer: ["Plan a family kindness for the barangay.", "Graph a week of kind acts and describe the pattern.", "Explain ‘love your neighbor’ with a real example."],
  },
  a18: {
    explorer: ["Help choose the family service project.", "Count the supplies you need.", "Do your part with a happy heart."],
    adventurer: ["Make a supply list and check each item.", "Write 2 reflection sentences after serving.", "Explain who your project helped and how."],
    trailblazer: ["Plan and lead the whole service project.", "Measure/budget the supplies needed.", "Explain how Jesus washing feet models servant leadership."],
  },
  a19: {
    explorer: ["Make a paper flower or a simple festival mask.", "Clap or drum a festival beat.", "Point to Baguio (the flower festival) on a map."],
    adventurer: ["Count dancers: 5 rows of 4, then subtract 3 resting.", "Write the Tagalog words for dance, music, and flower.", "Describe one festival in 2 sentences."],
    trailblazer: ["Research one Philippine festival and present 3 respectful facts.", "Design a mini family-fiesta program (the order of activities).", "Explain why Baguio's cool climate is good for growing flowers."],
  },
  a20: {
    explorer: ["Clap the 1-2, 1-2-3 Sinulog pattern.", "Say ‘sayaw’ (dance) and ‘tambol’ (drum).", "March two steps forward, one step back."],
    adventurer: ["Count total claps: a 5-clap pattern done 4 times.", "Find Cebu and Aklan on the map.", "Write one sentence about a festival."],
    trailblazer: ["Create your own repeating rhythm and teach it.", "Compare Sinulog and Ati-Atihan — same and different.", "Retell Miriam's celebration and what it teaches about praise."],
  },
  a21: {
    explorer: ["Fold-and-cut a symmetrical paper flower.", "Say ‘bulaklak’ and ‘maganda’.", "Point to Baguio (up in the mountains) on the map."],
    adventurer: ["Draw a flower and its line of symmetry.", "Describe a flower with 3 adjectives.", "Explain why cool Baguio grows good flowers."],
    trailblazer: ["Find symmetry in 3 real objects at home.", "Write a short paragraph describing Panagbenga.", "Explain ‘consider the lilies’ in your own words."],
  },
  a22: {
    explorer: ["Clap quarter notes while someone taps halves.", "Name one Filipino instrument.", "Make a shaker from a cup and beans."],
    adventurer: ["Solve the note math: 1 whole + 2 halves = ? beats.", "Sort instruments: string, drum, or gong.", "Describe a song with two new listening words."],
    trailblazer: ["Lead a family cup-and-spoon band in one song.", "Research the kulintang or rondalla; share 2 facts.", "Pick a Psalm line and set it to your own rhythm."],
  },
  a23: {
    explorer: ["Cut and decorate a festival mask.", "Count the triangles in your banderitas.", "Dance the festival step with the family."],
    adventurer: ["Measure your mask so it fits your face.", "Figure how many 10-cm flags fit a 100-cm string.", "Say your craft steps with First/Next/Then/Finally."],
    trailblazer: ["Design and lead the whole craft station.", "Plan the dance formation for the family train.", "Explain the parable of the talents with your own example."],
  },
  a24: {
    explorer: ["Help decorate for the family celebration.", "Say one ‘I'm thankful for…’ sentence out loud.", "Join every activity with a smile."],
    adventurer: ["Write the celebration schedule with times.", "Calculate the total minutes of the program.", "Introduce one part of the celebration clearly."],
    trailblazer: ["Plan and host the celebration program.", "Budget or time-box each activity and keep the schedule.", "Explain why joyful, thankful gatherings make a family strong."],
  },
  a25: {
    explorer: ["Draw Mayon's triangle cone with a little smoke.", "Say the word “bulkan.”", "Do a safe baking-soda “eruption” with an adult."],
    adventurer: ["Round Mayon's height (2,462 m) to the nearest hundred.", "Write a sentence using the word “erupt.”", "Label magma vs. lava on your drawing."],
    trailblazer: ["Research the 1991 Pinatubo eruption; share 2 facts.", "Explain why the Philippines has many volcanoes (Ring of Fire).", "Make a simple family safety plan for an eruption warning."],
  },
  a31: {
    explorer: ["Draw the tarsier's big round eyes.", "Match each animal to its name.", "Make an animal's sound and movement."],
    adventurer: ["Write which animal is your favorite and why (2 sentences).", "Solve: 3 meals a day × 4 days = ?", "Sort the animals: bird, mammal, or fish."],
    trailblazer: ["Research why the Philippine eagle is endangered; suggest 2 ways to help.", "Explain “endemic” using your own example.", "Create a short “protect our animals” poster or speech."],
  },
  a37: {
    explorer: ["Build a mini “terrace” with blocks or steps.", "Point to the mountains on a map.", "Help measure 1 cup rice : 2 cups water."],
    adventurer: ["Multiply: 8 rows × 5 terraces = ?", "Write why the terraces took so long to build.", "Use the ratio to find the water needed for 2 cups of rice."],
    trailblazer: ["Research the Ifugao people; present 2 respectful facts.", "Explain how terraces stop erosion.", "Connect Ruth's harvest to the value of hard work in a short reflection."],
  },
  a43: {
    explorer: ["Draw a colorful coral reef.", "Point to the sea on a map.", "Pick up “pretend trash” to keep the ocean clean."],
    adventurer: ["Multiply: 6 rows × 5 fish = ?", "Write 3 things you might see under the sea.", "Explain why plastic hurts sea animals."],
    trailblazer: ["Research the Coral Triangle or Tubbataha Reef; present 2 facts.", "Design a simple “save the reef” family pledge.", "Retell Jonah's lesson about second chances in your own words."],
  },
  a49: {
    explorer: ["Point to the flag and name a color.", "Match a national symbol to its picture (flower, tree, bird, animal).", "Stand tall, hand on heart, and hum the anthem."],
    adventurer: ["Write one sentence about a hero you admire.", "Subtract on a timeline: 1998 − 1898 = ? years.", "Name the national flower and the national bird."],
    trailblazer: ["Research José Rizal; present how he used words to help people.", "Explain what Independence Day means.", "Lead a family talk: how can we be brave, kind leaders like Esther?"],
  },
};
