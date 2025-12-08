import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export default function SubColumn() {
  const sections = [
    {
      title: "Join",
      description: (
        <>
          Discover a new way to share your travel expertise. <br />
          <br /> Become a Pocketoire creator and transform your favorite hotels,
          stays, and experiences into beautifully curated collections. Whether
          you’re a seasoned traveler or an emerging voice, joining gives you
          access to a platform designed to showcase your taste and grow your
          influence.
        </>
      ),
      image: "/image/a1.jpeg",
      buttonText: "View Profile",
    },
    {
      title: "Curate",
      description: (
        <>
          Build personalized travel guides that inspire your audience. <br />
          <br />
          Save your favorite stays, hidden gems, and must-do activities into
          collections that reflect your unique travel style. With intuitive
          tools and elegant layouts, Pocketoire makes it effortless to curate
          trips your followers will love—and trust.
        </>
      ),
      image: "/image/create.jpg",
      buttonText: "View Profile",
    },
    {
      title: "Earn",
      description: (
        <>
          Turn your travel recommendations into meaningful income. <br />
          <br />
          Every time someone books through your Pocketoire links, you earn
          commission—no extra work required. Track clicks, bookings, and
          earnings directly from your creator dashboard, and get rewarded for
          the destinations and experiences you already adore.
        </>
      ),
      image: "/image/login.jpg",
      buttonText: "View Profile",
    },
  ];

  return (
    <>
      {sections.map((item, i) => (
        <div key={i} className="flex flex-col justify-between italic">
          <div className="flex flex-col gap-4">
            <h3 className="text-4xl">{item.title}</h3>
            <p>{item.description}</p>
          </div>

          <Image
            className="aspect-square object-center object-cover lg:aspect-[4/5] rounded-lg mt-4"
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
