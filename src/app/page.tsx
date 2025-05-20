/*
  title : home.page
  writer : 이은서
  src : http://localhost:3000/
*/
import { useParams } from "next/navigation";
import HeaderPageComponent from "@components/sementic/header/header.component.tsx";
import HomeComponent from "@components/page/company/company.component";
import FooterPageComponent from "@components/sementic/footer/footer.component";

export default function Home() {
  const params = useParams();
  const type = params.type as "company" | "member";

  return (
    <>
      <HeaderPageComponent />
      <HomeComponent type={type} /> 
      <FooterPageComponent />
    </>
  )
}