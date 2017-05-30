/**
 * External Dependencies
 */
import React, { PropTypes } from 'react';
import 'lodash';
import { localize } from 'i18n-calypso';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */
import { getReaderFeedsForQuery } from 'state/selectors';
import QueryReaderFeedsSearch from 'components/data/query-reader-feeds-search';
import SubscriptionListItem from 'blocks/reader-subscription-list-item/connected';

class SitesResults extends React.Component {
	static propTypes = {
		query: PropTypes.string,
	};

	render() {
		const { query, searchResults } = this.props;

		return (
			<div>
				<QueryReaderFeedsSearch query={ query } />
				{ ( searchResults || [] )
					.map(
						feed => (
							<SubscriptionListItem
								key={ feed.feed_ID }
								feedId={ +feed.feed_ID }
								blogId={ +feed.blogId }
								showLastUpdatedDate={ false }
							/>
						)
					) }
			</div>
		);
	}
}

export default connect( ( state, ownProps ) => ( {
	searchResults: getReaderFeedsForQuery( state, ownProps.query ),
} ) )( localize( SitesResults ) );
