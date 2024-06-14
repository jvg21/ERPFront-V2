export type SalesModuleLanguageType = {
    label: string,
    words: {
        fk_IdClient: string,
        fk_IdSeller: string,
        fk_IdCar: string,
        price: string,
        dthRegister: string,
        createNotificationDescription: string,
        updateNotificationDescription: string,
        deleteNotificationDescription: string,
        fetchNotificationError: string,
        createNotificationError: string,
        updateNotificationError: string,
        deleteNotificationError: string,
        confirmationDeleteMessage: string
    }
}