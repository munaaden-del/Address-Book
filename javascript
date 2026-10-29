function AddressBook() {
    this.contacts = [];
}

// Method to add a contact
AddressBook.prototype.addContact = function(contact) {
    this.contacts.push(contact);
};

// Method to remove a contact
AddressBook.prototype.removeContact = function(contactName) {
    this.contacts = this.contacts.filter(contact => contact.name !== contactName);
};

// Method to find a contact
AddressBook.prototype.findContact = function(contactName) {
    return this.contacts.find(contact => contact.name === contactName);
};

function Contact( Name, Phone) {
    this.name = name;
    this.phone = phone;
}


describe('AddressBook', () => {
    let addressBook;

    beforeEach(() => {
        addressBook = new AddressBook();
    });

    it('should add a contact', () => {
        const contact = new Contact('Yusuf', '01183472834');
        addressBook.addContact(contact);
        expect(addressBook.contacts.length).toBe(1);
    });

    it('should remove a contact', () => {
        const contact = new Contact('Rachel', '07254683121');
        addressBook.addContact(contact);
        addressBook.removeContact('Rachel');
        expect(addressBook.contacts.length).toBe(0);
    });

    it('should find a contact', () => {
        const contact = new Contact('Mike', '07946729353');
        addressBook.addContact(contact);
        const found = addressBook.findContact('Mike');
        expect(found).toEqual(contact);
    });
});

// place.js

// A single place/destination
function Place(location, landmarks, timeOfYear, notes) {
  this.location = location;          // string, e.g. "Paris, France"
  this.landmarks = landmarks || [];  // array of strings
  this.timeOfYear = timeOfYear;      // string, e.g. "Summer 2024"
  this.notes = notes || "";          // string
}

// Example instance method on the prototype
Place.prototype.summary = function() {
  return this.location + " (" + this.timeOfYear + ")";
};


// travelLog.js

function TravelLog() {
  this.places = [];
  this.currentId = 0;
}

TravelLog.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

TravelLog.prototype.addPlace = function(place) {
  place.id = this.assignId();
  this.places.push(place);
  return place.id;
};

TravelLog.prototype.findPlace = function(id) {
  return this.places.find(function(place) {
    return place.id === id;
  }) || null;
};

TravelLog.prototype.removePlace = function(id) {
  var index = this.places.findIndex(function(place) {
    return place.id === id;
  });
  if (index === -1) return false;
  this.places.splice(index, 1);
  return true;
};


// places.test.js

const { Place, TravelLog } = require('./path/to/your/modules');

describe('Place', () => {
  test('creates a place with given properties', () => {
    const place = new Place(
      "Paris, France",
      ["Eiffel Tower", "Louvre"],
      "Spring 2024",
      "Beautiful city!"
    );

    expect(place.location).toBe("Paris, France");
    expect(place.landmarks).toEqual(["Eiffel Tower", "Louvre"]);
    expect(place.timeOfYear).toBe("Spring 2024");
    expect(place.notes).toBe("Beautiful city!");
  });

  test('summary() returns "(location) (timeOfYear)"', () => {
    const place = new Place("Rome, Italy", [], "Summer 2023", "");
    expect(place.summary()).toBe("Rome, Italy (Summer 2023)");
  });
});

describe('TravelLog', () => {
  let log;

  beforeEach(() => {
    log = new TravelLog();
  });

  test('starts with an empty places array', () => {
    expect(log.places).toEqual([]);
  });

  test('addPlace() assigns an id and stores the place', () => {
    const place = new Place("Tokyo, Japan", ["Skytree"], "Winter 2022", "");
    const id = log.addPlace(place);

    expect(typeof id).toBe('number');
    expect(place.id).toBe(id);
    expect(log.places.length).toBe(1);
  });

  test('findPlace() returns a place by id', () => {
    const place1 = new Place("Tokyo", [], "Winter", "");
    const place2 = new Place("Berlin", [], "Fall", "");

    const id1 = log.addPlace(place1);
    const id2 = log.addPlace(place2);

    expect(log.findPlace(id1)).toBe(place1);
    expect(log.findPlace(id2)).toBe(place2);
  });

  test('findPlace() returns null if no place with that id exists', () => {
    expect(log.findPlace(999)).toBeNull();
  });

  test('removePlace() removes the place and returns true', () => {
    const place = new Place("Sydney", [], "Spring", "");
    const id = log.addPlace(place);

    const result = log.removePlace(id);
    expect(result).toBe(true);
    expect(log.findPlace(id)).toBeNull();
  });

  test('removePlace() returns false if id not found', () => {
    expect(log.removePlace(123)).toBe(false);
  });
});

