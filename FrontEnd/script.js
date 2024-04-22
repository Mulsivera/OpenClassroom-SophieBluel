/* Récupération des tableaux */
const works = await fetch(`http://localhost:5678/api/works/`).then(works => works.json());
const categories = await fetch(`http://localhost:5678/api/categories/`).then(categories => categories.json());
/* Récupération des tableaux */


document.onload = genererworks(works)


/* Fonction de génération des works */
function genererworks(works){
let figures = "";

works.forEach(work => {
    figures += `<figure>
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
    </figure>`
});

let bodyFigures = document.querySelector(".gallery")
bodyFigures.innerHTML = figures
}
/* Fonction de génération des works */


/* Génération des boutons de filtres */
let filters = "";

filters += `<button class="filter-button" id="autofocus">Tous</button>`
categories.forEach(categories => {
    filters += `<button class="filter-button">${categories.name}</button>`
})
let bodyCategories = document.querySelector(".filters")
bodyCategories.innerHTML = filters
/* Génération des boutons de filtres */

/* Application des filtres */
let filterButtons = document.querySelectorAll(".filter-button");
    for(let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener("click", function() {
            const worksfiltres = works.filter(function (works) {
                return works.categoryId == i;
            });
            if (i > 0){
                document.querySelector(".gallery").innerHTML ="";
                genererworks(worksfiltres)
            } else {
                document.querySelector(".gallery").innerHTML ="";
                genererworks(works)   
            }
        })}
/* Application des filtres */