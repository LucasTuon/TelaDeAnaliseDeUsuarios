// Responsavel por juntar api, logic e ui

import { fetchUsers, fetchUserPosts, fetchCommentsForPosts, postReport } from './api.js';
import { calculateMetrics, genCSV } from './logic.js';
import { selectOptions, showResults, csvDownload } from './ui.js';


// -- VARIAVEIS --

let users = {};
let postsData = [], commentsData = [];
let minPosts = 0, minChars = 0;
let metrics = {};

// selectedUser usado como parametro para o CSV
let selectedUser = null;

// -- FUNCOES --

async function main(){
    try {
        users = await fetchUsers();
        selectOptions(users);
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
}

async function userData(userId){
    try{
        const userPosts = await fetchUserPosts(userId);
        const comments = await fetchCommentsForPosts(userPosts);

        postsData = userPosts;
        commentsData = comments;

        for (let i = 0; i < users.length; i++){
            if (users[i].id == userId){
                selectedUser = users[i];
                break;
            }
        }

        metrics = calculateMetrics(postsData, commentsData, minChars, minPosts);
        showResults(metrics);
    } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
    }
}


//  -- EVENTOS --

document.querySelector('#userSelect').addEventListener('change', (event) => {
    const userId = event.target.value;
    if (userId) userData(userId);
});

document.querySelector('#minChars').addEventListener('input', (event) => {
    try {
        minChars = event.target.value;
        const metrics = calculateMetrics(postsData, commentsData, minChars, minPosts);
        showResults(metrics);
    } catch (error) {
         console.error('Erro ao recalcular as metricas (minChar):', error);
    }
});

document.querySelector('#minPosts').addEventListener('input', (event) => {
    try {
        minPosts = event.target.value;
        const metrics = calculateMetrics(postsData, commentsData, minChars, minPosts);
        showResults(metrics);
    } catch (error) {
        console.error('Erro ao carregar dados do usuário (minPosts):', error);
    }    
});

document.querySelector('#generateReport').addEventListener('click', async () =>{
    if (!selectedUser) {
        console.error('Nenhum usuário selecionado.');
        return; // para aqui, não tenta gerar nada
    }

    try {
        const csv = genCSV(selectedUser, metrics);
        csvDownload(csv, 'relatorio.csv');

        const report = { usuario: selectedUser, metricas: metrics};

        const response = await postReport(report); 
        console.log('Relatório enviado: ', response);
    } catch (error) {
        console.error('Erro ao enviar relatório: ', error);
    }
});

// -- FUNCAO INICIAL --

main();