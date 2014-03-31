describe("Car", function() {

  describe("A car with a driver", function() {
    var car;
    var alice;

    beforeEach(function() {
      alice = new Person('Alice');
      alice.receiveLicense();
      car = new Car('black', alice);
    });

    it("should be black", function() {
      expect(car.color).toEqual('black');
    });

    it("should have a driver", function() {
      expect(car.driver).toBeDefined();
      expect(car.driver.name).toEqual(alice.name);
    });

    it("begins as off", function() {
      expect(car.state).toEqual('off');
    });

    it("can start", function() {
      var response = car.ignite();
      expect(response).toEqual('Vroom!');
      expect(car.state).toEqual('running');
    });
  });


  describe("A car without a driver", function() {
    var car;
    var bob;

    beforeEach(function() {
      car = new Car('blue', bob);
    });

    it("should be blue", function() {
      expect(car.color).toEqual('blue');
    });

    it("should not have a driver", function() {
      expect(car.driver).toBeUndefined();
    });

    it("cannot start the car", function() {
      var response = car.ignite();
      expect(response).toEqual('There is no driver to start the car!');
      expect(car.state).toEqual('off');
    });
  });


  describe("A car with a driver without a license", function() {
    var car;
    var bob;

    beforeEach(function() {
      bob = new Person('Bob');
      car = new Car('orange', bob);
    });

    it("should be orange", function() {
      expect(car.color).toEqual('orange');
    });

    it("should have a driver", function() {
      expect(car.driver).toBeDefined();
      expect(car.driver.name).toEqual(bob.name);
    });

    it("begins as off", function() {
      expect(car.state).toEqual('off');
    });

    it("auto-rejects the licenseless driver", function() {
      var response = car.ignite();
      expect(response).toEqual('Sorry, you do not have a license.');
      expect(car.state).toEqual('off');
    });
  });

});
