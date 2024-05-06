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
    AffichageBlock("logout")
    AffichageNone("login")
    AffichageNone("filters")
    AffichageFlex("editionheadband")
    AffichageFlex("projectEdit")
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
    AffichageFlex("modal")
    AffichageFlex("modalWrapperGallery")
})

const closemodalGallery = document.getElementById("modalXmarkGallery")
closemodalGallery.addEventListener("click" , function() {
    AffichageNone("modal")
    AffichageNone("modalWrapperGallery")
})

const closemodalAddProject = document.getElementById("modalXmarkAddProject")
closemodalAddProject.addEventListener("click" , function() {
    AffichageNone("modal")
    AffichageNone("modalWrapperAddProject")
    AffichageNone("afficherimage")
    AffichageFlex("ajoutphotobox")
})


/* Ouverture / Fermeture modal */

/* Navigation modale */
let versajoutprojet = document.getElementById("goToAddProject")
versajoutprojet.addEventListener("click", function() {
    AffichageNone("modalWrapperGallery")
    AffichageFlex("modalWrapperAddProject")
})

let retourgaleriephoto = document.getElementById("backtogallery")
retourgaleriephoto.addEventListener("click" , function() {
    AffichageFlex("modalWrapperGallery")
    AffichageNone("modalWrapperAddProject")
    AffichageNone("afficherimage")
    AffichageFlex("ajoutphotobox")
})
/* Navigation modale */

/* Génération des images dans la modale galerie photo */

    let galerie = "";
    
    works.forEach(work => {
        galerie += `<div class="modalPicture" style="background-image: url('${work.imageUrl}');">
        <img class="modalTrash" id="${work.id}" src="/FrontEnd/assets/icons/trash.svg">
        </div>`
    });
    
    let bodygalerie = document.querySelector("#photoGallery")
    bodygalerie.innerHTML = galerie;

/* Génération des images dans la modale galerie photo */


/* Afficher l'image téléchargée */

const ajoutphoto = document.getElementById("imageFile")
const image = document.getElementById("afficherimage")

ajoutphoto.onchange = function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        image.src = e.target.result;
        AffichageFlex("afficherimage")
        AffichageNone("ajoutphotobox")
    };

    reader.readAsDataURL(file);
};

/* Afficher l'image téléchargée */

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
})

/* Gestion du bouton d'envoi des nouveaux travaux */

/* Suppression travaux */

let suppressiontravaux = document.querySelectorAll(".modalTrash");
        for(let i = 0; i < suppressiontravaux.length; i++) {
            suppressiontravaux[i].addEventListener("click", function() {
                let id = suppressiontravaux[i].id
                console.log (id)
                if (window.confirm("Voulez-vous vraiment supprier ce travail ?")) {
                    fetch('http://localhost:5678/api/works/' + id, {
                        method: 'delete',
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    })
                }})}

/* Suppression travaux */

/*  Nouveau travaux */

let ajouteruntravail = document.getElementById("addNewWork")
ajouteruntravail.addEventListener("click", function () {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", imageFile.files[0]);
    formData.append("title", titretravail.value);
    formData.append("category", categorySelector.value);
    fetch("http://localhost:5678/api/works", {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
})

/* Nouveau travaux */

/* Gestion Affichage */

function AffichageBlock (idElement) {
    document.getElementById(idElement).style.display = "block"
}

function AffichageFlex (idElement) {
    document.getElementById(idElement).style.display = "Flex"
}

function AffichageNone (idElement) {
    document.getElementById(idElement).style.display = "none"
}

/* Gestion Affichage */