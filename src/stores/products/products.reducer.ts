import { ProductArray } from 'types';
import { ProductActions, UPDATE_PRODUCTS, UPDATE_STATE } from './products.actions';

interface ProductsState {
    products: ProductArray,
    isLoading: boolean
}

const initialState = {
    products: [],
    isLoading: false
};

const productStore = (
    state: ProductsState = initialState,
    action: ProductActions
): ProductsState => {
    switch (action.type) {
    case UPDATE_PRODUCTS: {
        const { products } = action;

        return {
            ...state,
            products
        };
    }
    
    case UPDATE_STATE: {
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };
    }

    default:
        return state;
    }
};

export default productStore;