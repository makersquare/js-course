describe("Player", function() {
  var person;

  it("should have a name", function() {
    person = new Person('Alice');
    expect(person.name).toEqual('Alice');

    person = new Person('Bob');
    expect(person.name).toEqual('Bob');
  });

  it("normally does not have a license", function() {
    person = new Person('Bob');
    expect(person.hasDriversLicense).toEqual(false);
  });

  it("can receive a license", function() {
    person = new Person('Bob');
    person.receiveLicense();
    expect(person.hasDriversLicense).toEqual(true);
  });

});
