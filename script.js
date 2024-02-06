const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

var screen, starArr;

var params ={ speed:5, count: 400, life: 5};

setup()
update()

window.onresize =function(){
    setup();
}
function Star(){
    this.x = Math.random()* canvas.width;
    this.y =Math.random()* canvas.height;
    this.z = Math.random()* canvas.width;


    this.move =function(){
        this.z -= params.speed;

        if(this.z <= 0){
            this.z = canvas.width;
        }
    };

    this.show = function(){
        let x,y,radius,opacity;

        radius = canvas.width / this.z;
        screen.c = [window.innerWidth*0.5,window.innerHeight*0.5]
        x = (this.x - screen.c[0]) * radius;
        x = x + screen.c[0];
        y = (this.y - screen.c[0]) * radius;
        y = y+ screen.c[1];

        opacity = radius>params.life ? (2-radius/params.life) * 1.5:1;

        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,"+opacity+")";
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    };
}


function setup(){
    screen = {
        w: window.innerWidth,
        h: window.innerHeight,
        c: [window.innerWidth * 0.5, window.innerHeight * 0.5],

    };
    window.cancelAnimationFrame(update);
    canvas.width =screen.w;
    canvas.height = screen.h;

    starArr = [];

    for(var i = 0; i< params.count; i++){
        starArr[i] = new Star();
    }
}

function update(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    starArr.forEach(function (s){
        s.show();
        s.move();
    });

    window.requestAnimationFrame(update);
}
/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
/*==================== SHOW SCROLL Up ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)
