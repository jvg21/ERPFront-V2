import { SalesModuleLanguageType } from "./SalesModuleLanguageType";

export const SaleModuleGerman: SalesModuleLanguageType = {
    label: "Verkäufe",
    words: {
        fk_IdClient: "Kunde",
        fk_IdSeller: "Verkäufer",
        fk_IdCar: "Auto",
        price: "Preis",
        dthRegister: "Registrierungsdatum",
        createNotificationDescription: "Verkauf erfolgreich erstellt.",
        updateNotificationDescription: "Verkauf erfolgreich aktualisiert.",
        deleteNotificationDescription: "Verkauf erfolgreich gelöscht.",
        fetchNotificationError: "Fehler beim Abrufen von Verkaufsdaten.",
        createNotificationError: "Fehler beim Erstellen des Verkaufs.",
        updateNotificationError: "Fehler beim Aktualisieren des Verkaufs.",
        deleteNotificationError: "Fehler beim Löschen des Verkaufs.",
        confirmationDeleteMessage: "Sind Sie sicher, dass Sie diesen Verkauf löschen möchten?",
        carValidation: "Ungültiges Auto",
        clientValidation: "Ungültiger Kunde",
        priceValidation: "Ungültiger Preis",
        sellerValidation: "Ungültiger Verkäufer",
        dthRegistroFIM: "Enddatum",
        dthRegistroINI: "Anfangsdatum",
        filter: "Filtern",
        filterNotificationDescription: "Erfolgreich gefiltert",
        filterNotificationError: "Nicht gefiltert",
        idVendedor: "Verkäufer-ID",
        precoFIM: "Endpreis",
        precoINI: "Anfangspreis",
        topFiveSales: "Top fünf Verkäufe",
        topSellers: "Top Verkäufer",
        totalRevenue: "Gesamteinnahmen"

    }
}
