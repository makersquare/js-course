var Events = {
	on: function(e, func) {
		if (this.events === undefined) {
			this.events = {};
			this.events[e] = [func];
		}
		else {
			if (this.events[e] === undefined) {
				this.events[e] = [func]
			}
			else {
				this.events[e].push(func);}
		}
	},
	trigger: function(e) {
		for (var i = 0; i < this.events[e].length; i += 1) {
		this.events[e][i]();
		}
	}
};