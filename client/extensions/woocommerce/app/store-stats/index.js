/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Main from 'components/main';
import Navigation from './store-stats-navigation';
import { getSelectedSiteId, getSelectedSiteSlug } from 'state/ui/selectors';
import Chart from './store-stats-chart';
import StatsPeriodNavigation from 'my-sites/stats/stats-period-navigation';
import DatePicker from 'my-sites/stats/stats-date-picker';

class StoreStats extends Component {
	static propTypes = {
		siteId: PropTypes.number,
		unit: PropTypes.string.isRequired,
		startDate: PropTypes.string,
		path: PropTypes.string.isRequired,
	};

	render() {
		const { siteId, unit, startDate, path, moment, slug } = this.props;
		const today = moment().format( 'YYYY-MM-DD' );
		const selectedDate = startDate || today;
		const ordersQuery = {
			unit,
			date: today,
			quantity: '30'
		};
		return (
			<Main className="store-stats woocommerce" wideLayout={ true }>
				<Navigation unit={ unit } type="orders" slug={ slug } />
				<Chart
					path={ path }
					query={ ordersQuery }
					selectedDate={ selectedDate }
					siteId={ siteId }
					unit={ unit }
				/>
				<StatsPeriodNavigation
					date={ moment( selectedDate ) }
					period={ unit }
					url={ `/store/stats/orders/${ unit }/${ slug }` }
				>
					<DatePicker
						period={ unit }
						date={ moment( selectedDate ) }
						query={ ordersQuery }
						statsType="statsOrders"
						showQueryDate
					/>
				</StatsPeriodNavigation>
			</Main>
		);
	}
}

const localizedStats = localize( StoreStats );

export default connect(
	state => {
		return {
			slug: getSelectedSiteSlug( state ),
			siteId: getSelectedSiteId( state ),
		};
	}
)( localizedStats );
