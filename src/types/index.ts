export type IOrder = {
    id: string
    vendor: IVendor
    order_number: number
    phone_number: number
    status: string
    catalogue: string
    created_at: Date
    completed_at: Date
    collected_at: Date
    cancelled_at: Date
    preparing_at: Date

}

export type IProduct = {
    sku: string
    instock: boolean
    created_at: Date
    title: string
    image_url: string
    price: number
    vendor: IVendor
}

export type IVendor = {
    id: string
    name: string
    slug: string
    created_at: Date
}

export type IShop = {
    id?: string
    name?: string
    created_at?: string
    slug?: string
}

export type IExpense = {
    id?: string
    shop?: IShop
    invoice_number?: string
    amount?: number
    created_at?: Date
}