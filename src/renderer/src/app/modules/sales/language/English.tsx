import { SalesModuleLanguageType } from "./SalesModuleLanguageType";

export const SaleModuleEnglish: SalesModuleLanguageType = {
    label: "Sales",
    words: {
        fk_IdClient: "Client",
        fk_IdSeller: "Seller",
        fk_IdCar: "Car",
        price: "Price",
        dthRegister: "Date of Register",
        createNotificationDescription: "Sale successfully created.",
        updateNotificationDescription: "Sale successfully updated.",
        deleteNotificationDescription: "Sale successfully deleted.",
        fetchNotificationError: "Failed to fetch sales data.",
        createNotificationError: "Failed to create sale.",
        updateNotificationError: "Failed to update sale.",
        deleteNotificationError: "Failed to delete sale.",
        confirmationDeleteMessage: "Are you sure you want to delete this sale?",
        carValidation:"Invalid Car",
        clientValidation:"Invalid Client",
        priceValidation:"Invalid Price",
        sellerValidation:"Invalid Seller"
    }
}