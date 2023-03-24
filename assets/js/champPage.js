const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const champName = params.get('data');

function loadSelectedChamp(){
    const url = `http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion/${champName}.json`

    axios.get(url).then(response => {
        const selectedChampion = response.data.data
        createChampLoadScreen(selectedChampion)
    });
}

function createChampLoadScreen(selectedChampion){
    const champCard = document.querySelector('body');
    const countSkins = selectedChampion[champName].skins.length;

    champCard.innerHTML='';
    for(let i=0; i < countSkins; i++){
        const numSkin = selectedChampion[champName].skins[i].num;
        const urlImgLoad = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_${numSkin}.jpg`;
        const urlImgSplash = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${numSkin}.jpg`;

        const divImgCard = document.createElement('div');
        divImgCard.setAttribute('class', 'divImgCard');
        
        champCard.appendChild(divImgCard);

        const imgCard = document.createElement('img');
        imgCard.setAttribute('class', 'imgCard')
        imgCard.setAttribute('src', urlImgLoad);
        imgCard.addEventListener('click', function() { openModal(urlImgSplash) });

        divImgCard.appendChild(imgCard);
    }
}

var modal = document.querySelector('.modal');
var modalContent = document.querySelector('.modal-content')

function openModal(urlImgSplash) {
    modal.style.display = "block";

    
    const imgSplash = document.createElement('img');
    imgSplash.setAttribute('class', 'imgSplash');
    imgSplash.setAttribute('src', urlImgSplash);

    modalContent.appendChild(imgSplash)
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}


loadSelectedChamp()