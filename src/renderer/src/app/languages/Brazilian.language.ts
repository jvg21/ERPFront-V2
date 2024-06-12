import { LanguageType } from "../../@types/LanguageType";
import { CarModuleBrazilianPortuguese } from "../modules/car/language/BrazilianPortuguese";
import { ResellerModuleEnglish } from "../modules/reseller/language/English";
import { UserModuleEnglish } from "../modules/user/language/English";

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
        error:"Erro"
    },
    modules: {
        carModule: CarModuleBrazilianPortuguese,
        resellerModule:ResellerModuleEnglish,
        userModule: UserModuleEnglish
    }
}