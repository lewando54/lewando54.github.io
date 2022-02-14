localStorage.getItem('lang') ? null : localStorage.setItem('lang', 'en')

let localisation = {
    lang: {
        pl: "Język:",
        en: "Language:"
    },
    menu: {
        about: {
            pl: 'O mnie',
            en: 'About me'
        },
        works: {
            pl: 'Moje prace',
            en: 'My works'
        },
        whatido: {
            pl: 'Co robię',
            en: 'What I do'
        },
        contact: {
            pl: 'Kontakt',
            en: 'Contact'
        }
    },
    sections:{
        greeting: {
            pl: 'Cześć!<br>Jestem Jakub i jestem web developerem.',
            en: `Hi!<br>My name's Jacob and I am a web developer.`
        },
        about: {
            pl: 'Projektowaniem witryn zainteresowałem się głównie w Technikum, ale moja przygoda z programowaniem i komputerami zaczęła się znacznie wcześniej w Szkole Podstawowej.',
            en: `I've become interested in web dev at high school, but my adventure with programming and computers in general started earlier in Primary School.`
        },
        works: {
            pl: `<p>Tu znajdują się moje przykładowe projekty:</p>`,
            en: `<p>Here are my example projects:</p>`,
            examples: [
                {
                    title: {
                        pl: `Strona szkoły CKZiU w Brodnicy (MEN)`,
                        en: `Schools 'CKZiU in Brodnica' website`
                    },
                    thumbnail: `ckziu212.png`,
                    url: `http://ckziubrodnica.pl/`
                },
                {
                    title: {
                        pl: `Klikacz Gold The Game`,
                        en: `Clicker Gold The Game`
                    },
                    thumbnail: `gtg.png`,
                    url: `http://goldthegame.epizy.com/`
                },
                {
                    title: {
                        pl: `Aplikacja w stylu Omegle (czat tekstowy): Talk.io`,
                        en: `Omegle text chat like app: Talk.io`
                    },
                    thumbnail: `talkio.png`,
                    url: `https://talk-io54.herokuapp.com/`
                }
            ]
        },
        whatido: {
            pl: `Umiem programować w PHP, C++, JS i Pythonie (python na poziomie początkującym), oraz uczę się frameworka React.js. Mam też dobry zmysł estetyki i zwracam uwagę na najmniejsze szczegóły. CSS'a znam bardzo dobrze, ale SASS/LESS dopiero zaczynam. Node.js nie jest dla mnie zagadką oraz potrafię zarządzać systemami baz danych MongoDB oraz mySQL. Linux oraz Windows Server również nie są dla mnie dużym wyzwaniem. (I used arch btw)`,
            en: `I can program in PHP, C++, JS and Python (python on beginner level), and I'm learning React.js. I also have a good sense of aesthetic and I care about tiniest details. I know CSS well, but I've just begun learning SASS/LESS etc. Node.js isn't a mystery for me and I can manage MongoDB and mySQL databases. Linux and Windows Server also are not a big challenge for me. (I used arch btw)`
        },
        contact: {
            email: {
                pl: 'Adres email',
                en: 'Email address'
            },
            body: {
                pl: 'Treść',
                en: 'Message'
            },
            submit: {
                pl: 'Wyślij',
                en: 'Send'
            }
        }
    }
}

document.querySelectorAll('.lang-to').forEach(btn => {
    btn.addEventListener('click', e => {
        localize(btn.dataset.lang)
    })
})

document.querySelectorAll('.nav__link').forEach(btn => {
    btn.addEventListener('click', e => {
        smoothScrollTo(btn.dataset.to)
    })
})

document.querySelector('.hamburger-wrap').addEventListener('click', e => {
    toggleMenu()
})

let menuVisible = false

