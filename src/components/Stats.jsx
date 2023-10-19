export default function Stats({ items }) {
  const itemsCount = items.length;

  if (!itemsCount) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  }

  const packedItemsCount = items.filter((item) => item.packed).length;
  const packedInPercentage = Math.round((packedItemsCount / itemsCount) * 100);
  const isEverythingPacked = itemsCount === packedItemsCount;

  return (
    <footer className="stats">
      <em>
        {!isEverythingPacked &&
          `💼 You have ${itemsCount} items on your list, and you already packed
        ${packedItemsCount} (${packedInPercentage}%)`}
        {isEverythingPacked && `Yout got everything! Ready to go ✈️`}
      </em>
    </footer>
  );
}
