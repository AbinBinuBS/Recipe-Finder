import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Clock, Users, DollarSign, Star } from 'lucide-react';

const RecipeDetailsBody = () => {
    const { recipeId } = useParams()
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetchRecipeDetails();
    }, [recipeId]);

    const fetchRecipeDetails = async () => {
        try {
            const response = await axios.get(`/api/recipes/getRecipeDetails/${recipeId}`);
            setRecipe(response.data);
        } catch (error) {
            console.error("Error fetching recipe details:", error);
        }
    };

    if (!recipe) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-pulse text-2xl text-gray-500">Loading Recipe...</div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-white to-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6">
                        <div className="md:flex items-center">
                            <div className="md:w-1/3 mb-4 md:mb-0">
                                <img 
                                    src={recipe.image} 
                                    alt={recipe.title} 
                                    className="w-full h-72 object-cover rounded-xl shadow-lg transform transition hover:scale-105"
                                />
                            </div>

                            <div className="md:w-2/3 md:pl-8">
                                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">{recipe.title}</h1>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { icon: Clock, label: 'Time', value: `${recipe.readyInMinutes} mins` },
                                        { icon: Users, label: 'Servings', value: recipe.servings },
                                        { icon: DollarSign, label: 'Price', value: `$${recipe.pricePerServing.toFixed(2)}` },
                                        { icon: Star, label: 'Score', value: `${recipe.spoonacularScore.toFixed(0)}%` }
                                    ].map(({ icon: Icon, label, value }) => (
                                        <div key={label} className="bg-white/70 p-3 rounded-lg shadow-md text-center">
                                            <div className="flex justify-center mb-2">
                                                <Icon className="text-orange-500" size={24} />
                                            </div>
                                            <p className="font-semibold text-gray-600">{label}</p>
                                            <p className="text-lg font-bold text-gray-800">{value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <h3 className="font-bold text-gray-700 mb-2">Dish Types</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {recipe.dishTypes.map((type) => (
                                            <span 
                                                key={type} 
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm transition hover:bg-blue-200"
                                            >
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ingredients</h2>
                                <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
                                    <ul className="divide-y divide-gray-200">
                                        {recipe.extendedIngredients.map((ingredient) => (
                                            <li 
                                                key={ingredient.id} 
                                                className="px-4 py-3 hover:bg-gray-50 transition"
                                            >
                                                <span className="text-gray-700">{ingredient.original}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">About This Recipe</h2>
                                <div 
                                    className="text-gray-600 mb-6 prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: recipe.summary }}
                                />

                                {recipe.winePairing && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Wine Pairing</h3>
                                        <p className="text-gray-600 mb-2 italic">{recipe.winePairing.pairingText}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {recipe.winePairing.pairedWines.map((wine) => (
                                                <span 
                                                    key={wine} 
                                                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm transition hover:bg-green-200"
                                                >
                                                    {wine}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailsBody;