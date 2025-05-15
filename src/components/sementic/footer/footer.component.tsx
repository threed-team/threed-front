import styles from './footer.module.scss'

export default function footerPageComponent() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <p className={styles.footer_text}>Copyright © 2025. Codenary All Rights Reserved.</p>
      </div>
    </footer>
  )
}
