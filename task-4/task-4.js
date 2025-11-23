// ===== Base: ElectricDevice (abstract) =====
function ElectricDevice(name, powerW) {
    if (this.constructor === ElectricDevice) {
        throw new Error("Cannot create an instance of abstract class ElectricDevice");
    }
    this.name = name;
    this.powerW = powerW;
    this.isOn = false;
}

ElectricDevice.prototype.plugIn = function () {
    this.isOn = true;
    console.log(`${this.name} -> ON`);
};

ElectricDevice.prototype.unplug = function () {
    this.isOn = false;
    console.log(`${this.name} -> OFF`);
};

ElectricDevice.prototype.getPower = function () {
    throw new Error("Method getPower() must be implemented in a subclass");
};


// ===== Child: Lamp =====
function Lamp(name, powerW, hasDimmer) {
    ElectricDevice.call(this, name, powerW);
    this.hasDimmer = !!hasDimmer;
    this.brightness = 100;
}

Lamp.prototype = Object.create(ElectricDevice.prototype);
Lamp.prototype.constructor = Lamp;

Lamp.prototype.setBrightness = function (pct) {
    const n = Number(pct);
    this.brightness = Number.isFinite(n)
        ? Math.max(0, Math.min(100, n))
        : 0;
};

Lamp.prototype.getPower = function () {
    if (!this.isOn) return 0;
    return this.hasDimmer
        ? Math.round(this.powerW * (this.brightness / 100))
        : this.powerW;
};


// ===== Child: Computer =====
function Computer(name, powerW, formFactor) {
    ElectricDevice.call(this, name, powerW);
    this.formFactor = formFactor || "desktop";
    this.isSleep = false;
}

Computer.prototype = Object.create(ElectricDevice.prototype);
Computer.prototype.constructor = Computer;

Computer.prototype.sleep = function () {
    this.isSleep = true;
};

Computer.prototype.wake = function () {
    this.isSleep = false;
};

Computer.prototype.getPower = function () {
    if (!this.isOn) return 0;
    return this.isSleep
        ? Math.round(this.powerW * 0.1)
        : this.powerW;
};


// ===== Utility: totalPower =====
function totalPower() {
    let sum = 0;
    for (let d of arguments) {
        sum += d.getPower();
    }
    return sum;
}


// ===== Demo =====
const lamp = new Lamp("Desk Lamp", 12, true);
const pc = new Computer("PC", 250, "desktop");

lamp.plugIn();
lamp.setBrightness(50);
pc.plugIn();
pc.sleep();

console.log("Total power:", totalPower(lamp, pc), "W");
