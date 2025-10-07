import Base from "./base";
export default function Page() {
  return (
    <main className="h-dvh w-dvw p-6 grid grid-cols-2 gap-6">
      <Base
        title={"Welcome!"}
        subtitle={"Give us some information to create the account."}
        image="/image/signup.jpg"
      />
    </main>
  );
}
