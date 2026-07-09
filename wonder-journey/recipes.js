/* ============================================================
   WONDER JOURNEY OS — COOKING ACADEMY (recipe data)
   🍳 Not a recipe list — a complete educational experience.
   Each recipe is a full lesson: story · region (real map) · language
   (EN/Tagalog/Hiligaynon) · tools · safety · ingredients · steps ·
   math · science · nutrition · fun fact · per-child activities ·
   family challenge · quiz · badge · stamp · XP. On completion it
   auto-generates a Family Cookbook keepsake entry.
   Governed by REAL_MEDIA_POLICY.md, CONTENT_STYLE_GUIDE, CONSTITUTION.
   `media` values are media-manifest ids (resilient placeholders until
   real licensed photos are added). More recipes = just more data.
   ============================================================ */

// Cooking badges (merged into BADGES at load).
const COOKING_BADGES = [
  { id: "junior-chef",   emoji: "🍳", name: "Junior Chef", desc: "Cook your first Cooking Academy recipe" },
  { id: "dessert-explorer", emoji: "🥭", name: "Dessert Explorer", desc: "Make a Filipino dessert" },
  { id: "sweet-treat",   emoji: "🍮", name: "Sweet Treat Specialist", desc: "Make a classic Filipino sweet" },
  { id: "snack-maker",   emoji: "🍢", name: "Snack Maker", desc: "Make a Filipino merienda snack" },
  { id: "rice-expert",   emoji: "🍚", name: "Rice Expert", desc: "Cook a Filipino rice dish" },
  { id: "soup-maker",    emoji: "🍲", name: "Soup Maker", desc: "Cook a warm Filipino soup" },
  { id: "noodle-master", emoji: "🍜", name: "Noodle Master", desc: "Cook a Filipino noodle or pasta dish" },
  { id: "lumpia-master", emoji: "🥟", name: "Lumpia Master", desc: "Roll and cook lumpia" },
  { id: "food-explorer", emoji: "🌟", name: "Filipino Food Explorer", desc: "Cook 5 Academy recipes" },
];

