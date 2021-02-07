namespace Core.Entities.orderAggregate
{
    public class Address
    {
        Address()
        {
        }
        public Address(string firstName, string lastName, string street, string city, string state, string zipCode)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Street = street;
            this.City = city;
            this.State = state;
            this.ZipCode = zipCode;

        }
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string Street { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string ZipCode { get; set; }
    }
}