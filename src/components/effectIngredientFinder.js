// src/components/effectIngredientFinder.js

const effectsURL = 'https://raw.githubusercontent.com/jpasholk/skyrim-alchemy/master/src/data/effects.json';
const ingredientsURL = 'https://raw.githubusercontent.com/jpasholk/skyrim-alchemy/master/src/data/ingredients.json';

console.log("effectIngredientFinder.js loaded");

export async function initializeDropdown() {
    console.log("initializeDropdown function started");

    try {
        const effectsData = await loadJSON(effectsURL);
        const ingredientsData = await loadJSON(ingredientsURL);

        const effectSelect = document.getElementById('effectSelect');
        if (!effectSelect) {
            console.error("Dropdown element with id 'effectSelect' not found.");
            return;
        }

        effectsData.forEach(effect => {
            const option = document.createElement('option');
            option.value = effect.effect;
            option.textContent = effect.effect;
            effectSelect.appendChild(option);
        });

        effectSelect.addEventListener('change', function () {
            displayIngredientsForEffect(this.value, ingredientsData);
        });
    } catch (error) {
        console.error("Error initializing dropdown:", error);
    }
}

async function loadJSON(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
    return await response.json();
}

export function displayIngredientsForEffect(effect, ingredientsData) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "";

    if (effect) {
        const matchingIngredients = ingredientsData.filter(ingredient =>
            ingredient.effects.includes(effect)
        );

        if (matchingIngredients.length > 0) {
            const header = document.createElement('h2');
            header.textContent = `Ingredients with effect "${effect}":`;
            resultsDiv.appendChild(header);

            matchingIngredients.forEach(ingredient => {
                const ingredientDiv = document.createElement('div');
                ingredientDiv.classList.add('ingredient');

                ingredientDiv.innerHTML = `
                    <h3>${ingredient.name}</h3>
                    <p><strong>Effects:</strong> ${ingredient.effects.join(', ')}</p>
                    <p><strong>Obtained from:</strong> ${ingredient.obtained}</p>
                    <p><strong>Value:</strong> ${ingredient.value}</p>
                    <p><strong>Weight:</strong> ${ingredient.weight}</p>
                    <p><strong>Plantable:</strong> ${ingredient.plantable ? 'Yes' : 'No'}</p>
                    <p><strong>Fishable:</strong> ${ingredient.fishable ? 'Yes' : 'No'}</p>
                `;
                resultsDiv.appendChild(ingredientDiv);
            });
        } else {
            resultsDiv.innerHTML = `<p>No ingredients found with the effect "${effect}".</p>`;
        }
    }
}