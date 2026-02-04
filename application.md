# Application

The purpose of the application is to help a user fit units into detachments, for a game of Warhammer: The Horus Heresy.

## On Page Load

* If the user has used the page before, there may be state in local storage.
  Load the state and continue.
* If there is no initial state, invite the user to create a new army.

## Create an Army

* The user must select:
  * An Allegiance
  * The Faction of the Primary Detachment. Possibly with a Sub-faction as well.
* Then, invite the user to add units.

## Known Units

* There are too many different units to want to list them all in data.
* Some units appear in data.
  * Units that unlock a detachment. These will be Command or High Command units.
  * In Slots that only allow specific units. These will have the Battlefield Role of the Slot.
* Once a user has entered a unit name, it can be remembered locally.

## Add a Unit

* The user chooses the Battlefield Role for the unit.
* The user chooses a Known Unit, or enters the name for the unit.
  * Use a typeahead for efficient selection.
* The unit is added to the list of units.
* The default faction for the unit should be the faction of the Primary Detachment, but the user can choose a different faction.

## Remove a Unit

* The user can remove a unit.

## Display

Whenever the user makes changes, the display updates.

### Top

Show the Allegiance, and the Faction of the Primary Detachment.

### Unit List

Show a list of the units.

* Sort by Faction.
* Secondary sort by Battlefield Role, in the order given in Army Selection.
* Secondary sort by unit name.
* Display Role, then name.

### Detachment Allocation

* The application calculates a way to allocate the units into detachments, following the Army Selection rules.
  * Prime rules can be used, but it is preferred not to.
  * Does not need to calculate _every_ possible way to allocate units.
* There might not be a way to completely map units into detachments.
  * Calculate a partial allocation.

* Display each detachment, with the units allocated into its Slots.
* Then display units that could not be allocated.
* If some units could not be allocated, display up to 2 suggestions for changes that would allow all units to be allocated.

### Footer

Display static information about the application.
