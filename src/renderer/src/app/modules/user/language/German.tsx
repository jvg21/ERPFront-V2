import { UserModuleLanguageType } from "./PersonModuleLanguageType";

export const UserModuleGerman: UserModuleLanguageType = {
    label: "Benutzer",
    words: {
        name: "Name",
        birth: "Geburtstag",
        sex: "Geschlecht",
        cpf: "CPF",
        email: "Email",
        phone: "Telefon",
        nameValidation: "Name ist erforderlich",
        birthValidation: "Geburtsdatum ist erforderlich",
        sexValidation: "Geschlecht ist erforderlich",
        cpfValidation: "CPF ist erforderlich",
        cpfFormatValidation: "CPF muss das Format 000.000.000-00 haben",
        phoneValidation: "Telefonnummer ist erforderlich",
        phoneFormatValidation: "Telefonnummer muss das Format (00)0000-0000 oder (00)00000-0000 haben",
        emailValidation: "Email ist erforderlich",
        emailFormatValidation: "Email muss ein korrektes Format haben",
        ageValidation: "Benutzer muss mindestens 16 Jahre alt sein",
        placeholderName: "Geben Sie einen Namen ein",
        placeholderPhone: "Geben Sie eine Telefonnummer ein",
        placeholderCpf: "Geben Sie einen CPF ein",
        placeholderSex: "Wählen Sie ein Geschlecht aus",
        placeholderEmail: "Geben Sie eine Email ein",
        createNotificationDescription: "Benutzer erstellt",
        updateNotificationDescription: "Benutzer aktualisiert",
        deleteNotificationDescription: "Benutzer gelöscht",
        confirmCreateDescription: "Benutzer erfolgreich erstellt",
        confirmDeleteDescription: "Benutzer erfolgreich gelöscht",
        confirmUpdateDescription: "Benutzer erfolgreich aktualisiert",
        createNotificationError: "Fehler beim Erstellen des Benutzers",
        updateNotificationError: "Fehler beim Aktualisieren des Benutzers",
        passwordFormatValidation: "Ungültiges Passwortformat",
        passwordValidation: "Ungültiges Passwort",
        passwordPlaceholder:"Geben Sie ein Passwort ein"
    }
};