const header = document.querySelector("header");
const firstSkill = document.querySelector(".skill:first-child");
const skillCounterPar = document.querySelectorAll(".counter span");
const progressBar = document.querySelectorAll('.skill-progress svg circle');
// milestones part 
const milestones = document.querySelector(".milestones");
const milestonesCount = document.querySelectorAll(".number span");
// portfolio section 
const portfolioSection = document.querySelector(".portfolio");
const zoomIcon = document.querySelectorAll(".zoom-icon");
const modalOverlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
// active link on scroll 
const section = document.querySelectorAll('section');
const navLink = document.querySelectorAll(".nav-link");
//Dark and Light Button 
const toggleBTn = document.querySelector(".toggle-btn");
//hamburger menu 
const hamburger = document.querySelector(".hamburger");

// Event Listener 
window.addEventListener("scroll", function (){
    activeNavLink();
   if(!skillsPlayed) skillCounter();
  if(!mlCount) milestonesCounter();
    
})


// ***************sticky nav part start *****************

window.addEventListener("scroll", scrolledClassAdd);
function scrolledClassAdd(){
    header.classList.toggle("scrolled", window.pageYOffset > 0)  
}

// ***************Reval Animation  *****************

let sr = ScrollReveal({
    duration: 2500,
    distance: '60px',
})
sr.reveal(".section-info", {delay: 600});
sr.reveal(".section-image", {origin: "top", delay: 600});

// ***************SKILL COUNTER  *****************
function hasReached (e){
    let topPosition = e.getBoundingClientRect().top;
    
    if(window.innerHeight >= topPosition + e.offsetHeight){
        return true;
        
    }else{
        return false;
    }
    
}

function updateCount(num, maxNum){
 let currentNum = +num.innerText;
 
 if(currentNum < maxNum){
    num.innerText = currentNum +1;
    setTimeout(() => {
        updateCount(num, maxNum);
    }, 15);
 }
}
let skillsPlayed = false;
function skillCounter(){
    if(!hasReached(firstSkill)) return;
   
    skillsPlayed = true;
    skillCounterPar.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeValue = 427 - 427 * (target/ 100);
        
        progressBar[i].style.setProperty("--target", strokeValue);

        setTimeout(()=>{
            updateCount(counter, target)
         },400);
    })
   
    progressBar.forEach((p)=>{
        p.style.animation = "progress 2s ease-in-out forwards";
    })        
}
skillCounter();
// ***************SKILL COUNTER  *****************
let mlCount = false;
function milestonesCounter(){
    if(!hasReached(milestones)) return;
    mlCount = true;
    milestonesCount.forEach((count) => {
        let target = +count.dataset.target;

        setTimeout(()=> {
            updateCount(count, target);
        }, 400)
    })
    
}

// ***************PORTFOLIO MIXER  *****************

let mixer = mixitup('.portfolio-gallery',{
    selectors: {
        target: '.portfolio-card'
    },
    animation: {
        duration: 300
    }
});

// ***************PORTFOLIO MIXER  *****************
let currentIndex = 0;
zoomIcon.forEach((icon, i) => {
    icon.addEventListener("click", function () {
        portfolioSection.classList.add("open");
        document.body.classList.add("stop-scrolling")
        currentIndex = i;
        changeImage(currentIndex);
    })
})
modalOverlay.addEventListener("click", function (){
    portfolioSection.classList.remove("open");
    document.body.classList.remove("stop-scrolling")
})
prevBtn.addEventListener("click", function (){
    if(currentIndex === 0){
        currentIndex = 5;
    }else{
        currentIndex--;
    }
    changeImage(currentIndex);
});
nextBtn.addEventListener("click", function (){
    if(currentIndex === 5){
        currentIndex = 0;
    }else{
        currentIndex++;
    }
    currentIndex++;
    changeImage(currentIndex);
})
function changeImage(index){
    images.forEach((img) => {
        img.classList.remove("showImage");
       images[index].classList.add("showImage");
    })
}

// testimonial swiper plugin used 

const swiper = new Swiper('.swiper', {

    loop: true,
    speed: 500,
    autoplay: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  

  });
  

// ***************CHANGE ACTIVE LINK ON SCROLL  *****************

function activeNavLink(){
    let sections = document.querySelectorAll("section[id]");
    let passedSection = Array.from(sections).map((sec, i) => {
        return {
            y: sec.getBoundingClientRect().top - header.offsetHeight,
            id: i,
        };
    }).filter(sct => sct.y <= 0)
  
    let currentSectionId = passedSection.at(-1).id;
     navLink.forEach(l => l.classList.remove("active"));
     navLink[currentSectionId].classList.add("active");
}
activeNavLink();
function activeLink(){
    navLink.forEach((item) =>
    item.classList.remove('active'));
    this.classList.add('active');
}
navLink.forEach((item) =>
item.addEventListener('click',activeLink));

// change theme javascript file

let firstTheme = localStorage.getItem("dark");

changeTheme(+firstTheme);

function changeTheme(isDark) {
    
     if(isDark){
         document.body.classList.add("dark");
         toggleBTn.classList.replace("uil-moon", "uil-sun")
         localStorage.setItem("dark", 1);
        }else{
         document.body.classList.remove("dark");
         toggleBTn.classList.replace("uil-sun", "uil-moon")
         localStorage.setItem("dark", 0);
        }
     
}

toggleBTn.addEventListener("click", function(){
    changeTheme(!document.body.classList.contains("dark"))
});

//hamburger menu open 
hamburger.addEventListener("click", function (){
    document.body.classList.toggle("open");
    document.body.classList.toggle("stop-scrolling")
})