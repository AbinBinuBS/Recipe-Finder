import axios from "axios";
import dotenv from "dotenv";

dotenv.config();


export const getRecipes = async (req, res) => {
    try {
        const { page, pageSize, search= "", cuisine } = req.query;
        const apiKey = process.env.SPOONACULAR_API_KEY;
        let response
        if(search == ""){
            response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                params: {
                    number: pageSize,
                    offset: (page - 1) * pageSize,
                    apiKey,
                }
            });
        }else{
            response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                params: {
                    query: search,
                    cuisine,
                    number: pageSize,
                    offset: (page - 1) * pageSize,
                    apiKey,
                }
            });
        }
        

        console.log("Fetched recipes:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).send("Internal Server Error");
    }
};


export const getRecipeInformation = async (req, res) => {
    try {
        const { recipeId } = req.params; 
        console.log("Recipe ID:", recipeId);
        const apiKey = process.env.SPOONACULAR_API_KEY;

        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
        
        console.log("API Response:", response.data); 
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).send("Internal Server Error");
    }
};