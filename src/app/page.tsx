import { loadAppData } from "./loader";

export default async function Home() {
  const data = await loadAppData();
  return (
    <>
      <h1>Compra</h1>
      <ul>
        {data.items.map((item) => {
          return <li key={item.id}>{item.text}</li>;
        })}
      </ul>
    </>
  );
}
