// SELEÇÃO DE ELEMENTOS
const about = document.querySelector('#about');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const formulario = document.querySelector('#formulario');

// REGEX EMAIL
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// ABOUT GITHUB
async function getAboutGithub() {

    try {

        const resposta = await fetch('https://api.github.com/users/maariana-gen');

        const perfil = await resposta.json();

        about.innerHTML = '';

        about.innerHTML = `
            <figure class="about-image">
                <img src="${perfil.avatar_url}" alt="Foto Mariana Soares">
            </figure>

            <article class="about-content">

                <h2>Sobre mim</h2>

                <p>
                    Sou estudante e desenvolvedora Full Stack em formação,
                    apaixonada por tecnologia, design e desenvolvimento web.
                    Gosto de criar aplicações organizadas, modernas e funcionais,
                    sempre buscando evoluir minhas habilidades técnicas.
                </p>

                <p>
                    Atualmente desenvolvo projetos utilizando JavaScript,
                    TypeScript, React, NestJS, MySQL e outras tecnologias
                    voltadas ao desenvolvimento Full Stack.
                </p>

                <p>
                    Além da programação, também valorizo criatividade,
                    estética e experiência do usuário, buscando unir
                    funcionalidade com interfaces elegantes e intuitivas.
                </p>

                <div class="about-buttons-data">

                    <div class="buttons-container">

                        <a href="${perfil.html_url}"
                            target="_blank"
                            class="botao">

                            GitHub

                        </a>

                        <a href="https://drive.google.com/file/d/15I9Diwo6S3_O7JIfQJbo1iw1NLDe_hj6/view?usp=sharing"
                            target="_blank"
                            class="botao-outline">

                            Currículo

                        </a>

                    </div>

                    <div class="data-container">

                        <div class="data-item">
                            <span class="data-number">${perfil.public_repos}</span>
                            <span class="data-label">Projetos</span>
                        </div>

                        <div class="data-item">
                            <span class="data-number">${perfil.followers}</span>
                            <span class="data-label">Seguidores</span>
                        </div>

                    </div>

                </div>

            </article>
        `;

    } catch (error) {

        console.error('Erro ao buscar dados:', error);

    }

}

// EXECUTAR
getAboutGithub();

// PROJETOS GITHUB
async function getProjectsGithub() {

    try {

        const resposta = await fetch(
            'https://api.github.com/users/maariana-gen/repos?sort=updated&per_page=6'
        );

        const repositorios = await resposta.json();

        swiperWrapper.innerHTML = '';

        const linguagens = {

            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'Python': 'python',
            'Java': 'java',
            'HTML': 'html',
            'CSS': 'css',
            'PHP': 'php',
            'C#': 'csharp',
            'Go': 'go',
            'Kotlin': 'kotlin',
            'Swift': 'swift',
            'C': 'c',
            'C++': 'c_plus',
            'GitHub': 'github',

        };

        repositorios.forEach(repositorio => {

            const linguagem = repositorio.language || 'GitHub';

            const logo = linguagens[linguagem] ?? linguagens['GitHub'];

            const urlLogo = `./assets/icons/languages/${logo}.svg`;

            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .toUpperCase();

            const truncar = (texto, limite) =>
                texto.length > limite
                    ? texto.substring(0, limite) + '...'
                    : texto;

            const descricao = repositorio.description
                ? truncar(repositorio.description, 90)
                : 'Projeto desenvolvido por Mariana Soares';

            const tags = repositorio.topics?.length > 0
                ? repositorio.topics
                    .slice(0, 3)
                    .map(topic => `<span class="tag">${topic}</span>`)
                    .join('')
                : `<span class="tag">${linguagem}</span>`;

            const botaoDeploy = repositorio.homepage
                ? `
                    <a href="${repositorio.homepage}"
                        target="_blank"
                        class="botao-outline botao-sm">

                        Deploy

                    </a>
                `
                : '';

            swiperWrapper.innerHTML += `

                <div class="swiper-slide">

                    <article class="project-card">

                        <div class="project-image">

                            <img src="${urlLogo}"
                                alt="${linguagem}"

                                onerror="
                                    this.onerror=null;
                                    this.src='./assets/icons/languages/github.svg';
                                ">

                        </div>

                        <div class="project-content">

                            <h3>${nomeFormatado}</h3>

                            <p>${descricao}</p>

                            <div class="project-tags">
                                ${tags}
                            </div>

                            <div class="project-buttons">

                                <a href="${repositorio.html_url}"
                                    target="_blank"
                                    class="botao botao-sm">

                                    GitHub

                                </a>

                                ${botaoDeploy}

                            </div>

                        </div>

                    </article>

                </div>
            `;

        });

        iniciarSwiper();

    } catch (error) {

        console.error('Erro ao buscar projetos:', error);

    }

}

// EXECUTAR
getProjectsGithub();

// SWIPER
function iniciarSwiper() {

    new Swiper('.projects-swiper', {

        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        loop: true,

        breakpoints: {

            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
            },

            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },

            1025: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            }

        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },

        grabCursor: true,

    });

}

// FORMULÁRIO
formulario.addEventListener('submit', function (event) {

    event.preventDefault();

    document.querySelectorAll('form span')
        .forEach(span => span.innerHTML = '');

    let isValid = true;

    const nome = document.querySelector('#nome');
    const erroNome = document.querySelector('#erro-nome');

    if (nome.value.trim().length < 3) {

        erroNome.innerHTML =
            'O nome deve possuir no mínimo 3 caracteres.';

        if (isValid) nome.focus();

        isValid = false;

    }

    const email = document.querySelector('#email');
    const erroEmail = document.querySelector('#erro-email');

    if (!email.value.trim().match(emailRegex)) {

        erroEmail.innerHTML =
            'Digite um e-mail válido.';

        if (isValid) email.focus();

        isValid = false;

    }

    const assunto = document.querySelector('#assunto');
    const erroAssunto = document.querySelector('#erro-assunto');

    if (assunto.value.trim().length < 5) {

        erroAssunto.innerHTML =
            'O assunto deve possuir no mínimo 5 caracteres.';

        if (isValid) assunto.focus();

        isValid = false;

    }

    const mensagem = document.querySelector('#mensagem');
    const erroMensagem = document.querySelector('#erro-mensagem');

    if (mensagem.value.trim().length === 0) {

        erroMensagem.innerHTML =
            'A mensagem não pode estar vazia.';

        if (isValid) mensagem.focus();

        isValid = false;

    }

    if (isValid) {

        const submitButton =
            formulario.querySelector('button[type="submit"]');

        submitButton.disabled = true;

        submitButton.textContent = 'Enviando...';

        formulario.submit();

    }

});