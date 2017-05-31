/**
 * External dependencies
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Card from 'components/card';
import ExtendedHeader from '../../../components/extended-header';
import { fetchShippingZones } from '../../../state/wc-api/shipping-zones/actions';
import { getAPIShippingZones, areShippingZonesLoaded, areShippingZonesLoading } from '../../../state/wc-api/shipping-zones/selectors';
import { getSelectedSiteId } from 'state/ui/selectors';
import ShippingZone from './shipping-zone';
import ShippingZoneDialog from './shipping-zone-dialog';
import Spinner from 'components/spinner';

class ShippingZoneList extends Component {
	constructor( props ) {
		super( props );

		//TODO: use redux state with real data
		this.state = {
			showDialog: false,
			shippingZones: [ {
				locationName: 'United States',
				locationDescription: '50 states',
				methods: [ {
					name: 'USPS',
					description: 'All domestic services',
				}, {
					name: 'Flat Rate',
					description: 'Minimum spend: $100',
				} ],
				icon: 'location'
			}, {
				locationName: 'Rest of the world',
				locationDescription: '240 countries',
				methods: [ {
					name: 'USPS',
					description: 'All international services',
				} ],
				icon: 'globe'
			} ],
		};
	}

	componentWillMount() {
		if ( this.props.siteId ) {
			this.props.fetchShippingZones( this.props.siteId );
		}
	}

	componentWillReceiveProps( { siteId } ) {
		if ( siteId === this.props.siteId ) {
			return;
		}

		this.props.fetchShippingZones( siteId );
	}

	renderContent() {
		if ( ! this.props.loaded ) {
			return (
				<div className="shipping__loading-spinner">
					<Spinner size={ 24 } />
				</div>
			);
		}

		const { translate } = this.props;

		const renderShippingZone = ( zone, index ) => {
			//TODO: this only overrides mock names with real zone names (when available)
			if ( this.props.shippingZones[ this.props.shippingZones.length - index - 1 ] ) {
				zone = {
					...zone,
					locationName: this.props.shippingZones[ this.props.shippingZones.length - index - 1 ].name
				};
			}
			return ( <ShippingZone key={ index } { ...zone } /> );
		};

		return (
			<div>
				<div className="shipping__zones-row shipping__zones-header">
					<div className="shipping__zones-row-icon"></div>
					<div className="shipping__zones-row-location">{ translate( 'Location' ) }</div>
					<div className="shipping__zones-row-methods">{ translate( 'Shipping methods' ) }</div>
					<div className="shipping__zones-row-actions" />
				</div>
				{ this.state.shippingZones.map( renderShippingZone ) }
			</div>
		);
	}

	render() {
		const { translate } = this.props;

		const onAddZoneOpen = () => {
			this.setState( { showDialog: true } );
		};

		const onAddZoneClose = () => {
			this.setState( { showDialog: false } );
		};

		return (
			<div>
				<ExtendedHeader
					label={ translate( 'Shipping Zones' ) }
					description={ translate( 'The regions you ship to and the methods you will provide.' ) }>
					<Button onClick={ onAddZoneOpen }>{ translate( 'Add zone' ) }</Button>
				</ExtendedHeader>
				<Card className="shipping__zones">
					{ this.renderContent() }
				</Card>
				<ShippingZoneDialog isVisible={ this.state.showDialog } onClose={ onAddZoneClose } />
			</div>
		);
	}
}

export default connect(
	( state ) => ( {
		siteId: getSelectedSiteId( state ),
		shippingZones: getAPIShippingZones( state ),
		loading: areShippingZonesLoading( state ),
		loaded: areShippingZonesLoaded( state )
	} ),
	( dispatch ) => ( {
		fetchShippingZones: bindActionCreators( fetchShippingZones, dispatch )
	} )

)( localize( ShippingZoneList ) );
