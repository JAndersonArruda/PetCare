import { Router } from "express";
import { user } from "../models/index.mjs";
import User from '../service/user.mjs';


const router = Router();
const userService = new User(user);

router.get("/api/users", async (request, response) => {
    try {
        const users = await userService.get()
        response.status(200).json(users);
    } catch (error) {
        console.error(error);
        response.status(500).send("Erro ao buscar usuários.");
    }
});

router.post("/api/users", async (request, response) => {
    const { email, nome, senha, telefone, uf, cidade, rua, bairro, num, tipo } = request.body;

    if (!email || !nome || !senha || !telefone || !uf || !cidade || !rua || !bairro || !num || !tipo) {
        return response.status(400).json({ 
            message: "Todos os campos obrigatórios devem ser preenchidos." 
        });
    }

    if (!["Cliente", "Profissional"].includes(tipo)) {
        return response.status(400).json({ 
            message: "O campo 'tipo' deve ser 'Cliente' ou 'Profissional'." 
        });
    }

    try {
        const novoUsuario = await userService.createUser({ email, nome, senha, telefone, uf, cidade, rua, bairro, num, tipo,});

        return response.status(201).json({
            message: "Usuário criado com sucesso!",
            data: novoUsuario,
        });
    } catch (error) {
        console.error("Erro ao criar usuário:", error);

        if (error.name === "SequelizeValidationError") {
            return response.status(400).json({ 
                message: "Erro de validação.", 
                errors: error.errors.map(err => err.message) 
            });
        }

        return response.status(500).json({
            message: "Erro interno do servidor ao criar usuário.",
            error: error.message,
        });
    }
});

export default router;
