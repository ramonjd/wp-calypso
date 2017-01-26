/**
 * External dependencies
 */
import { pick } from 'lodash';

/**
 * Internal dependencies
 */
import wpcom from 'lib/wp';
import {
	ACTIVITY_LOG_FETCH,
	ACTIVITY_LOG_FETCH_FAILED,
	ACTIVITY_LOG_FETCH_SUCCESS
} from 'state/action-types';

export default {
	getActivityLogData( siteId ) {
		const logs = [
			{
				title: 'Site has not backed up',
				description: 'We couldn\'t establish a connection to your site.',
				user: null,
				type: 'site_backed_up',
				timestamp: 1485220539222
			},
			{
				title: 'Site has backed up Failed',
				description: 'We couldn\'t establish a connection to your site.',
				user: null,
				type: 'site_backed_up_failed',
				timestamp: 1485220539222
			},
			{
				title: 'Suspicious code detected in 2 plugin files.',
				description: 'We found potential warmful code in two of your Plugins: Yoast SEO and Advanced Custom Fields.',
				user: null,
				type: 'suspicious_code',
				timestamp: 1485220539222
			},
			{
				title: 'Akismet activated',
				description: 'Akismet Plugin was successfully activated.',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'plugin_activated',
				timestamp: 1485220539222
			},
			{
				title: 'Akismet deactivated',
				description: 'Akismet Plugin was successfully deactivated.',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'plugin_deactivated',
				timestamp: 1485220539222
			},
			{
				title: 'Jetpack version 4.6 is available',
				description: 'A new version of the Jetpack Plugin was been released. Click here to update, or turn on auto-updates for Plugins and we\'ll manage those for you',
				user: null,
				type: 'plugin_needs_update',
				timestamp: 1485220539222
			},
			{
				title: 'Akismet updated to version 3.2',
				description: 'Akismet Plugin was successfully updated to its latest version: 3.2.',
				user: null,
				type: 'plugin_updated',
				timestamp: 1485220539222
			},
			{
				title: 'Twenty Eighteen Theme was activated',
				description: 'TwentyEighteen Plugin was successfully activated.',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'theme_switched',
				timestamp: 1485220539222
			},
			{
				title: 'Twenty Sixteen updated to version 1.0.1',
				description: 'Twenty Sixteen Plugin was successfully updated to its latest version: 1.0.1.',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'theme_updated',
				timestamp: 1485220539222
			},
			{
				title: 'Site updated to Professional Plan, Thank you',
				description: 'Professional Plan was successfully purchased for your site and is valid until February 15, 2018.',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'plan_updated',
				timestamp: 1485220539222
			},
			{
				title: 'Professional Plan Renewed for another month',
				description: 'Professional Plan was renewed for another month and is valid until February 28, 2017',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'plan_renewed',
				timestamp: 1485220539222
			},
			{
				title: 'Photon was activated',
				description: 'Photon module was activated in your site. All your images will now be served through the WordPress.com worldwide network.',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'activate_jetpack_feature',
				timestamp: 1485220539222
			},
			{
				title: 'Custom CSS was deactivated',
				description: 'Custom CSS module was deactivated.',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'deactivate_jetpack_feature',
				timestamp: 1485220539222
			},
			{
				title: 'This is some really cool post',
				description: '',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'site_backed_up',
				timestamp: 1485220539222
			},
			{
				title: 'This is some really cool post',
				description: '',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'site_backed_up',
				timestamp: 1485220539222
			},
			{
				title: 'This is some really cool post',
				description: '',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'site_backed_up',
				timestamp: 1485220539222
			},
			{
				title: 'Jetpack updated to 4.5.1',
				subTitle: 'Plugin Update',
				description: '',
				icon: 'plugins',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				time: '4:32pm',
				actionText: 'Undo',
				timestamp: 1483351202400
			},
			{
				title: 'Jetpack updated to 4.5.1',
				subTitle: 'Plugin Activated',
				description: '',
				icon: 'plugins',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				time: '4:32pm',
				actionText: 'Undo',
				timestamp: 1483351202420
			},
			{
				title: 'Post Title',
				subTitle: 'Post Updated',
				description: '',
				icon: 'posts',
				user: { ID: 333, name: 'Jane A', role: 'Admin' },
				time: '10:55am',
				actionText: 'Undo',
				timestamp: 1483264820300
			}
		];

		return ( dispatch ) => {
			dispatch( {
				type: ACTIVITY_LOG_FETCH,
				siteId
			} );

			return wpcom.undocumented().getActivityLog( siteId )
				.then( ( data ) => {
					data = logs; // Get some fake data
					dispatch( {
						type: ACTIVITY_LOG_FETCH_SUCCESS,
						siteId,
						data
					} );
				} )
				.catch( ( error ) => {
					dispatch( {
						type: ACTIVITY_LOG_FETCH_FAILED,
						siteId,
						error: pick( error, [ 'error', 'status', 'message' ] )
					} );
				} );
		};
	}
};
