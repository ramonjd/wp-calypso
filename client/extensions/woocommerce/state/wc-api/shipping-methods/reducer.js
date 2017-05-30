/**
 * Internal dependencies
 */
import {
	WOOCOMMERCE_API_FETCH_SHIPPING_METHODS,
	WOOCOMMERCE_API_FETCH_SHIPPING_METHODS_SUCCESS,
} from '../../action-types';

export const LOADING = 'LOADING';

// TODO: Handle error

export default {
	[ WOOCOMMERCE_API_FETCH_SHIPPING_METHODS ]: ( state ) => {
		return { ...state,
			shippingMethods: LOADING,
		};
	},

	[ WOOCOMMERCE_API_FETCH_SHIPPING_METHODS_SUCCESS ]: ( state, { payload: { data } } ) => {
		return { ...state,
			shippingMethods: data,
		};
	},
};
