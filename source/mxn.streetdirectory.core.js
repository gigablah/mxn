mxn.register('streetdirectory', {	

Mapstraction: {
	
	init: function(element, api) {		
		var me = this;
		if (SD) {
			this.maps[api] = new SD.genmap.Map(element);

			EventManager.add(this.maps[api], 'click', function() {
				
				var location = this.maps[api].viewportInfo.lastCursorLatLon;
				if ( location ) {
					me.click.fire({'location': new mxn.LatLonPoint(location.lat, location.lon)});
				}
			});

			this.maps[api].viewport.OnEndDrag.register(function() {
				me.moveendHandler(me);
				me.endPan.fire();
			});
			
			this.maps[api].viewport.OnEndMove.register(function() {
				me.moveendHandler(me);
				me.endPan.fire();
			});
			
			this.maps[api].viewport.OnLevelChanged.register(function() {
				me.changeZoom.fire();
			});
			
			this.loaded[api] = true;
			me.load.fire();
		}
		else {
			alert(api + ' map script not imported');
		}
	},
	
	applyOptions: function(){
		var map = this.maps[this.api];
		
		if (this.options.enableDragging) {
			map.setDragging(true);
		} else {
			map.setDragging(false);
		}
	},

	resizeTo: function(width, height){
		var map = this.maps[this.api];
		this.currentElement.style.width = width;
		this.currentElement.style.height = height;
		map.resizeViewport(width,height);
	},

	addControls: function( args ) {
		var map = this.maps[this.api];
	
		if (!this.controls) {
			if (args.zoom == 'large') {
				this.controls = new CompleteMapControl();
			}
			else if (args.zoom == 'small') {
				this.controls = new MediumMapControl();
			}
			if (this.controls) {
				if (!args.pan) {
					this.controls.setDisplay(0, false);
				}
				if (!args.scale) {
					this.controls.setDisplay(1, false);
				}
				map.addControl(this.controls);
			}
		}
		
	},

	addSmallControls: function() {
		var map = this.maps[this.api];
		
		if (!this.controls) {
			this.controls = new MediumMapControl();
			map.addControl(this.controls);
		}
	},

	addLargeControls: function() {
		var map = this.maps[this.api];
		
		if (!this.controls) {
			this.controls = new CompleteMapControl();
			map.addControl(this.controls);
		}
	},

	addMapTypeControls: function() {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
	},

	setCenterAndZoom: function(point, zoom) { 
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
		map.setCenter(pt, zoom);
	},
	
	addMarker: function(marker, old) {
		var map = this.maps[this.api];
		var pin = marker.toProprietary(this.api);
		
		// TODO: Add provider code
		
		return pin;
	},

	removeMarker: function(marker) {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
	},
	
	declutterMarkers: function(opts) {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
	},

	addPolyline: function(polyline, old) {
		var map = this.maps[this.api];
		var pl = polyline.toProprietary(this.api);
		
		// TODO: Add provider code
		
		return pl;
	},

	removePolyline: function(polyline) {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
	},
	
	getCenter: function() {
		var map = this.maps[this.api];
		var point = new mxn.LatLonPoint().fromProprietary(this.api, map.getCenter());
		
		return point;
	},

	setCenter: function(point, options) {
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
		if(options && options.pan) { 
			map.panTo(pt);
		}
		else { 
			map.setCenter(pt, map.zoom);
		}
	},

	setZoom: function(zoom) {
		var map = this.maps[this.api];
		
		map.setZoom(zoom, true);
		
	},
	
	getZoom: function() {
		var map = this.maps[this.api];
		return map.zoom;
	},

	getZoomLevelForBoundingBox: function( bbox ) {
		var map = this.maps[this.api];
		// NE and SW points from the bounding box.
		var ne = bbox.getNorthEast();
		var sw = bbox.getSouthWest();
		var zoom;
		
		// TODO: Add provider code
		
		return zoom;
	},

	setMapType: function(type) {
		var map = this.maps[this.api];
		switch(type) {
			case mxn.Mapstraction.ROAD:
				// TODO: Add provider code
				break;
			case mxn.Mapstraction.SATELLITE:
				// TODO: Add provider code
				break;
			case mxn.Mapstraction.HYBRID:
				// TODO: Add provider code
				break;
			default:
				// TODO: Add provider code
		}	 
	},

	getMapType: function() {
		var map = this.maps[this.api];
		
		// TODO: Add provider code

		//return mxn.Mapstraction.ROAD;
		//return mxn.Mapstraction.SATELLITE;
		//return mxn.Mapstraction.HYBRID;

	},

	getBounds: function () {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
		
		//return new mxn.BoundingBox( ,  ,  ,  );
	},

	setBounds: function(bounds){
		var map = this.maps[this.api];
		var sw = bounds.getSouthWest();
		var ne = bounds.getNorthEast();
		
		// TODO: Add provider code
		
	},

	addImageOverlay: function(id, src, opacity, west, south, east, north, oContext) {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
	},

	setImagePosition: function(id, oContext) {
		var map = this.maps[this.api];
		var topLeftPoint; var bottomRightPoint;

		// TODO: Add provider code

		//oContext.pixels.top = ...;
		//oContext.pixels.left = ...;
		//oContext.pixels.bottom = ...;
		//oContext.pixels.right = ...;
	},
	
	addOverlay: function(url, autoCenterAndZoom) {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
		
	},

	addTileLayer: function(tile_url, opacity, copyright_text, min_zoom, max_zoom, map_type) {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
	},

	toggleTileLayer: function(tile_url) {
		var map = this.maps[this.api];
		
		// TODO: Add provider code
	},

	getPixelRatio: function() {
		var map = this.maps[this.api];

		// TODO: Add provider code	
	},
	
	mousePosition: function(element) {
		var map = this.maps[this.api];

		// TODO: Add provider code	
	}
},

LatLonPoint: {
	
	toProprietary: function() {
		return new GeoPoint(this.lon, this.lat);
	},

	fromProprietary: function(sdPoint) {
		this.lat = sdPoint.lat;
		this.lon = sdPoint.lon;
		return this;
	}
	
},

Marker: {
	
	toProprietary: function() {
		return {};
		// TODO: Add provider code
	},

	openBubble: function() {		
		// TODO: Add provider code
	},

	hide: function() {
		// TODO: Add provider code
	},

	show: function() {
		// TODO: Add provider code
	},

	update: function() {
		// TODO: Add provider code
	}
	
},

Polyline: {

	toProprietary: function() {
		return {};
		// TODO: Add provider code
	},
	
	show: function() {
		// TODO: Add provider code
	},

	hide: function() {
		// TODO: Add provider code
	}
	
}

});