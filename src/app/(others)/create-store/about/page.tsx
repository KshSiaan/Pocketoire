import Base from "./base";
export default function Page() {
  return (
    <main className="h-dvh w-dvw p-6 grid grid-cols-2 gap-6">
      <Base
        title={"About Your Store"}
        subtitle={"Tell your audience what your store is about"}
        image="/image/login.jpg"
      />
    </main>
  );
}