const RECIPES = [
  {
    id: "mango-float", name: "Mango Graham Float", emoji: "🥭", category: "Dessert",
    difficulty: 1, time: "20 min + chill", region: "Cebu & nationwide", mapRegion: "visayas",
    media: { finished: "mango-float", ingredients: "mango" },
    badge: "dessert-explorer", stamp: { emoji: "🥭", name: "Mango Float" }, xp: 120,
    story: "Sweet golden mangoes, cool cream, and crunchy graham — layered like a treasure chest of flavor! No stove needed, just a happy team and a fridge. 🥭",
    history: "Mango float (also called 'crema de mangga') became a beloved Filipino no-bake dessert for fiestas and family gatherings — easy for kids to help make.",
    funFact: "The Philippines grows some of the sweetest mangoes in the world — the Guimaras mango is world-famous!",
    language: [
      { en: "Mango", tl: "Mangga", hil: "Mangga" },
      { en: "Milk", tl: "Gatas", hil: "Gatas" },
      { en: "Sweet", tl: "Matamis", hil: "Matam-is" },
      { en: "Cold", tl: "Malamig", hil: "Matugnaw" },
    ],
    tools: ["A rectangular dish", "Spoon & spatula", "Knife (with a grown-up)"],
    safety: "Ask a grown-up to slice the mangoes. Wash hands and fruit first.",
    ingredients: ["3 ripe mangoes (sliced)", "2 cups all-purpose cream (chilled)", "1 can condensed milk", "1 pack graham crackers"],
    steps: ["Mix the chilled cream and condensed milk until smooth.", "Lay a layer of graham crackers in the dish.", "Spread cream, then a layer of mango slices.", "Repeat the layers, ending with cream and mangoes.", "Chill for 4 hours (or overnight). Then share!"],
    math: "Layers & counting! If you make 3 layers and each uses 4 graham crackers, that's 3 × 4 = 12 crackers. Halve or double the recipe for more guests.",
    science: "Chilling makes the cream firm and the grahams soften into a cake-like texture — cold slows things down and lets the layers set.",
    nutrition: "Mangoes give vitamin C (good for staying healthy). It's a sweet treat, so we enjoy a small serving and share the rest!",
    activities: {
      Rylee: "Arrange the mango slices into a pretty flower pattern on top and photograph it.",
      Ezra: "Measure each layer precisely and note the exact amounts in a recipe journal.",
      Asa: "Observe: which softens faster — a graham left in cream or one left dry? Predict, then check.",
      Selah: "Decorate the top with a mango-slice smiley and a graham border.",
    },
    challenge: "Serve a chilled slice to a family member and say 'Masarap, di ba?' — then take a family photo for the cookbook!",
    quiz: [
      { q: "Mango float is a ______ dessert (no oven needed).", a: ["no-bake", "fried", "grilled"], correct: 0 },
      { q: "What makes the layers set and the grahams soften?", a: ["chilling in the fridge", "sunlight", "boiling"], correct: 0 },
      { q: "“Mangga” means…", a: ["mango", "milk", "spoon"], correct: 0 },
      { q: "Which island group is famous for sweet mangoes?", a: ["Visayas (Guimaras)", "the North Pole", "the desert"], correct: 0 },
    ],
  },
  {
    id: "banana-cue", name: "Banana Cue", emoji: "🍢", category: "Snack",
    difficulty: 1, time: "20 min", region: "Nationwide (street merienda)", mapRegion: "luzon",
    media: { finished: "banana-cue", ingredients: "fruits" },
    badge: "snack-maker", stamp: { emoji: "🍢", name: "Banana Cue" }, xp: 120,
    story: "Sizzle! Golden bananas roll in caramel until they shine, then hop onto a stick — the after-school merienda loved all over the Philippines. 🍌",
    history: "Banana cue ('banana' + 'barbecue') is a classic street snack made from saba bananas, sold on sticks by neighborhood vendors.",
    funFact: "Saba bananas are a cooking banana — firmer than eating bananas, perfect for frying!",
    language: [
      { en: "Banana", tl: "Saging", hil: "Saging" },
      { en: "Sugar", tl: "Asukal", hil: "Asukar" },
      { en: "Hot", tl: "Mainit", hil: "Mainit" },
      { en: "Stick", tl: "Tusok", hil: "Tusok" },
    ],
    tools: ["Frying pan (grown-up cooks)", "Tongs", "Bamboo skewers"],
    safety: "Hot oil and caramel are VERY hot — a grown-up does the frying. Kids prep, skewer, and serve.",
    ingredients: ["6 saba bananas (peeled)", "½ cup brown sugar", "Cooking oil", "Bamboo skewers"],
    steps: ["A grown-up heats oil in the pan.", "Add the bananas, then sprinkle brown sugar over them.", "Cook until the sugar caramelizes and turns golden.", "Cool slightly, then thread onto skewers.", "Serve warm — mind the heat!"],
    math: "6 bananas on skewers of 2 = 3 sticks. Double the recipe for a bigger family: 6 × 2 = 12 bananas.",
    science: "Heat makes sugar melt and turn brown — this is caramelization! The sugar's flavor changes from plain-sweet to rich and toasty.",
    nutrition: "Bananas give potassium and energy. Fried snacks are a 'sometimes' treat we enjoy in small amounts.",
    activities: {
      Rylee: "Photograph the shiny caramelized bananas in good light — food photography!",
      Ezra: "Build a tiny cardboard 'banana cue cart' like the street vendors use.",
      Asa: "Watch the sugar change color and describe each stage — that's caramelization science.",
      Selah: "Draw the finished banana cue on a stick with sparkles for the shine.",
    },
    challenge: "Set up a pretend 'merienda stand' and serve the family with a cheerful 'Bili na kayo!' Take a photo!",
    quiz: [
      { q: "Banana cue is made from which banana?", a: ["saba (cooking banana)", "a plastic banana", "a frozen banana"], correct: 0 },
      { q: "Sugar turning brown and tasty from heat is called…", a: ["caramelization", "freezing", "melting ice"], correct: 0 },
      { q: "“Saging” means…", a: ["banana", "stick", "sugar"], correct: 0 },
      { q: "Who should handle the hot oil?", a: ["a grown-up", "the youngest child", "nobody, eat it raw"], correct: 0 },
    ],
  },
  {
    id: "puto", name: "Puto (Steamed Rice Cakes)", emoji: "🍥", category: "Snack",
    difficulty: 2, time: "40 min", region: "Nationwide · Calasiao, Pangasinan", mapRegion: "luzon",
    media: { finished: "puto", ingredients: "rice" },
    badge: "rice-expert", stamp: { emoji: "🍥", name: "Puto" }, xp: 130,
    story: "Soft, fluffy, and cloud-white — puto puffs up in the steam like little pillows. A merienda that's been loved for generations! ☁️",
    history: "Puto is a steamed rice cake with roots in Filipino kitchens for centuries. Calasiao in Pangasinan is famous for its tiny, sweet puto.",
    funFact: "Puto is often paired with 'dinuguan' or eaten with cheese on top — sweet and savory together!",
    language: [
      { en: "Rice", tl: "Bigas / Kanin", hil: "Bugas / Kan-on" },
      { en: "Cheese", tl: "Keso", hil: "Keso" },
      { en: "Steam", tl: "Singaw", hil: "Aso-aso" },
      { en: "Soft", tl: "Malambot", hil: "Malum-ok" },
    ],
    tools: ["Steamer", "Puto molds or small cups", "Mixing bowl & whisk"],
    safety: "Steam is hot! A grown-up handles the steamer lid and hot molds. Kids mix and pour.",
    ingredients: ["2 cups rice flour", "1 cup sugar", "1 tbsp baking powder", "1½ cups water", "Cheese, to top"],
    steps: ["Mix rice flour, sugar, and baking powder.", "Add water and whisk into a smooth batter.", "Pour into greased molds, about ¾ full.", "Steam for 12–15 minutes until a toothpick comes out clean.", "Top with cheese and enjoy warm!"],
    math: "Fill molds ¾ full — that's a fraction! If one batch makes 12 puto and each child eats 2, how many are left for 4 kids? 12 − 8 = 4.",
    science: "Baking powder makes bubbles of gas in the batter. The steam's heat sets the batter around the bubbles, so the puto rises soft and fluffy!",
    nutrition: "Rice flour gives energy (carbohydrates). Puto is light and lower in oil than fried snacks.",
    activities: {
      Rylee: "Design a pretty cheese-topping pattern and journal the recipe.",
      Ezra: "Time each steaming batch precisely and record which timing was best.",
      Asa: "Compare two batters — one with baking powder, one without. Which rises? Why?",
      Selah: "Decorate the serving plate and arrange the puto like little clouds.",
    },
    challenge: "Share warm puto at merienda and teach everyone the word 'malambot' (soft). Snap a family photo!",
    quiz: [
      { q: "Puto is cooked by…", a: ["steaming", "deep frying", "grilling"], correct: 0 },
      { q: "What makes puto rise and get fluffy?", a: ["baking powder", "ice", "salt water"], correct: 0 },
      { q: "Fill the molds how full?", a: ["¾ full", "all the way over", "empty"], correct: 0 },
      { q: "“Malambot” means…", a: ["soft", "spicy", "frozen"], correct: 0 },
    ],
  },
  {
    id: "adobo", name: "Chicken Adobo", emoji: "🍗", category: "Main Dish",
    difficulty: 2, time: "45 min", region: "Nationwide (the national favorite)", mapRegion: "luzon",
    media: { finished: "adobo", ingredients: "market" },
    badge: "junior-chef", stamp: { emoji: "🍗", name: "Adobo" }, xp: 140,
    story: "The smell of garlic, soy, and vinegar bubbling in a pot means one thing — adobo! Many say it's the heart of Filipino cooking. 🍗",
    history: "Adobo means 'to marinate.' Filipinos cooked meat in vinegar and salt to keep it fresh long before refrigerators — now it's a national favorite with countless family versions.",
    funFact: "Almost every Filipino family has its OWN adobo recipe — some add sugar, some bay leaves, some potatoes!",
    language: [
      { en: "Chicken", tl: "Manok", hil: "Manok" },
      { en: "Garlic", tl: "Bawang", hil: "Ahos" },
      { en: "Vinegar", tl: "Suka", hil: "Suka" },
      { en: "Soy sauce", tl: "Toyo", hil: "Toyo" },
    ],
    tools: ["Cooking pot", "Wooden spoon", "Measuring cups"],
    safety: "A grown-up handles the hot stove and knife. Kids measure, add ingredients, and stir when it's safe.",
    ingredients: ["½ kg chicken pieces", "½ cup soy sauce", "¼ cup vinegar", "6 cloves garlic (crushed)", "3 bay leaves", "1 cup water", "Pepper"],
    steps: ["Brown the garlic and chicken in the pot.", "Pour in soy sauce, water, bay leaves, and pepper.", "Simmer 20 minutes.", "Add the vinegar and let it cook WITHOUT stirring for 5 minutes.", "Simmer until the sauce thickens. Serve with rice!"],
    math: "Ratios! Adobo often uses about 2 parts soy sauce to 1 part vinegar. Here ½ cup : ¼ cup = 2 : 1. Double it for a feast: 1 cup : ½ cup.",
    science: "Vinegar is an acid — it adds tang and helps keep food fresh. Cooking it off softens the sharp smell and blends the flavors.",
    nutrition: "Chicken gives protein to help us grow strong. Serve with rice and veggies for a balanced meal.",
    activities: {
      Rylee: "Plate the adobo beautifully with a garnish and take a 'menu' photo.",
      Ezra: "Research why adobo was invented (food preservation) and share 2 facts.",
      Asa: "Smell the vinegar before and after cooking — describe how the acid changes.",
      Selah: "Draw the family adobo and give it a fun name.",
    },
    challenge: "Cook adobo together, then pray and eat as a family. Ask Lola or a relative about THEIR adobo secret!",
    quiz: [
      { q: "“Adobo” comes from a word meaning to…", a: ["marinate", "freeze", "bake"], correct: 0 },
      { q: "The two star flavors of adobo are soy sauce and…", a: ["vinegar", "ice cream", "orange juice"], correct: 0 },
      { q: "“Manok” means…", a: ["chicken", "garlic", "rice"], correct: 0 },
      { q: "Vinegar is an example of an…", a: ["acid", "animal", "engine"], correct: 0 },
    ],
  },
  {
    id: "halo-halo", name: "Halo-Halo", emoji: "🍧", category: "Refreshment",
    difficulty: 1, time: "15 min (assemble)", region: "Nationwide · Pampanga", mapRegion: "luzon",
    media: { finished: "halo-halo", ingredients: "fruits" },
    badge: "sweet-treat", stamp: { emoji: "🍧", name: "Halo-Halo" }, xp: 125,
    story: "Halo-halo means 'mix-mix'! Colorful sweets, shaved ice, and creamy milk all swirled together into the happiest cool-down on a hot day. 🍧",
    history: "Halo-halo grew from Japanese 'kakigori' shaved ice and became a beloved Filipino summer refreshment, piled high with beans, fruit, jellies, and leche flan.",
    funFact: "Pampanga is famous for its halo-halo — some say the best in the country!",
    language: [
      { en: "Mix", tl: "Halo", hil: "Simbog / Halo" },
      { en: "Ice", tl: "Yelo", hil: "Yelo" },
      { en: "Milk", tl: "Gatas", hil: "Gatas" },
      { en: "Delicious", tl: "Masarap", hil: "Namit" },
    ],
    tools: ["Tall glasses", "Ice shaver or crushed ice", "Long spoons"],
    safety: "Rinse fruit and hands. A grown-up handles the ice shaver. Kids layer the toppings.",
    ingredients: ["Shaved/crushed ice", "Sweet beans & nata de coco", "Sliced banana & jackfruit", "Evaporated milk", "Sugar", "Leche flan or ice cream on top"],
    steps: ["Put sweet beans, jellies, and fruit in the bottom of the glass.", "Pile shaved ice on top.", "Pour evaporated milk over the ice.", "Add leche flan or ice cream on top.", "Now the best part — HALO-HALO (mix-mix) and enjoy!"],
    math: "Count the layers and colors! If each glass has 6 toppings and you make 4 glasses, that's 6 × 4 = 24 scoops of toppings.",
    science: "Ice is frozen water. It melts (turns back to liquid) as it warms — that's why we eat halo-halo fast on a hot day!",
    nutrition: "Fruit and beans add fiber and vitamins. It's a sweet treat, so we share and enjoy a fun-sized serving.",
    activities: {
      Rylee: "Arrange the toppings in a rainbow of colors before adding ice — then photograph it.",
      Ezra: "Measure equal amounts of each topping so every glass is fair and identical.",
      Asa: "Watch the ice melt and time how long it takes — observe the change of state.",
      Selah: "Create a mini 'halo-halo stand' menu with drawings of each topping.",
    },
    challenge: "Build a halo-halo for each family member with their favorite toppings, then mix and cheers together. Photo time!",
    quiz: [
      { q: "“Halo-halo” means…", a: ["mix-mix", "hot-hot", "run-run"], correct: 0 },
      { q: "Ice is water that has been…", a: ["frozen", "boiled", "fried"], correct: 0 },
      { q: "Which province is famous for halo-halo?", a: ["Pampanga", "Antarctica", "none"], correct: 0 },
      { q: "“Masarap” / “Namit” means…", a: ["delicious", "cold", "empty"], correct: 0 },
    ],
  },
];

if (typeof module !== "undefined") module.exports = { RECIPES, COOKING_BADGES };
