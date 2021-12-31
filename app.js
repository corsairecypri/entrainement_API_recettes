require("dotenv").config();

const axios = require("axios");

const apiKey = process.env.apiKey;


/*Ce programme utilise l'API Spoonacular

Comme 99% des API ont été programmés par des américains, 
PLEASE SPEAK ENGLISH (si besoin aidez vous d'un petit dico)...


Les cuisines acceptées sont :

African, American, British, Cajun, Caribbean, Chinese

Eastern European, European, French, German, Greek, Indian,

Irish, Italian, Japanese, Jewish, Korean, Latin American,

Medirerranean, Mexican, Middle Eastern, Nordic, Southern,

Spanish, Thai et Vietnamese

*/ 

const cooking = async () => {

    try {

        /*Pour la variable meal, choisissez un ingrédient (fish, onion, mushroom) ou une recette (ratatouille, ramen)...
        L'API se charge du reste...*/ 

        let meal = "eggs"; 

        let cuisine = "Japanese"; 

        let number = 3;  

        /*Question que je me pose : est-il possible d'utiliser process.openStdin avec 2 paramètres ?*/ 


        const {data } = await axios(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${meal}&cuisine=${cuisine}&number=${number}&addRecipeInformation=true`
        );
        /*dans l'URL ci-dessus, le paramètre booléen
        addRecipeInformation=true permet d'accéder à diverses infos,
        dont les étapes de la recette */ 

        if (data.length === 0) {
            return "No results";
        } 
        else {
             
            data.results.forEach(element => {

                /*On présente d'abord le nom du plat. 
                On peut cliquer sur le lien d'une photo 
                de la recette concernée */

                console.log(element.title);
                console.log(element.image, "\n");
                
                //Puis on affiche les différentes étapes de la recette
                //avec une boucle forEach

                element.analyzedInstructions[0].steps.forEach(etapes => {
                    console.log(etapes.number, etapes.step);
                })

                //Le trait sert  à séparer visuellement les recettes

                console.log("--------------------------")
            });
        }

    }
    catch (err) {
        console.log("Erreur");
    }

}

cooking();

/*Pour lancer le programme, tapez :

    npm start

dans le terminal de VSC */ 
