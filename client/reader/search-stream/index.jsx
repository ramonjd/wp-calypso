/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
import { trim, debounce } from 'lodash';
import { localize } from 'i18n-calypso';
import page from 'page';

/**
 * Internal Dependencies
 */
import ControlItem from 'components/segmented-control/item';
import SegmentedControl from 'components/segmented-control';
import CompactCard from 'components/card/compact';
import DocumentHead from 'components/data/document-head';
import SearchInput from 'components/search';
import { recordAction, recordTrack } from 'reader/stats';
import { RelatedPostCard } from 'blocks/reader-related-card-v2';
// import { SEARCH_RESULTS } from 'reader/follow-button/follow-sources';
import SiteResults from './site-results';
import PostResults from './post-results';
import ReaderMain from 'components/reader-main';
import { addQueryArgs } from 'lib/url';
import SearchStreamHeader, { POSTS } from './search-stream-header';

class SearchStream extends Component {
	static propTypes = {
		query: PropTypes.string,
	};

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.query !== this.props.query ) {
			this.updateState( nextProps );
		}
	}

	updateState = ( props = this.props ) => {
		const newState = {
			title: this.getTitle( props ),
		};
		if ( newState.title !== this.state.title ) {
			this.setState( newState );
		}
	};

	getTitle = ( props = this.props ) => {
		return props.query;
	};

	state = {
		title: this.getTitle(),
		width: 0,
	};

	updateQuery = newValue => {
		this.scrollToTop();
		const trimmedValue = trim( newValue ).substring( 0, 1024 );
		if (
			( trimmedValue !== '' && trimmedValue.length > 1 && trimmedValue !== this.props.query ) ||
			newValue === ''
		) {
			this.props.onQueryChange( newValue );
		}
	};

	scrollToTop = () => {
		window.scrollTo( 0, 0 );
	};

	handleMainMounted = ref => this.mainRef = ref;
	handleSearchBoxMounted = ref => this.searchBoxRef = ref;

	resizeSearchBox = () => {
		if ( this.searchBoxRef && this.mainRef ) {
			const width = this.mainRef.getClientRects()[ 0 ].width;
			if ( width > 0 ) {
				this.searchBoxRef.style.width = `${ width }px`;
				this.setState( { width } );
			}
		}
	};

	componentDidMount() {
		this.resizeListener = window.addEventListener( 'resize', debounce( this.resizeSearchBox, 50 ) );
		this.resizeSearchBox();
	}

	componentWillUnmount() {
		window.removeEventListener( 'resize', this.resizeListener );
	}

	placeholderFactory = ( { key, ...rest } ) => {
		if ( ! this.props.query ) {
			return (
				<div className="search-stream__recommendation-list-item" key={ key }>
					<RelatedPostCard { ...rest } />
				</div>
			);
		}
		return null;
	};

	useRelevanceSort = () => {
		recordAction( 'search_page_clicked_relevance_sort' );
		recordTrack( 'calypso_reader_clicked_search_sort', {
			query: this.props.query,
			sort: 'relevance',
		} );
		this.props.onSortChange( 'relevance' );
	};

	useDateSort = () => {
		recordAction( 'search_page_clicked_date_sort' );
		recordTrack( 'calypso_reader_clicked_search_sort', {
			query: this.props.query,
			sort: 'date',
		} );
		this.props.onSortChange( 'date' );
	};

	handleSearchTypeSelection = searchType =>
		page.replace(
			addQueryArgs( { searchType }, window.location.pathname + window.location.search )
		);

	render() {
		const { query, translate, searchType } = this.props;
		// const emptyContent = <EmptyContent query={ query } />;
		const sortOrder = this.props.postsStore && this.props.postsStore.sortOrder;
		const wideDisplay = this.state.width > 660;

		let searchPlaceholderText = this.props.searchPlaceholderText;
		if ( ! searchPlaceholderText ) {
			searchPlaceholderText = translate( 'Search billions of WordPress.com posts…' );
		}

		const documentTitle = translate( '%s ‹ Reader', {
			args: this.state.title || this.props.translate( 'Search' ),
		} );

		const TEXT_RELEVANCE_SORT = translate( 'Relevance', {
			comment: 'A sort order, showing the most relevant posts first.',
		} );

		const TEXT_DATE_SORT = translate( 'Date', {
			comment: 'A sort order, showing the most recent posts first.',
		} );

		return (
			<ReaderMain className="search-stream" wideLayout>
				{ /* just for width measurement */ }
				<div ref={ this.handleMainMounted } style={ { width: '100%' } } />
				<DocumentHead title={ documentTitle } />
				<div className="search-stream__fixed-area" ref={ this.handleSearchBoxMounted }>
					<CompactCard className="search-stream__input-card">
						<SearchInput
							onSearch={ this.updateQuery }
							onSearchClose={ this.scrollToTop }
							autoFocus={ this.props.autoFocusInput }
							delaySearch={ true }
							delayTimeout={ 500 }
							placeholder={ searchPlaceholderText }
							initialValue={ query || '' }
							value={ query || '' }
						/>
						{ query &&
							<SegmentedControl compact className="search-stream__sort-picker">
								<ControlItem selected={ sortOrder !== 'date' } onClick={ this.useRelevanceSort }>
									{ TEXT_RELEVANCE_SORT }
								</ControlItem>
								<ControlItem selected={ sortOrder === 'date' } onClick={ this.useDateSort }>
									{ TEXT_DATE_SORT }
								</ControlItem>
							</SegmentedControl> }
					</CompactCard>
					{ query &&
						<SearchStreamHeader
							wideDisplay={ wideDisplay }
							selected={ searchType }
							onSelection={ this.handleSearchTypeSelection }
						/> }
				</div>
				{ wideDisplay &&
					<div className="search-stream__results">
						<div className="search-stream__post-results">
							<PostResults { ...this.props } />
						</div>
						{ query &&
							<div className="search-stream__site-results">
								<SiteResults query={ query } />
							</div> }
					</div> }
				{ ! wideDisplay &&
					<div className="search-stream__single-column-results">
						{ ( searchType === POSTS && <PostResults { ...this.props } /> ) ||
							<SiteResults query={ query } /> }
					</div> }
			</ReaderMain>
		);
	}
}

export default localize( SearchStream );
