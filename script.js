// Store meme templates fetched from Imgflip
let memeTemplates = [];
// Track shown template IDs and shown text combos to avoid repetition
let shownTemplateIds = new Set();
let shownTextCombos = new Set();

// 100 meme texts (top and bottom)
const memeTexts = [
  { top: "When the code runs perfectly", bottom: "It's a miracle! 😇" },
  { top: "Debugging for hours", bottom: "Just a missing semicolon ;" },
  { top: "HTML looks easy", bottom: "Until CSS shows up 😵" },
  { top: "Client says: Make it simple", bottom: "Designer says: I'm an artist 😎" },
  { top: "Code is deployed", bottom: "Now fear the bugs 😨" },
  { top: "When coffee kicks in", bottom: "Code becomes poetry ☕️" },
  { top: "Stack Overflow to the rescue", bottom: "Copy-paste FTW! 🦸‍♂️" },
  { top: "Writing comments", bottom: "For future me to regret" },
  { top: "Code works on my machine", bottom: "But not in production 😬" },
  { top: "Git merge conflict", bottom: "Why do you hate me?" },
  { top: "When you fix a bug", bottom: "But create two more 🐛🐛" },
  { top: "Keyboard warriors", bottom: "Fight bugs, not people" },
  { top: "All night coding session", bottom: "Why do I feel like a zombie?" },
  { top: "When the client changes requirements", bottom: "Again? Seriously?" },
  { top: "CSS is awesome", bottom: "Said no one ever 😂" },
  { top: "JavaScript is fun", bottom: "Until runtime errors happen" },
  { top: "When you finally understand recursion", bottom: "Wait, what was I doing?" },
  { top: "My code compiles", bottom: "It's a Christmas miracle!" },
  { top: "Debugging production code", bottom: "Because QA missed it" },
  { top: "Commenting your code", bottom: "The struggle is real" },
  { top: "When you push to master by mistake", bottom: "Panic mode activated!" },
  { top: "The weekend plans", bottom: "Code, sleep, repeat" },
  { top: "Stack Overflow is down", bottom: "Send help!" },
  { top: "When you fix the bug and it works", bottom: "Celebrate with pizza 🍕" },
  { top: "Programmers don’t sleep", bottom: "They just wait for bugs to appear" },
  { top: "Code reviews", bottom: "Where friendships are tested" },
  { top: "Trying to understand legacy code", bottom: "It’s like archaeology" },
  { top: "Console.log debugging", bottom: "My best friend" },
  { top: "When your code runs slow", bottom: "Optimize like a pro" },
  { top: "Debugging is like being a detective", bottom: "In a crime movie" },
  { top: "When you forget a semicolon", bottom: "And everything breaks" },
  { top: "Code refactoring", bottom: "Because the first draft sucks" },
  { top: "When the API changes", bottom: "Break all the things!" },
  { top: "Coding at 3 AM", bottom: "Best ideas ever" },
  { top: "When your program crashes", bottom: "I blame the computer" },
  { top: "The joy of a green build", bottom: "Everything works!" },
  { top: "Syntax errors", bottom: "The bane of my existence" },
  { top: "When the compiler is happy", bottom: "So am I" },
  { top: "Fixing bugs in production", bottom: "Adrenaline rush" },
  { top: "Stack traces", bottom: "My guide to the underworld" },
  { top: "Writing tests", bottom: "Because bugs are inevitable" },
  { top: "When your coworker breaks the build", bottom: "Blame game starts" },
  { top: "Documentation", bottom: "Who writes this stuff?" },
  { top: "When code reviews get brutal", bottom: "Take it personally" },
  { top: "Learning new frameworks", bottom: "Feels like a roller coaster" },
  { top: "When you finally fix a hard bug", bottom: "Victory dance!" },
  { top: "Coding bootcamp graduate", bottom: "Writes infinite loops" },
  { top: "Debugging production at midnight", bottom: "Fun times!" },
  { top: "When your IDE autocompletes", bottom: "Life saver" },
  { top: "Stack overflow answer", bottom: "Copied without understanding" },
  { top: "Pair programming", bottom: "Two heads, one keyboard" },
  { top: "When the internet is slow", bottom: "Code waits too" },
  { top: "When you miss a bracket", bottom: "Syntax error again" },
  { top: "Writing clean code", bottom: "Never done, always dreamed" },
  { top: "When the deadline is near", bottom: "Panic and code" },
  { top: "When the laptop battery dies", bottom: "The struggle is real" },
  { top: "Push to production Friday evening", bottom: "What could go wrong?" },
  { top: "When your code finally works", bottom: "Don’t touch it!" },
  { top: "Git blame", bottom: "Find the culprit" },
  { top: "When the bug is in third party code", bottom: "Cry silently" },
  { top: "Code comments", bottom: "For the chosen ones" },
  { top: "When you accidentally delete code", bottom: "Ctrl+Z to the rescue" },
  { top: "When the build fails", bottom: "Start over" },
  { top: "When you fix a bug by accident", bottom: "Happy accident!" },
  { top: "Debugging JavaScript", bottom: "Because of loose typing" },
  { top: "When the user does something unexpected", bottom: "Impossible use case" },
  { top: "Writing CSS", bottom: "Never straightforward" },
  { top: "When you learn a new programming language", bottom: "Mind blown!" },
  { top: "When your code review gets rejected", bottom: "Back to the drawing board" },
  { top: "Writing SQL queries", bottom: "Why so complex?" },
  { top: "When the server crashes", bottom: "Oh no!" },
  { top: "When the database is down", bottom: "Panic everywhere" },
  { top: "Learning Git", bottom: "Confusing at first" },
  { top: "When your script runs without errors", bottom: "Small wins" },
  { top: "When you deploy without testing", bottom: "Regret incoming" },
  { top: "Stack overflow reputation", bottom: "Programmer’s pride" },
  { top: "When you forget to save your file", bottom: "The horror" },
  { top: "Writing algorithms", bottom: "Brain teaser" },
  { top: "When you accidentally commit secrets", bottom: "Change passwords fast!" },
  { top: "When your app crashes in production", bottom: "Hello panic mode!" },
  { top: "When you write a one-liner", bottom: "Feeling like a wizard" },
  { top: "When your code works on the first try", bottom: "Rare and magical" },
  { top: "Coding with friends", bottom: "Double the fun" },
  { top: "When you discover a shortcut", bottom: "Time saver!" },
  { top: "When your code is reviewed by the boss", bottom: "Nervous sweating" },
  { top: "When the team pulls an all-nighter", bottom: "Survivors unite" },
  { top: "When your coffee spills on the keyboard", bottom: "Disaster strikes" },
  { top: "When you finally finish the project", bottom: "Victory dance time!" },
  { top: "When you find a bug on launch day", bottom: "Facepalm" },
  { top: "When your code gets merged", bottom: "Mission accomplished" },
  { top: "When you forget your password", bottom: "Reset, again!" },
  { top: "When the client changes mind again", bottom: "Please no..." },
  { top: "When you refactor code", bottom: "Beauty in progress" },
  { top: "When you write documentation", bottom: "Tedious but needed" },
  { top: "When the deadline is tomorrow", bottom: "All-nighter again" },
  { top: "When your app crashes on your mom’s phone", bottom: "Embarrassed developer" },
  { top: "When you understand the code after a year", bottom: "Wait, what?" },
  { top: "When your coworker deletes your code", bottom: "Friendship ended" },
  { top: "When you finally understand async/await", bottom: "Mind blown" },
  { top: "When the debugger helps", bottom: "Best friend forever" },
  { top: "When you learn regex", bottom: "Power unleashed" },
  { top: "When the build succeeds", bottom: "Celebrate with pizza!" },
  { top: "When you accidentally create infinite loop", bottom: "Send help!" },
  { top: "When the compiler yells errors", bottom: "Please be gentle" },
  { top: "When you push code on Friday", bottom: "Disaster waiting to happen" },
  { top: "When you accidentally push secrets", bottom: "Panic mode on" },
  { top: "When the user says 'it works on my machine'", bottom: "No it doesn’t" },
  { top: "When your code passes all tests", bottom: "Champions rejoice!" },
];

