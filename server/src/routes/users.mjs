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
    const { nome, idade } = request.body;

    try {
        const novoUsuario = await userService.creatUser({ nome, idade });
        response.status(201).json({ message: "Usuário adicionado com sucesso!", novoUsuario });
    } catch (error) {
        console.error(error);
        response.status(500).send("Erro ao adicionar usuário.");
    }
});

export default router;
