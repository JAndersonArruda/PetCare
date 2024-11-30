import { user as userModel } from "../models/index.mjs";
import User from '../service/user.mjs';

const userService = new User(userModel);

class Pet {
    constructor(petModel) {
        this.Pet = petModel;
    }

    async createPet(petDTO, userAuth) {
        const { nome, raca, idade, porte, foto, caracteristicas } = petDTO;
    
        if (!nome || !porte) {
            return { status: 400, message: "Nome e porte são obrigatórios." };
        }
    
        try {
            const newPet = await this.Pet.create({
                nome,
                raca,
                idade,
                porte,
                foto,
                caracteristicas,
            });

            const user = await userService.getUserByEmail(userAuth.email);
            await user.addPet(newPet);
    
            return { status: 201, message: "Pet criado e associado com sucesso!", data: newPet };
        } catch (error) {
            console.error("Erro ao adicionar pet:", error);
    
            if (error.name === "SequelizeValidationError") {
                return {
                    status: 400,
                    message: "Erro de validação.",
                    errors: error.errors.map((err) => err.message),
                };
            }
    
            return { status: 500, message: "Erro interno ao adicionar pet.", error: error.message };
        }
    }
}


export default Pet;