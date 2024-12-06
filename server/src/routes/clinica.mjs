import { Router } from "express";
import { clinica, user } from "../models/index.mjs";
import Clinica from "../service/clinica.mjs";
import authenticateToken from "../utils/middlewares/authenticateToken.mjs";
import typeUser from "../utils/middlewares/typeUser.mjs";
import User from "../service/user.mjs";
import verifyOwnership from "../utils/middlewares/verifyOwnership.mjs";

const router = Router();
const clinicaService = new Clinica(clinica);
const userService = new User(user);


router.get("/api/clinicas", async (request, response) => {
    const clinicas = await clinicaService.getAllClinicas();
    
    if (clinicas.error) {
        return response.status(clinicas.status).json({
            message: clinicas.message,
            error: clinicas.error,
        });
    }

    return response.status(clinicas.status).json({
        message: clinicas.message,
        data: clinicas.data,
    });
})

router.post('/api/clinicas', authenticateToken, typeUser("Profissional"), async(request, response) => {
    const user = await userService.getUserByEmail(request.user.email);
    const clinica = await clinicaService.createClinica(request.body, user);
    
    if (!clinica) {
        return response.status(500).json({
            message: "Erro interno: resultado indefinido.",
        });
    }

    return response.status(clinica.status).json({
        message: clinica.message,
        data: clinica.data,
        errors: clinica.errors,
    });
});

router.delete("/api/clinicas/:id", authenticateToken, typeUser("Profissional"), verifyOwnership(clinicaService), async(request, response) => {
    const user = await userService.getUserByEmail(request.user.email);
    const clinicaId = request.params.id;

    try {
        const result = await clinicaService.deleteClinica(clinicaId, user);

        return response.status(result.status).json({
            message: result.message,
            ...(result.status === 200 && { data: result.data })
        });
    } catch (error) {
        return response.status(500).json({
            message: 'Erro interno ao tentar deletar a clínica.',
            error: error.message
        });
    }

})

export default router;
