


let usersMap = {};

async function fetchTest(){
    
    let users = {};
    
    try{

        console.log("Fetching data from https://jsonplaceholder.typicode.com/users")
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        users = await response.json();
        console.log(users);

    } catch(error){
        console.error('Error: ', error);
    }

    for(let i = 0; i < users.length; i++){
        usersMap[users[i].id] = users[i].username;
    }

    console.log(usersMap);
}


fetchTest();
