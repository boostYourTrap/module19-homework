function hasProperty(prop, obj) {
  return obj.hasOwnProperty(prop);
}

const user = {
  name: "Alex",
  age: 25
};

console.log(hasProperty("name", user));
console.log(hasProperty("email", user)); 
