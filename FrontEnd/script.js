const reponse = await (fetch(`http://localhost:5678/api/works/`));
const works = await reponse.json();

let figures = "";

works.forEach(work => {
    figures += `
    <figure>
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
    </figure>
    `
});

let body = document.querySelector(".gallery")
body.innerHTML = figures
