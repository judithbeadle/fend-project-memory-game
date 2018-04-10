/*
 * Create a list that holds all of your cards
 */

const container = document.querySelector('.container');
const scorePanel = document.querySelector('.score-panel');
const stars = Array.from(document.getElementsByClassName('fa-star'));
const summaryPanel = document.createElement('div');
const deck = document.querySelector('.deck');
const allCards = Array.from(deck.getElementsByClassName('card'));
const openCards = [];
const matchedCards = [];
const restartButton = document.querySelector('.restart');
let timer = null;
let seconds = 0;
let moves = 0;


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle() {
    // remove all li.cards from the DOM
    allCards.forEach(function (item) {
	    item.remove();
	});
	//shuffle credit https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
	for (let i = allCards.length - 1; i > 0; i--) {
	    const j = Math.floor(Math.random() * (i + 1));
	    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
	}
    // add back
    allCards.forEach(function (item) {
	    deck.appendChild(item);
	});
}

function runTimer(){
	seconds ++;
	displayTime();
}

function displayTime(){
	document.querySelector('.timer').innerHTML = seconds;
}

function stopTimer() {
    clearInterval(timer);
    console.log('timer stopped after ' + seconds + 'seconds');
}

function showcard(event){
	if ((event.target.className === 'card') && (openCards.length < 2)) {
		console.log('clicked' + event.target.className);
		console.log(openCards.length)
		let thisCard = event.target;
		revealIcon(thisCard);
		addtoOpenCards(thisCard);
		if (openCards.length == 2){
			compareCards();
		}
		if (openCards.length == 1 && moves == 0){
			timer = setInterval(function(){runTimer()},1000);
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
	countMoves();
	displayMoves();
	const openCard1 = openCards[0];
	const openCard2 = openCards[1];
	const symbol1 = openCard1.getElementsByTagName('i')[0].classList.item(1);
	const symbol2 = openCard2.getElementsByTagName('i')[0].classList.item(1);

	if (symbol1 == symbol2){
		openCard1.className = 'card match';
		openCard2.className = 'card match';
		matchedCards.push(openCard1, openCard2);
		openCards.length = 0;
	} else {
		openCard1.classList.add('wrong');
		openCard2.classList.add('wrong');
		setTimeout(function(){
			openCard1.className = 'card';
			openCard2.className = 'card';
			openCards.length = 0;
		}, 1000)
	}
	if (allCards.length === matchedCards.length){
		endGame();
	}
}

function countMoves(){
	moves++;
}

function displayMoves(){
	document.querySelector('.moves').innerHTML = moves;
	const star1 = stars[0];
	const star2 = stars[1];
	const star3 = stars[2];
	if (moves > 12 ){
		star1.classList.remove('fa-star');
		star1.classList.add('fa-star-o');
	}
	if (moves > 18 ){
		star2.classList.remove('fa-star');
		star2.classList.add('fa-star-o');
	}
	if (moves > 24 ){
		star3.classList.remove('fa-star');
		star3.classList.add('fa-star-o');
	}
}


function gameSummary(){
	container.prepend(summaryPanel);
	summaryPanel.className = 'summary-panel';
	summaryPanel.innerHTML = '<h2>You won!</h2>' + document.querySelector('.stars').outerHTML + '<p>It took you <strong>' + moves + ' moves </strong> and <strong>' + seconds + ' seconds</strong> to match all cards. <p>Want to play again?</p>';
	summaryPanel.append(restartButton);
}

function newGame(){
	for (i = 0; i < allCards.length; i++) {
		allCards[i].className = 'card';
	}
	matchedCards.length = 0;
	moves = 0;
	seconds = 0;
	shuffle();
	displayMoves();
	displayTime();
	const removedPanel = summaryPanel.remove();
	scorePanel.append(restartButton);
	container.classList.remove('end');
	stars.forEach(function(star) {
	  star.className = 'fa fa-star';
	});
}

function endGame() {
	stopTimer();
	gameSummary();
	container.classList.add('end');
}



//starting up
newGame();
deck.addEventListener('click', showcard);
restartButton.addEventListener('click', newGame);






/*
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
