import { LanguageType } from "../../@types/LanguageType";
import { CarModuleEnglish } from "../modules/car/language/English";
import { ResellerModuleEnglish } from "../modules/reseller/language/English";

export const BrazilianLanguage: LanguageType = {
    code: "PtBR001",
    name: "Portugues-Br",
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
        confirmationDelete: "Tem certeza que deseja deletar?",
        create: "Criar",
        id: "Código",
        confirm: "Confirmar",
        delete: "Deletar",
        edit: "Editar",
        success: "Sucesso"
    },
    modules: {
        carModule: CarModuleEnglish,
        resellerModule:ResellerModuleEnglish
    }
}