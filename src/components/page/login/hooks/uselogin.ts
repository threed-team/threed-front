
// import { useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';



// export default function LoginRedirectPage() {
//     const [searchParams] = useSearchParams();
//     const code = searchParams.get("code");

//     useEffect(() => {
//         useEffect(() => {
//             getToken(code).then(({ token, user }) => {
//                 // GET요청으로 받아온 토큰값을 브라우저 쿠키에 저장합니다.
//                 document.cookie = `accessToken=${token}; Path=/`;
//                 if (user.hardware_no) {
//                     window.location.href = "/";
//                 } else {
//                     window.location.replace("/serial");
//                 }
//             });
//             // eslint-disable-next-line react-hooks/exhaustive-deps
//         }, []);

//         return <Spinner />;
//     })
// } 