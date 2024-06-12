import { CarModuleLanguageType } from "./CarModuleLanguageType";

export const CarModuleEnglish: CarModuleLanguageType = {
    label: "Car",
    words: {
        model: "Model",
        brand: "Brand",
        year: "Year",
        color: "Color",
        price: "Price",
        placeholdermodel: "Insert a model",
        placeholderbrand: "Insert a brand",
        placeholderprice: "Insert a price",
        createNotificationDescription: "Car created successfully.",
        updateNotificationDescription: "Car updated successfully.",
        deleteNotificationDescription: "Car deleted successfully.",
        createNotificationError: "Error creating car. Please try again.",
        deleteNotificationError: "Error deleting car. Please try again.",
        fetchNotificationError: "Error fetching cars. Please try again.",
        updateNotificationError: "Error updating car. Please try again.",
        
        modelValidation: "Model is required.",
        brandValidation: "Brand is required.",
        priceValidation: "Price is required.",
        priceValidationNaN: "Price must be a valid number.",
        colorValidation: "Color is required.",
        yearValidation: "Year is required.",
    }
}
