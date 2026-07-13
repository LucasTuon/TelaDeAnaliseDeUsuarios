//  Responsavel por buscar os dados brutos da API JSONPlaceHolder (GET)
//  e simular o envio do relatorio (POST)

// Task 1: Carregamento Inicial - GET /users
export async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok){
        throw new Error(`Erro ${response.status}: ${response.statusText}:`);
    }

    return await response.json();
}

// Task 2: Selecao de Usuario — busca posts do usuario selecionado
export async function fetchUserPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

    if (!response.ok){
        throw new Error(`Erro ${response.status}: ${response.statusText}:`);
    }

    return await response.json();
}

// Task 2: Selecao de Usuario — busca comentarios de cada post (usando Promises)
export async function fetchCommentsForPosts(userPosts) {
    const commentsProm = [];
    for (let i = 0; i < userPosts.length; i++) {
        const promise = fetch(`https://jsonplaceholder.typicode.com/comments?postId=${userPosts[i].id}`).then(r => {
            if (!r.ok){
                throw new Error(`Erro ${response.status}: ${response.statusText}:`);
            }

            return r.json();
        });

        commentsProm.push(promise);
    }
    return await Promise.all(commentsProm);
}

// Task 5: Simulacao do envio do relatorio via POST para /reports
export async function postReport(report){
    const response = await fetch(`https://jsonplaceholder.typicode.com/reports`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
    });

    if (!response.ok){
        throw new Error(`Erro ${response.status}: ${response.statusText}:`);
    }

    return await response.json();
    
  
}