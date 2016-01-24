/*globals LocalMeanTime, moment, expect */
(function () {
  'use strict';

  describe('LocalMeanTime', function () {

    var momentProvider;
    var testTime;

    before(function() {
      testTime = moment('2015-01-01 12:30:10');
      momentProvider = function() {
        return testTime;
      };
    });

    describe('time offset for longitude', function () {

      it('longitude 1 should be 4 minutes ahead', function () {
        var offset = new LocalMeanTime(1, momentProvider).offsetFromUTC();
        expect(offset).to.equal(4);
      });

      it('longitude -1 should be 4 minutes behind', function () {
        var offset = new LocalMeanTime(-1, momentProvider).offsetFromUTC();
        expect(offset).to.equal(-4);
      });

      it('longitude 0 should be 0', function () {
        var offset = new LocalMeanTime(0).offsetFromUTC();
        expect(offset).to.equal(0);
      });

      it('longitude schould handle decimal', function () {
        var offset = new LocalMeanTime(11.111111111111).offsetFromUTC();
        expect(offset).to.equal(44.444444444444);
      });

    });

    describe('local mean time calculation', function() {

      it('is calculated as an offset from UTC', function() {
        var expectedTime = moment('2015-01-01 12:40:10');
        var time = new LocalMeanTime(2.5, momentProvider).calculate();
        expect(time.unix()).to.equal(expectedTime.unix());
      });

      it('converts local date to utc', function() {
        //TODO test drive convversion to utc date??
      });

    });


  });
})();
