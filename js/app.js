/*
 * Create a list that holds all of your cards
 */

const deck = document.querySelector('.deck');
const allCards = Array.from(deck.getElementsByClassName('card'));
const openCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function showcard(event){
	if (event.target.nodeName === 'LI') {
		console.log('clicked' + event.target.className);
		let thisCard = event.target;
		revealIcon(thisCard);
		addtoOpenCards(thisCard);
		if (openCards.length == 2){
			compareCards();
		}
	};
}

function revealIcon(thisCard){
	thisCard.classList.toggle("open");
	console.log('icon revealed');
}

function addtoOpenCards(thisCard){
	console.log('added to open cards');
	openCards.push(thisCard);
}

function compareCards(){
	const openCard1 = openCards[0];
	const openCard2 = openCards[1];
	const symbol1 = openCard1.getElementsByTagName('i')[0].classList.item(1);
	const symbol2 = openCard2.getElementsByTagName('i')[0].classList.item(1);

	if (symbol1 == symbol2){
		openCard1.className('card match');
		openCard2.className('card match');
	} else {
		openCard1.classList.add('wrong');
		openCard2.classList.add('wrong');
	}
	setTimeout(function(){
		openCard1.className('card');
		openCard2.className('card');
		openCards.length = 0;
	}, 1000)
}

//set up the event listener for a card. If a card is clicked:

deck.addEventListener('click', showcard);

/*
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
