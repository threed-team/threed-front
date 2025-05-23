export function isLoggedIn(): boolean {
    if (typeof window === "undefined") return false;

    return document.cookie.includes("accessToken=");
}



// import React, { useEffect, useState } from "react";
// import { isLoggedIn } from "@/lib/session/useAuth"; // 위 함수 위치 맞게 수정

// export default function AuthButtons() {
//     const [loggedIn, setLoggedIn] = useState(false);

//     useEffect(() => {
//         setLoggedIn(isLoggedIn());
//     }, []);

//     const logout = () => {
//         // 간단한 로그아웃: 쿠키 삭제
//         document.cookie = "accessToken=; Path=/; Max-Age=0";
//         setLoggedIn(false);
//         window.location.reload(); // 새로고침으로 UI 초기화
//     };

//     if (loggedIn) {
//         return (
//             <button onClick= { logout } >
//             로그아웃
//             </button>
//     );
//     }

//     return (
//         <GoogleLoginButtons /> / / 앞서 만든 로그인 버튼 컴포넌트
//   );
// }
