function createEmptyObject() {
  return Object.create(null);
}

const obj = createEmptyObject();

console.log(obj); 
console.log(obj.toString);
console.log(obj.__proto__);
