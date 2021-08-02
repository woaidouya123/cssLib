function Promise1(excutor){
	var self = this;
	self.value = null;
	self.reason = null;
	self.status = "pending";
	self.onFullfilledCallbacks = [];
	self.onRejectedCallbacks = [];

	function resolve(value){
		if(self.status === 'pending'){
			self.value = value;
			self.status = "fullfilled";
			self.onFullfilledCallbacks.forEach(fn => fn(self.value))
		}
	}

	function reject(reason){
		if(self.status === 'pending'){
			self.reason = reason;
			self.status = "rejected";
			self.onRejectedCallbacks.forEach(fn => fn(self.reason))
		}
	}
	try {
		excutor(resolve, reject);
	} catch (err) {
		reject(err);
	}
}

Promise1.prototype.then = function(onFullfilled, onRejected){
	var self = this;
	if(self.status === 'pending'){
		self.onFullfilledCallbacks.push(onFullfilled);
		self.onRejectedCallbacks.push(onRejected);
	}
	if(self.status === 'fullfilled'){
		onFullfilled(self.value);
	}
	if(self.status === 'rejected'){
		onRejected(self.reason);
	}
}