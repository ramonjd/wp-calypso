/**
 * Internal dependencies
 */
import settingsGeneral from './settings/general/reducer';
import productCategories from './product-categories/reducer';
import shippingMethods from './shipping-methods/reducer';
import shippingZones from './shipping-zones/reducer';
import products from './products/reducer';

export const LOADING = 'LOADING';

const initialState = {};

const handlers = {
	...productCategories,
	...settingsGeneral,
	...shippingMethods,
	...shippingZones,
	...products,
};

export default function( state = initialState, action ) {
	const { type, payload } = action;
	const { siteId } = payload || {};
	const handler = handlers[ type ];

	if ( handler ) {
		if ( ! siteId ) {
			throw new TypeError( `Action ${ type } handled by reducer, but no siteId set on action.` );
		}

		const siteState = state[ siteId ] || {};
		const newSiteState = handler( siteState, action );

		return { ...state, [ siteId ]: newSiteState };
	}

	return state;
}
