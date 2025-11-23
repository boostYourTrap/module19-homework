function printOwnProperties(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      console.log(`${key}: ${obj[key]}`);
    }
  }
}

const user = {
  name: "Alex",
  age: 25
};

printOwnProperties(user);
