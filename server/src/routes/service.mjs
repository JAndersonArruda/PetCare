import { Router } from "express";
import authenticateToken from "../utils/middlewares/authenticateToken.mjs";
import typeUser from "../utils/middlewares/typeUser.mjs";
import { user, service, clinica } from "../models/index.mjs";
import User from "../service/user.mjs";
import Service from "../service/service.mjs"
import Clinica from "../service/clinica.mjs";

const router = Router();
const userService = new User(user);
const serviceService = new Service(service);
const clinicaService = new Clinica(clinica);

router.post("/api/:clinicaId/services", authenticateToken, typeUser("Profissional"), async(request, response) => {
    try {
        const { clinicaId } = request.params;

        const clinica = await clinicaService.getClinicaById(clinicaId);
        if (!clinica) {
            return response.status(404).json({ message: "Clínica não encontrada." });
        }

        const resultService = await serviceService.createService(request.body, clinica);
        if (!resultService) {
            return response.status(500).json({
                message: "Erro interno: resultado indefinido.",
            });
        }

        return response.status(resultService.status).json({
            message: resultService.message,
            data: resultService.data,
            errors: resultService.errors,
        });
    } catch (error) {
        console.error("Erro interno na rota:", error);
        return response.status(500).json({
            message: "Erro interno ao processar a solicitação.",
            error: error.message,
        });
    }
})

router.get("/api/:clinicaId/services", async(request, response) => {
    const { clinicaId } = request.params;
    const services = await serviceService.getServicesByClinicaId(clinicaId);

    if (services.error) {
        return response.status(services.status).json({
            message: services.message,
            error: services.error,
        });
    }

    return response.status(services.status).json({
        message: services.message,
        data: services.data,
    });
})

export default router;