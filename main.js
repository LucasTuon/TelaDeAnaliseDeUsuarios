// Responsavel por juntar api, logic e ui

import { fetchUsers, fetchUserPosts, fetchCommentsForPosts } from './api.js';
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

    users = await fetchUsers();
    selectOptions(users);

}

async function userData(userId){

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
}


//  -- EVENTOS --

document.querySelector('#userSelect').addEventListener('change', (event) => {
    const userId = event.target.value;
    if (userId) userData(userId);
});

document.querySelector('#minChars').addEventListener('input', (event) => {
    minChars = event.target.value;
    const metrics = calculateMetrics(postsData, commentsData, minChars, minPosts);
    showResults(metrics);
});

document.querySelector('#minPosts').addEventListener('input', (event) => {
    minPosts = event.target.value;
    const metrics = calculateMetrics(postsData, commentsData, minChars, minPosts);
    showResults(metrics);
});

document.querySelector('#generateReport').addEventListener('click', () =>{
    const csv = genCSV(selectedUser, metrics);
    csvDownload(csv, 'relatorio.csv');
});

// -- FUNCAO INICIAL --

main();