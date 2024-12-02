import { Router } from "express";
import { user } from "../models/index.mjs";
import User from '../service/user.mjs';
import dotenv from 'dotenv';
import authenticateToken from "../utils/middlewares/authenticateToken.mjs";
import Authentication from "../service/Authentication.mjs";


dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const router = Router();
const userService = new User(user);
const authenticationService = new Authentication(user, SECRET_KEY)

router.get("/api/users", async (request, response) => {
    const result = await userService.get();

    if (result.error) {
        return response.status(result.status).json({
            message: result.message,
            error: result.error,
        });
    }

    return response.status(result.status).json({
        message: result.message,
        data: result.data,
    });
});

router.post("/api/users", async (request, response) => {
    const result = await userService.createUser(request.body);

    if (!result) {
        return response.status(500).json({
            message: "Erro interno: resultado indefinido.",
        });
    }

    return response.status(result.status).json({
        message: result.message,
        data: result.data,
        errors: result.errors,
    });
});

router.post("/api/login", async (request, response) => {
    const { email, senha } = request.body;

    const result = await authenticationService.login(email, senha);

    return response.status(result.status).json({
        message: result.message,
        token: result.token,
    });
});

router.delete('/api/users/', authenticateToken, async (request, response) => {
    try {
        const userAuth = request.user;

        const result = await userService.deleteUser(userAuth);

        return response.status(result.status).json({
            message: result.message
        });
    } catch (error) {
        console.error('Erro ao deletar pet:', error);
        return response.status(500).json({ message: 'Erro ao deletar pet.', error: error.message });
    }
});

router.delete('/api/users/:id', async(request, response) => {
    const { id } = request.params;

    const result = await userService.deleteUserById(id);

    if (result.error) {
        return response.status(result.status).json({ message: result.error });
    }

    return response.status(result.status).json({ message: result.message });
})

router.delete('/api/users', authenticateToken, async(request, response) => {
    const userEmail = request.user.email;

    const result = await userService.deleteUserByEmail(userEmail);

    return response.status(result.status).json({ message: result.message });
})

router.put('/api/users/profile', authenticateToken, async(request, response) => {
    const email = request.user.email;
    const {
        nome,
        telefone,
        uf,
        cidade,
        rua,
        bairro,
        num,
    } = request.body;

    if (!nome || !telefone || !uf || !cidade || !rua || !bairro || !num) {
        return response.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    try {
        const result = await userService.updateUser(userEmail, {
            nome,
            telefone,
            uf,
            cidade,
            rua,
            bairro,
            num,
        });

        if (result.error) {
            return response.status(result.status).json({
                message: result.message,
                error: result.error,
            });
        }

        return response.status(result.status).json({
            message: result.message,
            data: result.data,
        });
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        return response.status(500).json({
            message: "Erro interno do servidor ao atualizar perfil.",
            error: error.message,
        });
    }
})

router.patch("/api/users/profile", authenticateToken, async (request, response) => {
    const userEmail = request.user.email;
    const updates = request.body;

    if (Object.keys(updates).length === 0) {
        return response.status(400).json({
            message: "Nenhum campo foi enviado para atualização.",
        });
    }

    try {
        const result = await userService.patchUser(userEmail, updates);
        console.log("Resultado do patchUser:", result);

        if (result.error) {
            return response.status(result.status).json({
                message: result.message,
                error: result.error,
            });
        }

        return response.status(result.status).json({
            message: result.message,
            data: result.data,
        });
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        return response.status(500).json({
            message: "Erro interno do servidor ao atualizar perfil.",
            error: error.message,
        });
    }
});


export default router;
