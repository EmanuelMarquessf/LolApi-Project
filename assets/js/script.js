
function loadChamps()
{
    const url = `https://ddragon.leagueoflegends.com/cdn/13.6.1/data/pt_BR/champion.json`

    axios.get(url).then(response => {
        const champCards = document.querySelector('.champCards')
        const lolChampions = response.data.data;
        console.log(lolChampions)
        for (let champion in lolChampions){
            const imgUrl = `http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${lolChampions[champion].image.full}`
            const divCard = document.createElement('a');
            divCard.setAttribute('href', `../../champPage.html?data=${champion}`)
            champCards.appendChild(divCard);

            const card = document.createElement('img');
            card.setAttribute('class', 'cards');
            card.setAttribute('src', imgUrl);
            divCard.appendChild(card)
        };
    })
}

function openModal(nameChampion) {
    const url = `http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion/${nameChampion}.json`
    modal.style.display = "block";

    axios.get(url).then(response => {
        const selectedChampion = response.data.data
        console.log(selectedChampion)
        createChampLoadScreen(selectedChampion)
    })
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
    const champCard = document.querySelector('body');
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



