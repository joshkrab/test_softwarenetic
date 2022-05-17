const url = 'https://api.nasa.gov/planetary/apod?api_key=';
const api_key = config.NASA_API_KEY;

// API APOD возвращает данные в формате JSON, поэтому давайте воспользуемся этим
// .json() методом для преобразования ответа в объект JavaScript.

// Функция fetch выполняет запрос и возвращает промис, который будет ждать,
// когда запрос завершится.
// После этого промис выполняется (resolve) с объектом Response (ответ сервера).
// Если во время запроса произошла какая - то ошибка, промис переходит в состояние rejected.

// Синтаксис async/await прекрасно сочетается с fetch() и помогает упростить работу с промисами.

// async - кажемо, що функція буде асінхронною
// Внутри она использует await, чтобы дождаться выполнения асинхронной операции fetch

// Змінна response - поверне об'єкт з відповіддю сервера

// Из объекта response, который возвращается из await fetch()
// можно извлечь данные в нескольких разных форматах.
// Чаще всего используется JSON: const movies = await response.json();

// Этот метод возвращает промис, так что придется снова воспользоваться синтаксисом await,
// чтобы дождаться его выполнения: await response.json()

// fetch(resource[, options]);
// Первый параметр resource — это URL-адрес запроса и объект Request.

// const fetchNASAData = async () => {
//    // Вказуємо ассінхронність
//    try {
//       const response = await fetch(`${url}${api_key}`); // Складаємо рядки двох змінних в адресу запиту
//       const data = await response.json(); // Отримуємо відповідь в форматі json - пишемо об'єкт у змінну
//       console.log('NASA APOD data', data);
//       displayData(data);
//    } catch (error) {
//       console.log(error);
//    }
// };

// const displayData = (data) => {
//    document.getElementById('title').textContent = data.title;
//    document.getElementById('date').textContent = data.date;
//    document.getElementById('picture').src = data.hdurl;
//    document.getElementById('explanation').textContent = data.explanation;
// };

// fetchNASAData();

// ------- lesson -------------------------------------------------------------------------

// function nasarequested() {
//    const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
//    const apiKey = config.NASA_API_KEY;
//    const dateInput = document.querySelector('#datepicker');
//    const title = document.querySelector('#title2');
//    const copyright = document.querySelector('#copyright');
//    const mediaSection = document.querySelector('#media-section');
//    const information = document.querySelector('#description');

//    const currentDate = new Date().toISOString().slice(0, 10);

//    const imageSection = `<a id="hdimg" href="" target="-blank">
//      <div class="image-div">
//      <img id="image_of_the_day" src="" alt="image-by-nasa">
//      </div>
//     </a>`;

//    const videoSection = `<div class="video-div"> <iframe id="videoLink" src="" frameborder="0"></iframe></div>`;

//    let newDate = '&date=' + dateInput.value + '&';

//    function fetchData() {
//       try {
//          fetch(baseUrl + apiKey + newDate)
//             .then((response) => response.json())
//             .then((json) => {
//                console.log(json);
//                diplaydata(json);
//             });
//       } catch (error) {
//          console.log(error);
//       }
//    }

//    function diplaydata(data) {
//       title.innerHTML = data.title;

//       if (data.hasOwnProperty('copyright')) {
//          copyright.innerHTML = data.copyright;
//       } else {
//          copyright.innerHTML = '';
//       }

//       date.innerHTML = data.date;
//       dateInput.max = currentDate;
//       dateInput.min = '1995-06-16';

//       if (data.media_type == 'video') {
//          mediaSection.innerHTML = videoSection;
//          document.getElementById('videoLink').src = data.url;
//       } else {
//          mediaSection.innerHTML = imageSection;
//          document.getElementById('hdimg').href = data.hdurl;
//          document.getElementById('image_of_the_day').src = data.url;
//       }
//       information.innerHTML = data.explanation;
//    }
//    fetchData();
// }

// const dateInput = document.querySelector('#datepicker');
// dateInput.addEventListener('change', (e) => {
//    e.preventDefault();
//    nasarequested();
// });

// Test task --------------------------------------------------------------------------------------
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
      const data = await response.json(); // Отримуємо відповідь в форматі json - пишемо об'єкт у змінну
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
   // data то наш об'єкт

   //    document.getElementById('title').textContent = data.title;
   //    document.getElementById('date').textContent = data.date;
   //    document.getElementById('picture').src = data.hdurl;
   //    document.getElementById('explanation').textContent = data.explanation;

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

// dispResBody.addEventListener('focusin', function (event) {
//    upBtn.classList.add('show');
// });
// dispResBody.addEventListener('focusout', function (event) {
//
// });

window.addEventListener('scroll', function (event) {
   let exportCoord =
      dispResBody.getBoundingClientRect().top + window.pageYOffset;
   if (scrollY >= exportCoord) {
      upBtn.classList.add('show');
   } else {
      upBtn.classList.remove('show');
   }
});
