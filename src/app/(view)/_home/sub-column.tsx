import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export default function SubColumn() {
  const sections = [
    {
      title: "Join",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.",
      image: "/image/a1.jpeg",
      buttonText: "View Profile",
    },
    {
      title: "Curate",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.",
      image: "/image/a1.jpeg",
      buttonText: "View Profile",
    },
    {
      title: "Earn",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.",
      image: "/image/a1.jpeg",
      buttonText: "View Profile",
    },
  ];

  return (
    <>
      {sections.map((item, i) => (
        <div key={i} className="flex flex-col gap-4">
          <h3 className="text-4xl">{item.title}</h3>
          <p>{item.description}</p>
          <Button className="w-fit text-destructive" variant={"link"}>
            {item.buttonText} <ArrowRightIcon />
          </Button>
          <Image
            className="aspect-square object-center object-cover lg:aspect-[4/5] rounded-lg"
            src={item.image}
            height={1400}
            width={600}
            alt={`${item.title}_image`}
          />
        </div>
      ))}
    </>
  );
}
