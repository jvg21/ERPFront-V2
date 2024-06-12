import { LanguageType } from "../../@types/LanguageType";
import { CarModuleSpanish } from "../modules/car/language/Spanish";
import { ResellerModuleEnglish } from "../modules/reseller/language/English";
import { UserModuleEnglish } from "../modules/user/language/English";

export const SpanishLanguage: LanguageType = {
    label: "Spanish",
    name: "Spanish",
    abbreviation: "Spa",
    words: {
        cancel: "Cancelar",
        config: "Configurar",
        send: "Enviar",
        language: "Idioma",
        options: "Opciones",
        theme: "Tema",
        user: "Usuario",
        actions: "Acciones",
        confirmationDelete: "¿Estás seguro de que quieres eliminar?",
        create: "Crear",
        id: "ID",
        confirm: "Confirmar",
        delete: "Eliminar",
        edit: "Editar",
        success: "Éxito",
        error:"error"
    },
    modules: {
        carModule: CarModuleSpanish,
        resellerModule:ResellerModuleEnglish,
        userModule: UserModuleEnglish
    }
}