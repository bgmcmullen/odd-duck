'use strict';


// Global Variables
let votingRounds = 25;
let productArray = [];

// DOM Windows
const imgOne = document.getElementsByClassName('image-1')[0];
const imgTwo = document.getElementsByClassName('image-2')[0];
const imgThree = document.getElementsByClassName('image-3')[0];
const resultBtn = document.getElementById('show-result-btn');
const text = document.getElementsByClassName('text')[0];
const blankArea = document.getElementsByClassName('blank-area')[0];


const imageArray = [imgOne, imgTwo, imgThree];


// Contructor Function
function Product(name, imageExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.votes = 0;
  this.views = 0;
}

// Helper Function
function randomIndexGenerator(){
  return Math.floor(Math.random() * productArray.length);
}


function renderImgs(){
  //Get 3 random images on the page
  let imageOneIndex = 0;
  let imageTwoIndex = 0;
  let imageThreeIndex = 0;

  //make sure the yare unique
  while(imageOneIndex === imageTwoIndex || imageOneIndex === imageThreeIndex || imageTwoIndex === imageThreeIndex){
    imageOneIndex = randomIndexGenerator();
    imageTwoIndex = randomIndexGenerator();
    imageThreeIndex = randomIndexGenerator();
  }

  imgOne.src = productArray[imageOneIndex].image;
  imgOne.title = productArray[imageOneIndex].name;

  imgTwo.src = productArray[imageTwoIndex].image;
  imgTwo.title = productArray[imageTwoIndex].name;

  imgThree.src = productArray[imageThreeIndex].image;
  imgThree.title = productArray[imageThreeIndex].name;

  //Increase the products views
  productArray[imageOneIndex].views++
  productArray[imageTwoIndex].views++
  productArray[imageThreeIndex].views++
}

//event handlers
function handleImgClick(event){


  let imageClicked = event.target.title;

  //increase the vote
  for(let i = 0; i < productArray.length; i++){
    if(imageClicked === productArray[i].name){
      productArray[i].votes++;
      votingRounds--;
      blankArea.textContent = `Please vote for your favorate products. ${votingRounds} choices remaining.`
      renderImgs();
    }
  }

  if(votingRounds === 0){
    for(let i = 0; i < imageArray.length; i++){
      imageArray[i].removeEventListener('click', handleImgClick);
    }
    resultBtn.style.animation = 'flash 2s linear infinite';
  }
}

function handleShowResults(){
  if(votingRounds === 0){
    for(let i = 0; i < productArray.length; i++){

      let productListItem = document.createElement('li');
      if(productArray[i].votes === 0 && productArray[i].views !== 0)
        productListItem.textContent = `${productArray[i].name} - Votes: ${productArray[i].votes} 😢 & Views: ${productArray[i].views}`;
      else 
        productListItem.textContent = `${productArray[i].name} - Votes: ${productArray[i].votes} & Views: ${productArray[i].views}`;

      text.appendChild(productListItem);
    }
    resultBtn.removeEventListener('click', handleShowResults);
    resultBtn.style.animation = '';
  }
}

//products
const bag = new Product('bag');
const banana = new Product('banana');
const bathroom = new Product('bathroom')
const boots = new Product('boots')
const breakfast = new Product('breakfast')
const bubblegum = new Product('bubblegum')
const chair = new Product('chair')
const cthulhu = new Product('cthulhu')
const dogDuck = new Product('dog-duck')
const dragon = new Product('dragon')
const pen = new Product('pen')
const petSweep = new Product('pet-sweep')
const scissors = new Product('scissors')
const shark = new Product('shark')
const sweep = new Product('sweep', 'png')
const tauntaun = new Product('tauntaun')
const unicorn = new Product('unicorn')
const waterCan = new Product('water-can')
const wineGlass = new Product('wine-glass')

productArray.push(
  bag,
  banana,
  bathroom,
  boots,
  breakfast,
  bubblegum,
  chair,
  cthulhu,
  dogDuck,
  dragon,
  pen,
  petSweep,
  scissors,
  shark,
  sweep,
  tauntaun,
  unicorn,
  waterCan,
  wineGlass);

  renderImgs();

  function addListeners(){
    for(let i = 0; i < imageArray.length; i++){
      imageArray[i].addEventListener('click', handleImgClick);
    }
  }
  addListeners();

  resultBtn.addEventListener('click', handleShowResults);
