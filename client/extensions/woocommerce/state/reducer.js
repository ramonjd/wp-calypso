/**
 * Internal dependencies
 */
import ui from './ui/reducer';
import { combineReducers } from 'state/utils';
import wcApi from './wc-api/reducer';
import actionList from './action-list/reducer';
import site from './site/reducer';

export default combineReducers( {
	ui,
	wcApi,
	actionList,
	site,
} );
