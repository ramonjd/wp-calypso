/**
 * External dependencies
 */
import { findIndex, isArray } from 'lodash';

/**
 * Internal dependencies
 */
import {
	WOOCOMMERCE_API_FETCH_SHIPPING_ZONE_METHODS,
	WOOCOMMERCE_API_FETCH_SHIPPING_ZONE_METHODS_SUCCESS,
} from 'woocommerce/state/action-types';
import { LOADING } from 'woocommerce/state/wc-api/reducer';

export default {
	[ WOOCOMMERCE_API_FETCH_SHIPPING_ZONE_METHODS ]: ( state, { payload: { zoneId } } ) => {
		if ( ! isArray( state.shippingZones ) ) {
			return state;
		}
		const zoneIndex = findIndex( state.shippingZones, { id: zoneId } );
		if ( -1 === zoneIndex ) {
			return state;
		}

		const zone = { ...state.shippingZones[ zoneIndex ],
			methodIds: LOADING,
		};
		return { ...state,
			shippingZones: [
				...state.shippingZones.slice( 0, zoneIndex ),
				zone,
				...state.shippingZones.slice( zoneIndex + 1 ),
			],
		};
	},

	[ WOOCOMMERCE_API_FETCH_SHIPPING_ZONE_METHODS_SUCCESS ]: ( state, { payload: { zoneId, data } } ) => {
		if ( ! isArray( state.shippingZones ) ) {
			return state;
		}
		const zoneIndex = findIndex( state.shippingZones, { id: zoneId } );
		if ( -1 === zoneIndex ) {
			return state;
		}

		const zone = { ...state.shippingZones[ zoneIndex ],
			methodIds: data.map( method => method.id ),
		};

		const shippingZoneMethods = state.shippingZoneMethods ? { ...state.shippingZoneMethods } : {};
		data.forEach( method => {
			shippingZoneMethods[ method.id ] = method;
		} );

		return { ...state,
			shippingZones: [
				...state.shippingZones.slice( 0, zoneIndex ),
				zone,
				...state.shippingZones.slice( zoneIndex + 1 ),
			],
			shippingZoneMethods,
		};
	},
};
