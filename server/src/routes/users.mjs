import { Router } from "express";

const router = Router();

router.get("/api/users", async (request, response) => {
    try {
        const { user } = request.db;
        const usuarios = await user.findAll();
        response.json(usuarios);
    } catch (error) {
        console.error(error);
        response.status(500).send("Erro ao buscar usuários.");
    }
});

router.post("/api/users", async (request, response) => {
    try {
        const { user } = request.db;
        const { nome, idade } = request.body;
        const novoUsuario = await user.create({ nome, idade });
        response.status(201).json({ message: "Usuário adicionado com sucesso!", novoUsuario });
    } catch (error) {
        console.error(error);
        response.status(500).send("Erro ao adicionar usuário.");
    }
});

export default router;
