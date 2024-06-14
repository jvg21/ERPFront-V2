import { UserModuleLanguageType } from "./PersonModuleLanguageType";

export const UserModuleEnglish: UserModuleLanguageType = {
    label: "User",
    words: {
        name: "Name",
        birth: "Birth",
        sex: "Sex",
        cpf: "CPF",
        email: "Email",
        phone: "Phone",
        nameValidation: "Name is required",
        birthValidation: "Birth date is required",
        sexValidation: "Gender is required",
        cpfValidation: "CPF is required",
        cpfFormatValidation: "CPF must be in the format 000.000.000-00",
        phoneValidation: "Phone number is required",
        phoneFormatValidation: "Phone number must be in the format (00)0000-0000 or (00)00000-0000",
        emailValidation: "Email is required",
        emailFormatValidation: "Email must be in a correct format",
        ageValidation: "User must be at least 16 years old",
        placeholderName: "Insert a name",
        placeholderPhone: "Insert a phone number",
        placeholderCpf: "Insert a CPF",
        placeholderSex: "Select a gender",
        placeholderEmail: "Insert an email",
        createNotificationDescription: "User created",
        updateNotificationDescription: "User updated",
        deleteNotificationDescription: "User deleted",
        confirmCreateDescription: "User successfully created",
        confirmDeleteDescription: "User successfully deleted",
        confirmUpdateDescription: "User successfully updated",
        createNotificationError: "Error creating user",
        updateNotificationError: "Error updating user",
        passwordFormatValidation:"Password Format Invalid",
        passwordValidation:"Password Invalid",
        passwordPlaceholder:"Insert a Password",
        updatePasswordSuccess:"User successfully updated",
        changePassword:"Change Password"
        
    }
};