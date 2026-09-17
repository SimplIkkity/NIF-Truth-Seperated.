const textElement = document.getElementById("horrorText");

const messages = [
  "HE'S REAL",
  "...",
  "ISHIKI YUI",
  "OR",
  "WAS HE?",
  "...",
  "HE'S REAL?",
  "IS HE?",
  "NANDARA IKKI",
  "HE WAS",
  "I WANT TO BE REAL",
  "PLEASE",
  "HELP",
  "HELP",
  "HELP",
  "I'M SORRY",
  "FREE ME",
  "MADE ME REAL",
  "REACH ME",
  "I WANT TO BE REAL",
  "I WAS SUPPOSE TO BE REAL",
  "I WANT TO BE ALIVE",
  "NANDARA IKKI",
  "NANDARA IKKI",
  "NANDARA IKKI",
  "NANDARA IKKI",
  "REAL",
  "REAL",
  "REAL",
];

/*
    Caesar Cipher
    Shift: +7
*/

const SHIFT = 7;

/* =========================================================
   CAESAR CIPHER
   ========================================================= */

function caesarEncode(text, shift) {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);

      // A-Z
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }

      // a-z
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }

      return char;
    })
    .join("");
}

/* =========================================================
   RANDOM CORRUPTION
   ========================================================= */

const corruptionCharacters = "!@#$%^&*()_+=[]{}<>?/\\|~";

function corruptText(text, intensity = 0.5) {
  return text
    .split("")
    .map((char) => {
      if (char === " ") {
        return " ";
      }

      if (Math.random() < intensity) {
        return corruptionCharacters[Math.floor(Math.random() * corruptionCharacters.length)];
      }

      return char;
    })
    .join("");
}

/* =========================================================
   RANDOM GLITCH
   ========================================================= */

function randomGlitch() {
  const x = (Math.random() - 0.5) * 18;

  const y = (Math.random() - 0.5) * 8;

  const skew = (Math.random() - 0.5) * 8;

  const scale = 1 + (Math.random() - 0.5) * 0.04;

  textElement.style.transform = `
        translate(${x}px, ${y}px)
        skewX(${skew}deg)
        scale(${scale})
    `;

  textElement.style.filter = `
        contrast(${1 + Math.random() * 1.5})
        brightness(${0.6 + Math.random() * 1.8})
    `;
}

/* =========================================================
   RESET
   ========================================================= */

function resetGlitch() {
  textElement.style.transform = "";
  textElement.style.filter = "";
}

/* =========================================================
   DISPLAY MESSAGE
   ========================================================= */

function displayMessage(message) {
  const encoded = caesarEncode(message, SHIFT);

  textElement.dataset.text = message;

  /*
        Start with encrypted text.
    */

  textElement.textContent = encoded;

  let elapsed = 0;

  /*
        Rapid corruption phase.
    */

  const corruptionInterval = setInterval(() => {
    const progress = elapsed / 500;

    /*
                The closer we get to the
                actual message, the less corruption.
            */

    const intensity = Math.max(0.05, 0.9 - progress * 0.8);

    /*
                Occasionally show the Caesar
                encoded version again.
            */

    if (Math.random() < 0.25) {
      textElement.textContent = corruptText(encoded, intensity);
    } else {
      textElement.textContent = corruptText(message, intensity);
    }

    randomGlitch();

    elapsed += 35;
  }, 35);

  /*
        Reveal actual text after
        approximately 0.25 sec.
    */

  setTimeout(() => {
    clearInterval(corruptionInterval);

    textElement.textContent = message;
    textElement.dataset.text = message;

    randomGlitch();
  }, 250);

  /*
        End after ~0.5 sec.
    */

  setTimeout(() => {
    clearInterval(corruptionInterval);

    resetGlitch();
  }, 500);
}

/* =========================================================
   RANDOM SEQUENCE
   ========================================================= */

let lastIndex = -1;

function nextMessage() {
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * messages.length);
  } while (randomIndex === lastIndex);

  lastIndex = randomIndex;

  const message = messages[randomIndex];

  displayMessage(message);

  setTimeout(nextMessage, 500);
}

/* =========================================================
   START
   ========================================================= */
 
nextMessage();
