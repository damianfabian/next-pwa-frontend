import { ProductArray } from 'interfaces';

export const UPDATE_PRODUCTS = 'update-products';
export const UPDATE_STATE = 'update-state';

export interface UpdateProducts {
    type: typeof UPDATE_PRODUCTS,
    products: ProductArray
}

export interface UpdateState {
    type: typeof UPDATE_STATE,
    isLoading: boolean
}

export type ProductActions = UpdateProducts | UpdateState;

export const updateProducts = (products: ProductArray): UpdateProducts => ({
    type: UPDATE_PRODUCTS,
    products
});

export const updateState = (isLoading: boolean): UpdateState => ({
    type: UPDATE_STATE,
    isLoading
});