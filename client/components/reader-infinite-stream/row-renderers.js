/**
 * External Dependencies
 */
import { get } from 'lodash';

/**
 * Internal Dependencies
 */
import ConnectedSubscriptionListItem from 'blocks/reader-subscription-list-item/connected';

export const siteRowRenderer = ( {
	followSource,
	showLastUpdatedDate,
	sites,
	rowRendererProps,
	measuredRowRenderer,
} ) => {
	const site = sites[ rowRendererProps.index ];

	const feedUrl = get( site, 'feed_URL' );
	const feedId = +get( site, 'feed_ID' );
	const siteId = +get( site, 'blog_ID' );

	const props = { url: feedUrl, feedId, siteId, followSource, showLastUpdatedDate };
	return measuredRowRenderer( ConnectedSubscriptionListItem, props, rowRendererProps );
};
