// WEDDING LEDGER VERSION — UK spelling — Last updated: 2025-08-24
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const el = (id) => document.getElementById(id);
  const startButton = el('start-button');
  const showCharactersButton = el('show-characters-button');
  const nextCharacterButton = el('next-character-button');
  const proceedButton = el('proceed-button');
  const restartButton = el('restart-button');

  const splashScreen = el('splash-screen');
  const introScreen = el('intro-screen');
  const characterIntroScreen = el('character-intro-screen');
  const gameScreen = el('game-screen');
  const mapScreen = el('map-screen');
  const gameOverScreen = el('game-over-screen');

  const charIntroPortrait = el('character-intro-portrait');
  const charIntroName = el('character-intro-name');
  const charIntroDescription = el('character-intro-description');

  const gameOverTitle = el('game-over-title');
  const winnerPortrait = el('winner-portrait');
  const gameOverText = el('game-over-text');

  const scoreDisplay = el('score');
  const levelTitle = el('level-title');
  const progressBar = el('progress-bar');
  const characterDialogue = el('character-dialogue');
  const sentenceText = el('sentence-text');
  const teamProgressList = el('team-progress-list');

  // State
  let totalScore = 0;
  let currentLevel = 0;
  let currentIntroIndex = 0;
  let questions = [];

  const teamData = {
    "Lyra's Expedition": { progress: 0, status: "Charting ancient maps..." },
    "Reed & Co. Explorers": { progress: 0, status: "Dusting off artefacts." },
    "The Old Guard Syndicate": { progress: 0, status: "Guarding forgotten vaults." },
    "Finch Field Team": { progress: 0, status: "Measuring ruins and glyphs." },
    "Media Duo Outfit": { progress: 0, status: "Filming a dramatic reveal." }
  };

  // Character intros (re-themed)
  const introSequence = [
    { name: "Lyra's Expedition", character: "Lyra (You)", desc: "An archaeologist on a mission to recover the Blessed Wedding Ledger and help your friends organise the perfect ceremony.", portrait: "lyra_portrait.png" },
    { name: "Reed & Co. Explorers", character: "Dr. Evelyn Reed", desc: "A glory-chasing expedition leader who wants the Ledger's fame. She believes legendary artefacts belong in her museum.", portrait: "silas_portrait.png" },
    { name: "The Old Guard Syndicate", character: "Unknown", desc: "A secretive cabal of treasure-hoarders. They would rather bury knowledge than share it with the world.", portrait: "serpent_leader_portrait.png" },
    { name: "Finch Field Team", character: "Alistair Finch", desc: "A traditionalist explorer who insists ceremonies must never change. He wants the Ledger sealed away.", portrait: "finch_portrait.png" },
    { name: "Media Duo Outfit", character: "Davies & Gable", desc: "Two flashy adventurers chasing clicks. To them, the Ledger is the ultimate season finale prop.", portrait: "duo_portrait.png" }
  ];

  // Utility
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // LEVEL DATA — FULL VOCAB COVERAGE (UK)
  // 1) People & Roles
  const level1_Data = [
    { sentence: "The woman who is getting married is the ______.", correctAnswer: "bride", choices: ["bride", "usher", "widow"] },
    { sentence: "The man who is getting married is the ______.", correctAnswer: "groom", choices: ["groom", "best man", "officiant"] },
    { sentence: "The man who is getting married is also called the ______.", correctAnswer: "bridegroom", choices: ["bridegroom", "best man", "usher"] },
    { sentence: "Before the ceremony, Maria introduced her ______, who had just proposed.", correctAnswer: "fiancé", choices: ["fiancé", "widow", "usher"] },
    { sentence: "A woman who is engaged to be married is a ______.", correctAnswer: "fiancée", choices: ["fiancée", "bridesmaid", "spouse"] },
    { sentence: "After the ceremony, the ______ waved to their guests from the car.", correctAnswer: "newlyweds", choices: ["newlyweds", "ushers", "in-laws"] },
    { sentence: "The most important bridesmaid is the ______ of honour.", correctAnswer: "maid", choices: ["maid", "page", "flower girl"] },
    { sentence: "The groom asked his ______ to keep the rings safe.", correctAnswer: "best man", choices: ["best man", "officiant", "groomsmen"] },
    { sentence: "Young attendants often include a ______ girl and a page boy.", correctAnswer: "flower", choices: ["flower", "toast", "licence"] },
    { sentence: "The person who conducts the wedding ceremony is the ______.", correctAnswer: "officiant", choices: ["officiant", "usher", "matchmaker"] },
    { sentence: "The groom’s friends who support him are called the ______.", correctAnswer: "groomsmen", choices: ["groomsmen", "bridesmaids", "spectators"] },
    { sentence: "Relatives you gain through marriage are your ______.", correctAnswer: "in-laws", choices: ["in-laws", "ushers", "clerks"] },
    { sentence: "A person’s legally married partner is their ______.", correctAnswer: "spouse", choices: ["spouse", "fiancé", "bridesmaid"] },
    { sentence: "The two people marrying are often referred to as the ______.", correctAnswer: "couple", choices: ["couple", "choir", "crowd"] },
    { sentence: "The young boy who carries the rings is the ______ boy.", correctAnswer: "page", choices: ["page", "best", "guard"] },
    { sentence: "Friends chosen to accompany the bride are her ______.", correctAnswer: "bridesmaids", choices: ["bridesmaids", "ushers", "audience"] },
    { sentence: "A woman whose spouse has died is a ______.", correctAnswer: "widow", choices: ["widow", "usher", "bride"] },
    { sentence: "A man whose spouse has died is a ______.", correctAnswer: "widower", choices: ["widower", "usher", "bride"] }
  ];

  // 2) Before the Wedding
  const level2_Data = [
    { sentence: "He decided to ______ on the clifftop at sunset.", correctAnswer: "propose", choices: ["propose", "elope", "divorce"] },
    { sentence: "After the ______, they planned a small party with family.", correctAnswer: "proposal", choices: ["proposal", "alimony", "speech"] },
    { sentence: "They chose to ______ next spring and tell everyone at dinner.", correctAnswer: "get engaged", choices: ["get engaged", "get cold feet", "get divorced"] },
    { sentence: "Her ______ ring belonged to her grandmother.", correctAnswer: "engagement", choices: ["engagement", "wedding breakfast", "civil"] },
    { sentence: "The best man organised a lively ______ do in Brighton.", correctAnswer: "stag", choices: ["stag", "veil", "matrimony"] },
    { sentence: "The maid of honour planned a spa day for the ______ do.", correctAnswer: "hen", choices: ["hen", "altar", "page"] },
    { sentence: "They sent a handwritten ______ invitation to each guest.", correctAnswer: "wedding", choices: ["wedding", "licence", "polygamy"] },
    { sentence: "The ______ of marriage were read in church for three Sundays.", correctAnswer: "banns", choices: ["banns", "bands", "vows"] },
    { sentence: "The country house was the perfect ______ for the ceremony.", correctAnswer: "venue", choices: ["venue", "vow", "usher"] },
    { sentence: "During their ______, they travelled across Italy together.", correctAnswer: "engagement", choices: ["engagement", "annulment", "alimony"] },
    { sentence: "They signed a ______ before the wedding, a short term for prenuptial agreement.", correctAnswer: "prenup", choices: ["prenup", "bouquet", "vow"] }
  ];

  // 3) Ceremony & Attire
  const level3_Data = [
    { sentence: "Everyone stood as the bride began to walk down the ______.", correctAnswer: "aisle", choices: ["aisle", "altar", "archive"] },
    { sentence: "The couple stood before the ______ to exchange vows.", correctAnswer: "altar", choices: ["altar", "venue", "ledger"] },
    { sentence: "They wrote personal ______ to promise lifelong support.", correctAnswer: "vows", choices: ["vows", "toasts", "speeches"] },
    { sentence: "After the vows, it was time to ______ rings.", correctAnswer: "exchange", choices: ["exchange", "cut", "throw"] },
    { sentence: "He wears a simple gold wedding ______ on his left hand.", correctAnswer: "band", choices: ["band", "bann", "bouquet"] },
    { sentence: "Guests threw ______ as the couple left the temple ruins.", correctAnswer: "confetti", choices: ["confetti", "favour", "licence"] },
    { sentence: "She searched for months for the perfect wedding ______.", correctAnswer: "dress", choices: ["dress", "page", "usher"] },
    { sentence: "The groom lifted the ______ before the kiss.", correctAnswer: "veil", choices: ["veil", "venue", "vow"] },
    { sentence: "The bride carried a fragrant ______ of wild flowers.", correctAnswer: "bouquet", choices: ["bouquet", "brochure", "band"] },
    { sentence: "He arrived in a tailored ______ for the ceremony.", correctAnswer: "tuxedo", choices: ["tuxedo", "apron", "cloak"] }
  ];

  // 4) Reception
  const level4_Data = [
    { sentence: "The ______ reception was held under lanterns beside the oasis.", correctAnswer: "wedding", choices: ["wedding", "civil", "secret"] },
    { sentence: "Despite the name, the ______ breakfast started at 4 p.m.", correctAnswer: "wedding", choices: ["wedding", "continental", "bridesmaids'"] },
    { sentence: "The father of the bride proposed a heartfelt ______.", correctAnswer: "toast", choices: ["toast", "vow", "licence"] },
    { sentence: "The best man's ______ had everyone laughing.", correctAnswer: "speech", choices: ["speech", "banns", "veil"] },
    { sentence: "For their ______ dance, they chose the first song they’d heard together.", correctAnswer: "first", choices: ["first", "last", "solo"] },
    { sentence: "Everyone gathered round to ______ the cake.", correctAnswer: "cut", choices: ["cut", "exchange", "elope"] },
    { sentence: "Guests took home handmade ______ favours in little jars.", correctAnswer: "wedding", choices: ["wedding", "aisle", "altar"] },
    { sentence: "As newlyweds, they thanked every table during the ______.", correctAnswer: "reception", choices: ["reception", "proposal", "annulment"] }
  ];

  // 5) Social/Legal & Idioms
  const level5_Data = [
    { sentence: "A professional ______ sometimes introduces people who want to marry.", correctAnswer: "matchmaker", choices: ["matchmaker", "officiant", "flower girl"] },
    { sentence: "Theirs was an ______ marriage arranged by both families.", correctAnswer: "arranged", choices: ["arranged", "forced", "civil"] },
    { sentence: "A ______ marriage is illegal because one person does not consent.", correctAnswer: "forced", choices: ["forced", "civil", "polite"] },
    { sentence: "In some traditions, a ______ may be paid by the bride’s family.", correctAnswer: "dowry", choices: ["dowry", "bouquet", "band"] },
    { sentence: "They signed a ______ agreement before the wedding.", correctAnswer: "prenuptial", choices: ["prenuptial", "postcard", "processional"] },
    { sentence: "________ is having more than one spouse at the same time.", correctAnswer: "Polygamy", choices: ["Polygamy", "Polyglot", "Polygyny?"] },
    { sentence: "The couple were joined in holy ______.", correctAnswer: "matrimony", choices: ["matrimony", "matrimonial", "matron"] },
    { sentence: "They chose a ______ ceremony at the registry office.", correctAnswer: "civil", choices: ["civil", "forced", "arranged"] },
    { sentence: "They opted for a traditional church wedding instead of a ______ ceremony.", correctAnswer: "civil ceremony", choices: ["civil ceremony", "forced marriage", "separation"] },
    { sentence: "They registered a civil ______ rather than a marriage.", correctAnswer: "partnership", choices: ["partnership", "polygamy", "annulment"] },
    { sentence: "They registered their relationship as a ______ partnership.", correctAnswer: "civil partnership", choices: ["civil partnership", "matchmaker", "page boy"] },
    { sentence: "After the ceremony, the ______ certificate was signed.", correctAnswer: "marriage", choices: ["marriage", "divorce", "attendance"] },
    { sentence: "You must apply for a marriage ______ before the big day.", correctAnswer: "licence", choices: ["licence", "license", "lesson"] },
    { sentence: "A woman whose spouse has died is a ______.", correctAnswer: "widow", choices: ["widow", "usher", "bridegroom"] },
    { sentence: "A man whose spouse has died is a ______.", correctAnswer: "widower", choices: ["widower", "usher", "bride"] },
    { sentence: "Living apart without divorcing is called a ______.", correctAnswer: "separation", choices: ["separation", "ceremony", "reception"] },
    { sentence: "The legal ending of a marriage is a ______.", correctAnswer: "divorce", choices: ["divorce", "dowry", "vows"] },
    { sentence: "A court can declare a marriage was never valid with an ______.", correctAnswer: "annulment", choices: ["annulment", "engagement", "invitation"] },
    { sentence: "After divorcing, one spouse may pay ______.", correctAnswer: "alimony", choices: ["alimony", "bouquet", "proposal"] },
    { sentence: "After ten years together, they decided to ______ the knot.", correctAnswer: "tie", choices: ["tie", "cut", "polish"] },
    { sentence: "They ran away to ______ in Venice without telling anyone.", correctAnswer: "elope", choices: ["elope", "analyse", "exchange"] },
    { sentence: "He got ______ feet an hour before the ceremony.", correctAnswer: "cold", choices: ["cold", "left", "quick"] },
    { sentence: "Everyone says they are a match made in ______.", correctAnswer: "heaven", choices: ["heaven", "marble", "happen"] },
    { sentence: "I can’t believe my brother is old enough to walk down the ______.", correctAnswer: "aisle", choices: ["aisle", "altar", "oasis"] },
    { sentence: "Shockingly, she was left at the ______.", correctAnswer: "altar", choices: ["altar", "ledger", "licence"] }
  ];

  const levels = {
    1: { title: "Trial I — The Invitation in the Dust (People & Roles)", data: level1_Data },
    2: { title: "Trial II — Oasis of Engagements (Before the Wedding)", data: level2_Data },
    3: { title: "Trial III — Temple of Vows (Ceremony & Attire)", data: level3_Data },
    4: { title: "Trial IV — Feast under the Constellations (Reception)", data: level4_Data },
    5: { title: "Trial V — Archive of Matrimony (Social, Legal & Idioms)", data: level5_Data }
  };

  // Event listeners
  startButton.addEventListener('click', () => { splashScreen.classList.remove('active'); introScreen.classList.add('active'); });
  showCharactersButton.addEventListener('click', () => { introScreen.classList.remove('active'); currentIntroIndex = 0; showCharacter(currentIntroIndex); });
  nextCharacterButton.addEventListener('click', () => {
    currentIntroIndex++;
    if (currentIntroIndex < introSequence.length) { showCharacter(currentIntroIndex); }
    else { characterIntroScreen.classList.remove('active'); startLevel(1); }
  });
  proceedButton.addEventListener('click', () => {
    const nextLevel = currentLevel + 1;
    if (levels[nextLevel]) startLevel(nextLevel); else triggerGameOver(introSequence[0], true);
  });
  restartButton.addEventListener('click', () => location.reload());

  // Functions
  function showCharacter(index) {
    const character = introSequence[index];
    charIntroPortrait.src = character.portrait;
    charIntroName.textContent = character.name;
    charIntroDescription.innerHTML = character.desc;
    nextCharacterButton.textContent = (index === introSequence.length - 1) ? "Begin the Trials" : "Next";
    characterIntroScreen.classList.add('active');
  }

  function startLevel(levelNumber) {
    currentLevel = levelNumber;
    const levelData = levels[currentLevel];
    if (!levelData) return;

    levelTitle.textContent = levelData.title;
    let levelScore = 0;
    let currentQuestionIndex = 0;
    questions = [...levelData.data];
    shuffleArray(questions);

    updateScoreDisplay(levelScore);
    updateProgressBar(0, questions.length);
    const choicesContainer = document.getElementById('choices-container');
    if (!choicesContainer.hasChildNodes()) {
      choicesContainer.innerHTML = `<button class="choice-button"></button><button class="choice-button"></button><button class="choice-button"></button>`;
    }

    [splashScreen, introScreen, characterIntroScreen, mapScreen, gameOverScreen].forEach(s => s.classList.remove('active'));
    gameScreen.classList.add('active');

    function displayQuestion() {
      if (currentQuestionIndex >= questions.length) { endLevel(levelScore); return; }
      const q = questions[currentQuestionIndex];
      sentenceText.innerHTML = q.sentence.replace('______', '<span class="blank"></span>');
      characterDialogue.textContent = "Which word fits best?";
      const buttons = document.querySelectorAll('.choice-button');
      buttons.forEach(b => { b.className = 'choice-button'; b.disabled = false; });
      let choices = [...q.choices];
      shuffleArray(choices);
      buttons.forEach((b, i) => { b.textContent = choices[i]; b.onclick = () => handleChoice(choices[i]); });
    }

    function handleChoice(selected) {
      const buttons = document.querySelectorAll('.choice-button');
      buttons.forEach(b => b.disabled = true);
      const correct = questions[currentQuestionIndex].correctAnswer;
      if (selected === correct) {
        levelScore += 10;
        characterDialogue.textContent = "Correct! The Ledger glows faintly.";
      } else {
        characterDialogue.textContent = `Not quite. The correct word was '${correct}'.`;
      }
      updateScoreDisplay(levelScore);
      buttons.forEach(b => {
        if (b.textContent === correct) b.classList.add('correct');
        else if (b.textContent === selected) b.classList.add('incorrect');
      });
      currentQuestionIndex++;
      updateProgressBar(currentQuestionIndex, questions.length);
      setTimeout(displayQuestion, 1500);
    }

    displayQuestion();
  }

  function updateScoreDisplay(score) { scoreDisplay.textContent = `Score: ${score}`; }
  function updateProgressBar(current, total) { progressBar.style.width = `${total > 0 ? (current / total) * 100 : 0}%`; }

  function endLevel(levelScore) {
    totalScore += levelScore;
    characterDialogue.textContent = `Trial passed! Expedition total: ${totalScore}.`;
    sentenceText.innerHTML = `You have cleared <em>${levels[currentLevel].title}</em>!`;
    document.getElementById('choices-container').innerHTML = '';
    setTimeout(showMapScreen, 1800);
  }

  function showMapScreen() {
    teamData["Lyra's Expedition"].progress = currentLevel;
    teamData["Lyra's Expedition"].status = `Passed Trial ${currentLevel}. Total Score: ${totalScore}.`;

    let topRivalName = null;
    let maxProgress = 0;

    for (const teamName in teamData) {
      if (teamName !== "Lyra's Expedition") {
        if (Math.random() > 0.3) {
          if (teamData[teamName].progress < currentLevel) teamData[teamName].progress++;
        }
        teamData[teamName].status = `Has passed Trial ${teamData[teamName].progress}.`;
      }
      if (teamData[teamName].progress > maxProgress) {
        maxProgress = teamData[teamName].progress;
        topRivalName = teamName;
      }
    }

    teamProgressList.innerHTML = '';
    for (const team in teamData) {
      const li = document.createElement('li');
      li.textContent = `${team}: ${teamData[team].status}`;
      if (team === "Lyra's Expedition") li.classList.add('player');
      teamProgressList.appendChild(li);
    }

    if (maxProgress > teamData["Lyra's Expedition"].progress) {
      const winnerData = introSequence.find(char => char.name === topRivalName);
      setTimeout(() => triggerGameOver(winnerData, false), 900);
      return;
    }

    gameScreen.classList.remove('active');
    mapScreen.classList.add('active');
  }

  function triggerGameOver(winner, isPlayer) {
    if (isPlayer) {
      gameOverTitle.textContent = "The Ledger is Yours!";
      gameOverText.textContent = `You deciphered the Blessed Wedding Ledger and can now organise the perfect ceremony for your friends. Final score: ${totalScore}.`;
      document.querySelector('.game-over-content').style.borderColor = '#6a9c89';
      document.getElementById('game-over-title').style.color = '#6a9c89';
    } else {
      gameOverTitle.textContent = "The Race is Lost";
      gameOverText.textContent = `${winner.name} reached the vault first and claimed the Ledger. Their version of 'perfection' may not be yours.`;
    }
    winnerPortrait.src = winner.portrait;
    [gameScreen, mapScreen].forEach(s => s.classList.remove('active'));
    gameOverScreen.classList.add('active');
  }
});
