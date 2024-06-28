const patients = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Smith",
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Smith",
  },
  {
    id: 5,
    firstName: "Charlie",
    lastName: "Brown",
  },
  {
    id: 6,
    firstName: "David",
    lastName: "Brown",
  },
  {
    id: 7,
    firstName: "Eve",
    lastName: "White",
  },
  {
    id: 8,
    firstName: "Frank",
    lastName: "White",
  },
  {
    id: 9,
    firstName: "Grace",
    lastName: "Black",
  },
  {
    id: 10,
    firstName: "Henry",
    lastName: "Black",
  },
  {
    id: 11,
    firstName: "Isabel",
    lastName: "Green",
  },
  {
    id: 12,
    firstName: "Jack",
    lastName: "Green",
  },
  {
    id: 13,
    firstName: "Kelly",
    lastName: "Blue",
  },
  {
    id: 14,
    firstName: "Larry",
    lastName: "Blue",
  },
  {
    id: 15,
    firstName: "Mandy",
    lastName: "Red",
  },
  {
    id: 16,
    firstName: "Nancy",
    lastName: "Red",
  },
  {
    id: 17,
    firstName: "Oscar",
    lastName: "Yellow",
  },
  {
    id: 18,
    firstName: "Peter",
    lastName: "Yellow",
  },
  {
    id: 19,
    firstName: "Quincy",
    lastName: "Purple",
  },
  {
    id: 20,
    firstName: "Roger",
    lastName: "Purple",
  },
  {
    id: 21,
    firstName: "Sally",
    lastName: "Orange",
  },
  {
    id: 22,
    firstName: "Tom",
    lastName: "Orange",
  },
  {
    id: 23,
    firstName: "Ursula",
    lastName: "Pink",
  },
  {
    id: 24,
    firstName: "Victor",
    lastName: "Pink",
  },
  {
    id: 25,
    firstName: "Wendy",
    lastName: "Brown",
  },
];

export default function Prescriptions() {
  return (
    <div className="container">
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.firstName} {patient.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
