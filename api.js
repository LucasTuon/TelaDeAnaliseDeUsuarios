// Exclusivamente responsavel por buscar os dados brutos da API JSONPlaceHolder

// Task 1: Carregamento Inicial - GET /users
export async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return await response.json();
}

// Task 2: Selecao de Usuario — busca posts do usuario selecionado
export async function fetchUserPosts(userId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  return await response.json();
}

// Task 2: Selecao de Usuario — busca comentarios de cada post (usando Promises)
export async function fetchCommentsForPosts(userPosts) {
  const commentsProm = [];
  for (let i = 0; i < userPosts.length; i++) {
    const promise = fetch(`https://jsonplaceholder.typicode.com/comments?postId=${userPosts[i].id}`).then(r => r.json());
    commentsProm.push(promise);
  }
  return await Promise.all(commentsProm);
}