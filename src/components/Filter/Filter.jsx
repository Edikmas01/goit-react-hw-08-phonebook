export const Filter = ({ search, onChange }) => {
return (
  <>
    <p>Find contacts by name</p>
    <input
      type="text"
      name="filter"
      onChange={e => onChange(e.target.value)}
      value={search}
    />
  </>
);};