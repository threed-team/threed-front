import HeaderPageComponent from "@components/sementic/header/header.component.tsx";
import WriteComponent from "@components/page/post/write/postWrite.component";
import FooterPageComponent from "@components/sementic/footer/footer.component";
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