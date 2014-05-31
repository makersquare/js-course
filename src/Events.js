var Events = {
	on : function(event, f) {
		this.events = this.events || {};
		this.events[event] ?
			this.events[event].push(f) :
			this.events[event] = [f];
	},
	trigger : function(event) {
			this.events[event].forEach(function(e) {e();});
	}
};