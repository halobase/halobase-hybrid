import * as icons from "../../icons.json";

export async function GET(event) {
  /** @type {{key: string, value: string}[]} */
  // @ts-ignore
  const group = icons[event.params.group];
  if (!group) {
    return new Response(undefined, { status: 404 });
  }
  const index = Math.floor(Math.random() * group.length);
  const value = group[index].value;
  return new Response(value);
}
