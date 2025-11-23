
// ===== Base: ElectricDevice =====
class ElectricDevice {
    constructor(name, powerW) {
        if (new.target === ElectricDevice) {
            throw new Error("Cannot create an instance of abstract class ElectricDevice");
        }
        this.name = name;
        this.powerW = powerW;
        this.isOn = false;
    }

    plugIn() {
        this.isOn = true;
        console.log(`${this.name} -> ON`);

    }

    unplug() {
        this.isOn = false;
        console.log(`${this.name} -> OFF`);

    }

    getPower() {
        throw new Error("Method getPower() must be implemented in a subclass")
    }
}

// ===== Child: Lamp =====
class Lamp extends ElectricDevice {
    constructor(name, powerW, hasDimmer) {
        super(name, powerW);
        this.hasDimmer = !!hasDimmer;
        this.brightness = 100;
    }

    setBrightness(pct) {
        const n = Number(pct);
        this.brightness = Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 0;
        return this;
    }

    getPower() {
        if (!this.isOn) return 0;
        return this.hasDimmer
        ? Math.round(this.powerW * (this.brightness / 100))
        : this.powerW;
    }
}

// ===== Child: Computer =====
class Computer extends ElectricDevice {
    constructor(name, powerW, formFactor = "desktop") {
        super(name, powerW);
        this.formFactor = formFactor;
        this.isSleep = false;
    }

    sleep() { this.isSleep = true; }
    wake() { this.isSleep = false; }

    getPower() {
    if (!this.isOn) return 0;
    return this.isSleep ? Math.round(this.powerW * 0.1) : this.powerW;
    }
}

// ===== Utility: totalPower =====
const totalPower = (...devices) =>
    devices.reduce((sum, d) => sum + d.getPower(), 0);

// ===== Demo =====
const lamp = new Lamp("Desk Lamp", 12, true);
const pc   = new Computer("PC", 250, "desktop");

lamp.plugIn();
lamp.setBrightness(50);
pc.plugIn();
pc.sleep();

console.log("Total power:", totalPower(lamp, pc), "W");
