import { SalesModuleLanguageType } from "./SalesModuleLanguageType";

export const SaleModuleBrazilianPortuguese: SalesModuleLanguageType = {
    label: "Vendas",
    words: {
        fk_IdClient: "Cliente",
        fk_IdSeller: "Vendedor",
        fk_IdCar: "Carro",
        price: "Preço",
        dthRegister: "Data de Registro",
        createNotificationDescription: "Venda criada com sucesso.",
        updateNotificationDescription: "Venda atualizada com sucesso.",
        deleteNotificationDescription: "Venda excluída com sucesso.",
        fetchNotificationError: "Falha ao buscar dados de vendas.",
        createNotificationError: "Falha ao criar venda.",
        updateNotificationError: "Falha ao atualizar venda.",
        deleteNotificationError: "Falha ao excluir venda.",
        confirmationDeleteMessage: "Tem certeza de que deseja excluir esta venda?",
        carValidation: "Carro inválido",
        clientValidation: "Cliente inválido",
        priceValidation: "Preço inválido",
        sellerValidation: "Vendedor inválido",
        dthRegistroFIM: "Data final",
        dthRegistroINI: "Data inicial",
        filter: "Filtrar",
        filterNotificationDescription: "Filtragem realizada com sucesso",
        filterNotificationError: "Não filtrado",
        idVendedor: "Id do vendedor",
        precoFIM: "Preço final",
        precoINI: "Preço inicial",
        topFiveSales: "Cinco maiores vendas",
        topSellers: "Melhores vendedores",
        totalRevenue: "Rendimento total",
        salesByBrand:"Vendas por Marca"
    }
}
