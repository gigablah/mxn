mxn.register('streetdirectory', {	

Mapstraction: {
	
	init: function(element, api) {		
		var me = this;
		if (SD) {
			this.maps[api] = new SD.genmap.Map(element, {});
			this.markerManager = new SD.genmap.MarkerStaticManager({
				map: this.maps[api]
			});
			
			EventManager.add(this.maps[api], 'click', function() {
				
				var pos = me.maps[api].viewportInfo.lastCursorPosDown;
				var location = me.maps[api].viewportInfo.viewportScreenToGeo(pos.x, pos.y);
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
		
		if (!this.controls.length) {
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
		throw 'Not supported';
	},

	setCenterAndZoom: function(point, zoom) { 
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
		map.setCenter(pt, zoom);
	},
	
	addMarker: function(marker, old) {
		var map = this.maps[this.api];
		var options = marker.toProprietary(this.api);
		options.map = map;
		
		var pin = this.markerManager.add(
			options
		);
		
		if (marker.infoBubble) {
			if (marker.hover) {
				event_action = "mouseover";
			}
			else {
				event_action = "click";
			}
			EventManager.add(pin, event_action, function(event) {
				map.infoWindow.open(pin, marker.infoBubble);
				event.cancelBubble = true;
				event.cancel = true;
			});
		}
		console.log(pin);
		return pin; // this is attached to marker.proprietary_marker
	},

	removeMarker: function(marker) {
		var map = this.maps[this.api];
		this.markerManager.remove(marker.proprietary_marker);
	},
	
	declutterMarkers: function(opts) {
		throw 'Not supported';
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
		throw 'Not supported';	 
	},

	getMapType: function() {
		throw 'Not supported';
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
		var locDisp = document.getElementById(element);
		if (locDisp !== null) {
			var map = this.maps[this.api];
			EventManager.add(map, "mousemove", function() { // SD's mousemove is undocumented
				var pos = map.viewportInfo.lastCursorPosMove;
				var point = map.viewportInfo.viewportScreenToGeo(pos.x, pos.y);
				var loc = point.lat.toFixed(4) + ' / ' + point.lon.toFixed(4);
				locDisp.innerHTML = loc;
			});
			locDisp.innerHTML = '0.0000 / 0.0000';
		}
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
		var me = this;
		var options = {};
		if (this.labelText) {
			options.title =  this.labelText;
		}
		if (this.iconUrl) {
			var icon = new SD.genmap.MarkerImage({
				image : this.iconUrl, 
				title : this.labelText ? this.labelText : null,
				iconSize : this.iconSize ? new Size(this.iconSize[0], this.iconSize[1]) : null,
				iconAnchor : this.iconAnchor ? new Point(this.iconAnchor[0], this.iconAnchor[1]) : new Point(this.iconSize[0]/2, this.iconSize[1]/2),
				infoWindowAnchor : this.infoWindowAnchor ? new Point(this.infoWindowAnchor[0], this.infoWindowAnchor[1]) : new Point(this.iconSize[0]/2, this.iconSize[1]/2)
			});
			options.icon = icon;
		}
		if (this.draggable) {
			options.draggable = this.draggable;
		}
		options.position = this.location.toProprietary('streetdirectory');
		
		return options;
	},

	openBubble: function() {		
		if (this.infoBubble) this.map.infoWindow.open(this.proprietary_marker, this.infoBubble);
	},

	closeBubble: function() {
		this.map.infoWindow.close();
	},
	
	hide: function() {
		this.proprietary_marker.setDisplay(false);
	},

	show: function() {
		this.proprietary_marker.setDisplay(true);
	},

	update: function() {
		point = new mxn.LatLonPoint();
		point.fromProprietary('streetdirectory', this.proprietary_marker.getPtPosition());
		this.location = point;
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