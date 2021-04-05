import { AppThunk } from 'stores';
import { executeGet } from 'utils/request';
import { updateProducts } from './products.actions';

export const getProducts = (): AppThunk => (
    async dispatch => {
        const products = await executeGet('/api/products');

        dispatch(updateProducts(products));
    }
);
