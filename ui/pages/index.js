import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>FundETH</title>
        <meta name="description" content="An Ethereum based blockchain funding platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        {/* Navbar */}
        <navbar className={styles.navbar}>
          <logo className={styles.logo}>FundEth</logo>
          <login className={styles.login}>
            <a href="/fundraising"><button className={styles.login_btn}>Fundraisings</button></a>
          </login>
        </navbar>

        {/* Content */}
        <section className={styles.content}>
          <div className={styles.heading}>
            <h1 className={styles.heading_text}>Fund your Goals</h1>
            <p>FundETH is a fundraising platform built on the ethereum blockchain to raise funds for your needs and dreams, seamlessly and effortlessly. You can easily organize your fundraising campaign and share the link to your friends to donate Ethereum for the cause.</p>
            <a href="/fundraising"><button className={styles.button}>Fundraisings</button></a>
          </div>

          <img className={styles.image} src="https://media.istockphoto.com/photos/boy-measuring-fever-picture-id528290460?k=20&m=528290460&s=612x612&w=0&h=g8t_WFJesr-DnjtJEhhxahHZeXcKDbBfFWiAkdHFYWY=" />
        </section>
    </div>
  )
}
