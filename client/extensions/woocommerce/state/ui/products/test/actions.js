/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	makeProductApiPlan,
} from '../actions';
import {
	WOOCOMMERCE_API_CREATE_PRODUCT,
} from '../../../action-types';

describe( 'makeProductApiPlan', () => {
	it( 'should return null when there are no edits', () => {
		expect( makeProductApiPlan( null, 123, null ) ).to.equal.null;
	} );

	it( 'should return a single API request for a single simple product create', () => {
		const edits = {
			creates: [
				{ id: { index: 0 }, name: 'Product #1' },
			]
		};

		const plan = [
			{ operation: WOOCOMMERCE_API_CREATE_PRODUCT, payload: { siteId: 123, id: { index: 0 } } },
		];

		expect( makeProductApiPlan( null, 123, edits ) ).to.eql( plan );
	} );

	it( 'should return multiple API create requests for multiple products to be created', () => {
		const edits = {
			creates: [
				{ id: { index: 0 }, name: 'Product #1' },
				{ id: { index: 1 }, name: 'Product #2' },
			]
		};

		const plan = [
			{ operation: WOOCOMMERCE_API_CREATE_PRODUCT, payload: { siteId: 123, id: { index: 0 } } },
			{ operation: WOOCOMMERCE_API_CREATE_PRODUCT, payload: { siteId: 123, id: { index: 1 } } },
		];

		expect( makeProductApiPlan( null, 123, edits ) ).to.eql( plan );
	} );
} );

