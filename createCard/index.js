"use strict";

const { setOutput } = require( "@actions/core" );
const leankitApiFactory = require( "../leankit/api" );
const { getInputParams, reportError, validateLeankitUrl } = require( "../leankit/helpers" );

( async () => {
	const [
		host,
		apiToken,
		boardId,
		title,
		laneId,
		typeId
	] = getInputParams( { required: [ "host", "apiToken", "boardId", "title" ], optional: [ "laneId", "typeId" ] } );

	validateLeankitUrl( "host", host );

	const { createCard } = leankitApiFactory( host, apiToken );
	const id = await createCard( {
		boardId,
		title,
		laneId: laneId || null,
		typeId: typeId || null
	} );

	setOutput( "created-card-id", id );
} )().catch( ex => {
	reportError( "createCard", ex.message );
} );
