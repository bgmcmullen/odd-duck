'use strict';


// Global Variables
let votingRounds = 25;
let productArray = [];
let previousImgNums = [];

// DOM Windows
const imgOne = document.getElementsByClassName('image-1')[0];
const imgTwo = document.getElementsByClassName('image-2')[0];
const imgThree = document.getElementsByClassName('image-3')[0];
const resultBtn = document.getElementById('show-result-btn');
const text = document.getElementsByClassName('text')[0];
const blankArea = document.getElementsByClassName('blank-area')[0];
const ctx = document.getElementById('myChart');

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

  //Get 3 random images on the page and make sure they are unique
function renderImgs(){

  let imageOneIndex = 0;
  let imageTwoIndex = 0;
  let imageThreeIndex = 0;

  while(imageOneIndex === imageTwoIndex || imageOneIndex === imageThreeIndex || imageTwoIndex === imageThreeIndex
    || previousImgNums.includes(imageOneIndex) || previousImgNums.includes(imageTwoIndex) || previousImgNums.includes(imageThreeIndex)){
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

  previousImgNums = [imageOneIndex, imageTwoIndex, imageThreeIndex];
}

//event handlers
function handleImgClick(event){
  let imageClicked = event.target.title;

  //increase the vote
  for(let i = 0; i < productArray.length; i++){
    if(imageClicked === productArray[i].name){
      productArray[i].votes++;
      votingRounds--;
      blankArea.textContent = `Please vote for your favorite products. ${votingRounds} choices remaining.`
      renderImgs();
    }
  }

  if(votingRounds === 0){
    for(let i = 0; i < imageArray.length; i++){
      imageArray[i].removeEventListener('click', handleImgClick);
    }
    resultBtn.style.animation = 'flash 2s linear infinite';

    //send data to local storage
    let stringifiedProducts = JSON.stringify(productArray);

    localStorage.setItem('myProducts', stringifiedProducts);
  
  }
}

//show results on bar chart
function handleShowResults(){
  if(votingRounds === 0){
    let votesArray = [];
    let viewsArray = [];
    let namesArray = [];
    for(let i = 0; i < productArray.length; i++){

      votesArray.push(productArray[i].votes);
      viewsArray.push(productArray[i].views);
      namesArray.push(productArray[i].name)
    }
    let chartObj = {
      type: 'bar',
      data: {
        labels: namesArray,
        datasets: [{
          label: 'Votes',
          data: votesArray,
          borderWidth: 5,
          backgroundColor: 'blue',
          borderColor: 'red'
        },
        {
          label: 'Views',
          data: viewsArray,
          borderWidth: 5,
          backgroundColor: 'red',
          borderColor: 'blue',
        }
      ]
    },
      options: {

        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    }
      
      new Chart(ctx, chartObj);
    
    resultBtn.removeEventListener('click', handleShowResults);
    resultBtn.style.animation = '';
  }
}

//retrieve data from local storage
let retrievedProducts = JSON.parse(localStorage.getItem('myProducts'));

if(retrievedProducts){
  //add stored data to objects
  for(let i = 0; i < retrievedProducts.length; i++){
    let recontructedProduct = new Product(retrievedProducts[i].name, retrievedProducts[i].image.slice(-3));
    recontructedProduct.views = retrievedProducts[i].views;
    recontructedProduct.votes = retrievedProducts[i].votes;
    productArray.push(recontructedProduct);
  }
} 
else{

  //create objects
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
  
}






  renderImgs();

  function addListeners(){
    for(let i = 0; i < imageArray.length; i++){
      imageArray[i].addEventListener('click', handleImgClick);
    }
  }
  addListeners();

  resultBtn.addEventListener('click', handleShowResults);

