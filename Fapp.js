const RoversUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
const my_key = config.NASA_API_KEY;

let inputsForm = document.querySelector('.input-data');
let roversValue;
let cameraValue;
let solValue;
let pageValue;

let selectRovers = inputsForm.rovers; // Форма
const dispResBody = document.querySelector('.display-result'); // Блок виводу результату
const emptyResult = document.querySelector('.empty-result');
let moreButton = document.querySelector('.load-more');
let body = document.querySelector('body');
let upBtn = document.querySelector('.up-btn-body');

document
	.querySelector('#showButton')
	.addEventListener('click', function (event) {
		event.preventDefault();
		dispResBody.innerHTML = '';
		emptyResult.innerHTML = '';
		roversValue = inputsForm.rovers.value;
		cameraValue = inputsForm.cameras.value;
		solValue = inputsForm.sol.value;
		pageValue = 1;
		// console.log(roversValue, cameraValue, solValue);

		fetchNasaRover(roversValue, cameraValue, solValue, pageValue);
	});

document.querySelector('#loadMore').addEventListener('click', function (event) {
	event.preventDefault();
	roversValue = inputsForm.rovers.value;
	cameraValue = inputsForm.cameras.value;
	solValue = inputsForm.sol.value;
	pageValue += 1;
	fetchNasaRover(roversValue, cameraValue, solValue, pageValue);
});

const fetchNasaRover = async (rover, camera, sol, page) => {
	try {
		const roverName = rover + '/photos?';
		const cameraName = 'camera=' + camera + '&';
		const solName = 'sol=' + sol + '&';
		const apiKey = 'api_key=' + my_key;
		const pageNumber = 'page=' + page + '&';

		const response = await fetch(
			`${RoversUrl}${roverName}${solName}${cameraName}${pageNumber}${apiKey}`
		); // Складаємо рядки двох змінних в адресу запиту
		const data = await response.json(); // Отримуємо відповідь в форматі json
		console.log(data);
		if (page <= 1) {
			displayExp(data);
		} else {
			displayMore(data);
		}
	} catch (error) {
		console.log(error);
		emptyResult.innerHTML = `${error}`;
	}
};

const displayExp = (data) => {
	if (data.photos.length !== 0) {
		dispResBody.classList.add('export');

		data.photos.forEach((item, index, array) => {
			dispResBody.insertAdjacentHTML(
				'beforeend',
				`<div class="display-result__item">
               <img class="item-image" src="${data.photos[index].img_src}" alt="astronomy image by NASA">
               <div class="item-logo">
                  <p>Show more</p>
               </div>
               <div class="item-popup">
                  <div class="item-popup-image">
                     <img src="${data.photos[index].img_src}" alt="astronomy image by NASA">
                  </div>
                  <p>${data.photos[index].camera.full_name}</p>
                  <div class="close-pop">
                     <div></div>
                     <div></div>
                  </div>
               </div>
            </div>`
			);
		});
		dispResBody.scrollIntoView(true);

		moreButton.classList.add('show');

		let itemLogo = document.querySelectorAll('.item-logo');
		let itemPopup = document.querySelectorAll('.item-popup');
		let closePopup = document.querySelectorAll('.close-pop');

		if (itemLogo && itemPopup) {
			itemLogo.forEach((item, index, array) => {
				item.addEventListener('click', function (event) {
					itemPopup[index].classList.add('showpop');
					document.body.classList.add('scroll-lock');
				});
				closePopup[index].addEventListener('click', function (event) {
					itemPopup[index].classList.remove('showpop');
					document.body.classList.remove('scroll-lock');
				});
			});
		}
	} else {
		emptyResult.innerHTML = 'There are no results for this query';
	}
};

const displayMore = (data) => {
	if (data.photos.length !== 0) {
		data.photos.forEach((item, index, array) => {
			dispResBody.insertAdjacentHTML(
				'beforeend',
				`<div class="display-result__item">
               <img class="item-image" src="${data.photos[index].img_src}" alt="astronomy image by NASA">
               <div class="item-logo">
                  <p>Show more</p>
               </div>
               <div class="item-popup">
                     <div class="item-popup-image">
                        <img src="${data.photos[index].img_src}" alt="astronomy image by NASA">
                     </div>
                     <p>${data.photos[index].camera.full_name}</p>
                     <div class="close-pop">
                        <div></div>
                        <div></div>
                     </div>
                  </div>
            </div>`
			);
		});

		let itemLogo = document.querySelectorAll('.item-logo');
		let itemPopup = document.querySelectorAll('.item-popup');
		let closePopup = document.querySelectorAll('.close-pop');

		if (itemLogo && itemPopup) {
			itemLogo.forEach((item, index, array) => {
				item.addEventListener('click', function (event) {
					itemPopup[index].classList.add('showpop');
				});
				closePopup[index].addEventListener('click', function (event) {
					itemPopup[index].classList.remove('showpop');
				});
			});
		}
	} else {
		emptyResult.innerHTML = 'No more photos';
		body.scrollIntoView(false);
	}
};

let solInput = document.querySelector('#sol');
solInput.addEventListener('focus', function (event) {
	event.target.value = '';
});

window.addEventListener('scroll', function (event) {
	let exportCoord =
		dispResBody.getBoundingClientRect().top + window.pageYOffset;
	if (scrollY >= exportCoord) {
		upBtn.classList.add('show');
	} else {
		upBtn.classList.remove('show');
	}
});
