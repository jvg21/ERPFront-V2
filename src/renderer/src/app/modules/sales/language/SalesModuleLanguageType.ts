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
        clientValidation:string;
        sellerValidation:string;
        carValidation:string;
        priceValidation:string;
        filterNotificationDescription:string;
        filterNotificationError:string;
        dthRegistroINI:string;
        dthRegistroFIM:string;
        idVendedor:string;
        precoINI:string;
        precoFIM:string;
        filter:string;
        totalRevenue:string;
        topFiveSales:string;
        topSellers:string;
        
        


    }
}