/* Récupération des données JSON */

const works = await fetch(`http://localhost:5678/api/works/`).then(works => works.json());
const categories = await fetch(`http://localhost:5678/api/categories/`).then(categories => categories.json());

/* Récupération des données JSON */


document.onload = worksGeneration(works)


/* Fonction de génération des works */

function worksGeneration(works){
let worksHTML = "";

works.forEach(work => {
    worksHTML += 
    `<figure>
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
    </figure>`
});

document.querySelector(".gallery").innerHTML = worksHTML
}

/* Fonction de génération des works */


/* Génération des boutons de filtres */

let filtersDisplay = "";

filtersDisplay += `<button class="filter-button" id="autofocus">Tous</button>`
categories.forEach(categories => {
    filtersDisplay += `<button class="filter-button">${categories.name}</button>`
})

document.querySelector(".filters").innerHTML = filtersDisplay

/* Génération des boutons de filtres */


/* Application des filtres */

let filterButtons = document.querySelectorAll(".filter-button");
    for(let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener("click", function() {
            const filteredWorks = works.filter(function (works) {
                return works.categoryId == i;
            });
            if (i > 0){
                document.querySelector(".gallery").innerHTML ="";
                worksGeneration(filteredWorks)
            } else {
                document.querySelector(".gallery").innerHTML ="";
                worksGeneration(works)   
            }
        })}

/* Application des filtres */


/* Affichage mode édition */

const token = localStorage.getItem('token');
if (token) {
    Displaymanagement("logout" , "block")
    Displaymanagement("login" , "none")
    Displaymanagement("filters" , "none")
    Displaymanagement("editionheadband" , "flex")
    Displaymanagement("projectEdit" , "flex")
}

/* Affichage mode édition */


/* Logout */

document.getElementById("logout").addEventListener("click", function() {
    localStorage.removeItem('token')
    window.location.href = "login.html";
})

/* Logout */


/* Ouverture / Fermeture modal */

document.getElementById("projectEdit").addEventListener("click" , function() {
    Displaymanagement("modal" , "flex")
    Displaymanagement("modalWrapperGallery" , "flex")
})

document.getElementById("modalXmarkGallery").addEventListener("click" , function() {
    Displaymanagement("modal" , "none")
    Displaymanagement("modalWrapperGallery" , "none")
})

document.getElementById("modalXmarkAddProject").addEventListener("click" , function() {
    Displaymanagement("modal" , "none")
    Displaymanagement("modalWrapperAddProject" , "none")
    Displaymanagement("afficherimage" , "none")
    Displaymanagement("ajoutphotobox" , "flex")
    document.getElementById("imageFile").value = ""
    document.getElementById("titretravail").value = ""
})

/* Ouverture / Fermeture modal */


/* Navigation modale */

document.getElementById("goToAddProject").addEventListener("click", function() {
    Displaymanagement("modalWrapperGallery" , "none")
    Displaymanagement("modalWrapperAddProject" , "flex")
})

document.getElementById("backtogallery").addEventListener("click" , function() {
    Displaymanagement("modalWrapperGallery" , "flex")
    Displaymanagement("modalWrapperAddProject" , "none")
    Displaymanagement("afficherimage" , "none")
    Displaymanagement("ajoutphotobox" , "flex")
    document.getElementById("imageFile").value = ""
    document.getElementById("titretravail").value = ""
})

/* Navigation modale */


/* Génération des images dans la modale galerie photo */

    let galleryHTML = "";
    
    works.forEach(work => {
        galleryHTML += `<div class="modalPicture" style="background-image: url('${work.imageUrl}');">
        <img class="modalTrash" id="${work.id}" src="/FrontEnd/assets/icons/trash.svg">
        </div>`
    });
    
    document.querySelector("#photoGallery").innerHTML = galleryHTML;

/* Génération des images dans la modale galerie photo */


/* Suppression d'un "work" */

let workDelete = document.querySelectorAll(".modalTrash");
        for(let i = 0; i < workDelete.length; i++) {
            workDelete[i].addEventListener("click", function() {
                if (window.confirm("Voulez-vous vraiment supprimer ce travail ?")) {
                    fetch('http://localhost:5678/api/works/' + workDelete[i].id, {
                        method: 'delete',
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    })
                }})}

/* Suppression d'un "work" */


/* Afficher l'image téléchargée */

const addPicture = document.getElementById("imageFile")
const picture = document.getElementById("afficherimage")

addPicture.onchange = function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        picture.src = e.target.result;
        Displaymanagement("afficherimage" , "flex")
        Displaymanagement("ajoutphotobox" , "none")
    };
    reader.readAsDataURL(file);
};

/* Afficher l'image téléchargée */


/* Gestion du bouton d'envoi de nouveaux works */

let addNewWorkButton = document.getElementById("addNewWork")
document.getElementById("WorkForm").addEventListener("change", function () {
if (document.getElementById("imageFile").value === "" || document.getElementById("titretravail").value === ""){
    addNewWorkButton.disabled = true
    addNewWorkButton.style.background = "grey"
} else {
    addNewWorkButton.disabled = false
    addNewWorkButton.style.background = "#1D6154"
}})

/* Gestion du bouton d'envoi de nouveaux works */


/*  Ajout d'un nouveau "work" */

document.getElementById("addNewWork").addEventListener("click", function () {
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

/*  Ajout d'un nouveau "work" */


/* Gestion de l'affichage des éléments */

function Displaymanagement (idElement, style) {
    document.getElementById(idElement).style.display = style
}

/* Gestion de l'affichage des éléments */