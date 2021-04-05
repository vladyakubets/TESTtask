// Get the GitHub repository name input form
const gitHubForm = document.getElementById('gitHubForm');


// Listen for submissions on GitHub repository name input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub repository name input field on the DOM
    let repoNameInput = document.getElementById('repoNameInput');

    // Get the value of the GitHub repository name input field
    let gitHubRepoName = repoNameInput.value;


    // Run GitHub API function, passing in the GitHub repository name
    requestUserRepos(gitHubRepoName);


})


function requestUserRepos(repoName) {

    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // GitHub endpoint, dynamically passing in specified username
    const url = `https://api.github.com/search/repositories?q=${repoName}`;


    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);

    // When request is received
    // Process it here

    xhr.onload = function () {

        // Parse API data into JSON
        const data = JSON.parse(this.response);

        let countRow = 1;
        // Loop over each object in data array
        for (let i of data.items) {


            // Get the tBody with id of of resultTable
            let tableBody = document.getElementById('resultTable');

            // Create variable that will create tr's to be added to tableBody
            let tr = document.createElement('tr');
            tr.id = `tableRow${countRow}`;

            // Create the html markup for each tr
            tr.innerHTML = (`
                  <th scope="row">${countRow}</th>
                  <td class="name">${i.name}</td>
                  <td class="desc">${i.description}</td>
                  <td class="url"><a href="${i.html_url}">${i.html_url}</a></td>
                  <td><button id="btn${countRow}" class="button" type="submit">add</button></td>
            `)
            countRow++;

            // Append each tr to the resultTable
            tableBody.appendChild(tr);

        }
        buttonHandler(data);

    }

    // Send the request to the server
    xhr.send();

}

function buttonHandler(data) {
    let countRow = 1;
    // get each button in table
    let buttons = document.querySelectorAll('.button');
    // Loop over each buuton in buttons array and adding Event Listener
    buttons.forEach(item => {
        item.addEventListener('click', event => {
            // retrieving row number in table
            let btnId = item.id;
            btnId = btnId.slice(3, 4);

            // creating object with data from needed table row
            let idName = data.items[btnId - 1].name;
            let idDescription = data.items[btnId - 1].description;
            let idUrl = data.items[btnId - 1].html_url;
            let repo = {'name': idName, 'description': idDescription, 'html_url': idUrl,};

            // Put the object into storage
            localStorage.setItem('repo', JSON.stringify(repo));

            // Retrieve the object from storage
            let retrievedObject = JSON.parse(localStorage.getItem('repo'));

            // Get the tBody with id of of savedTable
            let savedTable = document.getElementById('savedTable');

            // Create variable that will create tr's to be added to tableBody
            let tr = document.createElement('tr');
            tr.id = `sTableRow${countRow}`;

            // Create the html markup for each tr
            tr.innerHTML = (`
                  <th scope="row">${countRow}</th>
                  <td class="name">${retrievedObject.name}</td>
                  <td class="desc">${retrievedObject.description}</td>
                  <td class="url"><a href="${retrievedObject.html_url}">${retrievedObject.html_url}</a></td>

            `)
            countRow++;

            // Append each li to the ul
            savedTable.appendChild(tr);
        })
    })
}




