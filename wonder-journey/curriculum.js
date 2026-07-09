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
  a13: {
    explorer: ["Act out neighbors carrying a house together.", "Practice saying “Po” and “Opo” politely.", "Draw a bahay kubo."],
    adventurer: ["Write 2 sentences about a time someone helped you.", "Solve: a 12-minute job shared by 4 people = ? minutes.", "Learn part of the song “Bahay Kubo.”"],
    trailblazer: ["Plan a family Bayanihan chore and lead the team.", "Compare Bayanihan with the Good Samaritan — what's the shared lesson?", "Write a thank-you note to someone who helps our family."],
  },
  a19: {
    explorer: ["Make a paper flower or a simple festival mask.", "Clap or drum a festival beat.", "Point to Baguio (the flower festival) on a map."],
    adventurer: ["Count dancers: 5 rows of 4, then subtract 3 resting.", "Write the Tagalog words for dance, music, and flower.", "Describe one festival in 2 sentences."],
    trailblazer: ["Research one Philippine festival and present 3 respectful facts.", "Design a mini family-fiesta program (the order of activities).", "Explain why Baguio's cool climate is good for growing flowers."],
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
