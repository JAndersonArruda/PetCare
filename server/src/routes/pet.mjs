import { Router } from "express";
import { pet } from "../models/index.mjs";
import Pet from "../service/pet.mjs";
import authenticateToken from "../utils/middlewares/authenticateToken.mjs";

const router = Router()
const petService = new Pet(pet);

router.post('/api/pets', authenticateToken, async(request, response) => {
    console.log(request.user);
    const resultPet = await petService.createPet(request.body, request.user);
    
    if (!resultPet) {
        return response.status(500).json({
            message: "Erro interno: resultado indefinido.",
        });
    }

    return response.status(resultPet.status).json({
        message: resultPet.message,
        data: resultPet.data,
        errors: resultPet.errors,
    });
});

/*
router.get('/api/pets', (request, response) => {
    petController.getAllPets(req, res)
});

router.get('/api/pets/:id', (request, response) => {
    petController.getPetById(req, res)
});

router.put('/api/pets/:id', (request, response) => {
    petController.updatePet(req, res)
});

router.delete('/api/pets/:id', (request, response) => {
    petController.deletePet(req, res)
});
*/

export default router;