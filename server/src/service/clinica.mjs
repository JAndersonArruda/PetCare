class Clinica {
    constructor(clinicaModel) {
        this.clinica = clinicaModel;
    }

    async createClinica(clinicaDTO, user) {
        const { nome, telefone } = clinicaDTO;
    
        if (!nome || !telefone) {
            return { status: 400, message: "Nome e telefone são obrigatórios." };
        }

        if (user.tipo != "Profissional") {
            return { status: 400, message: "Seu usuário não tem permissão!" };
        }
    
        try {
            const newClinica = await this.clinica.create(clinicaDTO);

            await user.addClinica(newClinica);
    
            return { 
                status: 201, 
                message: `Clinica criado e associado ao usuário ${user.nome} com sucesso!`, 
                data: newClinica 
            };
        } catch (error) {
            console.error("Erro ao adicionar clinica:", error);
    
            if (error.name === "SequelizeValidationError") {
                return {
                    status: 400,
                    message: "Erro de validação.",
                    errors: error.errors.map((err) => err.message),
                };
            }
    
            return { status: 500, message: "Erro interno ao adicionar clinica.", error: error.message };
        }
    }
}


export default Clinica;