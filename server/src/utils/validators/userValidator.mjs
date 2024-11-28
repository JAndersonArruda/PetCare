export const userCreateValidatorSchema = {
    nome: {
        in: ['body'],
        isString: {
            errorMessage: "O nome dever ser uma string"
        },
        isLength: {
            options: {
                min: 5,
                max: 100,
            },
            errorMessage: "O campo deve ter entre 5 e 100 caracteres"
        },
        notEmpty: {
            errorMessage: "O nome não pode ser vazio."
        },
    },
    idade: {
        in: ['body'],
        isFinite: {
            errorMessage: "A idade deve ser um número"
        },
        isInt: {
            options: { min: 0 }, 
            errorMessage: 'A idade deve ser um número inteiro válido e maior ou igual a 0.',
        },
        notEmpty: {
            errorMessage: 'A idade não pode ser vazia.',
        },
    }
}