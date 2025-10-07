import Base from "./base";
export default function Page() {
  return (
    <main className="h-dvh w-dvw p-6 grid grid-cols-2 gap-6">
      <Base
        title={"New password"}
        subtitle={"You have to create a new password after recovery"}
        image="/image/new_pass.jpg"
      />
    </main>
  );
}
