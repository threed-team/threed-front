import HeaderPageComponent from "@components/sementic/m/header/header.component.tsx";
import WriteComponent from "@components/page/m/post/write/postWrite.component";
import FooterPageComponent from "@components/sementic/m/footer/footer.component";

interface PageProps {
  params: { id: string };
}

export default function WritePage({ params }: PageProps) {
  return (
    <>
      <HeaderPageComponent />
      <WriteComponent isEditMode={true} postId={Number(params.id)} />
      <FooterPageComponent />
    </>
  );
}