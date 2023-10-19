export default function Item({
  description,
  quantity,
  packed,
  onItemDelete,
  id,
  onItemToggle,
}) {
  return (
    <li>
      <input type="checkbox" value={packed} onChange={() => onItemToggle(id)} />
      <span style={packed ? { textDecoration: 'line-through' } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => onItemDelete(id)}>❌</button>
    </li>
  );
}
