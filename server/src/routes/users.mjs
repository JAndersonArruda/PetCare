import { Router } from "express";
import { user } from "../models/index.mjs";
import User from '../service/user.mjs';
import bcrypt from "bcrypt";


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
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(senha, salt);
        const novoUsuario = await userService.createUser({ email, nome, senha: hashedPassword, telefone, uf, cidade, rua, bairro, num, tipo,});

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

router.post("/api/login", async (request, response) => {
    const { email, senha } = request.body;

    if (!email || !senha) {
        return response.status(400).json({
            message: "Email e senha são obrigatórios."
        });
    }

    try {
        const usuario = await User.findOne({ where: { email } });

        if (!usuario) {
            return response.status(404).json({ message: "Usuário não encontrado." });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return response.status(401).json({ message: "Senha incorreta." });
        }

        const token = jwt.sign(
            { email: usuario.email, tipo: usuario.tipo },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        return response.status(200).json({
            message: "Login realizado com sucesso.",
            token,
        });
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        return response.status(500).json({
            message: "Erro interno do servidor ao realizar login.",
            error: error.message,
        });
    }
});


export default router;
