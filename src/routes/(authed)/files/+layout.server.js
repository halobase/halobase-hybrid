export async function load(event) {
  /** @type {import('$lib/types.js').Drive[]} */
  const drives = [
    {
      id: "$id",
      name: "c",
      total: 1024 * 1024 * 5, // 5 MiB
      used: 1024, // 1 KiB,
      default: true,
    },
    {
      id: "$id",
      name: "d",
      total: 1024 * 1024 * 5, // 5 MiB
      used: 1234567, // 1 KiB,
      default: false,
    }
  ];

  return {
    drives,
  };
}