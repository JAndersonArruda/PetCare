class Clinica {
    constructor(clinicaModel) {
        this.clinica = clinicaModel;
    }

    async createClinica(clinicaDTO, user) {
        const { nome, telefone } = clinicaDTO;
    
        if (!nome || !telefone) {
            return { status: 400, message: "Nome e telefone são obrigatórios." };
        }
    
        try {
            const newClinica = await this.clinica.create(clinicaDTO);

            await user.addClinica(newClinica);
    
            return { 
                status: 201, 
                message: `Clínica ${newClinica.nome} criada e associada ao usuário ${user.nome} com sucesso!`, 
                data: newClinica 
            };
        } catch (error) {    
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

    async deleteClinica(clinicaId, user) {
        console.log(user);
        try {
            const clinica = await this.clinica.findOne({ where: { id: clinicaId } });
            console.log(clinica)

            if (!clinica) {
                return {
                    status: 404,
                    message: "Clinica não encontrada!"
                };
            }

            await user.removeClinica(clinica);
            await clinica.destroy();

            return {
                status: 200,
                message: `Clínica ${clinica.nome} deletada com sucesso!`
            }
        } catch(error) {
            if (error.name === "SequelizeDatabaseError") {
                return {
                    status: 500,
                    message: "Erro ao acessar o banco de dados ao tentar deletar a clínica.",
                    error: error.message,
                };
            }

            return { 
                status: 500, 
                message: "Erro interno ao deletar clínica.", 
                error: error.message 
            };
        }
    }
}


export default Clinica;