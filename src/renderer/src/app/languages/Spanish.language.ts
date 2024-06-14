import { LanguageType } from "../../@types/LanguageType";
import { CarModuleSpanish } from "../modules/car/language/Spanish";
import { SaleModuleEnglish } from "../modules/sales/language/English";
import { SaleModuleSpanish } from "../modules/sales/language/Spanish";
import { UserModuleSpanish } from "../modules/user/language/Spanish";

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
        confirmationDeleteMessage: "¿Estás seguro de que quieres eliminar?",
        create: "Crear",
        id: "ID",
        confirm: "Confirmar",
        delete: "Eliminar",
        edit: "Editar",
        success: "Éxito",
        error:"error",
        email: "Correo electrónico",
        confirmationLogoutMessage: "¿Quiere confirmar su cierre de sesión?",
        continue: "Continuar",
        login: "Iniciar sesión",
        loginSuccessfulMessage: "Su inicio de sesión fue exitoso",
        logout: "Cerrar sesión",
        password: "Contraseña",
        return: "Volver",
        "administator": "administrador",
        "client": "cliente",
        "seller": "vendedor",
        "female": "mujer",
        "male": "hombre"

    },
    color:{
        red: "Rojo",
        silver: "Plateado",
        blue: "Azul",
        green: "Verde",
        black: "Negro",
        white: "Blanco",
        yellow: "Amarillo",
        beige: "Beige",
        grey: "Gris",
        pink: "Rosado",
        purple: "Morado",
        brown: "Marrón",
        orange: "Naranja",
        Violet: "Violeta",
        lilac: "Lila",
        indigo: "Índigo",
        darkblue: "Azul oscuro"
    },
    modules: {
        carModule: CarModuleSpanish,
        userModule: UserModuleSpanish,
        salesModule: SaleModuleSpanish
    }
}