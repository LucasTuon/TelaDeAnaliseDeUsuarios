// Exclusivamente responsavel por calcular as metricas a partir dos dados

// Task 2 e 3: Calculo de metricas e aplicacao dos filtros minChars e minPosts
export function calculateMetrics(postsData, commentsData, minChars, minPosts) {

    const postsDataFiltered = postsData.filter(post => post.body.length >= minChars);

    const qtdPosts = postsDataFiltered.length;
    const charTotal = postsDataFiltered.reduce((acc, post) => acc + post.body.length, 0);
    const charMean = charTotal / qtdPosts;

    const qtdComments = commentsData.reduce((acc, comments) => acc + comments.length, 0);
    const comMean = qtdComments / qtdPosts;

    const status = qtdPosts >= minPosts ? 'Ativo' : 'Inativo';

    return {qtdPosts, charMean, comMean, status};

}