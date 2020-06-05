// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

function addRandomQuote() {
    const quotes = 
    ['“Love is putting someone else’s needs before yours.” — Olaf, Frozen',
    '"You\'ve got a friend in me." — Toy Story', 
    '"All it takes is faith and trust." — Peter Pan',
    '"Even miracles take a little time." — Fairy Godmother, Cinderella',
    '"Don\'t just fly, soar." — Dumbo',
    '"Ohana means family, family means nobody gets left behind or forgotten" — Lilo and Stitch'];
    
    // Pick a random greeting.
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    // Add it to the page.
    const quotesContainer = document.getElementById('quotes-container');
    quotesContainer.innerText = quote;
}
