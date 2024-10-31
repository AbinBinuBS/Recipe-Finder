

import { Router } from 'express'
import { getRecipeInformation, getRecipes } from '../controllers/recipeController.js'

const router = Router()

router.get('/',getRecipes)
router.get('/getRecipeDetails/:recipeId', getRecipeInformation);
export default router