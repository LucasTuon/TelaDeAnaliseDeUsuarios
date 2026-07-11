

let usersMap = {};
let users = {};
let postsData = [];
let commentsData =[];
let minPosts = 0, minChars = 0;

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

        for( let i = 0; i < userPosts.length; i++){

            const promise = fetch(`https://jsonplaceholder.typicode.com/comments?postId=${userPosts[i].id}`).then(r => r.json());
            commentsProm.push(promise);

        }

        const comments = await Promise.all(commentsProm);

        postsData = userPosts;  // Guarda os posts numa variavel pra nao precisar de outro fetch
        commentsData = comments; // // Guarda os comentarios numa variavel pra nao precisar de outro fetch

        showResults({ postsData, commentsData});

    } catch(error){
        console.error('Error: ', error);
    }    


}

function showResults({postsData, commentsData}) {       // primeiro só mostrava, agora faz calculo tmb

    const postsDataFiltered = postsData.filter(post => post.body.length >= minChars);

    // -- METRICAS -- 
    const qtdPosts = postsDataFiltered.length; // quantidade de posts
    const charTotal = postsDataFiltered.reduce((acc, post) => acc + post.body.length, 0); // soma todos os caracteres dos posts
    const charMean = charTotal / qtdPosts; // divide o total de caracteres pela quantidade de posts = media

    const qtdComments = commentsData.reduce((acc, comments) => acc + comments.length, 0); // soma a quantidade de comentarios
    const comMean = qtdComments / qtdPosts; // divide o total de comentarios pelo numero de posts = media

    const status = qtdPosts >= minPosts ? 'Ativo' : 'Inativo';
 
    const div = document.querySelector('#results');
    div.innerHTML = `
        <p>Quantidade de Posts: ${qtdPosts}</p>
        <p>Média de Caracteres: ${charMean.toFixed(2)}</p>
        <p>Média de Comentários: ${comMean.toFixed(2)}</p>
        <p>Status: ${status}</p>
    `;
}


fetchTest();

document.querySelector('#userSelect').addEventListener('change', (event) => {
    const userId = event.target.value;
    if (userId) userData(userId);
});

document.querySelector('#minChars').addEventListener('input', (event) => {
    minChars = event.target.value;
    showResults({ postsData, commentsData});

});

document.querySelector('#minPosts').addEventListener('input', (event) => {
    minPosts = event.target.value;
    showResults({ postsData, commentsData});
});