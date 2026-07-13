//  Responsavel por calcular as metricas a partir dos dados brutos
//  e montar o conteudo do relatorio CSV

// Task 2 e 3: Calculo de metricas e aplicacao dos filtros minChars e minPosts
export function calculateMetrics(postsData, commentsData, minChars, minPosts) {

    const postsDataFiltered = postsData.filter(post => post.body.length >= minChars);

    const qtdPosts = postsDataFiltered.length;
    const charTotal = postsDataFiltered.reduce((acc, post) => acc + post.body.length, 0);

    // Garante que a média não quebre (NaN/Infinity) caso a quantidade de posts seja zero
     const charMean = qtdPosts > 0 ? charTotal / qtdPosts : 0;

    const qtdComments = commentsData.reduce((acc, comments) => acc + comments.length, 0);
    const comMean = qtdPosts > 0 ? qtdComments / qtdPosts : 0;

    const status = qtdPosts >= minPosts ? 'Ativo' : 'Inativo';

    return {qtdPosts, charMean, comMean, status};

}

// Task 4: Organiza os valores do csv
export function genCSV(selectedUser, metrics){

    const columns = ("ID,Nome,Quantidade de Posts,Média de Caracteres,Média de Comentários,Status (Ativo/Inativo)");
    const line = (`${selectedUser.id},${selectedUser.name},${metrics.qtdPosts},${metrics.charMean},${metrics.comMean},${metrics.status}`);

    const csvData = columns + "\n" + line;

    return csvData;
}