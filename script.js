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
                        en: `Schools CKZiU in Brodnica website`
                    },
                    thumbnail: `ckziu212.png`,
                    url: `http://teststrony.ckziubrodnica.pl/`
                },
                {
                    title: {
                        pl: `Klikacz Gold The Game`,
                        en: `Clicker Gold The Game`
                    },
                    thumbnail: `gtg.png`,
                    url: `http://goldthegame.epizy.com/`
                }
            ]
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
        console.log(work)
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
}

localize()
toggleMenu()