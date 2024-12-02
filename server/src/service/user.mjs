import bcrypt from "bcrypt";


class User {
    constructor(userModel) {
        this.user = userModel;
    }

    async createUser(userDTO) {
        const { email, nome, senha, telefone, uf, cidade, rua, bairro, num, tipo } = userDTO;
    
        if (!email || !nome || !senha || !telefone || !uf || !cidade || !rua || !bairro || !num || !tipo) {
            return { status: 400, message: "Todos os campos obrigatórios devem ser preenchidos." };
        }
    
        if (!["Cliente", "Profissional"].includes(tipo)) {
            return { status: 400, message: "O campo 'tipo' deve ser 'Cliente' ou 'Profissional'." };
        }

        const usuarioExiste = await this.user.findOne({ where: { email } });

        if (usuarioExiste) {
            return { status: 400, message: "E-mail já cadastrado." };
        }
    
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(senha, salt);
    
            const novoUsuario = await this.user.create({
                email,
                nome,
                senha: hashedPassword,
                telefone,
                uf,
                cidade,
                rua,
                bairro,
                num,
                tipo,
            });
    
            return { status: 201, message: "Usuário criado com sucesso!", data: novoUsuario };
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
    
            if (error.name === "SequelizeValidationError") {
                return {
                    status: 400,
                    message: "Erro de validação.",
                    errors: error.errors.map((err) => err.message),
                };
            }
    
            return { status: 500, message: "Erro interno ao criar usuário.", error: error.message };
        }
    }
    

    async get() {
        try {
            const users = await this.user.findAll({
                attributes: { exclude: ['senha']},
            });

            return { status: 200, message: "Usuários encontrados com sucesso.", data: users };
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            return { status: 500, message: "Erro ao buscar usuários.", error: error.message };
        }
    }

    async getUserById(userId) {
        try {
            const user = await this.user.findOne({ 
                where: { id: userId },
                attributes: { exclude: ['senha'] } 
            })

            if (!user) {
                return null;
            }
    
            return user;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw error;
        }
    }

    async getUserByEmail(userEmail) {
        try {
            const user = await this.user.findOne({ 
                where: { email: userEmail },
                attributes: { exclude: ['senha'] }
            });

            if (!user) return null;

            return user;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw error;
        }
    }

    async deleteUserById(id) {
        try {
            const usuario = await this.user.findOne({ where: { 'id': id } })
            
            if (!usuario) {
                return { error: "Usuário não encontrado!", status: 404 };
            }
    
            await usuario.destroy();
            return { message: "Usuário deletado com sucesso!", status: 200 };
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            return { error: "Erro interno do servidor.", status: 500, details: error.message };
        }

    }

    async deleteUserByEmail(email) {
        try {
            const userToDelete = await this.user.findOne({ where: { email } });

            if (!userToDelete) {
                return { status: 404, message: "Usuário não encontrado." };
            }

            await userToDelete.destroy();

            return { status: 200, message: "Usuário deletado com sucesso." };
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            return { status: 500, message: "Erro interno do servidor." };
        }
    }

    async updateUser(email, updates) {
        try {
            const usuario = await this.user.findOne({ where: { email } });

            if (!usuario) {
                return { status: 404, message: "Usuário não encontrado." };
            }

            await usuario.update(updates);

            return {
                status: 200,
                message: "Perfil atualizado com sucesso.",
                data: usuario,
            };
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            return {
                status: 500,
                message: "Erro ao atualizar usuário.",
                error: error.message,
            };
        }
    }

    async patchUser(email, updates) {
        try {
            const usuario = await this.user.findOne({ where: { email } });
    
            if (!usuario) {
                return { status: 404, message: "Usuário não encontrado." };
            }
    
            await usuario.update(updates);
    
            return {
                status: 200,
                message: "Perfil atualizado parcialmente com sucesso.",
                data: usuario,
            };
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            return {
                status: 500,
                message: "Erro ao atualizar usuário.",
                error: error.message,
            };
        }
    }
}


export default User;