'use strict';

var c = Ember.computed;

module.exports = App.ProjectController = Ember.ObjectController.extend({
  needs: ['application'],

  // Track whether or not we're editing, so we know when to
  // display the editing button in the template header.
  isEditing: c.equal('controllers.application.currentPath', 'project.edit'),

  // Display the name of the project manager and client
  managerName: c.alias('managedBy.name'),
  clientName: c.alias('client.name'),

  // Track the project budge details
  hoursBudgeted: c.alias('hourBudget'),
  isInternal: c.not('client'),

  // Sum up the hours logged for the project by looping over
  // all of the time entries that have been entered towards it.
  hoursLogged: function () {
    return this.get('timeEntries').reduce(function (previous, timeEntry) {
      return timeEntry.get('hours') + (previous ? previous : 0);
    }) || 0;
  }.property('timeEntries.@each.hours'),
});