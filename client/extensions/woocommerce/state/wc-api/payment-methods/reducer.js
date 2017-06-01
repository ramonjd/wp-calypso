/**
 * Internal dependencies
 */
import {
	WOOCOMMERCE_API_FETCH_PAYMENT_METHODS,
	WOOCOMMERCE_API_FETCH_PAYMENT_METHODS_SUCCESS,
	WOOCOMMERCE_API_PAYMENT_METHOD_SAVE,
	WOOCOMMERCE_API_PAYMENT_METHOD_SAVE_SUCCESS
} from '../../action-types';

export const LOADING = 'LOADING';

// TODO: Handle error

export default {
	[ WOOCOMMERCE_API_FETCH_PAYMENT_METHODS ]: ( state ) => {
		return { ...state,
			paymentMethods: LOADING,
		};
	},

	[ WOOCOMMERCE_API_FETCH_PAYMENT_METHODS_SUCCESS ]: ( state, { payload: { data } } ) => {
		return { ...state,
			paymentMethods: data,
		};
	},
	[ WOOCOMMERCE_API_PAYMENT_METHOD_SAVE ]: ( state ) => {
		return { ...state,
			paymentMethods: LOADING,
		};
	},

	[ WOOCOMMERCE_API_PAYMENT_METHOD_SAVE_SUCCESS ]: ( state, { payload: { data } } ) => {
		return { ...state,
			paymentMethods: data,
		};
	},
};
