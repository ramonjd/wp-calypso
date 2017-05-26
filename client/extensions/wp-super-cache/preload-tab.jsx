/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flowRight, pick } from 'lodash';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Card from 'components/card';
import FormFieldset from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import FormLegend from 'components/forms/form-legend';
import FormSelect from 'components/forms/form-select';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import FormTextInput from 'components/forms/form-text-input';
import FormToggle from 'components/forms/form-toggle/compact';
import Notice from 'components/notice';
import SectionHeader from 'components/section-header';
import WrapSettingsForm from './wrap-settings-form';
import { cancelPreloadCache, preloadCache } from './state/cache/actions';
import { getSelectedSiteId } from 'state/ui/selectors';
import { isPreloadingCache } from './state/cache/selectors';

/**
 * Render cache preload interval number input
 * @returns { object } React element containing the preload interval number input
 */
const renderCachePreloadInterval = ( {
	handleChange,
	isDisabled,
	preload_interval,
} ) => (
	<FormTextInput
		className="wp-super-cache__preload-interval"
		disabled={ isDisabled }
		min="0"
		name="preload_interval"
		onChange={ handleChange( 'preload_interval' ) }
		step="1"
		type="number"
		value={ preload_interval || '0' } />
);

class PreloadTab extends Component {
	componentWillReceiveProps( nextProps ) {
		this.state = {
			preloadRefresh: parseInt( nextProps.fields.preload_interval, 10 ) === 0 ? false : true
		};
	}

	handlePreloadRefreshChange = () => {
		this.setState( { preloadRefresh: ! this.state.preloadRefresh }, () => {
			if ( this.state.preloadRefresh ) {
				return;
			}

			this.props.setFieldValue( 'preload_interval', '0' );
		} );
	}

	getPreloadPostsOptions( post_count ) {
		if ( ! post_count || ( post_count <= 100 ) ) {
			return [];
		}

		const step = Math.floor( post_count / 10 );
		const options = [ 'all' ];

		for ( let i = step; i < post_count; i += step ) {
			options.push( i );
		}

		options.push( post_count );

		return options;
	}

	preload = () => this.props.preloadCache( this.props.siteId );

	cancelPreload = () => this.props.cancelPreloadCache( this.props.siteId );

