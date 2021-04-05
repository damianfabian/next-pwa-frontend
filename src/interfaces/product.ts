export type ProductAttribute = {
    id: number,
    name: string,
    title: string,
    options: [string]
};

export type ProductItemProps = {
    id: string,
    name: string,
    title: string,
    description?: string,
    image?: string,
    price: number,
    disccount?: number,
    attributes?: [ProductAttribute]
};

export type ProductListProps = {
    products: ProductArray
}

export type ProductHeaderProps = {
    filters?: [string]
}

export type ProductFooterProps = {
    filters?: [string]
}

export type ProductArray = never[] | [] | [ProductItemProps]