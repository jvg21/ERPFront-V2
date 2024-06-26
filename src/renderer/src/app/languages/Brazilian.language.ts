import { LanguageType } from "../../@types/LanguageType";
import { CarModuleBrazilianPortuguese } from "../modules/car/language/BrazilianPortuguese";
import { SaleModuleBrazilianPortuguese } from "../modules/sales/language/BrazilianPortuguese";
import { UserModuleBrazilianPortuguese } from "../modules/user/language/BrazilianPortuguese";

export const BrazilianLanguage: LanguageType = {
    label: "Portugues-Br",
    name: "Portuguese",
    abbreviation: "Pt-Br",
    words: {
        cancel: "Cancelar",
        config: "Configurar",
        send: "Enviar",
        language: "Linguagem",
        options: "Opções",
        theme: "Tema",
        user: "Usuário",
        actions: "Ações",
        confirmationDeleteMessage: "Tem certeza que deseja deletar?",
        create: "Criar",
        id: "Código",
        confirm: "Confirmar",
        delete: "Deletar",
        edit: "Editar",
        success: "Sucesso",
        error:"Erro",
        email: "Email",
        confirmationLogoutMessage: "Deseja confirmar seu log out?",
        continue: "Continuar",
        login: "Login",
        loginSuccessfulMessage: "Seu login foi bem sucedido",
        logout: "Log out",
        password: "Senha",
        return: "Retornar",
        administator:"administrador",
        client:"Cliente",
        seller:"Vendedor",
        female:"Feminino",
        male:"Masculino",
        selectDataFormat: "Selecionar formato de dados",
        selectLanguage: "Selecionar idioma",
        selectTheme: "Selecionar tema",
        charts:"Gráficos"

    },
    color:{
        red: "Vermelho",
        silver: "Prata",
        blue: "Azul",
        green: "Verde",
        black: "Preto",
        white: "Branco",
        yellow: "Amarelo",
        beige: "Bege",
        grey: "Cinza",
        pink: "Rosa",
        purple: "Roxo",
        brown: "Marrom",
        orange: "Laranja",
        Violet: "Violeta",
        lilac: "Lilás",
        indigo: "Anil",
        darkblue: "Azul escuro"
    },

    modules: {
        carModule: CarModuleBrazilianPortuguese,
        userModule: UserModuleBrazilianPortuguese,
        salesModule: SaleModuleBrazilianPortuguese
    }
}