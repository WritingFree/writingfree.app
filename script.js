const staticText = "It's time to ditch";
const dynamicText = "Google Docs";
const staticEl = document.getElementById('typing-static');
const dynamicEl = document.getElementById('typing-dynamic');
let idx = 0;
const alternatives = ["Google Docs", "Ulysses", "Evernote", "OneNote", "Bear"];
const maxLen = Math.max(dynamicText.length, ...alternatives.map(w => w.length));

function typeStatic() {
  staticEl.textContent = staticText.slice(0, idx);
  if (idx < staticText.length) {
    idx++;
    setTimeout(typeStatic, 60);
  } else {
    idx = 0;
    setTimeout(() => typeDynamicWord(dynamicText, 0), 200);
  }
}

function typeDynamicWord(word, charIdx) {
  dynamicEl.innerHTML = `<span class='highlight-change'>${getColoredWordPartial(word, charIdx)}</span><span class='cursor'>&nbsp;</span>`;
  if (charIdx < word.length) {
    setTimeout(() => typeDynamicWord(word, charIdx + 1), 60);
  } else {
    setTimeout(() => cycleAlternatives(0), 700);
  }
}

function getColoredWordPartial(word, upto) {
  const partial = word.slice(0, upto);
  if (word === 'Google Docs') return googleColoredWord(partial);
  if (word === 'Ulysses') return ulyssesColoredWord(partial);
  if (word === 'Evernote') return evernoteColoredWord(partial);
  if (word === 'OneNote') return onenoteColoredWord(partial);
  return partial;
}

function googleColoredWord(word) {
  const colors = [
    '#4285F4', '#EA4335', '#FBBC05', '#4285F4', '#34A853', '#EA4335', '', '#4285F4', '#EA4335', '#FBBC05', '#34A853'
  ];
  let html = '';
  for (let i = 0; i < word.length; i++) {
    if (word[i] === ' ') {
      html += ' ';
    } else {
      html += `<span style=\"color:${colors[i] || '#222'};font-family:'Roboto',Arial,sans-serif;\">${word[i]}</span>`;
    }
  }
  return html;
}
function ulyssesColoredWord(word) {
  const colors = ['#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FFA000', '#FFB300', '#FFD54F'];
  let html = '';
  for (let i = 0; i < word.length; i++) {
    html += `<span style=\"color:${colors[i % colors.length]};font-family:Georgia,'Times New Roman',Times,serif;font-style:italic;\">${word[i]}</span>`;
  }
  return html;
}
function evernoteColoredWord(word) {
  const colors = ['#2dbe60', '#00a82d', '#39d37a', '#00b15d', '#2dbe60', '#00a82d', '#39d37a', '#00b15d'];
  let html = '';
  for (let i = 0; i < word.length; i++) {
    html += `<span style=\"color:${colors[i % colors.length]};font-family:'Inter',Arial,sans-serif;\">${word[i]}</span>`;
  }
  return html;
}
function onenoteColoredWord(word) {
  return `<span style=\"color:#8034A7;font-family:'Segoe UI',Arial,sans-serif;\">${word}</span>`;
}
function bearColoredWord(word) {
  // Bear app: signature orange color, SF Pro Display font
  if (word !== 'Bear') return word;
  return `<span style=\"color:#FF9500;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;\">${word}</span>`;
}
function wrapWithCursor(word) {
  let wordHtml = word;
  if (word === 'Google Docs') {
    wordHtml = googleColoredWord(word);
  } else if (word === 'Ulysses') {
    wordHtml = ulyssesColoredWord(word);
  } else if (word === 'Evernote') {
    wordHtml = evernoteColoredWord(word);
  } else if (word === 'OneNote') {
    wordHtml = onenoteColoredWord(word);
  } else if (word === 'Bear') {
    wordHtml = bearColoredWord(word);
  }
  return `<span class='highlight-change'>${wordHtml}</span><span class='cursor'>&nbsp;</span>`;
}
function cycleAlternatives(i) {
  dynamicEl.innerHTML = wrapWithCursor(alternatives[i]);
  if (i < alternatives.length - 1) {
    setTimeout(() => {
      cycleAlternatives(i + 1);
    }, 1000);
  } else {
    // All alternatives have been shown, now trigger fade-in animations
    setTimeout(() => {
      triggerFadeInAnimations();
    }, 700);
  }
}

// Function to trigger fade-in animations for content below typing
function triggerFadeInAnimations() {
  const contentElements = document.querySelectorAll('.content-below-typing');
  contentElements.forEach(element => {
    element.classList.add('fade-in');
  });
}

typeStatic();


