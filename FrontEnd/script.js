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


/* Affichage mode édition */

const token = localStorage.getItem('token');
if (token) {
    document.getElementById("login").style.display = "none"
    document.getElementById("logout").style.display = "block"
    document.getElementById("editionheadband").style.display = "flex"
    document.getElementById("filters").style.display = "none"
    document.getElementById("projectEdit").style.display = "flex"
}

/* Affichage mode édition */


/* Logout */

const logout = document.getElementById("logout")
logout.addEventListener("click", function() {
    localStorage.removeItem('token')
    window.location.href = "login.html";
})

/* Logout */


/* Ouverture / Fermeture modal */

const openmodal = document.getElementById("projectEdit")
openmodal.addEventListener("click" , function() {
    document.getElementById("modal").style.display = "flex"
    document.getElementById("modalWrapperGallery").style.display = "flex"
    document.getElementById("modalWrapperAddProject").style.display = "none"
    generergalerie(works)
})

const closemodalGallery = document.getElementById("modalXmarkGallery")
closemodalGallery.addEventListener("click" , function() {
    document.getElementById("modal").style.display = "none"
})

const closemodalAddProject = document.getElementById("modalXmarkAddProject")
closemodalAddProject.addEventListener("click" , function() {
    document.getElementById("modal").style.display = "none"
})


/* Ouverture / Fermeture modal */


/* Génération des images dans la modale galerie photo */

function generergalerie(works){
    let galerie = "";
    
    works.forEach(work => {
        galerie += `<div class="modalPicture" style="background-image: url('${work.imageUrl}');">
        <img class="modalTrash" src="/SophieBluel/FrontEnd/assets/icons/trash.svg">
        </div>`
    });
    
    let bodygalerie = document.querySelector("#photoGallery")
    bodygalerie.innerHTML = galerie;
    }

/* Génération des images dans la modale galerie photo */

/* Gestion du bouton d'envoi des nouveaux travaux */
let changementtitre = document.getElementById("titretravail")
let boutonenvoinouveautravail = document.getElementById("addNewWork")
boutonenvoinouveautravail.disabled = true;
changementtitre.addEventListener("change", function () {
    if (document.getElementById("titretravail").value === "") {
        boutonenvoinouveautravail.disabled = true;
        boutonenvoinouveautravail.style.background = 'grey'
    } else {
        boutonenvoinouveautravail.disabled = false;
        boutonenvoinouveautravail.style.background = '#1D6154';
    }
    console.log(document.getElementById("titretravail").value)
})
/* Gestion du bouton d'envoi des nouveaux travaux */

/* Navigation modale */
let versajoutprojet = document.getElementById("goToAddProject")
versajoutprojet.addEventListener("click", function() {
    document.getElementById("modalWrapperGallery").style.display = "none"
    document.getElementById("modalWrapperAddProject").style.display = "flex"
})

let retourgaleriephoto = document.getElementById("backtogallery")
retourgaleriephoto.addEventListener("click" , function() {
    document.getElementById("modalWrapperGallery").style.display = "flex"
    document.getElementById("modalWrapperAddProject").style.display = "none"
})
/* Navigation modale */

let ajoutphoto = document.getElementById("imageFile")
ajoutphoto.addEventListener("change", function() {
    console.log(imageFile.value)
})
