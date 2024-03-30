function getVersion() {
    const url = `https://ddragon.leagueoflegends.com/api/versions.json`;
    return axios.get(url).then(response => {
        const versions = response.data;
        return versions[0];
    });
}

async function loadChamps() {
    const version = await getVersion();
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`

    axios.get(url).then(response => {
        const champCards = document.querySelector('.champCards')
        const lolChampions = response.data.data;
        console.log(lolChampions)
        for (let champion in lolChampions) {
            const imgUrl = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${lolChampions[champion].image.full}`
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

async function loadSelectedChamp() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const champName = params.get('data');
    const version = await getVersion();

    console.log(champName)
    const url = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${champName}.json`

    axios.get(url).then(response => {
        const selectedChampion = response.data.data
        console.log(selectedChampion)
        createChampInformation(selectedChampion);
        createChampLoadScreen(selectedChampion);
        createChampStats(selectedChampion);
    });
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
var modal = document.getElementById("modal")
function closeModal() {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}

function createChampLoadScreen(selectedChampion) {
    const champSplash = document.querySelector('.champSplash');
    const champSkin = document.querySelector('.champSkins');
    const champName = Object.keys(selectedChampion)[0];
    const countSkins = selectedChampion[champName].skins.length;

    champSplash.style.backgroundImage = `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${0}.jpg)`

    champSkin.innerHTML = '';
    for (let i = 0; i < countSkins; i++) {
        const numSkin = selectedChampion[champName].skins[i].num;
        const urlImgLoad = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_${numSkin}.jpg`;

        const divImgCard = document.createElement('div');
        divImgCard.setAttribute('class', 'divImgCard')
        divImgCard.setAttribute('title', `${selectedChampion[champName].skins[i].name}`)

        divImgCard.innerHTML = `
            <div class="divCardLoad">
                <img class="imgCard" onclick="openModal('${champName}', '${numSkin}')" src=${urlImgLoad}>
                <p class="pSkinName">${selectedChampion[champName].skins[i].name}</p>
            </div>
        `
        champSkin.appendChild(divImgCard);
    }
}

function createChampInformation(selectedChampion){
    const sectionInformation = document.querySelector('.champInformations');
    const champName = Object.keys(selectedChampion)[0];
    const champSubtitle = selectedChampion[champName].title;
    const champLore = selectedChampion[champName].lore;

    sectionInformation.innerHTML = `
        <h1 class= "champTitle">${champName}</h1>
        <p class="champSubtitle">${champSubtitle}</p>
        <p class="champLore">${champLore}</p>
        <table class="champStats">
        </table>
    `
}

function createChampStats(selectedChampion){
    const champStats = document.querySelector('.champStats');
    const champName = Object.keys(selectedChampion)[0];
    const stats = selectedChampion[champName].info

    champStats.innerHTML = `
        <thead></thead>
        <tbody class="valuesStats"> <tr><td colspan=2 style='font-size:25px; text-align:center'>Champion Stats</td></tr> </tbody>
    `

    const valuesStats = document.querySelector('.valuesStats')
    for (let stat in stats){

    let width = stats[stat]*10;
    valuesStats.innerHTML += `
        <tr>
            <th class="statName">${stat}</th>
            <td class="statValue"><div class="stat" style = "width: ${width}%" id ="${stat}">${stats[stat]}</div></td>
        <tr>
    `
    }
}


if (window.location.pathname.includes("index.html")) {
    loadChamps();
}

if (window.location.pathname.includes("champPage.html")) {
    loadSelectedChamp();
}