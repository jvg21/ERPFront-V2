import { UserModuleLanguageType } from "./PersonModuleLanguageType";

export const UserModuleSpanish: UserModuleLanguageType = {
    label: "Usuario",
    words: {
        name: "Nombre",
        birth: "Nacimiento",
        sex: "Sexo",
        cpf: "CPF",
        email: "Correo electrónico",
        phone: "Teléfono",
        nameValidation: "El nombre es obligatorio",
        birthValidation: "La fecha de nacimiento es obligatoria",
        sexValidation: "El sexo es obligatorio",
        cpfValidation: "El CPF es obligatorio",
        cpfFormatValidation: "El CPF debe estar en el formato 000.000.000-00",
        phoneValidation: "El número de teléfono es obligatorio",
        phoneFormatValidation: "El número de teléfono debe estar en el formato (00)0000-0000 o (00)00000-0000",
        emailValidation: "El correo electrónico es obligatorio",
        emailFormatValidation: "El correo electrónico debe estar en un formato correcto",
        ageValidation: "El usuario debe tener al menos 16 años",
        placeholderName: "Ingrese un nombre",
        placeholderPhone: "Ingrese un número de teléfono",
        placeholderCpf: "Ingrese un CPF",
        placeholderSex: "Seleccione un sexo",
        placeholderEmail: "Ingrese un correo electrónico",
        createNotificationDescription: "Usuario creado",
        updateNotificationDescription: "Usuario actualizado",
        deleteNotificationDescription: "Usuario eliminado",
        confirmCreateDescription: "Usuario creado exitosamente",
        confirmDeleteDescription: "Usuario eliminado exitosamente",
        confirmUpdateDescription: "Usuario actualizado exitosamente",
        createNotificationError: "Error al crear el usuario",
        updateNotificationError: "Error al actualizar el usuario"
    }
};