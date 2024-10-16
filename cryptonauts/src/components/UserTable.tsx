const UserTable = ({ nauts }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Name</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Email</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">Role</th>
          </tr>
        </thead>
        <tbody>
          {nauts && nauts.length > 0 ? (
            nauts.map((naut, index) => (
              <tr key={naut.email} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{naut.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{naut.email}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{naut.role}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={3} className="text-center py-4">No nauts found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
