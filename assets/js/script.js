
function loadChamps()
{
    const url = `https://ddragon.leagueoflegends.com/cdn/13.6.1/data/pt_BR/champion.json`

    axios.get(url).then(response => {
        const champCards = document.querySelector('.champCards')
        const lolChampions = response.data.data;
        console.log(lolChampions)
        for (let champion in lolChampions){
            const imgUrl = `http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${lolChampions[champion].image.full}`
            const aCard = document.createElement('a');
            aCard.setAttribute('href', `../../champPage.html?data=${champion}`)
            aCard.innerHTML = `
                <div class= "divIcon">
                    <img class="cards" src="${imgUrl}">
                    <p class="pChampName">${lolChampions[champion].id}</p>
                </div>
            `
            champCards.appendChild(aCard);
        };
    })
}

function openModal(champName, numSkin) {
    const urlImgSplash = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${numSkin}.jpg`;
    modal.style.display = "block";

    const content = document.getElementById('content')
    content.innerHTML = `
        <span class="close" id="close" onclick="closeModal()">&times;</span>
        <img class="imgSplash" src = "${urlImgSplash}">
    `

}

function createChampLoadScreen(selectedChampion){
    const champCard = document.querySelector('.modal-content');
    const champName = Object.keys(selectedChampion)[0];

    const countSkins = selectedChampion[champName].skins.length;

    champCard.innerHTML='';
    for(let i=0; i < countSkins; i++){
        const numSkin = selectedChampion[champName].skins[i].num;
        const urlImgLoad = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_${numSkin}.jpg`;
        const urlImgSplash = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${numSkin}.jpg`;

        const aImgCard = document.createElement('a');
        aImgCard.setAttribute('href', urlImgSplash);
        aImgCard.setAttribute('target', '_black');


        champCard.appendChild(aImgCard);

        const imgCard = document.createElement('img');
        imgCard.setAttribute('class', 'imgCard')
        imgCard.setAttribute('src', urlImgLoad);

        aImgCard.appendChild(imgCard);
    }
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}

if (window.location.pathname.includes("index.html")) {
    loadChamps();  
}

if (window.location.pathname.includes("champPage.html")) {
    loadSelectedChamp();
}

function loadSelectedChamp(){
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const champName = params.get('data');
    console.log(champName)
    const url = `http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion/${champName}.json`

    axios.get(url).then(response => {
        const selectedChampion = response.data.data
        createChampLoadScreen(selectedChampion)
    });
}

function createChampLoadScreen(selectedChampion){
    const main = document.querySelector('main');
    const champCard = document.querySelector('main');
    const champName = Object.keys(selectedChampion)[0];

    const countSkins = selectedChampion[champName].skins.length;

    main.innerHTML='';
    for(let i=0; i < countSkins; i++){
        const numSkin = selectedChampion[champName].skins[i].num;
        const urlImgLoad = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_${numSkin}.jpg`;

        const divImgCard = document.createElement('div');
        divImgCard.setAttribute('class', 'divImgCard')

        divImgCard.innerHTML = `
            <div class="divCardLoad">
                <img class="imgCard" onclick="openModal('${champName}', '${numSkin}')" src=${urlImgLoad}>
                <p class="pChampName">${selectedChampion[champName].skins[i].name}</p>
            </div>
        `
        main.appendChild(divImgCard);
    }
}



