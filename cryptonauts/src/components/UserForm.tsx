import { useState } from 'react';

const UserForm = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new user object
    const newUser = {
      name,
      email,
      role,
    };

    // Call the parent component's function to add the user
    onAddUser(newUser);

    // Clear the form fields after submission
    setName('');
    setEmail('');
    setRole('');
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Add Naut</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="Engineer">Engineer</option>
            <option value="Captain">Captain</option>
            <option value="Navigator">Navigator</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Cleaner">Cleaner</option>
          </select>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Save
        </button>
      </form>
    </div>
  );
};

export default UserForm;
