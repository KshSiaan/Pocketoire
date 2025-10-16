import Base from "./base";
export default function Page() {
  return (
    <main className="h-dvh w-dvw p-6 grid grid-cols-2 gap-6">
      <Base
        title={"Payment Setup"}
        subtitle={"Get ready to earn commissions"}
        image="/image/login.jpg"
      />
    </main>
  );
}
