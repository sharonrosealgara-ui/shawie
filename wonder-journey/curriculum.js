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
  { name: "Wonder Master", at: 1800, emoji: "👑" },
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
        `<p>The <b>Philippines</b> is a country made of <b>7,641 islands</b> in Southeast Asia, surrounded by the sparkling Pacific Ocean and the South China Sea!</p>
         <ul><li>The three big island groups are <b>Luzon</b> (north), <b>Visayas</b> (middle), and <b>Mindanao</b> (south).</li>
         <li>The capital city is <b>Manila</b>, on the island of Luzon.</li>
         <li>People here are called <b>Filipinos</b>. 🇵🇭</li></ul>
         <div class="tryit">🔎 <b>Try it:</b> Find the Philippines on a world map or globe. Is it above or below the equator?</div>` },
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
    id: "a4",
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
    id: "a5",
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
];

/* Simple starter recipes for the Family Cookbook view */
const COOKBOOK = [
  { emoji: "🍫", name: "Champorado", tag: "Breakfast", note: "Sweet chocolate rice porridge (Adventure 3!)" },
  { emoji: "🥭", name: "Fresh Mango Slices", tag: "Snack", note: "Sweet Visayan mangoes — great for practicing division." },
  { emoji: "🍢", name: "Banana Cue", tag: "Merienda", note: "Fried caramelized bananas on a stick (with an adult)." },
  { emoji: "🥥", name: "Buko Juice", tag: "Drink", note: "Refreshing young coconut water." },
];
