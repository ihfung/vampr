class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;

    
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;

  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this; // the this keyword means the current vampire
    while (currentVampire.creator) { // if there is a creator
      currentVampire = currentVampire.creator; // set the current vampire to the creator
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let result = false;
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      result = true;

    }
    return result;
  }
  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVampire = this;
    let ancestor = null;
    let stop = false;

    while (!stop) { // while stop is false
      let temp = vampire;
      while (!stop) {
        if (currentVampire === temp) { // if the current vampire is equal to the temp
          ancestor = currentVampire; // set the ancestor to the current vampire
          stop = true; //stop the loop
        } else if (currentVampire.isMoreSeniorThan(temp)) { // if the current vampire is more senior than the temp
          temp = temp.creator; // set the temp to the creator
        } else {
          currentVampire = currentVampire.creator; // set the current vampire to the creator
        }
      }
    }
    return ancestor;
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name !== name) {
      return null;
    
    }
    return this.name;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let result = 0;
    for (const value in this.offspring) { // for each value in the offspring
      result += this.offspring[value].totalDescendents; // add the total number of offspring to the result
    }
    return result;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let temp = [];
    if (this.yearConverted > 1980) {
      temp.push(this);
    }

    
    for (const value in this.offspring) { // for each value in the offspring
      const vampire = this.offspring[value]; // vampire is equal to the offspring
      const millVampires = vampire.allMillennialVampires; // millVampires is equal to the allMillennialVampires
      //concat is used to join two or more arrays
      temp = temp.concat(millVampires); // add the millVampires to the temp
    }
    return temp;

  }

}

module.exports = Vampire;

