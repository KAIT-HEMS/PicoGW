const LOCATION_LIST = [ 'undefined'
	,'living','dining','kitchen','bathroom','washroom'
	,'dressingroom','passageway','room','stairway','frontdoor'
	,'storeroom','garden','garage','balcony','others'];
var NULLPROP=function(){return;} ;
const AIRCON_MODE_LIST = ['others','auto','cool','heat','dry','wind'] ;

// Two function are set for each epc. Both can be omited.
// The first one converts from hex string (possibly more than 2 characters)
// to human-readable string. The second one converts from human-readable
// string to hex string (possibly more than 2 characters).
// It is important for the second function to return the input string
// as is, when expected input strings are not provided.

exports.eojs = {
	'0000':{	// device super class
		'80': [ x=>(x=='30'?'on':'off')					// Operation Status
			, x=>(x.toLowerCase()=='on'?'30':(x.toLowerCase()=='off'?'31':x)) ]
		,'81':[ x=>LOCATION_LIST[Math.min(15,parseInt('0x'+x)>>3)]				// Install Location
			, x=>{
				var i = LOCATION_LIST.indexOf(x.toLowerCase()) ;
				if( i<0 ) i=0 ;
				if( i!=0 ) i = (i<<3)+1 ;
				return ('0'+i.toString(16)).slice(-2) ;
			} ]
		,'82':[ x=>String.fromCharCode(parseInt('0x'+x.substring(4,6))) ]	// Version (RO:Read only)
		,'88':[ x=>(x=='41'?'error':'none') ]								// Error state (RO)
		,'8a':[ x=>parseInt('0x'+x) ]										// Manufacture code (RO)
		,'8b':[ NULLPROP ]
		,'8e':[ x=>(														// Date (RO)
					parseInt('0x'+x.substring(0,2))		// year
					+'/'+parseInt('0x'+x.charAt(2))		// month
					+'/'+parseInt('0x'+x.charAt(3)))	// day
			]
		,'9d':[ NULLPROP ],'9e':[ NULLPROP ],'9f': [ NULLPROP ]
	}

	,'0ef0':{	// Node profile
		'80': [ x=>(x=='30'?'on':'off')					// Operation Status
			, x=>(x.toLowerCase()=='on'?'30':(x.toLowerCase()=='off'?'31':x)) ]
		,'8a':[ x=>parseInt('0x'+x) ]
		,'8d':[ x=>x ]
		,'8e':[ x=>(
				parseInt('0x'+x.substring(0,2))		// year
				+'/'+parseInt('0x'+x.charAt(2))		// month
				+'/'+parseInt('0x'+x.charAt(3)))	// day
			]
		,'9d':[ NULLPROP ],'9e':[ NULLPROP ],'9f':[ NULLPROP ]
		,'d3':[ NULLPROP ],'d4':[ NULLPROP ],'d5':[ NULLPROP ]
		,'d6':[ NULLPROP ],'d7':[ NULLPROP ]
	}

	,'0130':{
		'8f': [ x=>(x=='41'?'saving':'normal')		// power saving
			, x=>(x.toLowerCase()=='saving'?'41':(x.toLowerCase()=='normal'?'42':x))]
		,'b0':[ x=>{	// mode
				var xi = parseInt('0x'+x) ;
				if( 0x40<=xi && xi<=0x45 )	return AIRCON_MODE_LIST[xi-0x40] ;
				return 'unknown' ;
			}
			, x=>{
				var i = AIRCON_MODE_LIST.indexOf(x.toLowerCase()) ;
				if( i<0 ) return x ;
				return ('0'+(0x40+i).toString(16)).slice(-2) ;
			}
		 ]
		,'b3':[ x=>parseInt('0x'+x)	// Temperature
			, x=>{
				var xi = parseInt(x) ;
				if( xi == NaN || xi<0 || xi>50 ) return x ;
				return ('0'+xi.toString(16)).slice(-2) ;
			} ]
		,'bb':[ x=>{					// Room temperature (RO)
			var t = parseInt('0x'+x) ;
			return t <= 125 ? t : t-256 ;
			} ]
		,'a0': // Wind speed
			[ x => (x=='41' ? 0 /*Auto*/ : parseInt('0x'+x)-0x30)
			, x => {
				if( typeof x !== "number" || x<-1 || x>8 ) return x ;
				if( x==0 ) return '41' ;
				return ('0'+(x+0x30).toString(16)).slice(-2) ;
			}
			]
	}
} ;
