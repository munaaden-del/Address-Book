# Address-Book
# Places I've Been

A simple HTML + JavaScript website that lists places I've visited using JavaScript **constructors** and **prototypes** (from the “Places You've Been” exercise).

The page lets you:

. See a list of places on the left.
 . Click a place to see details on the right (location, landmarks, time of year, notes).
. Add new places using a form; they immediately appear in the list.

## How It Works

Everything is in a single file: `index.html`.

### Business Logic (Constructors & Prototypes)

Inside a `<script>` tag in `index.html`, two main constructors are defined:

#### `Place`

```javascript
function Place(location, landmarks, timeOfYear, notes) {
  this.location = location;
  this.landmarks = landmarks || [];
  this.timeOfYear = timeOfYear || "";
  this.notes = notes || "";
}

Place.prototype.summary = function() {
  return this.location + (this.timeOfYear ? " (" + this.timeOfYear + ")" : "");
};
