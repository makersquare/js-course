var Events = {
	on : function(event, f) {
		this.events = this.events || {};
		this.events[event] ?
			this.events[event].push(f) :
			this.events[event] = [f];
		// this.events ? 
		// 	// this.events[event] = f : 
		// 	// this.events = { event: f };
		// 	this.events[event].push(f) :
		// 	this.events = { event: [f] };	
		// this.events = this.events || {};
		// this.events[event] = f;
		// wonder which if of these is clearer?
	},
	trigger : function(event) {
		events[event]();
	}
};