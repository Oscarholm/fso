import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  console.log(name);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const submitBirthYear = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: Number(born) } });

    setName("");
    setBorn("");
  };

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birth year</h2>
        <form onSubmit={submitBirthYear}>
          <div>
            <select onChange={({ target }) => setName(target.value)}>
              <option value=""></option>
              {authors.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            born{" "}
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
