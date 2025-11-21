// Display all areas
async function getAreas() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        const data = await response.json();
        console.log(data.meals);
        displayAreas(data.meals);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}


// Render areas
function displayAreas(data) {
    let html = "";
    for (let i = 0; i < data.length; i++) {
        html += `
                <div class="AreaContent d-flex flex-column justify-content-center align-items-center text-white fs-2">
                    <i class="fa-solid fa-house-laptop fa-3x"></i>
                    <h3>${data[i].strArea}</h3>
                </div>`;      
    }
    document.querySelector("#content .row").innerHTML = html;
}

getAreas();