	render() {
		const {
			fields,
			handleAutosavingToggle,
			handleChange,
			handleSelect,
			handleSubmitForm,
			isPreloading,
			isRequesting,
			isSaving,
			translate,
		} = this.props;

		const {
			is_cache_enabled,
			is_preload_enabled,
			is_preloading,
			is_super_cache_enabled,
			minimum_preload_interval,
			post_count,
			preload_email_volume,
			preload_interval,
			preload_on,
			preload_posts,
			preload_taxonomies,
		} = fields;

		const statusEmailAmountSelectValues = [
			{ value: 'none', description: translate( 'No emails' ) },
			{ value: 'many', description: translate( 'High (two emails per 100 posts)' ) },
			{ value: 'medium', description: translate( 'Medium (one email per 100 posts)' ) },
			{ value: 'less', description: translate( 'Low (one email at the start and one at the end of preloading all posts)' ) },
		];

		if ( ! is_cache_enabled ) {
			return (
				<Notice
					text={ translate( 'Caching must be enabled to use this feature.' ) }
					showDismiss={ false } />
			);
		}

		if ( is_super_cache_enabled && ! is_preload_enabled ) {
			return (
				<Notice
					text={ translate( 'Preloading of cache disabled. Please disable legacy page caching or talk to ' +
						'your host administrator.' ) }
					showDismiss={ false } />
			);
		}

		return (
			<div>
				<SectionHeader label={ ( 'Preload' ) }>
					<Button
						compact
						primary
						disabled={ isRequesting || isSaving }
						onClick={ handleSubmitForm }>
						{ isSaving
							? translate( 'Saving…' )
							: translate( 'Save Settings' )
						}
					</Button>
				</SectionHeader>

				<Card>
					<form>
						<FormFieldset>
							<FormToggle
								checked={ !! preload_on }
								disabled={ isRequesting || isSaving }
								onChange={ handleAutosavingToggle( 'preload_on' ) }>
								<span>
									{ translate( 'Preload mode. (Garbage collection only on legacy cache files. Recommended.)' ) }
								</span>
							</FormToggle>

							<FormToggle
								checked={ this.state.preloadRefresh }
								disabled={ isRequesting || isSaving }
								onChange={ this.handlePreloadRefreshChange }>
								<span>
									{ translate(
										'Refresh preloaded cache files every {{number /}} minute ',
										'Refresh preloaded cache files every {{number /}} minutes ',
										{
											count: preload_interval || 0,
											components: {
												number: renderCachePreloadInterval( {
													handleChange,
													isDisabled: isRequesting || isSaving || ! this.state.preloadRefresh,
													preload_interval,
												} )
											}
										}
									) }

									{ translate(
										'(minimum %(minutes)d minute).',
										'(minimum %(minutes)d minutes).',
										{
											args: { minutes: minimum_preload_interval || 0 },
											count: minimum_preload_interval || 0,
										}
									) }
								</span>
							</FormToggle>

							<FormToggle
								checked={ !! preload_taxonomies }
								disabled={ isRequesting || isSaving }
								onChange={ handleAutosavingToggle( 'preload_taxonomies' ) }>
								<span>
									{ translate( 'Preload tags, categories and other taxonomies.' ) }
								</span>
							</FormToggle>
						</FormFieldset>

						{ post_count && post_count > 100 &&
						<FormFieldset>
							<FormLabel htmlFor="preload_posts">
								{ translate( 'Preload Posts' ) }
							</FormLabel>
							<FormSelect
								className="wp-super-cache__preload-posts"
								disabled={ isRequesting || isSaving }
								id="preload_posts"
								name="preload_posts"
								onChange={ handleSelect }
								value={ preload_posts || 'all' }>
								{
									this.getPreloadPostsOptions( post_count )
										.map( option => <option key={ option } value={ option }>{ option }</option> )
								}
							</FormSelect>
						</FormFieldset>
						}

						<hr />

						<FormFieldset>
							<FormLegend>
								{ translate( 'Status Emails' ) }
							</FormLegend>
							<FormSelect
								disabled={ isRequesting || isSaving }
								id="preload_email_volume"
								name="preload_email_volume"
								onChange={ handleSelect }
								value={ preload_email_volume || 'none' }>
								{
									statusEmailAmountSelectValues.map( ( { value, description } ) => {
										return <option key={ value } value={ value }>{ description }</option>;
									} )
								}
							</FormSelect>
							<FormSettingExplanation>
								{ translate( 'Send me status emails when files are refreshed during preload.' ) }
							</FormSettingExplanation>
						</FormFieldset>
					</form>
				</Card>

				<SectionHeader label={ translate( 'Preload Cache' ) } />
				<Card>
				{ is_preloading
					? <Button
							compact
							busy={ isPreloading }
							disabled={ isPreloading }
							onClick={ this.cancelPreload }>
							{ translate( 'Cancel Cache Preload' ) }
							</Button>
					: <Button
							compact
							busy={ isPreloading }
							disabled={ isPreloading }
							onClick={ this.preload }>
							{ translate( 'Preload Cache Now' ) }
						</Button>
				}
				</Card>
			</div>
		);
	}
}

const connectComponent = connect(
	( state ) => {
		const siteId = getSelectedSiteId( state );

		return {
			isPreloading: isPreloadingCache( state, siteId ),
		};
	},
	{
		cancelPreloadCache,
		preloadCache,
	},
);

const getFormSettings = settings => {
	return pick( settings, [
		'is_cache_enabled',
		'is_preload_enabled',
		'is_preloading',
		'is_super_cache_enabled',
		'minimum_preload_interval',
		'post_count',
		'preload_email_volume',
		'preload_interval',
		'preload_on',
		'preload_posts',
		'preload_taxonomies',
	] );
};

export default flowRight(
	connectComponent,
	WrapSettingsForm( getFormSettings )
)( PreloadTab );
