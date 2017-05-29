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
import SubscriptionListItem from 'reader/following-manage/connected-subscription-list-item';

class SitesResults extends React.Component {
	static propTypes = {
		query: PropTypes.string,
	};

	render() {
		const { query, translate, searchResults } = this.props;

		return (
			<div className="search-stream__sites-results">
				<QueryReaderFeedsSearch query={ query } />
				<h1 className="search-stream__sites-results-header">{ translate( 'Sites' ) }</h1>
				{ searchResults
					? searchResults.map(
							feed => (
								<SubscriptionListItem
									key={ feed.feed_ID }
									feedId={ feed.feed_ID }
									blogId={ feed.blogId }
									showLastUpdatedDate={ false }
								/>
							)
						)
					: translate( 'no results' ) }
			</div>
		);
	}
}

export default connect( ( state, ownProps ) => ( {
	searchResults: getReaderFeedsForQuery( state, ownProps.query ),
} ) )( localize( SitesResults ) );
