/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import ExtendedHeader from '../../../components/extended-header';
import { fetchPaymentMethods } from '../../../state/wc-api/payment-methods/actions';
import { getPaymentMethodsGroup } from '../../../state/ui/payments/methods/selectors';
import List from '../../../components/list/list';
import ListHeader from '../../../components/list/list-header';
import ListItemField from '../../../components/list/list-item-field';
import PaymentMethodEdit from './payment-method-edit';
import PaymentMethodItem from './payment-method-item';

class SettingsPaymentsOffSite extends Component {
	static propTypes = {
		paymentMethods: PropTypes.array,
		fetchPaymentMethods: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.fetchPaymentMethods();
	}

	renderMethodItem = ( method ) => {
		return (
			<div key={ method.title }>
				<PaymentMethodItem method={ method } />
				<PaymentMethodEdit settingsFields={ method.settings } />
			</div>
		);
	}

	render() {
		const { translate, paymentMethods } = this.props;

		return (
			<div className="payments__off-site-container">
				<ExtendedHeader
					label={ translate( 'Off-site credit card payment methods' ) }
					description={
						translate(
							'Off-site payment methods involve sending the customer to a ' +
							'third party web site to complete payment, like PayPal. More ' +
							'information'
						)
					} />
					<List>
						<ListHeader>
							<ListItemField className="payments__methods-column-method">
								{ translate( 'Method' ) }
							</ListItemField>
							<ListItemField className="payments__methods-column-fees">
								{ translate( 'Fees' ) }
							</ListItemField>
							<ListItemField className="payments__methods-column-settings">
							</ListItemField>
						</ListHeader>
						{ paymentMethods && paymentMethods.map( this.renderMethodItem ) }
					</List>
			</div>
		);
	}
}

function mapStateToProps( state ) {
	const paymentMethods = getPaymentMethodsGroup( state, 'off-site' );
	return {
		paymentMethods
	};
}

function mapDispatchToProps( dispatch ) {
	return bindActionCreators(
		{
			fetchPaymentMethods
		},
		dispatch
	);
}

export default localize( connect( mapStateToProps, mapDispatchToProps )( SettingsPaymentsOffSite ) );