function toggleMenu(){
    let menu = document.querySelector('header')
    let lines = document.querySelectorAll('.hamburger-line')
    for(let i = 1; i<=lines.length; i++){
        lines[i-1].classList.toggle('line--'+i)
    }
    let rects = menu.getBoundingClientRect()
    if(menuVisible){
        menu.style.left = '-'+rects.width+'px'
    }
    else{
        menu.style.left = '0'
    }
    menuVisible = menuVisible ? false : true
}

function smoothScrollTo(dest){
    let newDest = document.querySelector('#'+dest)
    newDest.scrollIntoView({behavior: "smooth", block: "start"})
}

function localize(newlang){
    newlang ? localStorage.setItem('lang', newlang) : null
    let lang = localStorage.getItem('lang')

    let langEl = document.querySelector('#lang')
    langEl.innerHTML = localisation.lang[lang]
    let about = document.querySelector('#about-link')
    about.innerHTML = localisation.menu.about[lang]
    let works = document.querySelector('#works-link')
    works.innerHTML = localisation.menu.works[lang]
    let whatido = document.querySelector('#whatido-link')
    whatido.innerHTML = localisation.menu.whatido[lang]
    let contact = document.querySelector('#contact-link')
    contact.innerHTML = localisation.menu.contact[lang]
    let greetingBody = document.querySelector('#greeting-body')
    greetingBody.innerHTML = localisation.sections.greeting[lang]
    let aboutTitle = document.querySelector('#about-title')
    aboutTitle.innerHTML = localisation.menu.about[lang]
    let aboutBody = document.querySelector('#about-body')
    aboutBody.innerHTML = localisation.sections.about[lang]
    let worksTitle = document.querySelector('#works-title')
    worksTitle.innerHTML = localisation.menu.works[lang]
    let worksBody = document.querySelector('#works-body')
    worksBody.innerHTML = localisation.sections.works[lang]
    localisation.sections.works.examples.forEach(work => {
        let workWrapper = document.createElement('a')
        workWrapper.className = 'work-wrapper'
        workWrapper.href = work.url
        workWrapper.target = '_blank'
        workWrapper.rel = 'noopener'

        let img = document.createElement('img')
        img.className = 'work-thumbnail'
        img.src = work.thumbnail
        img.alt = work.title[lang]
        workWrapper.appendChild(img)

        let title = document.createElement('h4')
        title.className = 'work-title'
        title.innerHTML = work.title[lang]
        workWrapper.appendChild(title)
        worksBody.appendChild(workWrapper)
    })
    let whatidoTitle = document.querySelector('#whatido-title')
    whatidoTitle.innerHTML = localisation.menu.whatido[lang]
    let whatidoBody = document.querySelector('#whatido-body')
    whatidoBody.innerHTML = localisation.sections.whatido[lang]
    let contactTitle = document.querySelector('#contact-title')
    contactTitle.innerHTML = localisation.menu.contact[lang]
    let emailLabel = document.querySelector('#emaillabel')
    emailLabel.innerHTML = localisation.sections.contact.email[lang]
    let messageLabel = document.querySelector('#messagelabel')
    messageLabel.innerHTML = localisation.sections.contact.body[lang]
    let submit = document.querySelector('#submit')
    submit.value = localisation.sections.contact.submit[lang]
}

function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    );
}

function changeActiveSection(sectionName){
    let title = document.querySelector('#'+sectionName+'-title')
    let link = document.querySelector('#'+sectionName+'-link')
    if(isInViewport(title)){
        link.style.color = 'cyan'
        link.classList.add('nav__link--active')
    }else{
        link.style.color = 'var(--text-normal)'
        link.classList.remove('nav__link--active')
    }
}

window.addEventListener('scroll', e => {
    changeActiveSection('about')
    changeActiveSection('works')
    changeActiveSection('whatido')
    changeActiveSection('contact')
})

let form = document.querySelector('form')

form.addEventListener('submit', e=>{
    e.preventDefault()

    var templateParams = {
        from_name: document.querySelector('#email').value,
        message: document.querySelector('#messagebody').value
    };

    emailjs.send('Kontakt_webpage', 'template_3dgglvi', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
})


localize()
toggleMenu()
