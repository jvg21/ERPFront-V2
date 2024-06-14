import { UserModuleLanguageType } from "./PersonModuleLanguageType";

export const UserModuleBrazilianPortuguese: UserModuleLanguageType = {
    label: "Usuário",
    words: {
        name: "Nome",
        birth: "Aniversário",
        sex: "Sexo",
        cpf: "CPF",
        email: "Email",
        phone: "Telefone",
        nameValidation: "Nome é obrigatório",
        birthValidation: "Data de nascimento é obrigatória",
        sexValidation: "Sexo é obrigatório",
        cpfValidation: "CPF é obrigatório",
        cpfFormatValidation: "CPF deve estar no formato 000.000.000-00",
        phoneValidation: "Telefone é obrigatório",
        phoneFormatValidation: "Telefone deve estar no formato (00)0000-0000 ou (00)00000-0000",
        emailValidation: "Email é obrigatório",
        emailFormatValidation: "Email deve estar no formato correto",
        ageValidation: "O usuário deve ter pelo menos 16 anos",
        placeholderName: "Insira um nome",
        placeholderPhone: "Insira um telefone",
        placeholderCpf: "Insira um CPF",
        placeholderSex: "Selecione um sexo",
        placeholderEmail: "Insira um email",
        createNotificationDescription: "Usuário criado",
        updateNotificationDescription: "Usuário atualizado",
        deleteNotificationDescription: "Usuário deletado",
        confirmCreateDescription: "Usuário criado com sucesso",
        confirmDeleteDescription: "Usuário deletado com sucesso",
        confirmUpdateDescription: "Usuário atualizado com sucesso",
        createNotificationError: "Erro ao criar o usuário",
        updateNotificationError: "Erro ao atualizar o usuário"
    }
};