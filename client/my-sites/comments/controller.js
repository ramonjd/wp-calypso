/**
 * External dependencies
 */
import { renderWithReduxStore } from 'lib/react-helpers';
import React from 'react';
import { includes } from 'lodash';
import page from 'page';

/**
 * Internal dependencies
 */
import route from 'lib/route';
import CommentsManagement from './main';
import controller from 'my-sites/controller';

const STATUSES = [ 'pending', 'approved', 'trash', 'all', 'spam' ];

export const comments = function( context ) {
	const siteSlug = route.getSiteFragment( context.path );
	const status = context.params.status === 'pending' ? 'unapproved' : context.params.status;

	renderWithReduxStore(
		<CommentsManagement
			basePath={ context.path }
			siteSlug={ siteSlug }
			status={ status }
		/>,
		'primary',
		context.store
	);
};

export const sites = function( context ) {
	const { site } = context.params;
	if ( ! includes( STATUSES, site ) ) {
		return page.redirect( `/comments/pending/${ site }` );
	}
	controller.sites( context );
};
