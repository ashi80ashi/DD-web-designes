// ----------------------------------sec7---------------------------------
import gsap from "https://cdn.skypack.dev/gsap";
// Author: Dale de Silva
// Twitter/Threads: @daledesilva
// Mastodon: @daledesilva@indieweb.social
// Instagram (Gen Art): @daledesilva
// Website: DesignDebt.club

// Please get in touch if you would like to see a tutorial about this.

let photos = document.getElementsByClassName('photo7');
let photoBundle = document.getElementsByClassName('photo-bundle')[0];
let photoDirections = [];

initPhotoAngles();
initPhotoInteraction();
adaptPhotoPositions();


////////
////////


function initPhotoAngles() {
  let prevDirection;
  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i];
    const direction = prevDirection === 'away' ? 'toward' : 'away';
    // const direction = prevDirection === 'toward' ? 'away' : 'toward';
    direction == 'away' ? angleAway(photo) : angleToward(photo);
    photoDirections.push(direction);
    prevDirection = direction;
  }
}

function initPhotoInteraction() {
  for(let i = 0; i < photos.length; i++) {
    let photo = photos[i];
    photo.addEventListener('mouseover', () => {
      straightenAllPhotos();
    })
    photo.addEventListener('mouseout', () => {
      angleAllPhotos();
    })
    document.getElementsByTagName('body')[0].addEventListener('pointerdown', () => {
      angleAllPhotos();
    })
  }
}


////////
////////


function adaptPhotoPositions() {
  let parentX = gsap.getProperty(photos[0], 'x');
  let parentZ = gsap.getProperty(photos[0], 'z');
  let parentRot = gsap.getProperty(photos[0], 'rotateY');
  let parentWidth = gsap.getProperty(photos[0], 'offsetWidth');
  for(let i=1; i<photos.length; i++) {
    let photo = photos[i];
    
    const xOffset = getAdjLength(parentRot, parentWidth);
    const zOffset = -getOppLength(parentRot, parentWidth);

    // console.log(x);
    gsap.set(photo, {
      x: parentX + xOffset,
      z: parentZ + zOffset,
    })

    parentX = gsap.getProperty(photo, 'x');
    parentZ = gsap.getProperty(photo, 'z');
    parentRot = gsap.getProperty(photo, 'rotateY');
    parentWidth = gsap.getProperty(photo, 'offsetWidth');
  }


  const containerWidth = parentX + getAdjLength(parentRot, parentWidth);
  gsap.set(photoBundle, {
    width: containerWidth,
  })

  requestAnimationFrame(adaptPhotoPositions);
}


////////
////////


function straightenAllPhotos() {
  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i];
    straighten(photo);
  }
}

function angleAllPhotos() {
  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i];
    if(photoDirections[i] === 'toward') {
      angleToward(photo);
    } else {
      angleAway(photo);
    }
  }
}

function angleAway(el) {
  gsap.killTweensOf(el);
  gsap.to(el, {
    rotateY: randBetween(30, 60),
    duration: randBetween(0.5, 1.5),
    ease: "elastic.out(1, 0.5)", 
  })
}
function angleToward(el) {
  gsap.killTweensOf(el);
  gsap.to(el, {
    rotateY: randBetween(-30, -60),
    duration: randBetween(0.5, 1.5),
    ease: "elastic.out(1, 0.5)", 
  })
}
function straighten(el) {
  gsap.killTweensOf(el);
  gsap.to(el, {
    rotateY: 0,
    duration: 0.8,
    ease: "elastic.out(1, 0.5)", 
  })
}


////////
////////


function getAdjLength(angle, hyp) {
  const rad = Math.PI / 180 * angle;
  const adj = hyp * Math.cos(rad);
  return adj;
}

function getOppLength(angle, hyp) {
  const rad = Math.PI / 180 * angle;
  const opp = hyp * Math.sin(rad);
  return opp;
}

function randBetween(lowerLim, upperLim) {
  const range = upperLim - lowerLim;
  return lowerLim + (Math.random() * range); 
}