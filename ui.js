//  Responsável pela manipulação do DOM:
//  Adiciona os usuários no Select, exibe os resultados na tela 
//  e dispara o download do CSV


// Task 1: Exibir os usuarios na interface
export function selectOptions(users){

    const select = document.querySelector('#userSelect');

    for( let i = 0; i < users.length; i++){

        const option = document.createElement('option');    
        option.value = users[i].id;
        option.textContent = users[i].name;
        select.appendChild(option);

    }

}

// Task 2 e 3: Exibe as metricas na tela
export function showResults({ qtdPosts, charMean, comMean, status }) {

    const div = document.querySelector('#results');
    div.innerHTML = `
        <p>Quantidade de Posts: ${qtdPosts}</p>
        <p>Média de Caracteres: ${charMean.toFixed(2)}</p>
        <p>Média de Comentários: ${comMean.toFixed(2)}</p>
        <p>Status: ${status}</p>
    `;
}

// Task 4: Fazendo o download do relatorio
export function csvDownload(csvString, nomeArquivo){

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;

    link.click();

    URL.revokeObjectURL(url);

}