async function afficher() {
    const button = document.querySelector('button');
    const template = document.getElementById("card-template");
    const destinationDiv = document.querySelector('main div');

    button.style.display = "none";

    for (let i=1; i<=100; i++) {
        let clone = document.importNode(template.content, true);

        let result = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}/`);
        let pokeInfo = await result.json();
        let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg`;
        let result2 = await fetch(` https://pokeapi.co/api/v2/pokemon/${i}/`);
        let typeInfo = await result2.json();

        let newContent = clone.firstElementChild.innerHTML;
        newContent = newContent.replace('src=""', `src="${image}"`)
                               .replace(/{{nom}}/g,pokeInfo.names[4].name)
                               .replace(/{{numero}}/g,i);

        for (index in typeInfo.types) {
            let type = typeInfo.types[index].type.name;
            newContent += `<img class="type" src="images/type_${type}.png" alt="type">`;
        }        
        clone.firstElementChild.innerHTML = newContent;
        destinationDiv.appendChild(clone);
    }
}
