(function () {
  'use strict';

  describe('LocalMeanTime', function () {

    describe('time offset for longitude', function () {

      it('longitude 1 should be 4 minutes ahead', function () {
        expect(new LocalMeanTime(1).offsetFromUTC()).to.equal(4);
      });

      it('longitude -1 should be 4 minutes behind', function () {
        expect(new LocalMeanTime(-1).offsetFromUTC()).to.equal(-4);
      });

      it('longitude 0 should be 0', function () {
        expect(new LocalMeanTime(0).offsetFromUTC()).to.equal(0);
      });

      it('longitude schould handle decimal', function () {
        expect(new LocalMeanTime(11.111111111111).offsetFromUTC()).to.equal(44.444444444444);
      });

    });

  });
})();
