declare interface Array<T> {
	addUnique(element: T, handler: (n: T) => boolean): void;
	remove(callback: (n: T) => boolean): void;
}

Array.prototype.addUnique = function <T>(
	this: Array<T>,
	element: T,
	handler: (n: T) => boolean,
): void {
	this.forEach((elem: T) => {
		if (handler(elem)) {
			throw new Error('Duplicated Elements!');
		}
	});

	this.push(element);
};

Array.prototype.remove = function <T>(
	this: Array<T>,
	callback: (n: T) => boolean,
): void {
	this.forEach((elem, index) => {
		if (callback(this[index])) {
			this.splice(index, 1);
		}
	});
};
