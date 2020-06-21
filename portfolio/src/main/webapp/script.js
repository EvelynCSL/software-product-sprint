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
 * Adds a random quote to the page.
 */

function addRandomQuote() {
    const quotes = 
    ['“Love is putting someone else’s needs before yours.” — Olaf, Frozen',
    '"You\'ve got a friend in me." — Toy Story', 
    '"All it takes is faith and trust." — Peter Pan',
    '"Even miracles take a little time." — Fairy Godmother, Cinderella',
    '"Don\'t just fly, soar." — Dumbo',
    '"Ohana means family, family means nobody gets left behind or forgotten" — Lilo and Stitch'];
    
    // Pick a random quote.
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    // Add it to the page.
    const quotesContainer = document.getElementById('quotes-container');
    quotesContainer.innerText = quote;
}

/**
 * Fetches the json message from the server and adds it to the DOM.
 */
function getJsonMessage() {
  console.log('Fetching the json message.');

  // The fetch() function returns a Promise because the request is asynchronous.
  const responsePromise = fetch('/data');

  // When the request is complete, pass the response into handleResponse().
  responsePromise.then(handleResponse);
}

/**
 * Handles response by converting it to text and passing the result to
 * addQuoteToDom().
 */
function handleResponse(response) {
  console.log('Handling the response.');

  // response.text() returns a Promise, because the response is a stream of
  // content and not a simple variable.
  const textPromise = response.text();

  // When the response is converted to text, pass the result into the
  // addQuoteToDom() function.
  textPromise.then(addMessageToDom);
}

/** Adds the welcome message to the DOM. */
function addMessageToDom(message) {
  console.log('Adding message to dom: ' + message);

  var comment = message.substring(1,message.length-2).split(",");
  var returnVal = "";

  const messageContainer = document.getElementById('message-container');
  
  comment.forEach(function(item) {
    item = item.replace(/\"/ig, '');
    returnVal += item + "<br>";
  })
  
  messageContainer.innerHTML = returnVal;
}