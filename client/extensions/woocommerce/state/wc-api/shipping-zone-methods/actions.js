/**
 * Internal dependencies
 */
import request from '../request';
import { setError } from 'woocommerce/state/site/status/wc-api/actions';
import {
	WOOCOMMERCE_API_FETCH_SHIPPING_ZONE_METHODS,
	WOOCOMMERCE_API_FETCH_SHIPPING_ZONE_METHODS_SUCCESS,
} from 'woocommerce/state/action-types';
import {
	areShippingZoneMethodsLoaded,
	areShippingZoneMethodsLoading,
} from '../shipping-zones/selectors';

export const fetchShippingZoneMethodsSuccess = ( siteId, zoneId, data ) => {
	return {
		type: WOOCOMMERCE_API_FETCH_SHIPPING_ZONE_METHODS_SUCCESS,
		payload: {
			siteId,
			zoneId,
			data,
		},
	};
};

export const fetchShippingZoneMethods = ( siteId, zoneId ) => ( dispatch, getState ) => {
	if ( areShippingZoneMethodsLoaded( getState(), zoneId, siteId ) ||
		areShippingZoneMethodsLoading( getState(), zoneId, siteId ) ) {
		return;
	}

	const getAction = {
		type: WOOCOMMERCE_API_FETCH_SHIPPING_ZONE_METHODS,
		payload: { siteId, zoneId },
	};

	dispatch( getAction );

	return request( siteId ).get( 'shipping/zones/' + zoneId + '/methods' )
		.then( ( data ) => {
			dispatch( fetchShippingZoneMethodsSuccess( siteId, zoneId, data ) );
		} )
		.catch( err => {
			dispatch( setError( siteId, getAction, err ) );
		} );
};
