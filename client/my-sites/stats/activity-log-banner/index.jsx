/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import Button from 'components/button';
import Gridicon from 'gridicons';

class ActivityLogBanner extends Component {

	static propTypes = {
		logs: PropTypes.array,
		isRestoring: PropTypes.bool
	};

	getContent() {
		const { translate } = this.props;
		if ( this.props.isRestoring ) {
			return (
				<div className="activity-log-banner__content">
					<h2 className="activity-log-banner__content-title">{ translate( 'Currently restoring your site' ) }</h2>
					<div className="activity-log-banner__content-body">
						{
							translate( "We're in the process of restoring your site to %(date)s", {
								args: {
									// todo: change with real date data
									date: 'March 17, 2017'
								}
							} )
						}
						{
							translate( "You'll receive a notification once it's complete!" )
						}
					</div>
					<div className="activity-log-banner__content-meta"><em>{
						translate( 'Currently restoring posts…' )
					}</em></div>
				</div>
			);
		}
		return (
			<div className="activity-log-banner__content">
				<h2 className="activity-log-banner__content-title">{ translate( 'This item requires your immediate attention' ) }</h2>
				<div className="activity-log-banner__content-body">Jetpack found a threat in your Yoast SEO Plugin</div>
				<div className="activity-log-banner__content-meta">17 January 2017 at 3:30 PM - Malware code detected</div>
			</div>
		);
	}

	getAction() {
		return ( <Button primary>Fix Threat</Button> );
	}

	getIcon() {
		return <Gridicon icon="notice" size={ 24 } />;
	}

	getRestoringBanner() {

	}

	render() {
		return (
			<Card className="activity-log-banner">
				<div className="activity-log-banner__icon">
					{ this.getIcon() }
				</div>
				{ this.getContent() }
				{ this.getAction() }
			</Card>
		);
	}
}

export default localize( ActivityLogBanner );
