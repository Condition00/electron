import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export type Collection = {
  _id: string;
  title: string;
  description: string;
  image?: string;
};

export default function CollectionCard({ c }: { c: Collection }) {
  return (
    <Link href={`/collection/${encodeURIComponent(c.title)}`}>
      <Card className="relative h-[28rem] w-[20rem] md:h-[32rem] md:w-[34rem] font-poppins p-6 md:p-8 mb-8 overflow-hidden bg-white">
        <CardTitle className="font-bold text-2xl md:text-4xl tracking-tight max-w-[60%]">
          {c.title}
        </CardTitle>
        <CardDescription className="mb-4 max-w-[52%] text-sm md:text-base leading-6 text-black/55">
          {c.description}
        </CardDescription>
        <div className="absolute bottom-0 right-0 flex h-[68%] w-[68%] items-end justify-end overflow-hidden">
          <img
            src={c.image}
            alt={c.title}
            className="max-h-full max-w-full object-contain object-bottom-right"
          />
        </div>
      </Card>
    </Link>
  );
}

export function HeroCollectionCard({ c }: { c: Collection }) {
  return (
    <div className="relative flex h-[21rem] w-[18rem] flex-col justify-start overflow-hidden rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:h-[24rem] md:w-[20rem]">
      <div className="max-w-[60%] text-2xl font-poppins font-semibold tracking-tight">{c.title}</div>
      <p className="mt-2 max-w-[58%] text-sm leading-6 text-black/50">{c.description}</p>
      <div className="absolute bottom-0 right-0 flex h-[64%] w-[68%] items-end justify-end overflow-hidden">
        <img
          src={c.image}
          alt={c.title}
          className="max-h-full max-w-full object-contain object-bottom-right"
        />
      </div>
    </div>
  );
}
