/**
 * Internal dependencies
 */
// TODO: Remove this when product edits have siteIds.
import { getSelectedSiteId } from 'state/ui/selectors';
import { getAllProductEdits, getProductWithLocalEdits } from './selectors';
import { createProduct } from '../../wc-api/products/actions';
import { apiPlanCreate } from '../../api-plan/actions';
import {
	WOOCOMMERCE_EDIT_PRODUCT,
	WOOCOMMERCE_EDIT_PRODUCT_ATTRIBUTE,
	WOOCOMMERCE_API_CREATE_PRODUCT,
} from '../../action-types';

export function editProduct( product, data ) {
	return {
		type: WOOCOMMERCE_EDIT_PRODUCT,
		payload: { product, data },
	};
}

export function editProductAttribute( product, attribute, data ) {
	return {
		type: WOOCOMMERCE_EDIT_PRODUCT_ATTRIBUTE,
		payload: { product, attribute, data },
	};
}

/**
 * Creates a plan to save product-related edits.
 *
 * Saves products, variations, and product categories.
 * @return {Function} Action thunk to be dispatched.
 */
export function createProductPlan() {
	return ( dispatch, getState ) => {
		const rootState = getState();
		const plan = makeProductApiPlan( rootState );

		return apiPlanCreate( plan );
	};
}

const planOperations = {
	[ WOOCOMMERCE_API_CREATE_PRODUCT ]: ( rootState, { siteId, productId } ) => {
		const product = getProductWithLocalEdits( rootState, productId );
		return createProduct( siteId, product, onSuccess, onFailure );
	}
};

/**
 * Makes a product API plan object based on current product edits.
 *
 * For internal and testing use only.
 * @private
 * @param {Object} rootState The root calypso state.
 * @param {Number} [siteId=selected site] The siteId for the plan (TODO: Remove this when edits have siteIds.)
 * @param {Object} [productEdits=all edits] The product edits to be included in the plan
 * @return {Object} An API plan object.
 */
export function makeProductApiPlan(
	rootState,
	siteId = getSelectedSiteId( rootState ),
	productEdits = getAllProductEdits( rootState )
) {
	// TODO: sequentially go through edit state and create steps.
	/* TODO: Add category API calls before product.
	...categories.creates
	...categories.updates
	...categories.deletes
	*/

	let productCreates = [];
	if ( productEdits && productEdits.creates ) {
		productCreates = productEdits.creates.map(
			( p ) => ( { operation: WOOCOMMERCE_API_CREATE_PRODUCT, payload: { siteId: siteId, id: p.id } } )
		);
	}

	/* TODO: Add updates and deletes
	...product.updates
	...product.deletes
	*/

	/* TODO: Add variation API calls after product.
	...variation.creates
	...variation.updates
	...variation.deletes
	*/

	return [
		...productCreates
	];
}

function onSuccess( data ) {
	// TODO: Fill in with next step.
	console.log( 'Success!', data );
}

function onFailure( err ) {
	// TODO: Fill in with next step.
	console.log( 'Failure!', err );
}

