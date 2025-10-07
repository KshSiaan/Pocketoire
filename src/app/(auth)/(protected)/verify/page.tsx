import Base from "./base";
export default function Page() {
  return (
    <main className="h-dvh w-dvw p-6 grid grid-cols-2 gap-6">
      <Base
        title={"Verify email"}
        subtitle={"We have sent 4digits code at ivan***@gmail.com"}
        image="/image/verify.jpg"
      />
    </main>
  );
}
