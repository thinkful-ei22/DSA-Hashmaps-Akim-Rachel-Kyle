"use strict";

//Set up constructor and hash function
class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  //if the value at the slot it gives is taken, then moves to the next open slot
  set(key, value) {
    const loadRatio = (this.length + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    let newIndex = index;
    let remainingCapacity = this._capacity - index;

    if (this._slots[newIndex] !== null) {
      while (this._slots[newIndex] !== null) {
        newIndex = newIndex + 1;
        remainingCapacity - 1;
        if (remainingCapacity === 0) {
          newIndex = this._slots[0];
          remainingCapacity = this._capacity;
        }
        if (newIndex === index) {
          console.log("No available space! Everything went wrong. Disaster");
          return;
        }
      }
    }
    this._slots[index];
    key, value;

    this.length++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || slot.key == key) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;

    this.length = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined) {
        this.set(slot.key, slot.value);
      }
    }
  }
}

const lor = new HashMap();

function main() {
  lor.set("Hobbit", "Bilbo");
  lor.set("Hobbit", "Frodo");
  console.log("this is lor", lor);
}

main();

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;
