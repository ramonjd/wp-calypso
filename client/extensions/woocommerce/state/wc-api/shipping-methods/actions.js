/**
 * Internal dependencies
 */
import request from '../request';
import { setError } from 'woocommerce/state/site/status/wc-api/actions';
import {
	WOOCOMMERCE_API_FETCH_SHIPPING_METHODS,
	WOOCOMMERCE_API_FETCH_SHIPPING_METHODS_SUCCESS,
} from 'woocommerce/state/action-types';
import {
	areShippingMethodsLoaded,
	areShippingMethodsLoading,
} from './selectors';

export const fetchShippingMethodsSuccess = ( siteId, data ) => {
	return {
		type: WOOCOMMERCE_API_FETCH_SHIPPING_METHODS_SUCCESS,
		payload: {
			siteId,
			data,
		},
	};
};

export const fetchShippingMethods = ( siteId ) => ( dispatch, getState ) => {
	if ( areShippingMethodsLoaded( getState(), siteId ) || areShippingMethodsLoading( getState(), siteId ) ) {
		return;
	}

	const getAction = {
		type: WOOCOMMERCE_API_FETCH_SHIPPING_METHODS,
		payload: { siteId },
	};

	dispatch( getAction );

	return request( siteId ).get( 'shipping_methods' )
		.then( ( data ) => {
			dispatch( fetchShippingMethodsSuccess( siteId, data ) );
		} )
		.catch( err => {
			dispatch( setError( siteId, getAction, err ) );
		} );
};
