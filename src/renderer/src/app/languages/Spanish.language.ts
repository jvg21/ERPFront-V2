import { LanguageType } from "../../@types/LanguageType";
import { CarModuleEnglish } from "../modules/car/language/English";
import { PersonModuleEnglish } from "../modules/person/language/English";
import { ResellerModuleEnglish } from "../modules/reseller/language/English";

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
        success: "Éxito"
    },
    modules: {
        carModule: CarModuleEnglish,
        resellerModule:ResellerModuleEnglish,
        personModule:PersonModuleEnglish
    }
}