// Fetch meme templates from Imgflip API
async function fetchMemeTemplates() {
  try {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();

    if (data.success) {
      memeTemplates = data.data.memes;
      console.log(`Loaded ${memeTemplates.length} meme templates.`);
    } else {
      alert("Failed to load meme templates from API.");
    }
  } catch (error) {
    alert("Error fetching meme templates: " + error.message);
  }
}

function generateMeme() {
  if (memeTemplates.length === 0) {
    alert("Templates are still loading. Please wait a moment.");
    return;
  }

  // Check if all memes are exhausted
  if (shownTemplateIds.size >= memeTemplates.length) {
    alert("All meme templates shown!");
    return;
  }

  // Check if all texts are exhausted
  if (shownTextCombos.size >= memeTexts.length) {
    alert("All meme texts shown!");
    return;
  }

  // Pick random unique template
  let randomTemplate;
  do {
    randomTemplate = memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
  } while (shownTemplateIds.has(randomTemplate.id));
  shownTemplateIds.add(randomTemplate.id);

  // Pick random unique text
  let randomText;
  do {
    randomText = memeTexts[Math.floor(Math.random() * memeTexts.length)];
  } while (shownTextCombos.has(randomText.top + randomText.bottom));
  shownTextCombos.add(randomText.top + randomText.bottom);

  // Display meme
  const memeImage = document.getElementById("meme-image");
  memeImage.src = randomTemplate.url;

  document.getElementById("top-text").innerText = randomText.top;
  document.getElementById("bottom-text").innerText = randomText.bottom;
}

document.getElementById("generateBtn").addEventListener("click", generateMeme);

// Load meme templates on page load
fetchMemeTemplates();
