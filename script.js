

let usersMap = {};
let users = {};

async function fetchTest(){
    
    try{

        console.log("Fetching data from https://jsonplaceholder.typicode.com/users");
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        users = await response.json();
        console.log(users);

    } catch(error){
        console.error('Error: ', error);
    }

    for(let i = 0; i < users.length; i++){
        usersMap[users[i].id] = users[i].username;
    }
    selectOptions(users);
    console.log(usersMap);
}

function selectOptions(users){

    const select = document.querySelector('#userSelect');

    for( let i = 0; i < users.length; i++){

        const option = document.createElement('option');    // cria o elemento
        option.value = users[i].id;                         // o que vai ser enviado/lido
        option.textContent = users[i].name;                 // o que aparece pro usuário
        select.appendChild(option);                         // gruda dentro do <select>

    }

}


async function userData(userId){

    try{

        console.log("Fetching data from https://jsonplaceholder.typicode.com/posts?userId");
        const respPosts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const userPosts = await respPosts.json();
        console.log(userPosts);

        const commentsProm = [];

        for(let i = 0; i < userPosts.length; i++){

            const promise = fetch(`https://jsonplaceholder.typicode.com/comments?postId=${userPosts[i].id}`).then(r => r.json());
            commentsProm.push(promise);

        }

        const comments = await Promise.all(commentsProm);

        // -- METRICAS -- 
        const qtdPosts = userPosts.length; // quantidade de posts
        const charTotal = userPosts.reduce((acc, post) => acc + post.body.length, 0); // soma todos os caracteres dos posts

        const charMean = charTotal / qtdPosts; // divide o total de caracteres pela quantidade de posts = media

        const qtdComments = comments.reduce((acc, comments) => acc + comments.length, 0); // soma a quantidade de comentarios

        const comMean = qtdComments / qtdPosts; // divide o total de comentarios pelo numero de posts = media

        console.log({ qtdPosts, charMean, comMean });
        showResults({ qtdPosts, charMean, comMean });

    } catch(error){
        console.error('Error: ', error);
    }    


}

function showResults({qtdPosts, charMean, comMean}) {
  const div = document.querySelector('#results');
  div.innerHTML = `
    <p>Quantidade de Posts: ${qtdPosts}</p>
    <p>Média de Caracteres: ${charMean.toFixed(2)}</p>
    <p>Média de Comentários: ${comMean.toFixed(2)}</p>
  `;
}


fetchTest();

document.querySelector('#userSelect').addEventListener('change', (evento) => {
  const userId = evento.target.value;
  if (userId) userData(userId);
});