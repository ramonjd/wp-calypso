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
				user: null,
				type: 'site_backed_up',
				timestamp: 1485220539222
			},
			{
				title: 'Site has backed up Failed',
				user: null,
				type: 'site_backed_up_failed',
				timestamp: 1485220539222
			},
			{
				title: 'Akismet activated',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'plugin_activated',
				timestamp: 1485220539222
			},
			{
				title: 'Akismet deactivated',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'plugin_deactivated',
				timestamp: 1485220539222
			},
			{
				title: 'Jetpack version 4.6 is available',
				user: null,
				type: 'plugin_needs_update',
				timestamp: 1485220539222
			},
			{
				title: 'Akismet updated to version 3.2',
				user: null,
				type: 'plugin_updated',
				timestamp: 1485220539222
			},
			{
				title: 'This is some really cool post',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'theme_switched',
				timestamp: 1485220539222
			},
			{
				title: 'Twenty Sixteen updated to version 1.0.1',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'theme_updated',
				timestamp: 1485220539222
			},
			{
				title: 'Site updated to Professional Plan, Thank you',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'plan_updated',
				timestamp: 1485220539222
			},
			{
				title: 'Professional Plan Renewed for another month',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'plan_renewed',
				timestamp: 1485220539222
			},
			{
				title: 'Photon was activated',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'activate_jetpack_feature',
				timestamp: 1485220539222
			},
			{
				title: 'Custom CSS was deactivated',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'deactivate_jetpack_feature',
				timestamp: 1485220539222
			},
			{
				title: 'This is some really cool post',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'site_backed_up',
				timestamp: 1485220539222
			},
			{
				title: 'This is some really cool post',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'site_backed_up',
				timestamp: 1485220539222
			},
			{
				title: 'This is some really cool post',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'site_backed_up',
				timestamp: 1485220539222
			},
			{
				title: 'Jetpack updated to 4.5.1',
				subTitle: 'Plugin Update',
				icon: 'plugins',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				time: '4:32pm',
				actionText: 'Undo',
				timestamp: 1483351202400
			},
			{
				title: 'Jetpack updated to 4.5.1',
				subTitle: 'Plugin Activated',
				icon: 'plugins',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				time: '4:32pm',
				actionText: 'Undo',
				timestamp: 1483351202420
			},
			{
				title: 'Post Title',
				subTitle: 'Post Updated',
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
