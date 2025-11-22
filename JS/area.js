const loadingIcon = document.querySelector(".loading");
// Display all areas
async function getAreas() {
    loadingIcon.classList.remove("d-none");
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        const data = await response.json();
        console.log(data.meals);
        displayAreas(data.meals);
    } catch (error) {
        console.error("Error fetching categories:", error);
        } finally {
            loadingIcon.classList.add("d-none");
        }
    
}


// Render areas
function displayAreas(data) {
    let html = "";
    for (let i = 0; i < data.length; i++) {
        html += `
            <div class="AreaContent d-flex flex-column justify-content-center align-items-center text-white fs-2"
                onclick="getFoodByArea('${data[i].strArea}')">
                    <i class="fa-solid fa-house-laptop fa-3x"></i>
                    <h3>${data[i].strArea}</h3>
                </div>`;
    }
    document.querySelector("#content .row").innerHTML = html;
}

getAreas();

// Display all foods related to specific area
async function getFoodByArea(areaName) {
    loadingIcon.classList.remove("d-none");
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
        const data = await response.json();
        console.log(data.meals); // Show all meals for that area

        // Optional: display in the page
        displayAreaMeals(data.meals);

    } catch (error) {
        console.error("Error fetching foods:", error);
        } finally {
            loadingIcon.classList.add("d-none");
        }
    }



// Render meals
function displayAreaMeals(data) {
    let html = "";

    if (!data) {
        document.querySelector("#content .row").innerHTML =
            "<h3 class='text-center text-white'>No results found</h3>";
        return;
    }

    for (let i = 0; i < data.length; i++) {
        html += `
        <div class="col">
            <div class="image-content position-relative" onclick="mealClicked('${data[i].idMeal}')">
            
                <div
                    class="layer bg-light opacity-75 position-absolute top-0 start-0 end-0 bottom-0 d-flex flex-column justify-content-center align-items-center text-black p-3">
                    <h3>${data[i].strMeal}</h3>
                </div>

                <img src="${data[i].strMealThumb}" class="img-fluid">
            </div>
        </div>`;
        
    }

    document.querySelector("#content .row").innerHTML = html;
}

// Navigate to food details page the(id)
function mealClicked(idMeal) {
    window.location.href = `foodDetails.html?id=${idMeal}`;
}
window.getFoodByArea = getFoodByArea;
window.mealClicked = mealClicked;


