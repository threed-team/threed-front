import Image from "next/image";
import styles from "./loginButtons.module.scss";

export default function GithubLoginButtons() {
  const link = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_API}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL}&response_type=code&prompt=select_account`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <button
      className={`${styles.login_btn} ${styles.github_btn}`}
      onClick={loginHandler}
    >
      <i>
        <Image
          fill={true}
          src="/images/ico_github.png"
          alt="Google 로그인"
        />
      </i>

      <span className={styles.login_text}>Github로 로그인</span>
    </button>
  );
}