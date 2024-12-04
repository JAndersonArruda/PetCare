import { Router } from "express";
import { clinica, user } from "../models/index.mjs";
import Clinica from "../service/clinica.mjs";
import authenticateToken from "../utils/middlewares/authenticateToken.mjs";
import User from "../service/user.mjs";

const router = Router();
const clinicaService = new Clinica(clinica);
const userService = new User(user);

router.post('/api/clinicas', authenticateToken, async(request, response) => {
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


export default router;
