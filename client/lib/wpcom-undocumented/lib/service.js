/**
 * Module dependencies.
 */
const debug = require( 'debug' )( 'calypso:wpcom-undocumented:external' );

/**
 * `External` constructor.
 *
 * @constructor
 * @param {WPCOM} wpcom
 * @public
 */

// XXX improve this to remove the binding
class ExternalMedia {
	constructor( wpcom, siteId ) {
		if ( ! ( this instanceof ExternalMedia ) ) {
			return new ExternalMedia( wpcom );
		}

		this.siteId = siteId;
		this.wpcom = wpcom;
	}

	copy( query, files, callback ) {
		debug( `/sites/${ this.siteId }/external-media-upload` );
console.log( query );
		return this.wpcom.req.post( `/sites/${ this.siteId }/external-media-upload`, { external_ids: files, service: 'google_photos' }, callback );
	}
}

class External {
	constructor( wpcom ) {
		if ( ! ( this instanceof External ) ) {
			return new External( wpcom );
		}

		this.wpcom = wpcom;
	}

	mediaList( query, callback ) {
		debug( `/meta/external-media/${ query.source }` );

		return this.wpcom.req.get( `/meta/external-media/${ query.source }`, query, callback );
	}

	media( siteId ) {
		return new ExternalMedia( this.wpcom, siteId );
	}
}

/*!
 * Expose `External` module
 */

module.exports = External;
