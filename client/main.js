import { Template } from 'meteor/templating';

import './main.html';

Meteor.subscribe('sheets', {
  onReady: function () {
    var sheet = Sheets.findOne();

    if (sheet) {
      data = sheet["data"];
    }
    else {
      data = [
        ['=B1+C1', '1', '2', '', '', '', '', '', '', ''],
        ['=B2+C2', '3', '4', '', '', '', '', '', '', ''],
        ['=B3+C3', '5', '6', '', '', '', '', '', '', ''],
        ['=B4+C4', '7', '8', '', '', '', '', '', '', ''],
        ['=B5+C5', '9', '10', '', '', '', '', '', '', ''],
        ['=B6+C6', '11', '12', '', '', '', '', '', '', ''],
        ['=B7+C7', '13', '14', '', '', '', '', '', '', ''],
        ['=B8+C8', '15', '16', '', '', '', '', '', '', ''],
        ['=B9+C9', '17', '18', '', '', '', '', '', '', ''],
        ['=B10+C10', '19', '20', '', '', '', '', '', '', '']
      ];

        Sheets.insert( { "data" : data });
    }

    var hot = new Handsontable(document.getElementById("sheet"), {
      data: data,
      rowHeaders: true,
      colHeaders: ['Sum','Value 1','Value 2','Value 3','Value 4','Value 5','Value 6','Value 7','Value 8','Value 9'],
      contextMenu: true,
      formulas: true
    });

    hot.addHook('afterChange', function(changes, source) {
      if (source !== "loadData") {
        Sheets.update({ _id : Sheets.findOne()._id }, { $set: { "data" : this.getData() }});
      }
    });

    Tracker.autorun(function () {
      hot.loadData(Sheets.findOne()["data"]);
    });
  }
});
