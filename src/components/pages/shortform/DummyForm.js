import React from 'react';

const FoundingTeamForm = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSubmit(formData);
  };

  return (
    <div>
      <h2>Founding Team</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FoundingTeamForm;
