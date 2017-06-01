/**
 * Internal dependencies
 */
import {
	WOOCOMMERCE_API_FETCH_SHIPPING_METHODS,
	WOOCOMMERCE_API_FETCH_SHIPPING_METHODS_SUCCESS,
} from 'woocommerce/state/action-types';
import { LOADING } from 'woocommerce/state/wc-api/reducer';

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
