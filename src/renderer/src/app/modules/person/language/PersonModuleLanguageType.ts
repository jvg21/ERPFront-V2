export type PersonModuleLanguageType = {
    label: string,
    words: {
        name: string,
        birth: string,
        sex: string,
        cpf: string,
        createNotificationDescription: "Person Created",
        updateNotificationDescription: "Person Updated",
        deleteNotificationDescription: "Person Deleted"
    }
}