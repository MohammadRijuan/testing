import CustomerReviews from "@/components/customerReviews";
import HeroCarousel from "@/components/HeroCarousel";
import KeyBenefits from "@/components/keyBenefits";
import { getServerSession } from "next-auth";
import Image from "next/image";


export default async function Home() {


  return (
    <div>
      <HeroCarousel></HeroCarousel>
      <h1>home</h1>
      <KeyBenefits></KeyBenefits>
      <CustomerReviews></CustomerReviews>
    </div>
  );
}
