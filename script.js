const valorInput = document.querySelector('.input-campo');
const btnBuscar = document.querySelector('.btn-buscar');
const resultado = document.querySelector('.resultado');


function limparCorpo(){
    resultado.innerHTML = "";
}


btnBuscar.addEventListener('click', () => {
    const nomeGithub = valorInput.value
    if( nomeGithub === "") {
        alert('Campo vazio') 
        return;
    }
    limparCorpo();
    getRepositorios(nomeGithub);
});


async function getRepositorios(nomeGithub){
    try {
    await fetch(`https://api.github.com/users/${nomeGithub}/repos`)
        .then(resposta => resposta.json())
        .then(dados => inserirHtml(dados))
    } catch(e) {
       alert("Repositório nao encontrado");
       valorInput.value = '';
    }
}   


function inserirHtml(objeto){
    for(let {name, description, html_url} of objeto){
        const div = document.createElement('div');
        div.classList.add("card");

        const titulo = document.createElement('h1');
        titulo.innerHTML = name;

        const p = document.createElement('p');
        p.innerHTML = description;

       

        const a = document.createElement('a');
        a.innerHTML = "Ver mais";
        a.setAttribute("href", html_url);
        a.setAttribute('target', '_blank');

        div.appendChild(titulo);
        div.appendChild(p);
        div.appendChild(a)
       
        resultado.appendChild(div);

        
    }
}






